import React, { useState, useEffect, useCallback } from 'react';
import {
  Container,
  Box,
  Typography,
  Tabs,
  Tab,
  Paper,
  Button,
  Chip,
  useTheme,
  alpha,
  CircularProgress
} from '@mui/material';
import { RefreshCw, Database, Shield, AlertTriangle } from 'lucide-react';
import { fetchStealerCredentials, fetchStealerStats } from '../../services/stealerIntelAPI';
import CombolistStats from './CombolistStats';
import FilterPanel from './FilterPanel';
import CredentialsTable from './CredentialsTable';
import CombolistCharts from './CombolistCharts';
import ErrorDisplay from '../Common/ErrorDisplay';
import { useAppTheme } from '../../hooks/useAppTheme';

const CombolistPage = () => {
  const theme = useTheme();
  const { isDarkMode } = useAppTheme(); // eslint-disable-line no-unused-vars

  const [activeTab, setActiveTab] = useState('overview');
  const [credentialData, setCredentialData] = useState({
    data: [],
    totalEntries: 0,
    returnedEntries: 0,
    message: '',
    passwordType: 'Unknown'
  });
  const [stats, setStats] = useState({
    totalCredentials: 0,
    totalDomains: 0,
    avgCredentialsPerDomain: 0,
    securityLevel: 'Unknown',
    lastUpdated: new Date().toISOString()
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [currentFilters, setCurrentFilters] = useState({
    domain: 'forticore.in',
    year: '2025',
    month: 'february',
    start: 1,
    max: 50
  });

  const fetchData = useCallback(async (filters = currentFilters) => {
    console.log('🚀 Fetching stealer data with filters:', filters);

    setLoading(true);
    setError(null);

    try {
      // Fetch credentials data
      const data = await fetchStealerCredentials(
        filters.year,
        filters.month,
        filters.domain,
        filters.start,
        filters.max
      );

      console.log('✅ Raw stealer API data:', data);

      if (!data) {
        throw new Error('No data received from stealer intelligence API');
      }

      const newCredentialState = {
        data: data.data || [],
        totalEntries: data.totalEntries || 0,
        returnedEntries: data.returnedEntries || 0,
        message: data.message || '',
        passwordType: data.passwordType || 'Mixed'
      };

      console.log('✅ Setting credential state to:', newCredentialState);
      setCredentialData(newCredentialState);

      // Fetch statistics
      const statsData = await fetchStealerStats(filters);
      console.log('✅ Stats data:', statsData);
      setStats(statsData);

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
    <Container maxWidth="xl" sx={{ py: 3 }}>
      {/* Header Section */}
      <Paper
        sx={{
          p: 4,
          mb: 4,
          background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.08)} 0%, ${alpha(theme.palette.primary.main, 0.03)} 100%)`,
          border: `2px solid ${theme.palette.divider}`,
          borderRadius: 3,
          position: 'relative',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '4px',
            background: `linear-gradient(90deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
            borderRadius: '3px 3px 0 0'
          }
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
          <Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
              <Database size={32} color={theme.palette.primary.main} />
              <Typography variant="h3" sx={{ fontWeight: 800, color: theme.palette.text.primary }}>
                Combolist
              </Typography>
            </Box>
            <Typography variant="h6" sx={{ color: theme.palette.text.secondary, mb: 1 }}>
              Advanced stealer malware credential analysis • {currentFilters.domain}
            </Typography>
            <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
              <Chip
                icon={<Shield size={16} />}
                label={`${credentialData.data?.length || 0} / ${credentialData.totalEntries || 0} Records`}
                sx={{
                  bgcolor: alpha(theme.palette.primary.main, 0.1),
                  color: theme.palette.primary.main,
                  fontWeight: 600,
                  border: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`
                }}
              />
              <Chip
                icon={<AlertTriangle size={16} />}
                label={stats.securityLevel}
                color={stats.securityLevel === 'High Risk' ? 'error' :
                       stats.securityLevel === 'Medium Risk' ? 'warning' : 'success'}
                sx={{ fontWeight: 600 }}
              />
            </Box>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            {loading ? (
              <Chip
                icon={<CircularProgress size={16} />}
                label="Loading..."
                sx={{
                  bgcolor: alpha(theme.palette.warning.main, 0.1),
                  color: theme.palette.warning.main,
                  fontWeight: 600,
                  border: `1px solid ${alpha(theme.palette.warning.main, 0.2)}`
                }}
              />
            ) : (
              <Chip
                label="● LIVE"
                sx={{
                  bgcolor: alpha(theme.palette.success.main, 0.1),
                  color: theme.palette.success.main,
                  fontWeight: 600,
                  border: `1px solid ${alpha(theme.palette.success.main, 0.2)}`
                }}
              />
            )}
            <Button
              onClick={() => {
                console.log('🔄 Manual refresh clicked');
                fetchData(currentFilters);
              }}
              disabled={loading}
              variant="contained"
              startIcon={<RefreshCw size={16} className={loading ? 'animate-spin' : ''} />}
              sx={{
                background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
                boxShadow: `0px 4px 12px ${alpha(theme.palette.primary.main, 0.3)}`,
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-2px)',
                  boxShadow: `0px 6px 20px ${alpha(theme.palette.primary.main, 0.4)}`
                }
              }}
            >
              Refresh
            </Button>
          </Box>
        </Box>
      </Paper>

      {/* Filter Panel */}
      <Box sx={{ mb: 4 }}>
        <FilterPanel onFilterChange={handleFilterChange} loading={loading} />
      </Box>

      {/* Error Display */}
      {error && (
        <Box sx={{ mb: 4 }}>
          <ErrorDisplay error={error} onRetry={() => fetchData(currentFilters)} />
        </Box>
      )}

      {/* Tabs */}
      <Paper
        sx={{
          mb: 4,
          borderRadius: 3,
          border: `1px solid ${theme.palette.divider}`
        }}
      >
        <Tabs
          value={activeTab}
          onChange={(event, newValue) => {
            console.log('Tab changed to:', newValue);
            setActiveTab(newValue);
          }}
          sx={{
            '& .MuiTab-root': {
              textTransform: 'none',
              fontWeight: 600,
              fontSize: '1rem',
              minHeight: 60
            },
            '& .MuiTabs-indicator': {
              height: 3,
              background: `linear-gradient(90deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`
            }
          }}
        >
          <Tab label="Overview" value="overview" />
          <Tab label="Credentials" value="credentials" />
          <Tab label="Analytics" value="analytics" />
        </Tabs>
      </Paper>

      {/* Tab Content */}
      {activeTab === 'overview' && (
        <Box>
          <CombolistStats credentialData={credentialData} stats={stats} />
          <CombolistCharts credentialData={credentialData} />
        </Box>
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
    </Container>
  );
};

export default CombolistPage;