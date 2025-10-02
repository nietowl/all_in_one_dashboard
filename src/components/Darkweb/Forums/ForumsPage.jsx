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

      {/* Coming Soon Placeholder */}
      <div className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur border-2 border-blue-500/30 rounded-xl p-12 text-center shadow-lg shadow-blue-500/10">
        <MessageSquare className="w-20 h-20 text-blue-400 mx-auto mb-4 animate-pulse" />
        <h3 className="text-3xl font-bold text-white mb-3">🚀 Coming Soon</h3>
        <h4 className="text-xl font-semibold text-blue-400 mb-4">Darkweb Forums Intelligence</h4>
        <p className="text-slate-300 mb-2 max-w-md mx-auto">
          This feature will provide comprehensive monitoring of darkweb forums, including:
        </p>
        <ul className="text-slate-400 mb-6 max-w-md mx-auto text-left list-disc list-inside space-y-1">
          <li>Real-time forum post tracking</li>
          <li>Threat actor identification</li>
          <li>Data breach intelligence</li>
          <li>Marketplace monitoring</li>
        </ul>
        <div className="inline-block px-6 py-3 bg-blue-500/20 border border-blue-500/50 rounded-lg text-blue-300 font-semibold">
          Feature In Development
        </div>
      </div>
    </div>
  );
};

export default ForumsPage;