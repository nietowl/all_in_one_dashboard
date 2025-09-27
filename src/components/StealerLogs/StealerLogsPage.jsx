import React, { useState, useEffect, useCallback } from 'react';
import {
  Search, Filter, Database, Key, Users, AlertTriangle, Monitor, Globe, Cpu,
  Download, Eye, Shield, Lock, Calendar, MapPin, HardDrive, Wifi,
  TrendingUp, BarChart3, PieChart, RefreshCw, Settings, ChevronDown
} from 'lucide-react';
import { fetchStealerLogs, fetchStealerStats } from '../../services/stealerLogsAPI';
import Card3D from '../UI/Card3D';
import Button3D from '../UI/Button3D';
import GlassPanel from '../UI/GlassPanel';
import SearchBar from '../UI/SearchBar';
import MachineList from './MachineList';
import MachinePreview from './MachinePreview';
import ErrorDisplay from '../Common/ErrorDisplay';

const StealerLogsPage = () => {
  const [machines, setMachines] = useState([]);
  const [stats, setStats] = useState({
    totalMachines: 847291,
    totalCredentials: 2341582,
    uniqueCountries: 195,
    weakPasswords: 156783,
    latestInfection: new Date(),
    topMalware: 'RedLine Stealer',
    riskLevel: 'High'
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedMachine, setSelectedMachine] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState('grid'); // grid, table, map
  const [sortBy, setSortBy] = useState('date');
  const [filters, setFilters] = useState({
    country: '',
    malwareFamily: '',
    dateRange: '7d',
    riskLevel: '',
    hasCredentials: false,
    start: 0,
    max: 50
  });

  // Mock data for demo
  const mockMachines = [
    {
      id: 1,
      computerName: 'DESKTOP-A47K2L9',
      ip: '192.168.1.105',
      country: 'United States',
      countryCode: 'US',
      city: 'New York',
      malwareFamily: 'RedLine',
      infectionDate: new Date(Date.now() - 2 * 60 * 60 * 1000),
      credentialsCount: 47,
      browsersCount: 5,
      systemInfo: 'Windows 11 Pro',
      riskLevel: 'Critical',
      status: 'Active'
    },
    {
      id: 2,
      computerName: 'LAPTOP-X1Y2Z3',
      ip: '10.0.0.24',
      country: 'Germany',
      countryCode: 'DE',
      city: 'Berlin',
      malwareFamily: 'Vidar',
      infectionDate: new Date(Date.now() - 5 * 60 * 60 * 1000),
      credentialsCount: 23,
      browsersCount: 3,
      systemInfo: 'Windows 10 Home',
      riskLevel: 'High',
      status: 'Active'
    },
    {
      id: 3,
      computerName: 'WORKSTATION-DEV',
      ip: '172.16.0.50',
      country: 'United Kingdom',
      countryCode: 'GB',
      city: 'London',
      malwareFamily: 'Raccoon',
      infectionDate: new Date(Date.now() - 24 * 60 * 60 * 1000),
      credentialsCount: 89,
      browsersCount: 7,
      systemInfo: 'Windows 11 Enterprise',
      riskLevel: 'Critical',
      status: 'Resolved'
    }
  ];

  const loadData = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      setMachines(mockMachines);
    } catch (err) {
      setError('Failed to load stealer logs data');
      console.error('Error loading stealer logs:', err);
    } finally {
      setLoading(false);
    }
  }, [searchTerm, filters]);

  const loadStats = async () => {
    try {
      const statsData = await fetchStealerStats();
      setStats(prev => ({ ...prev, ...statsData }));
    } catch (err) {
      console.error('Error loading stats:', err);
    }
  };

  useEffect(() => {
    loadData();
    loadStats();
  }, [loadData]);

  const handleSearch = (query, searchFilters) => {
    setSearchTerm(query);
    setFilters(prev => ({ ...prev, ...searchFilters }));
    loadData();
  };

  const handleFilterChange = (newFilters) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <GlassPanel variant="cyberpunk" className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-red-400 via-orange-400 to-yellow-400 bg-clip-text text-transparent">
              Stealer Intelligence
            </h1>
            <p className="text-lg text-gray-300 mt-2">Advanced malware analysis & credential monitoring</p>
            <div className="flex items-center space-x-4 mt-3">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-red-400 rounded-full animate-pulse"></div>
                <span className="text-sm text-gray-400">Live Monitoring Active</span>
              </div>
              <div className="text-sm text-gray-400">
                Last Scan: {new Date().toLocaleTimeString()}
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <Button3D variant="success" icon={Download}>
              Export Data
            </Button3D>
            <Button3D variant="primary" icon={RefreshCw} onClick={loadData}>
              Refresh
            </Button3D>
          </div>
        </div>
      </GlassPanel>

      {/* Statistics Dashboard */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card3D variant="threat" className="p-6" hover glow>
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 rounded-lg bg-gradient-to-br from-red-500 to-orange-500 shadow-lg">
              <Database className="h-6 w-6 text-white" />
            </div>
            <div className="flex items-center space-x-1 text-red-400">
              <TrendingUp className="h-4 w-4" />
              <span className="text-sm font-semibold">+5.2%</span>
            </div>
          </div>
          <div>
            <h3 className="text-2xl font-bold text-white mb-1">{stats.totalMachines?.toLocaleString()}</h3>
            <p className="text-gray-400 text-sm">Infected Machines</p>
          </div>
        </Card3D>

        <Card3D variant="cyberpunk" className="p-6" hover glow>
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 shadow-lg">
              <Key className="h-6 w-6 text-white" />
            </div>
            <div className="flex items-center space-x-1 text-red-400">
              <TrendingUp className="h-4 w-4" />
              <span className="text-sm font-semibold">+12.8%</span>
            </div>
          </div>
          <div>
            <h3 className="text-2xl font-bold text-white mb-1">{stats.totalCredentials?.toLocaleString()}</h3>
            <p className="text-gray-400 text-sm">Stolen Credentials</p>
          </div>
        </Card3D>

        <Card3D variant="neon" className="p-6" hover glow>
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-500 shadow-lg">
              <Globe className="h-6 w-6 text-white" />
            </div>
            <div className="flex items-center space-x-1 text-green-400">
              <span className="text-sm font-semibold">{stats.uniqueCountries}</span>
            </div>
          </div>
          <div>
            <h3 className="text-2xl font-bold text-white mb-1">Global</h3>
            <p className="text-gray-400 text-sm">Countries Affected</p>
          </div>
        </Card3D>

        <Card3D variant="glass" className="p-6" hover glow>
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 rounded-lg bg-gradient-to-br from-yellow-500 to-orange-500 shadow-lg">
              <AlertTriangle className="h-6 w-6 text-white" />
            </div>
            <div className="flex items-center space-x-1 text-yellow-400">
              <span className="text-sm font-semibold">Critical</span>
            </div>
          </div>
          <div>
            <h3 className="text-2xl font-bold text-white mb-1">{stats.weakPasswords?.toLocaleString()}</h3>
            <p className="text-gray-400 text-sm">Weak Passwords</p>
          </div>
        </Card3D>
      </div>

      {/* Advanced Search & Filters */}
      <SearchBar
        placeholder="Search infected machines, IPs, malware families, credentials..."
        onSearch={handleSearch}
        onFilterChange={handleFilterChange}
        filters={{
          dateRange: { label: 'Infection Date', options: ['24h', '7d', '30d', '90d'] },
          malwareFamily: { label: 'Malware Family', options: ['RedLine', 'Vidar', 'Raccoon', 'AZORult', 'Mars'] },
          country: { label: 'Country', options: ['US', 'DE', 'GB', 'RU', 'CN'] },
          riskLevel: { label: 'Risk Level', options: ['Critical', 'High', 'Medium', 'Low'] }
        }}
      />

      {/* View Controls */}
      <GlassPanel variant="default" className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <span className="text-sm font-medium text-gray-300">View:</span>
              <div className="flex rounded-lg bg-gray-800 p-1">
                {['grid', 'table', 'map'].map((mode) => (
                  <button
                    key={mode}
                    onClick={() => setViewMode(mode)}
                    className={`px-3 py-1 rounded-md text-xs font-medium transition-all ${
                      viewMode === mode
                        ? 'bg-cyan-500 text-white'
                        : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    {mode.charAt(0).toUpperCase() + mode.slice(1)}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-sm font-medium text-gray-300">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-gray-800 border border-gray-600 text-white text-sm rounded-lg px-3 py-1 focus:ring-cyan-500 focus:border-cyan-500"
              >
                <option value="date">Infection Date</option>
                <option value="risk">Risk Level</option>
                <option value="credentials">Credential Count</option>
                <option value="country">Country</option>
                <option value="malware">Malware Family</option>
              </select>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <span className="text-sm text-gray-400">
              Showing {machines.length} of {stats.totalMachines?.toLocaleString()} machines
            </span>
            <Button3D variant="ghost" size="sm" icon={Settings}>
              Settings
            </Button3D>
          </div>
        </div>
      </GlassPanel>

      {error && <ErrorDisplay error={error} onRetry={loadData} />}

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Machine List */}
        <div className={`${selectedMachine ? 'lg:col-span-3' : 'lg:col-span-4'}`}>
          <Card3D variant="glass" className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-white">Infected Machines</h3>
              <div className="flex items-center space-x-2">
                <div className="flex items-center space-x-1">
                  <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                  <span className="text-xs text-gray-400">Critical</span>
                </div>
                <div className="flex items-center space-x-1">
                  <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                  <span className="text-xs text-gray-400">High</span>
                </div>
                <div className="flex items-center space-x-1">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                  <span className="text-xs text-gray-400">Medium</span>
                </div>
              </div>
            </div>

            {/* Modern Machine Cards */}
            <div className="space-y-4 max-h-[600px] overflow-y-auto custom-scrollbar">
              {loading ? (
                <div className="flex items-center justify-center h-32">
                  <div className="flex items-center space-x-2">
                    <RefreshCw className="h-5 w-5 animate-spin text-cyan-400" />
                    <span className="text-gray-400">Loading machine data...</span>
                  </div>
                </div>
              ) : (
                machines.map((machine) => (
                  <GlassPanel
                    key={machine.id}
                    variant={selectedMachine?.id === machine.id ? "neon" : "default"}
                    className={`p-4 cursor-pointer transition-all duration-300 ${
                      selectedMachine?.id === machine.id ? 'scale-[1.02]' : 'hover:scale-[1.01]'
                    }`}
                    onClick={() => setSelectedMachine(machine)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className={`p-3 rounded-lg ${
                          machine.riskLevel === 'Critical' ? 'bg-red-500/20 text-red-400' :
                          machine.riskLevel === 'High' ? 'bg-orange-500/20 text-orange-400' :
                          'bg-yellow-500/20 text-yellow-400'
                        }`}>
                          <Monitor className="h-6 w-6" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-white">{machine.computerName}</h4>
                          <div className="flex items-center space-x-3 mt-1">
                            <div className="flex items-center space-x-1">
                              <Wifi className="h-3 w-3 text-gray-400" />
                              <span className="text-xs text-gray-400">{machine.ip}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <MapPin className="h-3 w-3 text-gray-400" />
                              <span className="text-xs text-gray-400">{machine.city}, {machine.countryCode}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center space-x-2 mb-2">
                          <span className={`px-2 py-1 text-xs rounded-full ${
                            machine.riskLevel === 'Critical' ? 'bg-red-500/20 text-red-300' :
                            machine.riskLevel === 'High' ? 'bg-orange-500/20 text-orange-300' :
                            'bg-yellow-500/20 text-yellow-300'
                          }`}>
                            {machine.riskLevel}
                          </span>
                          <span className="px-2 py-1 text-xs bg-purple-500/20 text-purple-300 rounded-full">
                            {machine.malwareFamily}
                          </span>
                        </div>
                        <div className="flex items-center justify-end space-x-3 text-xs text-gray-400">
                          <div className="flex items-center space-x-1">
                            <Key className="h-3 w-3" />
                            <span>{machine.credentialsCount}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <HardDrive className="h-3 w-3" />
                            <span>{machine.browsersCount}</span>
                          </div>
                          <span>{machine.infectionDate.toLocaleTimeString()}</span>
                        </div>
                      </div>
                    </div>
                  </GlassPanel>
                ))
              )}
            </div>
          </Card3D>
        </div>

        {/* Machine Details Panel */}
        {selectedMachine && (
          <div className="lg:col-span-1">
            <Card3D variant="cyberpunk" className="p-6 sticky top-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-white">Machine Details</h3>
                <Button3D
                  variant="ghost"
                  size="sm"
                  onClick={() => setSelectedMachine(null)}
                >
                  ×
                </Button3D>
              </div>

              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-cyan-300 mb-2">{selectedMachine.computerName}</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-400">IP Address:</span>
                      <span className="text-white">{selectedMachine.ip}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Location:</span>
                      <span className="text-white">{selectedMachine.city}, {selectedMachine.country}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Malware:</span>
                      <span className="text-purple-300">{selectedMachine.malwareFamily}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">System:</span>
                      <span className="text-white">{selectedMachine.systemInfo}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Risk Level:</span>
                      <span className={`font-medium ${
                        selectedMachine.riskLevel === 'Critical' ? 'text-red-400' :
                        selectedMachine.riskLevel === 'High' ? 'text-orange-400' :
                        'text-yellow-400'
                      }`}>
                        {selectedMachine.riskLevel}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="border-t border-gray-600 pt-4">
                  <h5 className="font-medium text-white mb-3">Stolen Data</h5>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-gray-800/50 rounded-lg p-3 text-center">
                      <Key className="h-5 w-5 text-cyan-400 mx-auto mb-1" />
                      <div className="text-lg font-bold text-white">{selectedMachine.credentialsCount}</div>
                      <div className="text-xs text-gray-400">Credentials</div>
                    </div>
                    <div className="bg-gray-800/50 rounded-lg p-3 text-center">
                      <HardDrive className="h-5 w-5 text-purple-400 mx-auto mb-1" />
                      <div className="text-lg font-bold text-white">{selectedMachine.browsersCount}</div>
                      <div className="text-xs text-gray-400">Browsers</div>
                    </div>
                  </div>
                </div>

                <div className="border-t border-gray-600 pt-4">
                  <div className="flex items-center justify-between mb-3">
                    <h5 className="font-medium text-white">Actions</h5>
                  </div>
                  <div className="space-y-2">
                    <Button3D variant="primary" size="sm" className="w-full" icon={Eye}>
                      View Details
                    </Button3D>
                    <Button3D variant="success" size="sm" className="w-full" icon={Download}>
                      Export Data
                    </Button3D>
                    <Button3D variant="warning" size="sm" className="w-full" icon={Shield}>
                      Add to Watchlist
                    </Button3D>
                  </div>
                </div>
              </div>
            </Card3D>
          </div>
        )}
      </div>
    </div>
  );
};

export default StealerLogsPage;