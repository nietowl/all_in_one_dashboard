import { useEffect, useRef, useCallback, useState } from 'react';
import { invalidateCache } from '../services/httpClient';

const useAutoRefresh = (refreshFn, interval = 30000, options = {}) => {
  const {
    enabled = true,
    immediate = true,
    pauseOnFocus = false,
    pauseOnError = true,
    maxRetries = 3,
    exponentialBackoff = true
  } = options;

  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);
  const [retryCount, setRetryCount] = useState(0);
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  const intervalRef = useRef(null);
  const refreshFnRef = useRef(refreshFn);
  const isDocumentVisible = useRef(true);

  // Update refresh function ref when it changes
  useEffect(() => {
    refreshFnRef.current = refreshFn;
  }, [refreshFn]);

  const executeRefresh = useCallback(async () => {
    if (!enabled || isRefreshing || !isOnline) return;

    setIsRefreshing(true);
    setError(null);

    try {
      await refreshFnRef.current();
      setLastUpdated(new Date());
      setRetryCount(0);
    } catch (err) {
      console.error('Auto-refresh error:', err);
      setError(err);
      setRetryCount(prev => prev + 1);

      // Stop auto-refresh if max retries reached and pauseOnError is true
      if (pauseOnError && retryCount >= maxRetries) {
        clearInterval(intervalRef.current);
      }
    } finally {
      setIsRefreshing(false);
    }
  }, [enabled, isRefreshing, retryCount, maxRetries, pauseOnError, isOnline]);

  const startInterval = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    if (enabled && (!pauseOnError || retryCount < maxRetries)) {
      // Apply exponential backoff on errors
      const backoffMultiplier = exponentialBackoff && retryCount > 0 ? Math.pow(2, retryCount) : 1;
      const adjustedInterval = Math.min(interval * backoffMultiplier, 300000); // Max 5 minutes

      intervalRef.current = setInterval(executeRefresh, adjustedInterval);
      console.log(`🔄 Auto-refresh interval set to ${adjustedInterval}ms (retry: ${retryCount})`);
    }
  }, [enabled, interval, executeRefresh, pauseOnError, retryCount, maxRetries, exponentialBackoff]);

  // Handle visibility change and network status
  useEffect(() => {
    const handleVisibilityChange = () => {
      isDocumentVisible.current = !document.hidden;

      if (pauseOnFocus && enabled) {
        if (document.hidden) {
          clearInterval(intervalRef.current);
        } else {
          startInterval();
        }
      }
    };

    const handleOnlineStatus = () => {
      const online = navigator.onLine;
      setIsOnline(online);

      if (online && enabled) {
        // Resume auto-refresh when back online
        startInterval();
      } else {
        // Pause auto-refresh when offline
        clearInterval(intervalRef.current);
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('online', handleOnlineStatus);
    window.addEventListener('offline', handleOnlineStatus);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('online', handleOnlineStatus);
      window.removeEventListener('offline', handleOnlineStatus);
    };
  }, [enabled, pauseOnFocus, startInterval]);

  const stopInterval = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  const manualRefresh = useCallback(async () => {
    // Clear relevant cache before manual refresh for fresh data
    invalidateCache();
    await executeRefresh();
  }, [executeRefresh]);

  const reset = useCallback(() => {
    setError(null);
    setRetryCount(0);
    if (enabled) {
      startInterval();
    }
  }, [enabled, startInterval]);

  // Start/stop interval based on enabled state
  useEffect(() => {
    if (enabled) {
      if (immediate) {
        executeRefresh();
      }
      startInterval();
    } else {
      stopInterval();
    }

    return stopInterval;
  }, [enabled, immediate, startInterval, stopInterval, executeRefresh]);

  return {
    isRefreshing,
    error,
    lastUpdated,
    retryCount,
    isOnline,
    manualRefresh,
    reset,
    stop: stopInterval,
    start: startInterval
  };
};

export default useAutoRefresh;