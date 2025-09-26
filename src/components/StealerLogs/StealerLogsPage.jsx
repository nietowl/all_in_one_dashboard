import React, { useState, useEffect } from 'react';
import { Search, Filter, Database, Key, Users, AlertTriangle, Monitor, Globe, Cpu } from 'lucide-react';
import { fetchStealerLogs, fetchStealerStats } from '../../services/stealerLogsAPI';
import MachineList from './MachineList';
import MachinePreview from './MachinePreview';
import ErrorDisplay from '../Common/ErrorDisplay';

const StealerLogsPage = () => {
  const [machines, setMachines] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedMachine, setSelectedMachine] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    country: 'all',
    start: 0,
    max: 50
  });

  useEffect(() => {
    loadData();
    loadStats();
  }, []);

  const loadData = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const data = await fetchStealerLogs({ ...filters, search: searchTerm });
      setMachines(data.data || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const loadStats = async () => {
    try {
      const statsData = await fetchStealerStats();
      setStats(statsData);
    } catch (err) {
      console.error('Error loading stats:', err);
    }
  };

  const handleSearch = () => {
    loadData();
  };

  return (
    <div className="h-[calc(100vh-8rem)]">
      {/* Compact Header */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h2 className="text-2xl font-bold text-white">Stealer Logs</h2>
            <p className="text-sm text-slate-400">Analyze compromised machines and credentials</p>
          </div>
          
          {/* Compact Stats - Inline */}
          {stats && (
            <div className="flex items-center gap-3">
              <div className="flex items-center space-x-2 bg-slate-800/50 border border-slate-700 rounded-lg px-3 py-2">
                <Database className="w-4 h-4 text-purple-400" />
                <div>
                  <div className="text-xs text-slate-400">Machines</div>
                  <div className="text-sm font-bold text-white">{stats.totalMachines?.toLocaleString() || '0'}</div>
                </div>
              </div>
              <div className="flex items-center space-x-2 bg-slate-800/50 border border-slate-700 rounded-lg px-3 py-2">
                <Key className="w-4 h-4 text-blue-400" />
                <div>
                  <div className="text-xs text-slate-400">Credentials</div>
                  <div className="text-sm font-bold text-white">{stats.totalCredentials?.toLocaleString() || '0'}</div>
                </div>
              </div>
              <div className="flex items-center space-x-2 bg-slate-800/50 border border-slate-700 rounded-lg px-3 py-2">
                <Globe className="w-4 h-4 text-green-400" />
                <div>
                  <div className="text-xs text-slate-400">Countries</div>
                  <div className="text-sm font-bold text-white">{stats.uniqueCountries || '0'}</div>
                </div>
              </div>
              <div className="flex items-center space-x-2 bg-slate-800/50 border border-slate-700 rounded-lg px-3 py-2">
                <AlertTriangle className="w-4 h-4 text-red-400" />
                <div>
                  <div className="text-xs text-slate-400">Weak</div>
                  <div className="text-sm font-bold text-white">{stats.weakPasswords?.toLocaleString() || '0'}</div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Compact Search Bar */}
        <div className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-lg p-3">
          <div className="flex items-center space-x-3">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                placeholder="Search by computer name, IP, country..."
                className="w-full pl-9 pr-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-sm text-white focus:border-blue-500 focus:outline-none"
              />
            </div>
            <button
              onClick={handleSearch}
              className="px-4 py-2 bg-blue-500 hover:bg-blue-600 rounded-lg flex items-center space-x-2 transition-colors text-sm"
            >
              <Filter className="w-4 h-4" />
              <span>Search</span>
            </button>
          </div>
        </div>
      </div>

      {error && <ErrorDisplay error={error} onRetry={loadData} />}

      {/* Main Content Area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 h-[calc(100%-12rem)]">
        {/* Machine Cards */}
        <div className={`${selectedMachine ? 'lg:col-span-2' : 'lg:col-span-3'} overflow-y-auto pr-2`}>
          <MachineList
            machines={machines}
            loading={loading}
            selectedMachine={selectedMachine}
            onSelectMachine={setSelectedMachine}
          />
        </div>

        {/* Preview Panel */}
        {selectedMachine && (
          <div className="lg:col-span-1 hidden lg:block">
            <div className="sticky top-0 h-[calc(100vh-20rem)]">
              <MachinePreview
                machine={selectedMachine}
                onClose={() => setSelectedMachine(null)}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StealerLogsPage;