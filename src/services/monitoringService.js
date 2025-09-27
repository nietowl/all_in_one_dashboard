import logger from '../utils/logger';

class MonitoringService {
  constructor() {
    this.metrics = {
      pageLoadTime: null,
      apiCallCount: 0,
      errorCount: 0,
      performanceObserver: null,
      connectionObserver: null
    };

    this.thresholds = {
      slowApiCall: 3000,     // 3 seconds
      slowPageLoad: 5000,    // 5 seconds
      highErrorRate: 0.1     // 10%
    };

    this.initialize();
  }

  initialize() {
    this.setupPerformanceMonitoring();
    this.setupNetworkMonitoring();
    this.setupErrorTracking();
    this.setupMemoryMonitoring();
    this.trackPageLoad();
  }

  setupPerformanceMonitoring() {
    if ('PerformanceObserver' in window) {
      // Monitor navigation performance
      const navObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          this.trackNavigationPerformance(entry);
        }
      });
      navObserver.observe({ entryTypes: ['navigation'] });

      // Monitor resource loading
      const resourceObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          this.trackResourcePerformance(entry);
        }
      });
      resourceObserver.observe({ entryTypes: ['resource'] });

      // Monitor long tasks
      const longTaskObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          this.trackLongTask(entry);
        }
      });
      longTaskObserver.observe({ entryTypes: ['longtask'] });
    }
  }

  setupNetworkMonitoring() {
    if ('connection' in navigator) {
      const connection = navigator.connection;

      // Initial connection info
      this.trackConnectionInfo(connection);

      // Monitor connection changes
      connection.addEventListener('change', () => {
        this.trackConnectionInfo(connection);
      });
    }
  }

  setupErrorTracking() {
    // Track unhandled JavaScript errors
    window.addEventListener('error', (event) => {
      this.trackError({
        type: 'javascript_error',
        message: event.message,
        filename: event.filename,
        lineno: event.lineno,
        colno: event.colno,
        stack: event.error?.stack
      });
    });

    // Track unhandled promise rejections
    window.addEventListener('unhandledrejection', (event) => {
      this.trackError({
        type: 'unhandled_promise_rejection',
        message: event.reason?.message || 'Unhandled promise rejection',
        stack: event.reason?.stack
      });
    });
  }

  setupMemoryMonitoring() {
    if ('memory' in performance) {
      // Monitor memory usage periodically
      setInterval(() => {
        this.trackMemoryUsage();
      }, 30000); // Every 30 seconds
    }
  }

  trackPageLoad() {
    window.addEventListener('load', () => {
      // Track page load time
      const navigationTiming = performance.getEntriesByType('navigation')[0];
      if (navigationTiming) {
        const loadTime = navigationTiming.loadEventEnd - navigationTiming.navigationStart;
        this.metrics.pageLoadTime = loadTime;

        logger.performance('Page Load', loadTime, {
          domContentLoaded: navigationTiming.domContentLoadedEventEnd - navigationTiming.navigationStart,
          firstPaint: this.getFirstPaint(),
          firstContentfulPaint: this.getFirstContentfulPaint()
        });

        // Alert if page load is slow
        if (loadTime > this.thresholds.slowPageLoad) {
          this.alertSlowPageLoad(loadTime);
        }
      }
    });
  }

  trackNavigationPerformance(entry) {
    const metrics = {
      type: 'navigation',
      duration: entry.duration,
      transferSize: entry.transferSize,
      domContentLoaded: entry.domContentLoadedEventEnd - entry.domContentLoadedEventStart,
      domComplete: entry.domComplete - entry.domLoading
    };

    logger.performance('Navigation Performance', entry.duration, metrics);
  }

  trackResourcePerformance(entry) {
    // Track slow API calls
    if (entry.name.includes('/api/')) {
      this.metrics.apiCallCount++;

      if (entry.duration > this.thresholds.slowApiCall) {
        logger.warn('Slow API Call Detected', {
          type: 'slow_api_call',
          url: entry.name,
          duration: entry.duration,
          transferSize: entry.transferSize
        });
      }

      logger.performance('API Call', entry.duration, {
        url: entry.name,
        transferSize: entry.transferSize,
        responseStart: entry.responseStart - entry.requestStart
      });
    }
  }

  trackLongTask(entry) {
    logger.warn('Long Task Detected', {
      type: 'long_task',
      duration: entry.duration,
      startTime: entry.startTime
    });
  }

  trackConnectionInfo(connection) {
    const connectionInfo = {
      effectiveType: connection.effectiveType,
      downlink: connection.downlink,
      rtt: connection.rtt,
      saveData: connection.saveData
    };

    logger.info('Network Connection Info', {
      type: 'connection_info',
      ...connectionInfo
    });

    // Alert on slow connection
    if (connection.effectiveType === 'slow-2g' || connection.effectiveType === '2g') {
      logger.warn('Slow Network Connection Detected', connectionInfo);
    }
  }

  trackMemoryUsage() {
    const memory = performance.memory;
    const memoryInfo = {
      usedJSHeapSize: memory.usedJSHeapSize,
      totalJSHeapSize: memory.totalJSHeapSize,
      jsHeapSizeLimit: memory.jsHeapSizeLimit,
      usagePercentage: (memory.usedJSHeapSize / memory.jsHeapSizeLimit) * 100
    };

    logger.info('Memory Usage', {
      type: 'memory_usage',
      ...memoryInfo
    });

    // Alert on high memory usage
    if (memoryInfo.usagePercentage > 80) {
      logger.warn('High Memory Usage Detected', memoryInfo);
    }
  }

  trackError(errorInfo) {
    this.metrics.errorCount++;

    logger.error('Application Error', {
      type: 'application_error',
      ...errorInfo
    });

    // Check error rate
    const errorRate = this.metrics.errorCount / Math.max(this.metrics.apiCallCount, 1);
    if (errorRate > this.thresholds.highErrorRate) {
      this.alertHighErrorRate(errorRate);
    }
  }

  trackUserInteraction(action, details = {}) {
    logger.userAction(action, details);
  }

  trackAPICall(method, url, duration, status) {
    this.metrics.apiCallCount++;

    if (status >= 400) {
      this.metrics.errorCount++;
    }

    logger.apiResponse(method, url, status, duration);

    if (duration > this.thresholds.slowApiCall) {
      logger.warn('Slow API Call', {
        type: 'slow_api_call',
        method,
        url,
        duration,
        status
      });
    }
  }

  getFirstPaint() {
    const entries = performance.getEntriesByType('paint');
    const firstPaint = entries.find(entry => entry.name === 'first-paint');
    return firstPaint ? firstPaint.startTime : null;
  }

  getFirstContentfulPaint() {
    const entries = performance.getEntriesByType('paint');
    const fcp = entries.find(entry => entry.name === 'first-contentful-paint');
    return fcp ? fcp.startTime : null;
  }

  alertSlowPageLoad(loadTime) {
    logger.warn('Slow Page Load Alert', {
      type: 'performance_alert',
      metric: 'page_load_time',
      value: loadTime,
      threshold: this.thresholds.slowPageLoad
    });
  }

  alertHighErrorRate(errorRate) {
    logger.error('High Error Rate Alert', {
      type: 'error_rate_alert',
      errorRate,
      errorCount: this.metrics.errorCount,
      totalCalls: this.metrics.apiCallCount,
      threshold: this.thresholds.highErrorRate
    });
  }

  // Get current metrics
  getMetrics() {
    return {
      ...this.metrics,
      errorRate: this.metrics.errorCount / Math.max(this.metrics.apiCallCount, 1),
      memoryUsage: performance.memory ? {
        used: performance.memory.usedJSHeapSize,
        total: performance.memory.totalJSHeapSize,
        limit: performance.memory.jsHeapSizeLimit
      } : null,
      connection: navigator.connection ? {
        effectiveType: navigator.connection.effectiveType,
        downlink: navigator.connection.downlink,
        rtt: navigator.connection.rtt
      } : null
    };
  }

  // Send periodic health reports
  startHealthReporting(interval = 300000) { // 5 minutes
    setInterval(() => {
      this.sendHealthReport();
    }, interval);
  }

  async sendHealthReport() {
    const metrics = this.getMetrics();

    try {
      await fetch('/api/v1/monitoring/health', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          timestamp: new Date().toISOString(),
          metrics,
          userAgent: navigator.userAgent,
          url: window.location.href
        })
      });
    } catch (error) {
      console.error('Failed to send health report:', error);
    }
  }
}

// Create and export singleton instance
const monitoringService = new MonitoringService();

export default monitoringService;