// Enhanced logging utility for production applications

class Logger {
  constructor() {
    this.isDevelopment = import.meta.env.MODE === 'development';
    this.apiEndpoint = '/api/v1/logs';
    this.buffer = [];
    this.bufferSize = 50;
    this.flushInterval = 30000; // 30 seconds

    // Start auto-flush in production
    if (!this.isDevelopment) {
      this.startAutoFlush();
    }
  }

  // Log levels
  static LEVELS = {
    ERROR: 'error',
    WARN: 'warn',
    INFO: 'info',
    DEBUG: 'debug'
  };

  formatMessage(level, message, meta = {}) {
    return {
      timestamp: new Date().toISOString(),
      level,
      message,
      meta: {
        ...meta,
        userAgent: navigator.userAgent,
        url: window.location.href,
        sessionId: this.getSessionId()
      }
    };
  }

  getSessionId() {
    let sessionId = sessionStorage.getItem('sessionId');
    if (!sessionId) {
      sessionId = Date.now().toString(36) + Math.random().toString(36).substr(2);
      sessionStorage.setItem('sessionId', sessionId);
    }
    return sessionId;
  }

  log(level, message, meta = {}) {
    const formattedMessage = this.formatMessage(level, message, meta);

    // Always log to console in development
    if (this.isDevelopment) {
      this.consoleLog(level, formattedMessage);
    }

    // Buffer logs for API sending in production
    if (!this.isDevelopment) {
      this.buffer.push(formattedMessage);

      // Flush immediately for errors
      if (level === Logger.LEVELS.ERROR) {
        this.flush();
      } else if (this.buffer.length >= this.bufferSize) {
        this.flush();
      }
    }
  }

  consoleLog(level, formattedMessage) {
    const style = this.getConsoleStyle(level);
    const timestamp = new Date(formattedMessage.timestamp).toLocaleTimeString();

    switch (level) {
      case Logger.LEVELS.ERROR:
        console.error(
          `%c[${timestamp}] ERROR:`,
          style,
          formattedMessage.message,
          formattedMessage.meta
        );
        break;
      case Logger.LEVELS.WARN:
        console.warn(
          `%c[${timestamp}] WARN:`,
          style,
          formattedMessage.message,
          formattedMessage.meta
        );
        break;
      case Logger.LEVELS.INFO:
        console.info(
          `%c[${timestamp}] INFO:`,
          style,
          formattedMessage.message,
          formattedMessage.meta
        );
        break;
      case Logger.LEVELS.DEBUG:
        console.debug(
          `%c[${timestamp}] DEBUG:`,
          style,
          formattedMessage.message,
          formattedMessage.meta
        );
        break;
      default:
        console.log(
          `%c[${timestamp}] LOG:`,
          style,
          formattedMessage.message,
          formattedMessage.meta
        );
    }
  }

  getConsoleStyle(level) {
    const styles = {
      [Logger.LEVELS.ERROR]: 'color: #ef4444; font-weight: bold;',
      [Logger.LEVELS.WARN]: 'color: #f59e0b; font-weight: bold;',
      [Logger.LEVELS.INFO]: 'color: #3b82f6; font-weight: bold;',
      [Logger.LEVELS.DEBUG]: 'color: #6b7280; font-weight: normal;'
    };
    return styles[level] || 'color: #374151;';
  }

  async flush() {
    if (this.buffer.length === 0) return;

    const logsToSend = [...this.buffer];
    this.buffer = [];

    try {
      await fetch(this.apiEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ logs: logsToSend })
      });
    } catch (error) {
      // Don't log flush errors to prevent infinite loops
      console.error('Failed to send logs to server:', error);
    }
  }

  startAutoFlush() {
    setInterval(() => {
      this.flush();
    }, this.flushInterval);

    // Flush on page unload
    window.addEventListener('beforeunload', () => {
      this.flush();
    });
  }

  // Convenience methods
  error(message, meta = {}) {
    this.log(Logger.LEVELS.ERROR, message, meta);
  }

  warn(message, meta = {}) {
    this.log(Logger.LEVELS.WARN, message, meta);
  }

  info(message, meta = {}) {
    this.log(Logger.LEVELS.INFO, message, meta);
  }

  debug(message, meta = {}) {
    this.log(Logger.LEVELS.DEBUG, message, meta);
  }

  // API-specific logging
  apiRequest(method, url, params = {}) {
    const methodStr = method ? method.toUpperCase() : 'UNKNOWN';
    this.info(`API Request: ${methodStr} ${url}`, {
      type: 'api_request',
      method,
      url,
      params
    });
  }

  apiResponse(method, url, status, duration) {
    const methodStr = method ? method.toUpperCase() : 'UNKNOWN';
    const level = status >= 400 ? Logger.LEVELS.ERROR : Logger.LEVELS.INFO;
    this.log(level, `API Response: ${methodStr} ${url} - ${status}`, {
      type: 'api_response',
      method,
      url,
      status,
      duration
    });
  }

  apiError(method, url, error) {
    const methodStr = method ? method.toUpperCase() : 'UNKNOWN';
    this.error(`API Error: ${methodStr} ${url}`, {
      type: 'api_error',
      method,
      url,
      error: error.message,
      stack: error.stack
    });
  }

  // User interaction logging
  userAction(action, details = {}) {
    this.info(`User Action: ${action}`, {
      type: 'user_action',
      action,
      ...details
    });
  }

  // Performance logging
  performance(label, duration, details = {}) {
    this.info(`Performance: ${label} took ${duration}ms`, {
      type: 'performance',
      label,
      duration,
      ...details
    });
  }

  // Security logging
  securityEvent(event, details = {}) {
    this.warn(`Security Event: ${event}`, {
      type: 'security',
      event,
      ...details
    });
  }
}

// Create and export singleton instance
const logger = new Logger();

export default logger;

// Export convenience functions
export const {
  error,
  warn,
  info,
  debug,
  apiRequest,
  apiResponse,
  apiError,
  userAction,
  performance,
  securityEvent
} = logger;