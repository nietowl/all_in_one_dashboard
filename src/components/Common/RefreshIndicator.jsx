import React from 'react';
import { RefreshCw, Wifi, WifiOff } from 'lucide-react';

const RefreshIndicator = ({
  isRefreshing,
  lastUpdated,
  error,
  onRetry,
  className = "",
  variant = "compact" // compact, full, status
}) => {
  const getStatusColor = () => {
    if (error) return 'text-red-400';
    if (isRefreshing) return 'text-blue-400';
    return 'text-green-400';
  };

  const getStatusText = () => {
    if (error) return 'Connection Error';
    if (isRefreshing) return 'Updating...';
    return 'Live';
  };

  if (variant === 'status') {
    return (
      <div className={`flex items-center space-x-2 ${className}`}>
        <div className={`flex items-center space-x-1 ${getStatusColor()}`}>
          {error ? (
            <WifiOff className="h-4 w-4" />
          ) : isRefreshing ? (
            <RefreshCw className="h-4 w-4 animate-spin" />
          ) : (
            <Wifi className="h-4 w-4" />
          )}
          <span className="text-sm font-medium">{getStatusText()}</span>
        </div>
        {lastUpdated && !error && (
          <span className="text-xs text-gray-400">
            {lastUpdated.toLocaleTimeString()}
          </span>
        )}
        {error && onRetry && (
          <button
            onClick={onRetry}
            className="text-xs text-red-400 hover:text-red-300 underline"
          >
            Retry
          </button>
        )}
      </div>
    );
  }

  if (variant === 'full') {
    return (
      <div className={`p-3 rounded-lg border ${
        error ? 'bg-red-500/10 border-red-500/20' :
        isRefreshing ? 'bg-blue-500/10 border-blue-500/20' :
        'bg-green-500/10 border-green-500/20'
      } ${className}`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className={`flex items-center space-x-1 ${getStatusColor()}`}>
              {error ? (
                <WifiOff className="h-4 w-4" />
              ) : isRefreshing ? (
                <RefreshCw className="h-4 w-4 animate-spin" />
              ) : (
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              )}
              <span className="text-sm font-semibold">{getStatusText()}</span>
            </div>
            {lastUpdated && !error && (
              <span className="text-xs text-gray-400">
                Last updated: {lastUpdated.toLocaleTimeString()}
              </span>
            )}
          </div>
          {error && onRetry && (
            <button
              onClick={onRetry}
              className="px-3 py-1 text-xs bg-red-500 hover:bg-red-600 text-white rounded transition-colors"
            >
              Retry
            </button>
          )}
        </div>
        {error && (
          <p className="text-xs text-red-300 mt-1">
            {error.message || 'Failed to refresh data'}
          </p>
        )}
      </div>
    );
  }

  // compact variant (default)
  return (
    <div className={`flex items-center space-x-1 ${getStatusColor()} ${className}`}>
      {error ? (
        <WifiOff className="h-4 w-4" />
      ) : isRefreshing ? (
        <RefreshCw className="h-4 w-4 animate-spin" />
      ) : (
        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
      )}
      <span className="text-xs font-medium">{getStatusText()}</span>
    </div>
  );
};

export default RefreshIndicator;