import axios from 'axios';
import { store } from '../store/store';
import { logoutUser } from '../store/slices/authSlice';
import { addNotification } from '../store/slices/uiSlice';
import { authAPI } from './authAPI';
import monitoringService from './monitoringService';
import logger from '../utils/logger';

// Rate limiting configuration
const RATE_LIMIT_CONFIG = {
  maxRequestsPerMinute: 60,
  maxRequestsPerHour: 1000,
  requestQueue: [],
  requestTimes: [],
};

// Request queue for rate limiting
class RequestQueue {
  constructor() {
    this.queue = [];
    this.processing = false;
    this.requestTimes = [];
  }

  async add(requestConfig) {
    return new Promise((resolve, reject) => {
      this.queue.push({ requestConfig, resolve, reject });
      this.processQueue();
    });
  }

  async processQueue() {
    if (this.processing || this.queue.length === 0) return;

    this.processing = true;

    while (this.queue.length > 0) {
      // Check rate limits before processing
      if (!this.canMakeRequest()) {
        await this.waitForRateLimit();
        continue;
      }

      const { requestConfig, resolve, reject } = this.queue.shift();

      try {
        this.recordRequest();
        const response = await axios(requestConfig);
        resolve(response);
      } catch (error) {
        reject(error);
      }
    }

    this.processing = false;
  }

  canMakeRequest() {
    const now = Date.now();
    const oneMinuteAgo = now - 60 * 1000;
    const oneHourAgo = now - 60 * 60 * 1000;

    // Clean old timestamps
    this.requestTimes = this.requestTimes.filter(time => time > oneHourAgo);

    const requestsInLastMinute = this.requestTimes.filter(time => time > oneMinuteAgo).length;
    const requestsInLastHour = this.requestTimes.length;

    return (
      requestsInLastMinute < RATE_LIMIT_CONFIG.maxRequestsPerMinute &&
      requestsInLastHour < RATE_LIMIT_CONFIG.maxRequestsPerHour
    );
  }

  recordRequest() {
    this.requestTimes.push(Date.now());
  }

  async waitForRateLimit() {
    // Wait until we can make a request
    await new Promise(resolve => setTimeout(resolve, 1000));
  }
}

const requestQueue = new RequestQueue();

// Create axios instance
const httpClient = axios.create({
  baseURL: '/api/v1',
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
httpClient.interceptors.request.use(
  async (config) => {
    // Add auth token if available (Firebase handles token refresh automatically)
    try {
      const token = await authAPI.getUserToken();
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch (error) {
      console.warn('Failed to get auth token:', error);
    }

    // Add organization ID if available
    const state = store.getState();
    const organizationId = state.auth.user?.organizationId;
    if (organizationId) {
      config.headers['X-Organization-ID'] = organizationId;
    }

    // Add request timestamp for debugging and monitoring
    config.metadata = { startTime: Date.now() };

    // Log API request
    logger.apiRequest(config.method, config.url, {
      params: config.params,
      headers: config.headers
    });

    return config;
  },
  (error) => {
    console.error('Request interceptor error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor
httpClient.interceptors.response.use(
  (response) => {
    // Calculate response time and log
    const duration = Date.now() - response.config.metadata.startTime;

    // Log API response
    logger.apiResponse(
      response.config.method,
      response.config.url,
      response.status,
      duration
    );

    // Track with monitoring service
    monitoringService.trackAPICall(
      response.config.method,
      response.config.url,
      duration,
      response.status
    );

    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    const duration = Date.now() - (originalRequest?.metadata?.startTime || 0);

    // Log API error
    logger.apiError(originalRequest?.method, originalRequest?.url, error);

    // Track error with monitoring service
    if (originalRequest) {
      monitoringService.trackAPICall(
        originalRequest.method,
        originalRequest.url,
        duration,
        error.response?.status || 0
      );
    }

    // Handle authentication errors (401)
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      // Firebase handles token refresh automatically, so if we get 401,
      // it means the user needs to re-authenticate
      console.error('Authentication failed - user needs to log in again');

      // Logout user
      store.dispatch(logoutUser());
      store.dispatch(addNotification({
        type: 'error',
        title: 'Session Expired',
        message: 'Please log in again.'
      }));

      // Redirect to login page
      window.location.href = '/login';
    }

    // Handle rate limiting (429)
    if (error.response?.status === 429) {
      const retryAfter = error.response.headers['retry-after'] || 60;

      store.dispatch(addNotification({
        type: 'warning',
        title: 'Rate Limit Exceeded',
        message: `Please wait ${retryAfter} seconds before making more requests.`
      }));

      // Retry after the specified delay
      await new Promise(resolve => setTimeout(resolve, retryAfter * 1000));
      return httpClient(originalRequest);
    }

    // Handle server errors (5xx)
    if (error.response?.status >= 500) {
      store.dispatch(addNotification({
        type: 'error',
        title: 'Server Error',
        message: 'The server is currently experiencing issues. Please try again later.'
      }));
    }

    // Handle validation errors (400)
    if (error.response?.status === 400) {
      const errorMessage = error.response.data?.message || 'Invalid request data';
      store.dispatch(addNotification({
        type: 'error',
        title: 'Validation Error',
        message: errorMessage
      }));
    }

    // Handle permission errors (403)
    if (error.response?.status === 403) {
      store.dispatch(addNotification({
        type: 'error',
        title: 'Access Denied',
        message: 'You do not have permission to perform this action.'
      }));
    }

    return Promise.reject(error);
  }
);

// Enhanced request function with rate limiting
export const makeRequest = async (config) => {
  return requestQueue.add(config);
};

// Convenience methods
export const apiClient = {
  get: (url, config = {}) => makeRequest({ ...config, method: 'GET', url }),
  post: (url, data, config = {}) => makeRequest({ ...config, method: 'POST', url, data }),
  put: (url, data, config = {}) => makeRequest({ ...config, method: 'PUT', url, data }),
  patch: (url, data, config = {}) => makeRequest({ ...config, method: 'PATCH', url, data }),
  delete: (url, config = {}) => makeRequest({ ...config, method: 'DELETE', url }),
};

// Cache helpers
const cache = new Map();
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

export const cachedRequest = async (key, requestFn, cacheDuration = CACHE_DURATION) => {
  const cachedData = cache.get(key);

  if (cachedData && Date.now() - cachedData.timestamp < cacheDuration) {
    console.log(`📦 Cache hit: ${key}`);
    return cachedData.data;
  }

  try {
    const data = await requestFn();
    cache.set(key, { data, timestamp: Date.now() });
    console.log(`💾 Cache set: ${key}`);
    return data;
  } catch (error) {
    console.error(`❌ Cache miss error: ${key}`, error);
    throw error;
  }
};

export const clearCache = (key) => {
  if (key) {
    cache.delete(key);
    console.log(`🗑️ Cache cleared: ${key}`);
  } else {
    cache.clear();
    console.log('🗑️ All cache cleared');
  }
};

export const getCacheStats = () => {
  return {
    size: cache.size,
    keys: Array.from(cache.keys()),
    memoryUsage: JSON.stringify(Array.from(cache.entries())).length
  };
};

export default httpClient;