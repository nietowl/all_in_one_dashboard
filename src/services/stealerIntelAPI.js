import axios from 'axios';
import logger from '../utils/logger';

// Create a separate axios instance for the external stealer intelligence API
// Using proxy to avoid CORS issues in development
const stealerAPI = axios.create({
  baseURL: import.meta.env.DEV ? '/api/v1' : 'http://lnxai.localto.net/api/v1',
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Rate limiting configuration for external API
const RATE_LIMIT_CONFIG = {
  maxRequestsPerMinute: 30,
  requestTimes: [],
};

// Rate limiting helper
const canMakeRequest = () => {
  const now = Date.now();
  const oneMinuteAgo = now - 60 * 1000;

  // Clean old timestamps
  RATE_LIMIT_CONFIG.requestTimes = RATE_LIMIT_CONFIG.requestTimes.filter(
    time => time > oneMinuteAgo
  );

  return RATE_LIMIT_CONFIG.requestTimes.length < RATE_LIMIT_CONFIG.maxRequestsPerMinute;
};

const recordRequest = () => {
  RATE_LIMIT_CONFIG.requestTimes.push(Date.now());
};

// Request interceptor for logging and rate limiting
stealerAPI.interceptors.request.use(
  async (config) => {
    // Check rate limiting
    if (!canMakeRequest()) {
      throw new Error('Rate limit exceeded. Please wait before making more requests.');
    }

    recordRequest();

    // Add request timestamp for monitoring
    config.metadata = { startTime: Date.now() };

    // Log API request
    logger.apiRequest(config.method, config.url, {
      params: config.params,
    });

    return config;
  },
  (error) => {
    console.error('Stealer API request interceptor error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor for logging and error handling
stealerAPI.interceptors.response.use(
  (response) => {
    const duration = Date.now() - response.config.metadata.startTime;

    // Log API response
    logger.apiResponse(
      response.config.method,
      response.config.url,
      response.status,
      duration
    );

    return response;
  },
  (error) => {
    const originalRequest = error.config;

    // Log API error
    logger.apiError(originalRequest?.method, originalRequest?.url, error);

    // Handle specific error cases
    if (error.code === 'ECONNABORTED') {
      throw new Error('Request timeout - The stealer intelligence API is not responding');
    }

    if (error.response?.status === 404) {
      throw new Error('Stealer intelligence data not found for the specified parameters');
    }

    if (error.response?.status === 500) {
      throw new Error('Stealer intelligence API server error - Please try again later');
    }

    if (!error.response) {
      throw new Error('Network error - Unable to connect to stealer intelligence API');
    }

    throw new Error(error.response?.data?.message || 'Failed to fetch stealer intelligence data');
  }
);

/**
 * Fetch stealer credentials from the external API
 * @param {string} year - Year (e.g., "2025")
 * @param {string} month - Month (e.g., "february")
 * @param {string} domain - Domain to search (e.g., "adani.com")
 * @param {number} start - Starting record number (default: 1)
 * @param {number} max - Maximum records to return (default: 50)
 * @returns {Promise<Object>} API response with credential data
 */
export const fetchStealerCredentials = async (year, month, domain, start = 1, max = 50) => {
  try {
    console.log('🔍 Fetching stealer credentials with params:', { year, month, domain, start, max });

    const apiUrl = `${stealerAPI.defaults.baseURL}/config/`;
    console.log('🌐 API URL:', apiUrl);

    const response = await stealerAPI.get('/config/', {
      params: {
        type: 'stealer',
        year,
        month,
        domain,
        start,
        max
      }
    });

    console.log('✅ Raw API Response:', {
      status: response.status,
      headers: response.headers,
      data: response.data
    });

    // Handle the actual API response format: { Status, Message, Data: { items: [], total: ... } }
    let credentialData = [];
    let totalCount = 0;

    if (response.data && response.data.Data) {
      // API returns { Status, Message, Data: { items, total, start, size, next, prev } }
      credentialData = response.data.Data.items || [];
      totalCount = response.data.Data.total || 0;
    } else if (Array.isArray(response.data)) {
      credentialData = response.data;
      totalCount = response.data.length;
    } else if (response.data && typeof response.data === 'object') {
      // Fallback for other formats
      credentialData = response.data.data || response.data.results || response.data.credentials || [];
      totalCount = response.data.total || response.data.count || credentialData.length;
    }

    console.log('📊 Processed credential data:', {
      credentialCount: credentialData.length,
      totalCount,
      firstItem: credentialData[0] || 'No data'
    });

    // Transform the response to match expected format
    const transformedData = {
      data: credentialData,
      totalEntries: totalCount,
      returnedEntries: credentialData.length,
      message: response.data?.Message || `Found ${credentialData.length} credentials for ${domain} in ${month} ${year}`,
      passwordType: 'Mixed', // Since this is stealer data, passwords may be mixed format
      domain,
      year,
      month,
      start,
      max,
      status: response.data?.Status || 'ok'
    };

    console.log('✅ Final transformed data:', transformedData);
    return transformedData;
  } catch (error) {
    console.error('❌ Failed to fetch stealer credentials:', {
      message: error.message,
      status: error.response?.status,
      statusText: error.response?.statusText,
      data: error.response?.data,
      url: error.config?.url,
      params: error.config?.params
    });

    // Provide more specific error messages
    if (error.code === 'ECONNREFUSED') {
      throw new Error(`Connection refused: Unable to connect to ${stealerAPI.defaults.baseURL}. Please check if the API server is running.`);
    }

    if (error.response?.status === 404) {
      throw new Error(`API endpoint not found. Please verify the URL: ${stealerAPI.defaults.baseURL}/config/`);
    }

    if (error.response?.status === 403) {
      throw new Error('Access forbidden: You may not have permission to access this stealer intelligence data.');
    }

    if (error.response?.status >= 500) {
      throw new Error(`Server error (${error.response.status}): The stealer intelligence API is experiencing issues.`);
    }

    throw error;
  }
};

/**
 * Fetch stealer statistics for dashboard metrics
 * @param {Object} filters - Filter parameters
 * @returns {Promise<Object>} Statistics data
 */
export const fetchStealerStats = async (filters = {}) => {
  try {
    console.log('📊 Fetching stealer statistics:', filters);

    // For now, we'll generate statistics based on the main data call
    // In the future, this could be a separate endpoint
    const { year = '2025', month = 'february', domain = 'example.com' } = filters;

    const response = await fetchStealerCredentials(year, month, domain, 1, 1);

    // Generate mock statistics based on the response
    const stats = {
      totalCredentials: response.totalEntries || 0,
      totalDomains: 1, // We're querying one domain at a time
      avgCredentialsPerDomain: response.totalEntries || 0,
      lastUpdated: new Date().toISOString(),
      securityLevel: response.totalEntries > 100 ? 'High Risk' :
                     response.totalEntries > 50 ? 'Medium Risk' : 'Low Risk',
      trendsData: {
        daily: Math.floor(Math.random() * 50),
        weekly: Math.floor(Math.random() * 200),
        monthly: response.totalEntries || 0
      }
    };

    console.log('✅ Stealer statistics generated:', stats);
    return stats;
  } catch (error) {
    console.error('❌ Failed to fetch stealer statistics:', error);
    throw error;
  }
};

/**
 * Search stealer credentials with advanced filters
 * @param {string} searchTerm - Search query
 * @param {Object} filters - Filter parameters
 * @param {number} start - Starting record
 * @param {number} max - Maximum records
 * @returns {Promise<Object>} Search results
 */
export const searchStealerCredentials = async (searchTerm, filters = {}, start = 1, max = 50) => {
  try {
    console.log('🔍 Searching stealer credentials:', { searchTerm, filters, start, max });

    // For search, we'll use the domain as the search term if provided
    const domain = searchTerm || filters.domain || 'example.com';

    const response = await fetchStealerCredentials(
      filters.year || '2025',
      filters.month || 'february',
      domain,
      start,
      max
    );

    // Filter results based on search term if it's not a domain
    if (searchTerm && searchTerm !== domain) {
      const filteredData = response.data.filter(item =>
        JSON.stringify(item).toLowerCase().includes(searchTerm.toLowerCase())
      );

      return {
        ...response,
        data: filteredData,
        totalEntries: filteredData.length,
        returnedEntries: filteredData.length,
        message: `Found ${filteredData.length} results for "${searchTerm}"`
      };
    }

    return response;
  } catch (error) {
    console.error('❌ Failed to search stealer credentials:', error);
    throw error;
  }
};

/**
 * Export stealer credentials data
 * @param {Object} filters - Export filters
 * @param {string} format - Export format (csv, json)
 * @returns {Promise<Blob>} Export data
 */
export const exportStealerCredentials = async (filters = {}, format = 'csv') => {
  try {
    console.log('📥 Exporting stealer credentials:', { filters, format });

    const response = await fetchStealerCredentials(
      filters.year || '2025',
      filters.month || 'february',
      filters.domain || 'example.com',
      1,
      filters.max || 1000 // Export more records
    );

    let exportData;
    let filename;

    if (format === 'csv') {
      // Convert to CSV format
      const headers = Object.keys(response.data[0] || {});
      const csvContent = [
        headers.join(','),
        ...response.data.map(row =>
          headers.map(header => `"${(row[header] || '').toString().replace(/"/g, '""')}"`).join(',')
        )
      ].join('\n');

      exportData = new Blob([csvContent], { type: 'text/csv' });
      filename = `stealer_credentials_${filters.domain}_${Date.now()}.csv`;
    } else {
      // JSON format
      exportData = new Blob([JSON.stringify(response.data, null, 2)], { type: 'application/json' });
      filename = `stealer_credentials_${filters.domain}_${Date.now()}.json`;
    }

    // Create download link
    const url = URL.createObjectURL(exportData);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    console.log('✅ Export completed:', filename);
    return exportData;
  } catch (error) {
    console.error('❌ Failed to export stealer credentials:', error);
    throw error;
  }
};

// Cache for stealer intelligence data
const stealerCache = new Map();
const CACHE_DURATION = 2 * 60 * 1000; // 2 minutes cache for external API

/**
 * Cached request wrapper for stealer intelligence API
 * @param {string} key - Cache key
 * @param {Function} requestFn - Request function
 * @returns {Promise<Object>} Cached or fresh data
 */
export const cachedStealerRequest = async (key, requestFn) => {
  const cachedData = stealerCache.get(key);

  if (cachedData && Date.now() - cachedData.timestamp < CACHE_DURATION) {
    console.log(`📦 Stealer cache hit: ${key}`);
    return cachedData.data;
  }

  try {
    const data = await requestFn();
    stealerCache.set(key, { data, timestamp: Date.now() });
    console.log(`💾 Stealer cache set: ${key}`);
    return data;
  } catch (error) {
    console.error(`❌ Stealer cache miss error: ${key}`, error);
    throw error;
  }
};

export default stealerAPI;