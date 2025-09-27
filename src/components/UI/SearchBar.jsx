import React, { useState } from 'react';
import { Search, Filter, X, Calendar, Globe, Database } from 'lucide-react';
import Button3D from './Button3D';
import GlassPanel from './GlassPanel';

const SearchBar = ({
  placeholder = 'Search threats, domains, credentials...',
  onSearch,
  onFilterChange,
  filters = {},
  className = ''
}) => {
  const [searchValue, setSearchValue] = useState('');
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [activeFilters, setActiveFilters] = useState(filters);

  const handleSearch = (e) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(searchValue, activeFilters);
    }
  };

  const handleFilterChange = (key, value) => {
    const newFilters = { ...activeFilters, [key]: value };
    setActiveFilters(newFilters);
    if (onFilterChange) {
      onFilterChange(newFilters);
    }
  };

  const clearFilter = (key) => {
    const newFilters = { ...activeFilters };
    delete newFilters[key];
    setActiveFilters(newFilters);
    if (onFilterChange) {
      onFilterChange(newFilters);
    }
  };

  const clearAllFilters = () => {
    setActiveFilters({});
    setSearchValue('');
    if (onFilterChange) {
      onFilterChange({});
    }
    if (onSearch) {
      onSearch('', {});
    }
  };

  const activeFilterCount = Object.keys(activeFilters).length;

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Main Search Bar */}
      <GlassPanel variant="cyberpunk" className="p-4">
        <form onSubmit={handleSearch} className="flex items-center space-x-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              placeholder={placeholder}
              className="w-full pl-10 pr-4 py-3 bg-gray-900/50 border border-gray-600/50 rounded-lg
                       text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500/50
                       focus:border-cyan-500/50 transition-all duration-200"
            />
            {searchValue && (
              <button
                type="button"
                onClick={() => setSearchValue('')}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>

          <Button3D variant="primary" type="submit" icon={Search}>
            Search
          </Button3D>

          <Button3D
            variant={showAdvanced ? "cyberpunk" : "ghost"}
            onClick={() => setShowAdvanced(!showAdvanced)}
            className="relative"
            icon={Filter}
          >
            Filters
            {activeFilterCount > 0 && (
              <span className="absolute -top-2 -right-2 w-5 h-5 bg-cyan-400 text-gray-900 text-xs rounded-full flex items-center justify-center font-bold">
                {activeFilterCount}
              </span>
            )}
          </Button3D>
        </form>
      </GlassPanel>

      {/* Advanced Filters */}
      {showAdvanced && (
        <GlassPanel variant="default" className="p-6 space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-white">Advanced Filters</h3>
            {activeFilterCount > 0 && (
              <Button3D variant="ghost" size="sm" onClick={clearAllFilters}>
                Clear All
              </Button3D>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Date Range Filter */}
            <div className="space-y-2">
              <label className="flex items-center space-x-2 text-sm font-medium text-gray-300">
                <Calendar className="h-4 w-4 text-cyan-400" />
                <span>Date Range</span>
              </label>
              <select
                value={activeFilters.dateRange || ''}
                onChange={(e) => handleFilterChange('dateRange', e.target.value)}
                className="w-full p-3 bg-gray-900/50 border border-gray-600/50 rounded-lg text-white
                         focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50"
              >
                <option value="">All Time</option>
                <option value="24h">Last 24 Hours</option>
                <option value="7d">Last 7 Days</option>
                <option value="30d">Last 30 Days</option>
                <option value="90d">Last 90 Days</option>
                <option value="custom">Custom Range</option>
              </select>
            </div>

            {/* Threat Level Filter */}
            <div className="space-y-2">
              <label className="flex items-center space-x-2 text-sm font-medium text-gray-300">
                <Database className="h-4 w-4 text-red-400" />
                <span>Threat Level</span>
              </label>
              <select
                value={activeFilters.threatLevel || ''}
                onChange={(e) => handleFilterChange('threatLevel', e.target.value)}
                className="w-full p-3 bg-gray-900/50 border border-gray-600/50 rounded-lg text-white
                         focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50"
              >
                <option value="">All Levels</option>
                <option value="critical">Critical</option>
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
                <option value="info">Informational</option>
              </select>
            </div>

            {/* Source Filter */}
            <div className="space-y-2">
              <label className="flex items-center space-x-2 text-sm font-medium text-gray-300">
                <Globe className="h-4 w-4 text-purple-400" />
                <span>Source</span>
              </label>
              <select
                value={activeFilters.source || ''}
                onChange={(e) => handleFilterChange('source', e.target.value)}
                className="w-full p-3 bg-gray-900/50 border border-gray-600/50 rounded-lg text-white
                         focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50"
              >
                <option value="">All Sources</option>
                <option value="darkweb">Dark Web</option>
                <option value="stealer">Info Stealers</option>
                <option value="forums">Forums</option>
                <option value="telegram">Telegram</option>
                <option value="paste_sites">Paste Sites</option>
                <option value="social_media">Social Media</option>
              </select>
            </div>

            {/* Domain Filter */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">Domain</label>
              <input
                type="text"
                value={activeFilters.domain || ''}
                onChange={(e) => handleFilterChange('domain', e.target.value)}
                placeholder="e.g., example.com"
                className="w-full p-3 bg-gray-900/50 border border-gray-600/50 rounded-lg text-white
                         placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500/50
                         focus:border-cyan-500/50"
              />
            </div>

            {/* Malware Family Filter */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">Malware Family</label>
              <select
                value={activeFilters.malwareFamily || ''}
                onChange={(e) => handleFilterChange('malwareFamily', e.target.value)}
                className="w-full p-3 bg-gray-900/50 border border-gray-600/50 rounded-lg text-white
                         focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50"
              >
                <option value="">All Families</option>
                <option value="redline">RedLine</option>
                <option value="raccoon">Raccoon</option>
                <option value="vidar">Vidar</option>
                <option value="azorult">AZORult</option>
                <option value="formbook">FormBook</option>
                <option value="amadey">Amadey</option>
                <option value="mars">Mars Stealer</option>
                <option value="lumma">Lumma</option>
              </select>
            </div>

            {/* Status Filter */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">Status</label>
              <select
                value={activeFilters.status || ''}
                onChange={(e) => handleFilterChange('status', e.target.value)}
                className="w-full p-3 bg-gray-900/50 border border-gray-600/50 rounded-lg text-white
                         focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50"
              >
                <option value="">All Status</option>
                <option value="new">New</option>
                <option value="investigating">Investigating</option>
                <option value="confirmed">Confirmed</option>
                <option value="resolved">Resolved</option>
                <option value="false_positive">False Positive</option>
              </select>
            </div>
          </div>

          {/* Active Filters Display */}
          {activeFilterCount > 0 && (
            <div className="pt-4 border-t border-gray-600/50">
              <div className="flex flex-wrap gap-2">
                {Object.entries(activeFilters).map(([key, value]) => (
                  value && (
                    <div key={key} className="flex items-center space-x-2 bg-cyan-500/20 text-cyan-300 px-3 py-1 rounded-full text-sm">
                      <span className="capitalize">{key.replace(/([A-Z])/g, ' $1')}: {value}</span>
                      <button
                        onClick={() => clearFilter(key)}
                        className="text-cyan-400 hover:text-white"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </div>
                  )
                ))}
              </div>
            </div>
          )}
        </GlassPanel>
      )}
    </div>
  );
};

export default SearchBar;