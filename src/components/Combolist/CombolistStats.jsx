import React, { useMemo } from 'react';
import { Grid, Box, Alert, useTheme, alpha } from '@mui/material';
import { Database, Key, Globe, Users, Lock, Shield, AlertTriangle, TrendingUp } from 'lucide-react';
import MetricCard from '../Common/MetricCard';

const CombolistStats = ({ credentialData, stats }) => {
  const theme = useTheme();

  const calculatedStats = useMemo(() => {
    const totalCredentials = credentialData.totalEntries || 0;
    const displayedCredentials = credentialData.data?.length || 0;
    const uniqueHosts = [...new Set(credentialData.data?.map(c => c.host || c.domain) || [])].length;
    const uniqueUsers = [...new Set(credentialData.data?.map(c => c.username || c.user) || [])].length;

    return {
      totalCredentials,
      displayedCredentials,
      uniqueHosts,
      uniqueUsers,
      encryptionType: credentialData.passwordType || 'Mixed',
      securityLevel: stats?.securityLevel || 'Unknown',
      avgCredentials: stats?.avgCredentialsPerDomain || 0
    };
  }, [credentialData, stats]);

  return (
    <Box>
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} lg={2.4}>
          <MetricCard
            icon={<Database size={20} />}
            title="Total Credentials"
            value={calculatedStats.totalCredentials.toLocaleString()}
            color="blue"
            severity="critical"
            trend={
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                <TrendingUp size={12} />
                <span>+8.2%</span>
              </Box>
            }
          />
        </Grid>
        <Grid item xs={12} sm={6} lg={2.4}>
          <MetricCard
            icon={<Key size={20} />}
            title="Displayed Records"
            value={calculatedStats.displayedCredentials}
            color="purple"
            severity="high"
          />
        </Grid>
        <Grid item xs={12} sm={6} lg={2.4}>
          <MetricCard
            icon={<Globe size={20} />}
            title="Unique Domains"
            value={calculatedStats.uniqueHosts}
            color="green"
            severity="safe"
          />
        </Grid>
        <Grid item xs={12} sm={6} lg={2.4}>
          <MetricCard
            icon={<Users size={20} />}
            title="Unique Users"
            value={calculatedStats.uniqueUsers}
            color="orange"
            severity="medium"
          />
        </Grid>
        <Grid item xs={12} sm={6} lg={2.4}>
          <MetricCard
            icon={calculatedStats.securityLevel === 'High Risk' ? <AlertTriangle size={20} /> : <Shield size={20} />}
            title="Security Level"
            value={calculatedStats.securityLevel}
            color={calculatedStats.securityLevel === 'High Risk' ? 'red' :
                   calculatedStats.securityLevel === 'Medium Risk' ? 'orange' : 'green'}
            severity={calculatedStats.securityLevel === 'High Risk' ? 'critical' :
                     calculatedStats.securityLevel === 'Medium Risk' ? 'high' : 'safe'}
            subtitle="Threat Assessment"
          />
        </Grid>
      </Grid>

      {credentialData.message && (
        <Alert
          severity="info"
          sx={{
            mb: 3,
            bgcolor: alpha(theme.palette.info.main, 0.1),
            color: theme.palette.info.main,
            border: `1px solid ${alpha(theme.palette.info.main, 0.2)}`,
            borderRadius: 3,
            '& .MuiAlert-icon': {
              color: theme.palette.info.main
            }
          }}
        >
          {credentialData.message}
        </Alert>
      )}
    </Box>
  );
};

export default CombolistStats;