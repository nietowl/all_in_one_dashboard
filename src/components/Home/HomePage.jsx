import React from 'react';
import { useSelector } from 'react-redux';
import {
  Container,
  Grid,
  Typography,
  Box,
  Paper,
  Button,
  useTheme,
  alpha,
  Chip
} from '@mui/material';
import {
  Shield, AlertTriangle, Database, Globe, TrendingUp, TrendingDown,
  ArrowRight
} from 'lucide-react';
import { useAppTheme } from '../../hooks/useAppTheme';

const HomePage = () => {
  const { user } = useSelector(state => state.auth);
  const theme = useTheme();
  const { isDarkMode } = useAppTheme(); // eslint-disable-line no-unused-vars

  const threatStats = [
    {
      title: 'Active Threats',
      value: '247',
      change: '+12%',
      trend: 'up',
      icon: AlertTriangle,
      color: theme.palette.error.main
    },
    {
      title: 'Assets Monitored',
      value: '15.2k',
      change: '+3%',
      trend: 'up',
      icon: Shield,
      color: theme.palette.primary.main
    },
    {
      title: 'Compromised Credentials',
      value: '2,341',
      change: '+8%',
      trend: 'up',
      icon: Database,
      color: theme.palette.warning.main
    },
    {
      title: 'Dark Web Mentions',
      value: '156',
      change: '-5%',
      trend: 'down',
      icon: Globe,
      color: theme.palette.success.main
    }
  ];

  const recentAlerts = [
    {
      id: 1,
      type: 'critical',
      title: 'High-Value Credentials Detected',
      description: 'Domain admin credentials found on dark web marketplace',
      source: 'Dark Web Monitor',
      time: '2 minutes ago',
      status: 'investigating'
    },
    {
      id: 2,
      type: 'high',
      title: 'RedLine Stealer Campaign',
      description: 'New RedLine malware variant targeting finance sector',
      source: 'Stealer Intelligence',
      time: '15 minutes ago',
      status: 'new'
    },
    {
      id: 3,
      type: 'medium',
      title: 'Credential Stuffing Attack',
      description: 'Unusual login patterns detected across multiple accounts',
      source: 'Behavior Analytics',
      time: '1 hour ago',
      status: 'monitoring'
    }
  ];

  return (
    <Container maxWidth="xl" sx={{ py: 3 }}>
      {/* Clean Header */}
      <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h3" sx={{
          fontWeight: 800,
          color: theme.palette.text.primary,
          letterSpacing: '-0.02em'
        }}>
          Threat Intelligence
        </Typography>

        {user?.organizationName && (
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Chip
              label={user.organizationName}
              size="small"
              sx={{
                bgcolor: alpha(theme.palette.primary.main, 0.1),
                color: theme.palette.primary.main,
                fontWeight: 600,
                border: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`
              }}
            />
            <Chip
              label={user.role}
              size="small"
              sx={{
                bgcolor: alpha(theme.palette.secondary.main, 0.1),
                color: theme.palette.secondary.main,
                fontWeight: 600,
                border: `1px solid ${alpha(theme.palette.secondary.main, 0.2)}`
              }}
            />
          </Box>
        )}
      </Box>

      {/* Clean Inline Stats */}
      <Box sx={{ mb: 3, display: 'flex', gap: 2, flexWrap: 'wrap' }}>
        {threatStats.map((stat, index) => {
          const Icon = stat.icon;
          const TrendIcon = stat.trend === 'up' ? TrendingUp : TrendingDown;

          return (
            <Box
              key={index}
              sx={{
                flex: '1 1 200px',
                minWidth: 200,
                p: 2,
                borderRadius: 2,
                bgcolor: alpha(stat.color, 0.05),
                border: `1px solid ${alpha(stat.color, 0.15)}`,
                transition: 'all 0.2s ease',
                '&:hover': {
                  borderColor: alpha(stat.color, 0.3),
                  transform: 'translateY(-2px)',
                  boxShadow: `0 4px 12px ${alpha(stat.color, 0.15)}`
                }
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                <Box sx={{
                  p: 1,
                  borderRadius: 1.5,
                  bgcolor: alpha(stat.color, 0.1),
                  color: stat.color,
                  display: 'flex'
                }}>
                  <Icon size={18} />
                </Box>
                <Box sx={{ flex: 1, minWidth: 0 }}>
                  <Typography variant="h5" sx={{
                    fontWeight: 700,
                    color: theme.palette.text.primary,
                    lineHeight: 1.2
                  }}>
                    {stat.value}
                  </Typography>
                  <Typography variant="caption" sx={{
                    color: theme.palette.text.secondary,
                    fontSize: '0.7rem',
                    display: 'block'
                  }}>
                    {stat.title}
                  </Typography>
                </Box>
                <Box sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 0.5,
                  color: stat.trend === 'up' ? theme.palette.error.main : theme.palette.success.main
                }}>
                  <TrendIcon size={14} />
                  <Typography variant="caption" sx={{ fontWeight: 600, fontSize: '0.7rem' }}>
                    {stat.change}
                  </Typography>
                </Box>
              </Box>
            </Box>
          );
        })}
      </Box>

      {/* Recent Threat Alerts - Clean Design */}
      <Paper
        elevation={0}
        sx={{
          p: 3,
          borderRadius: 2,
          border: `1px solid ${theme.palette.divider}`
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            Recent Threat Alerts
          </Typography>
          <Button
            size="small"
            endIcon={<ArrowRight size={16} />}
            sx={{
              color: theme.palette.text.secondary,
              fontWeight: 600,
              '&:hover': {
                color: theme.palette.primary.main,
                bgcolor: alpha(theme.palette.primary.main, 0.08)
              }
            }}
          >
            View All
          </Button>
        </Box>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
          {recentAlerts.map((alert) => {
            const getSeverityColor = (type) => {
              if (theme.palette.security) {
                switch (type) {
                  case 'critical': return theme.palette.security.critical;
                  case 'high': return theme.palette.security.high;
                  case 'medium': return theme.palette.security.medium;
                  default: return theme.palette.security.low;
                }
              }
              switch (type) {
                case 'critical': return theme.palette.error.main;
                case 'high': return theme.palette.warning.main;
                case 'medium': return theme.palette.info.main;
                default: return theme.palette.success.main;
              }
            };

            const getStatusColor = (status) => {
              if (theme.palette.security) {
                switch (status) {
                  case 'investigating': return theme.palette.security.medium;
                  case 'new': return theme.palette.security.critical;
                  case 'monitoring': return theme.palette.security.high;
                  default: return theme.palette.security.safe;
                }
              }
              switch (status) {
                case 'investigating': return theme.palette.info.main;
                case 'new': return theme.palette.error.main;
                case 'monitoring': return theme.palette.warning.main;
                default: return theme.palette.success.main;
              }
            };

            const severityColor = getSeverityColor(alert.type);
            const statusColor = getStatusColor(alert.status);

            return (
              <Box
                key={alert.id}
                sx={{
                  p: 2,
                  borderRadius: 2,
                  bgcolor: alpha(severityColor, 0.03),
                  borderLeft: `3px solid ${severityColor}`,
                  border: `1px solid ${alpha(severityColor, 0.15)}`,
                  transition: 'all 0.2s ease',
                  '&:hover': {
                    transform: 'translateX(4px)',
                    borderColor: alpha(severityColor, 0.25),
                    bgcolor: alpha(severityColor, 0.05)
                  }
                }}
              >
                <Box sx={{ display: 'flex', gap: 2, alignItems: 'start' }}>
                  <Box
                    sx={{
                      p: 1,
                      borderRadius: 1.5,
                      bgcolor: alpha(severityColor, 0.1),
                      color: severityColor,
                      display: 'flex'
                    }}
                  >
                    <AlertTriangle size={16} />
                  </Box>

                  <Box sx={{ flex: 1, minWidth: 0 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 0.5 }}>
                      <Typography variant="body2" sx={{ fontWeight: 600, color: theme.palette.text.primary }}>
                        {alert.title}
                      </Typography>
                      <Chip
                        label={alert.status}
                        size="small"
                        sx={{
                          height: 20,
                          fontSize: '0.65rem',
                          fontWeight: 700,
                          textTransform: 'uppercase',
                          bgcolor: alpha(statusColor, 0.1),
                          color: statusColor,
                          border: `1px solid ${alpha(statusColor, 0.2)}`
                        }}
                      />
                    </Box>

                    <Typography variant="caption" sx={{ color: theme.palette.text.secondary, display: 'block', mb: 1 }}>
                      {alert.description}
                    </Typography>

                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Typography variant="caption" sx={{ color: theme.palette.text.secondary, fontSize: '0.7rem', fontWeight: 500 }}>
                        {alert.source}
                      </Typography>
                      <Typography variant="caption" sx={{ color: theme.palette.text.secondary, fontSize: '0.7rem' }}>
                        {alert.time}
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              </Box>
            );
          })}
        </Box>
      </Paper>
    </Container>
  );
};

export default HomePage;
