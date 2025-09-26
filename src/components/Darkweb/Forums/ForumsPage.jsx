import React, { useState } from 'react';
import { MessageSquare, Search, Filter } from 'lucide-react';

const ForumsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div>
      <div className="mb-6">
        <h3 className="text-2xl font-bold text-white mb-2">Darkweb Forums</h3>
        <p className="text-slate-400">Monitor discussions and threats from darkweb forums</p>
      </div>

      {/* Search Bar */}
      <div className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-xl p-4 mb-6">
        <div className="flex items-center space-x-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search forums, topics, users..."
              className="w-full pl-10 pr-4 py-3 bg-slate-900 border border-slate-700 rounded-lg text-white focus:border-blue-500 focus:outline-none"
            />
          </div>
          <button className="px-6 py-3 bg-blue-500 hover:bg-blue-600 rounded-lg flex items-center space-x-2 transition-colors">
            <Filter className="w-4 h-4" />
            <span>Filters</span>
          </button>
        </div>
      </div>

      {/* Placeholder */}
      <div className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-xl p-12 text-center">
        <MessageSquare className="w-20 h-20 text-slate-600 mx-auto mb-4" />
        <h3 className="text-2xl font-semibold text-slate-300 mb-3">Forums Module</h3>
        <p className="text-slate-400 mb-6 max-w-md mx-auto">
          This module will display darkweb forum posts, discussions, and threat intelligence.
          Configure your API endpoint to enable this feature.
        </p>
        <div className="flex items-center justify-center space-x-4">
          <button className="px-6 py-3 bg-blue-500 hover:bg-blue-600 rounded-lg font-semibold transition-colors">
            Configure API
          </button>
          <button className="px-6 py-3 bg-slate-700 hover:bg-slate-600 rounded-lg font-semibold transition-colors">
            View Documentation
          </button>
        </div>
      </div>
    </div>
  );
};

export default ForumsPage;