import React from 'react';
import { AlertTriangle } from 'lucide-react';

const ErrorDisplay = ({ error, onRetry }) => {
  return (
    <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4 mb-4 flex items-center space-x-3">
      <AlertTriangle className="w-5 h-5 text-red-400" />
      <div>
        <p className="text-red-400 font-semibold">Error loading data</p>
        <p className="text-red-300 text-sm">{error}</p>
        {onRetry && (
          <button
            onClick={onRetry}
            className="mt-2 text-sm text-red-400 hover:text-red-300 underline"
          >
            Retry
          </button>
        )}
      </div>
    </div>
  );
};

export default ErrorDisplay;