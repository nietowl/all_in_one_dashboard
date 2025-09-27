import React from 'react';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
      errorId: null
    };
  }

  static getDerivedStateFromError() {
    // Update state so the next render will show the fallback UI
    return {
      hasError: true,
      errorId: Date.now().toString(36) + Math.random().toString(36).substr(2)
    };
  }

  componentDidCatch(error, errorInfo) {
    // Log error details
    console.error('ErrorBoundary caught an error:', error, errorInfo);

    this.setState({
      error,
      errorInfo
    });

    // Log to external service in production
    if (import.meta.env.MODE === 'production') {
      this.logErrorToService(error, errorInfo);
    }
  }

  logErrorToService = (error, errorInfo) => {
    // In a real app, you would send this to an error reporting service
    // like Sentry, LogRocket, or your own logging endpoint
    const errorData = {
      message: error.message,
      stack: error.stack,
      componentStack: errorInfo.componentStack,
      errorId: this.state.errorId,
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent,
      url: window.location.href
    };

    // Example API call (replace with your actual error reporting service)
    fetch('/api/v1/errors', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(errorData)
    }).catch(err => {
      console.error('Failed to log error to service:', err);
    });
  };

  handleRetry = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
      errorId: null
    });
  };

  handleGoHome = () => {
    window.location.href = '/dashboard';
  };

  render() {
    if (this.state.hasError) {
      // Custom error UI
      return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
          <div className="max-w-md w-full">
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 text-center">
              {/* Error Icon */}
              <div className="mx-auto h-16 w-16 bg-red-500/20 rounded-full flex items-center justify-center mb-6">
                <AlertTriangle className="h-8 w-8 text-red-400" />
              </div>

              {/* Error Message */}
              <h1 className="text-2xl font-bold text-white mb-4">
                Something went wrong
              </h1>
              <p className="text-gray-300 mb-6">
                We encountered an unexpected error. Our team has been notified and is working on a fix.
              </p>

              {/* Error Details (only in development) */}
              {import.meta.env.MODE === 'development' && this.state.error && (
                <div className="mb-6 p-4 bg-red-900/20 border border-red-500/30 rounded-lg text-left">
                  <h3 className="text-sm font-semibold text-red-400 mb-2">Error Details:</h3>
                  <pre className="text-xs text-red-300 overflow-auto max-h-32">
                    {this.state.error.toString()}
                  </pre>
                  {this.state.errorInfo && (
                    <details className="mt-2">
                      <summary className="text-xs text-red-400 cursor-pointer">Component Stack</summary>
                      <pre className="text-xs text-red-300 mt-1 overflow-auto max-h-32">
                        {this.state.errorInfo.componentStack}
                      </pre>
                    </details>
                  )}
                </div>
              )}

              {/* Error ID */}
              {this.state.errorId && (
                <p className="text-xs text-gray-500 mb-6">
                  Error ID: {this.state.errorId}
                </p>
              )}

              {/* Action Buttons */}
              <div className="space-y-3">
                <button
                  onClick={this.handleRetry}
                  className="w-full flex items-center justify-center space-x-2 px-4 py-3
                           bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-lg
                           transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  <RefreshCw className="h-4 w-4" />
                  <span>Try Again</span>
                </button>

                <button
                  onClick={this.handleGoHome}
                  className="w-full flex items-center justify-center space-x-2 px-4 py-3
                           bg-white/10 hover:bg-white/20 text-white font-medium rounded-lg
                           border border-white/20 transition-colors focus:outline-none focus:ring-2 focus:ring-white/50"
                >
                  <Home className="h-4 w-4" />
                  <span>Go to Dashboard</span>
                </button>
              </div>

              {/* Help Text */}
              <p className="text-xs text-gray-500 mt-6">
                If the problem persists, please contact support with the error ID above.
              </p>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;