import React, { useState, useEffect, useCallback } from 'react';
import { RefreshCw } from 'lucide-react';
import { fetchCredentials } from '../../services/combolistAPI';
import CombolistStats from './CombolistStats';
import FilterPanel from './FilterPanel';
import CredentialsTable from './CredentialsTable';
import CombolistCharts from './CombolistCharts';
import ErrorDisplay from '../Common/ErrorDisplay';

const CombolistPage = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [credentialData, setCredentialData] = useState({ 
    data: [], 
    totalEntries: 0,
    returnedEntries: 0,
    message: '',
    passwordType: 'Unknown'
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  const [currentFilters, setCurrentFilters] = useState({
    domain: 'dell.com',
    year: '2025',
    month: 'february',
    start: 1,
    max: 50
  });

  const fetchData = useCallback(async (filters = currentFilters) => {
    console.log('🚀 Fetching data with filters:', filters);
    
    setLoading(true);
    setError(null);
    
    try {
      const data = await fetchCredentials(
        filters.year,
        filters.month,
        filters.domain,
        filters.start,
        filters.max
      );
      
      console.log('✅ Raw API data:', data);
      console.log('✅ Data array:', data.data);
      console.log('✅ Data array length:', data.data?.length);
      
      if (!data) {
        throw new Error('No data received from API');
      }
      
      const newState = {
        data: data.data || [],
        totalEntries: data.totalEntries || 0,
        returnedEntries: data.returnedEntries || 0,
        message: data.message || '',
        passwordType: data.passwordType || 'Encrypted'
      };
      
      console.log('✅ Setting state to:', newState);
      setCredentialData(newState);
      
      console.log('✅ Data loaded successfully!');
    } catch (err) {
      console.error('❌ Fetch error:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [currentFilters]);

  // Load data when component mounts
  useEffect(() => {
    console.log('🔄 CombolistPage mounted');
    fetchData();
  }, [fetchData]);

  // Debug: Log when credentialData changes
  useEffect(() => {
    console.log('📊 credentialData updated:', credentialData);
    console.log('📊 Data entries:', credentialData.data?.length);
  }, [credentialData]);

  const handleFilterChange = (newFilters) => {
    console.log('🔄 Filters changed:', newFilters);
    setCurrentFilters(newFilters);
    fetchData(newFilters);
  };

  return (
    <div>
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-4xl font-bold text-white mb-2">Combolist Database</h2>
            <p className="text-slate-400">
              Search and analyze credential combinations • {currentFilters.domain}
            </p>
            {/* Debug Info */}
            <p className="text-xs text-slate-500 mt-1">
              Loaded: {credentialData.data?.length || 0} / {credentialData.totalEntries || 0} entries
            </p>
          </div>
          <div className="flex items-center space-x-4">
            {loading ? (
              <div className="px-4 py-2 bg-yellow-500/10 border border-yellow-500/20 rounded-lg flex items-center space-x-2">
                <RefreshCw className="w-4 h-4 animate-spin text-yellow-400" />
                <span className="text-yellow-400 text-sm font-semibold">Loading...</span>
              </div>
            ) : (
              <div className="px-4 py-2 bg-green-500/10 border border-green-500/20 rounded-lg">
                <span className="text-green-400 text-sm font-semibold">● LIVE</span>
              </div>
            )}
            <button
              onClick={() => {
                console.log('🔄 Manual refresh clicked');
                fetchData(currentFilters);
              }}
              disabled={loading}
              className="px-4 py-2 bg-blue-500 hover:bg-blue-600 disabled:bg-slate-600 rounded-lg flex items-center space-x-2 transition-colors"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
              <span>Refresh</span>
            </button>
          </div>
        </div>

        <FilterPanel onFilterChange={handleFilterChange} loading={loading} />
        
        {error && <ErrorDisplay error={error} onRetry={() => fetchData(currentFilters)} />}

        <div className="flex space-x-2 border-b border-slate-700 mb-6">
          {['overview', 'credentials', 'analytics'].map(tab => (
            <button
              key={tab}
              onClick={() => {
                console.log('Tab changed to:', tab);
                setActiveTab(tab);
              }}
              className={`px-6 py-3 font-medium capitalize transition-all ${
                activeTab === tab
                  ? 'text-blue-400 border-b-2 border-blue-400'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      {activeTab === 'overview' && (
        <div>
          <CombolistStats credentialData={credentialData} />
          <CombolistCharts credentialData={credentialData} />
        </div>
      )}

      {activeTab === 'credentials' && (
        <CredentialsTable
          credentialData={credentialData}
          currentFilters={currentFilters}
          setCurrentFilters={setCurrentFilters}
          fetchData={fetchData}
          loading={loading}
        />
      )}

      {activeTab === 'analytics' && (
        <CombolistCharts credentialData={credentialData} showDetailed />
      )}
    </div>
  );
};

export default CombolistPage;