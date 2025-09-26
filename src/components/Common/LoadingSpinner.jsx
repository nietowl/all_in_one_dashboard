import React from 'react';
import { RefreshCw } from 'lucide-react';

const LoadingSpinner = ({ message = 'Loading...' }) => {
  return (
    <div className="p-20 text-center">
      <RefreshCw className="w-12 h-12 animate-spin text-blue-400 mx-auto mb-4" />
      <p className="text-slate-400">{message}</p>
    </div>
  );
};

export default LoadingSpinner;