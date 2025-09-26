import React, { useState } from 'react';
import { Search, Filter, Calendar, Globe, RefreshCw } from 'lucide-react';

const FilterPanel = ({ onFilterChange, loading }) => {
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 5 }, (_, i) => currentYear - i);
  
  const months = [
    'january', 'february', 'march', 'april', 'may', 'june',
    'july', 'august', 'september', 'october', 'november', 'december'
  ];

const [filters, setFilters] = useState({
  domain: 'dell.com', // Changed from 'adani.com'
  year: currentYear.toString(),
  month: 'february',
  start: 1,
  max: 50
});

  const [customDomain, setCustomDomain] = useState('');
  const [showAdvanced, setShowAdvanced] = useState(false);

  const popularDomains = [
    'adani.com',
    'google.com',
    'microsoft.com',
    'amazon.com',
    'facebook.com',
    'apple.com',
    'netflix.com',
    'twitter.com'
  ];

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const handleSearch = () => {
    const domainToUse = customDomain || filters.domain;
    onFilterChange({ ...filters, domain: domainToUse });
  };

  const handleQuickDomain = (domain) => {
    setCustomDomain('');
    setFilters(prev => ({ ...prev, domain }));
    onFilterChange({ ...filters, domain });
  };

  return (
    <div className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-xl p-6 mb-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <Filter className="w-5 h-5 text-blue-400" />
          <h3 className="text-lg font-semibold text-white">Filters</h3>
        </div>
        <button
          onClick={() => setShowAdvanced(!showAdvanced)}
          className="text-sm text-slate-400 hover:text-white transition-colors"
        >
          {showAdvanced ? 'Hide Advanced' : 'Show Advanced'}
        </button>
      </div>

      <div className="mb-4">
        <label className="text-slate-400 text-sm mb-2 block">Quick Domain Select</label>
        <div className="flex flex-wrap gap-2">
          {popularDomains.map(domain => (
            <button
              key={domain}
              onClick={() => handleQuickDomain(domain)}
              className={`px-3 py-1 rounded-lg text-sm transition-colors ${
                filters.domain === domain
                  ? 'bg-blue-500 text-white'
                  : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
              }`}
            >
              {domain}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
        <div>
          <label className="text-slate-400 text-sm mb-2 block flex items-center">
            <Globe className="w-4 h-4 mr-1" />
            Custom Domain
          </label>
          <input
            type="text"
            value={customDomain}
            onChange={(e) => setCustomDomain(e.target.value)}
            placeholder="Enter domain..."
            className="w-full px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white focus:border-blue-500 focus:outline-none"
          />
        </div>

        <div>
          <label className="text-slate-400 text-sm mb-2 block flex items-center">
            <Calendar className="w-4 h-4 mr-1" />
            Year
          </label>
          <select
            value={filters.year}
            onChange={(e) => handleFilterChange('year', e.target.value)}
            className="w-full px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white focus:border-blue-500 focus:outline-none"
          >
            {years.map(year => (
              <option key={year} value={year}>{year}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="text-slate-400 text-sm mb-2 block flex items-center">
            <Calendar className="w-4 h-4 mr-1" />
            Month
          </label>
          <select
            value={filters.month}
            onChange={(e) => handleFilterChange('month', e.target.value)}
            className="w-full px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white focus:border-blue-500 focus:outline-none capitalize"
          >
            {months.map(month => (
              <option key={month} value={month} className="capitalize">{month}</option>
            ))}
          </select>
        </div>

        <div className="flex items-end">
          <button
            onClick={handleSearch}
            disabled={loading}
            className="w-full px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 disabled:from-slate-600 disabled:to-slate-600 rounded-lg flex items-center justify-center space-x-2 transition-colors font-semibold"
          >
            {loading ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                <span>Loading...</span>
              </>
            ) : (
              <>
                <Search className="w-4 h-4" />
                <span>Search</span>
              </>
            )}
          </button>
        </div>
      </div>

      {showAdvanced && (
        <div className="border-t border-slate-700 pt-4">
          <h4 className="text-sm font-semibold text-slate-300 mb-3">Advanced Options</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="text-slate-400 text-sm mb-2 block">Start Index</label>
              <input
                type="number"
                value={filters.start}
                onChange={(e) => handleFilterChange('start', parseInt(e.target.value) || 1)}
                min="1"
                className="w-full px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white focus:border-blue-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="text-slate-400 text-sm mb-2 block">Max Results</label>
              <select
                value={filters.max}
                onChange={(e) => handleFilterChange('max', parseInt(e.target.value))}
                className="w-full px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white focus:border-blue-500 focus:outline-none"
              >
                <option value={10}>10</option>
                <option value={25}>25</option>
                <option value={50}>50</option>
                <option value={100}>100</option>
                <option value={200}>200</option>
              </select>
            </div>

            <div>
              <label className="text-slate-400 text-sm mb-2 block">Active Domain</label>
              <div className="px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-green-400 font-mono text-sm">
                {customDomain || filters.domain}
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="mt-4 p-3 bg-slate-900/50 rounded-lg border border-slate-700">
        <p className="text-xs text-slate-400">
          <span className="font-semibold text-slate-300">Query:</span>{' '}
          {customDomain || filters.domain} • {filters.month} {filters.year} • 
          Showing {filters.start} to {filters.start + filters.max - 1}
        </p>
      </div>
    </div>
  );
};

export default FilterPanel;