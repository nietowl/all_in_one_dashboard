import React, { useState, useEffect } from 'react';
import { Search, Filter } from 'lucide-react';
import { fetchStealerLogs, fetchStealerStats } from '../../services/stealerLogsAPI';
import MetricCard from '../Common/MetricCard';
import { Database, HardDrive, Key, Users, AlertTriangle } from 'lucide-react';
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
      <div className="mb-6">
        <h2 className="text-4xl font-bold text-white mb-2">Stealer Logs</h2>
        <p className="text-slate-400">Analyze malware-extracted credentials and system information</p>
      </div>

      {/* Stats Cards */}
      {stats && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          <MetricCard
            icon={<Database className="w-6 h-6" />}
            title="Total Machines"
            value={stats.totalMachines?.toLocaleString() || '0'}
            color="purple"
          />
          <MetricCard
            icon={<Key className="w-6 h-6" />}
            title="Credentials"
            value={stats.totalCredentials?.toLocaleString() || '0'}
            color="blue"
          />
          <MetricCard
            icon={<Users className="w-6 h-6" />}
            title="Countries"
            value={stats.uniqueCountries || '0'}
            color="green"
          />
          <MetricCard
            icon={<AlertTriangle className="w-6 h-6" />}
            title="Weak Passwords"
            value={stats.weakPasswords?.toLocaleString() || '0'}
            color="red"
          />
        </div>
      )}

      {/* Search Bar */}
      <div className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-xl p-4 mb-6">
        <div className="flex items-center space-x-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              placeholder="Search by computer name, IP, country..."
              className="w-full pl-10 pr-4 py-3 bg-slate-900 border border-slate-700 rounded-lg text-white focus:border-blue-500 focus:outline-none"
            />
          </div>
          <button
            onClick={handleSearch}
            className="px-6 py-3 bg-blue-500 hover:bg-blue-600 rounded-lg flex items-center space-x-2 transition-colors"
          >
            <Filter className="w-4 h-4" />
            <span>Search</span>
          </button>
        </div>
      </div>

      {error && <ErrorDisplay error={error} onRetry={loadData} />}

      {/* Split Layout: Machine List + Preview */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100%-20rem)]">
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