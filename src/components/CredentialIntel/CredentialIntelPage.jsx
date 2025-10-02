import React, { useState, useEffect, useCallback } from 'react';
import {
  Container,
  Box,
  Typography,
  Button,
  IconButton,
  useTheme,
  alpha,
  CircularProgress,
  Chip,
  Collapse,
  Divider,
  Alert,
  Stack,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Pagination
} from '@mui/material';
import {
  Search, Database, Download, Eye, EyeOff, X, Key, Globe, Calendar, ChevronRight
} from 'lucide-react';
import { fetchStealerCredentials, fetchStealerStats, exportStealerCredentials } from '../../services/stealerIntelAPI';

const CredentialIntelPage = () => {
  const theme = useTheme();
  const [credentials, setCredentials] = useState([]);
  const [stats, setStats] = useState({
    totalCredentials: 0,
    totalDomains: 0,
    avgCredentialsPerDomain: 0,
    securityLevel: 'Unknown'
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedCredential, setSelectedCredential] = useState(null);
  const [showPassword, setShowPassword] = useState({});
  const [filters, setFilters] = useState({
    year: '2025',
    month: 'february',
    domain: '',
    start: 1,
    max: 20
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(20);
  const [totalPages, setTotalPages] = useState(1);
  const [totalRecords, setTotalRecords] = useState(0);
  const [hasSearched, setHasSearched] = useState(false);

  const loadCredentials = useCallback(async (page = 1, size = pageSize, forceLoad = false) => {
    if ((!filters.domain || filters.domain.trim() === '') && !forceLoad) {
      setCredentials([]);
      setTotalRecords(0);
      setTotalPages(1);
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const startIndex = (page - 1) * size + 1;
      const filtersWithPagination = {
        ...filters,
        start: startIndex,
        max: size
      };

      const response = await fetchStealerCredentials(
        filtersWithPagination.year,
        filtersWithPagination.month,
        filtersWithPagination.domain,
        filtersWithPagination.start,
        filtersWithPagination.max
      );

      setCredentials(response.data || []);

      const totalEntries = response.totalEntries || response.total || 0;
      setTotalRecords(totalEntries);
      const calculatedPages = Math.ceil(totalEntries / size);
      setTotalPages(Math.max(calculatedPages, 1));

      if (page === 1) {
        const statsData = await fetchStealerStats(filters);
        setStats(statsData);
      }
    } catch (err) {
      console.error('❌ Error loading credentials:', err);
      setError(err.message || 'Failed to load credential data');
      setCredentials([]);
      setTotalRecords(0);
      setTotalPages(1);
    } finally {
      setLoading(false);
    }
  }, [filters, pageSize]);

  useEffect(() => {
    if (hasSearched) {
      loadCredentials(currentPage, pageSize);
    }
  }, [currentPage, pageSize, hasSearched, loadCredentials]);

  const handleSearch = () => {
    if (filters.domain && filters.domain.trim()) {
      setCurrentPage(1);
      setHasSearched(true);
      loadCredentials(1, pageSize, true);
    }
  };

  const handlePageChange = (event, page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePageSizeChange = (event) => {
    const newSize = event.target.value;
    setPageSize(newSize);
    setCurrentPage(1);
  };

  const handleExport = async () => {
    try {
      await exportStealerCredentials(filters, 'csv');
    } catch (err) {
      console.error('Export failed:', err);
      setError('Failed to export credentials');
    }
  };

  const togglePassword = (index) => {
    setShowPassword(prev => ({ ...prev, [index]: !prev[index] }));
  };

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      {/* Modern Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h3" sx={{
          fontWeight: 800,
          color: theme.palette.text.primary,
          letterSpacing: '-0.02em'
        }}>
          Combolist
        </Typography>
      </Box>

      {/* Search Bar - Modern Minimal Design */}
      <Box sx={{
        mb: 4,
        p: 3,
        borderRadius: 3,
        bgcolor: alpha(theme.palette.background.paper, 0.6),
        border: `1px solid ${theme.palette.divider}`
      }}>
        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
          <TextField
            fullWidth
            value={filters.domain}
            onChange={(e) => setFilters(prev => ({ ...prev, domain: e.target.value }))}
            onKeyPress={(e) => {
              if (e.key === 'Enter' && filters.domain && !loading) {
                handleSearch();
              }
            }}
            placeholder="Enter domain (e.g., forticore.in)"
            sx={{ flex: 1, minWidth: 200 }}
            InputProps={{
              startAdornment: <Globe size={20} style={{ marginRight: 8, color: theme.palette.text.secondary }} />
            }}
          />

          <FormControl sx={{ minWidth: 120 }}>
            <InputLabel>Month</InputLabel>
            <Select
              value={filters.month}
              label="Month"
              onChange={(e) => setFilters(prev => ({ ...prev, month: e.target.value }))}
            >
              {['january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december'].map(m => (
                <MenuItem key={m} value={m}>{m.charAt(0).toUpperCase() + m.slice(1)}</MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl sx={{ minWidth: 100 }}>
            <InputLabel>Year</InputLabel>
            <Select
              value={filters.year}
              label="Year"
              onChange={(e) => setFilters(prev => ({ ...prev, year: e.target.value }))}
            >
              <MenuItem value="2023">2023</MenuItem>
              <MenuItem value="2024">2024</MenuItem>
              <MenuItem value="2025">2025</MenuItem>
            </Select>
          </FormControl>

          <Button
            onClick={handleSearch}
            variant="contained"
            disabled={!filters.domain || loading}
            startIcon={<Search size={18} />}
            sx={{ minWidth: 120 }}
          >
            Search
          </Button>

          {hasSearched && totalRecords > 0 && (
            <Button
              onClick={handleExport}
              variant="outlined"
              startIcon={<Download size={18} />}
            >
              Export
            </Button>
          )}
        </Box>
      </Box>

      {/* Stats - Only show when searched */}
      {hasSearched && totalRecords > 0 && (
        <Box sx={{ display: 'flex', gap: 2, mb: 4, flexWrap: 'wrap' }}>
          <Chip
            icon={<Database size={16} />}
            label={`${totalRecords.toLocaleString()} credentials`}
            sx={{
              py: 2.5,
              px: 1,
              fontSize: '0.9rem',
              fontWeight: 600,
              bgcolor: alpha(theme.palette.primary.main, 0.1),
              color: theme.palette.primary.main,
              border: `1px solid ${alpha(theme.palette.primary.main, 0.3)}`
            }}
          />
          <Chip
            label={`${stats.totalDomains || 1} domains`}
            sx={{
              py: 2.5,
              px: 1,
              fontSize: '0.9rem',
              fontWeight: 600
            }}
          />
          <Chip
            label={stats.securityLevel || 'Unknown'}
            color={stats.securityLevel === 'High Risk' ? 'error' : 'default'}
            sx={{
              py: 2.5,
              px: 1,
              fontSize: '0.9rem',
              fontWeight: 600
            }}
          />
        </Box>
      )}

      {error && (
        <Alert severity="error" sx={{ mb: 3 }} onClose={() => setError(null)}>
          {error}
        </Alert>
      )}

      {/* Main Content */}
      {!hasSearched ? (
        <Box sx={{
          textAlign: 'center',
          py: 10,
          px: 3,
          borderRadius: 3,
          bgcolor: alpha(theme.palette.background.paper, 0.4),
          border: `1px dashed ${theme.palette.divider}`
        }}>
          <Database size={64} style={{ opacity: 0.2, marginBottom: 16, color: theme.palette.text.secondary }} />
          <Typography variant="h5" sx={{ mb: 2, color: theme.palette.text.primary, fontWeight: 600 }}>
            Search for Credentials
          </Typography>
          <Typography variant="body1" sx={{ color: theme.palette.text.secondary }}>
            Enter a domain name above to start searching
          </Typography>
        </Box>
      ) : loading ? (
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 400 }}>
          <Stack alignItems="center" spacing={2}>
            <CircularProgress size={48} />
            <Typography variant="h6" sx={{ color: theme.palette.text.secondary }}>
              Searching {filters.domain}...
            </Typography>
          </Stack>
        </Box>
      ) : credentials.length === 0 ? (
        <Box sx={{
          textAlign: 'center',
          py: 10,
          px: 3,
          borderRadius: 3,
          bgcolor: alpha(theme.palette.warning.main, 0.05),
          border: `1px solid ${alpha(theme.palette.warning.main, 0.2)}`
        }}>
          <Typography variant="h6" sx={{ mb: 2, color: theme.palette.text.primary }}>
            No credentials found
          </Typography>
          <Typography variant="body1" sx={{ color: theme.palette.text.secondary }}>
            No credentials for <strong>{filters.domain}</strong> in {filters.month} {filters.year}
          </Typography>
        </Box>
      ) : (
        <>
          {/* Credentials List - Full Width Boxes */}
          <Box sx={{ mb: 3 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                {credentials.length} of {totalRecords.toLocaleString()} credentials
              </Typography>
              <FormControl size="small" sx={{ minWidth: 100 }}>
                <Select
                  value={pageSize}
                  onChange={handlePageSizeChange}
                >
                  <MenuItem value={10}>10 / page</MenuItem>
                  <MenuItem value={20}>20 / page</MenuItem>
                  <MenuItem value={50}>50 / page</MenuItem>
                  <MenuItem value={100}>100 / page</MenuItem>
                </Select>
              </FormControl>
            </Box>

            <Stack spacing={2}>
              {credentials.map((credential, index) => (
                <Box key={index}>
                  {/* Credential Row - Full Width */}
                  <Box
                    onClick={() => setSelectedCredential(selectedCredential?.index === index ? null : { ...credential, index })}
                    sx={{
                      p: 3,
                      borderRadius: 2,
                      bgcolor: theme.palette.background.paper,
                      border: `1px solid ${theme.palette.divider}`,
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                      '&:hover': {
                        borderColor: theme.palette.primary.main,
                        boxShadow: `0 4px 12px ${alpha(theme.palette.primary.main, 0.15)}`,
                        transform: 'translateY(-2px)'
                      }
                    }}
                  >
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <Box sx={{
                        p: 1.5,
                        borderRadius: 2,
                        bgcolor: alpha(theme.palette.primary.main, 0.1),
                        color: theme.palette.primary.main
                      }}>
                        <Key size={20} />
                      </Box>

                      <Box sx={{ flex: 1, minWidth: 0 }}>
                        <Typography variant="body1" sx={{
                          fontWeight: 600,
                          mb: 0.5
                        }}>
                          {credential.username || credential.email || `Credential #${index + 1}`}
                        </Typography>
                        <Typography variant="body2" sx={{
                          color: theme.palette.text.secondary
                        }}>
                          {credential.host || credential.domain || filters.domain}
                        </Typography>
                      </Box>

                      <IconButton size="small">
                        <ChevronRight
                          size={20}
                          style={{
                            transform: selectedCredential?.index === index ? 'rotate(90deg)' : 'rotate(0deg)',
                            transition: 'transform 0.2s ease'
                          }}
                        />
                      </IconButton>
                    </Box>
                  </Box>

                  {/* Expandable Details */}
                  <Collapse in={selectedCredential?.index === index}>
                    <Box sx={{
                      mt: 1,
                      p: 3,
                      borderRadius: 2,
                      bgcolor: alpha(theme.palette.background.paper, 0.6),
                      border: `1px solid ${theme.palette.divider}`,
                      borderTop: 'none',
                      borderTopLeftRadius: 0,
                      borderTopRightRadius: 0
                    }}>
                      <Stack spacing={2}>
                        {/* Username */}
                        <Box>
                          <Typography variant="caption" sx={{
                            color: theme.palette.text.secondary,
                            fontWeight: 600,
                            textTransform: 'uppercase',
                            letterSpacing: '0.05em',
                            mb: 1,
                            display: 'block'
                          }}>
                            Username
                          </Typography>
                          <Box sx={{
                            p: 1.5,
                            borderRadius: 1,
                            bgcolor: alpha(theme.palette.background.default, 0.5),
                            fontFamily: 'monospace',
                            fontSize: '0.875rem'
                          }}>
                            {credential.username || 'N/A'}
                          </Box>
                        </Box>

                        {/* Password */}
                        {credential.password && (
                          <Box>
                            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
                              <Typography variant="caption" sx={{
                                color: theme.palette.text.secondary,
                                fontWeight: 600,
                                textTransform: 'uppercase',
                                letterSpacing: '0.05em'
                              }}>
                                Password
                              </Typography>
                              <IconButton
                                size="small"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  togglePassword(index);
                                }}
                              >
                                {showPassword[index] ? <EyeOff size={16} /> : <Eye size={16} />}
                              </IconButton>
                            </Box>
                            <Box sx={{
                              p: 1.5,
                              borderRadius: 1,
                              bgcolor: alpha(theme.palette.background.default, 0.5),
                              fontFamily: 'monospace',
                              fontSize: '0.875rem'
                            }}>
                              {showPassword[index] ? credential.password : '••••••••••••'}
                            </Box>
                          </Box>
                        )}

                        {/* URL */}
                        {credential.url && (
                          <Box>
                            <Typography variant="caption" sx={{
                              color: theme.palette.text.secondary,
                              fontWeight: 600,
                              textTransform: 'uppercase',
                              letterSpacing: '0.05em',
                              mb: 1,
                              display: 'block'
                            }}>
                              URL
                            </Typography>
                            <Box sx={{
                              p: 1.5,
                              borderRadius: 1,
                              bgcolor: alpha(theme.palette.primary.main, 0.05),
                              border: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`,
                              color: theme.palette.primary.main,
                              fontFamily: 'monospace',
                              fontSize: '0.75rem',
                              wordBreak: 'break-all'
                            }}>
                              {credential.url}
                            </Box>
                          </Box>
                        )}

                        {/* Host */}
                        {credential.host && (
                          <Box>
                            <Typography variant="caption" sx={{
                              color: theme.palette.text.secondary,
                              fontWeight: 600,
                              textTransform: 'uppercase',
                              letterSpacing: '0.05em',
                              mb: 1,
                              display: 'block'
                            }}>
                              Host
                            </Typography>
                            <Box sx={{
                              p: 1.5,
                              borderRadius: 1,
                              bgcolor: alpha(theme.palette.background.default, 0.5),
                              fontFamily: 'monospace',
                              fontSize: '0.875rem'
                            }}>
                              {credential.host}
                            </Box>
                          </Box>
                        )}
                      </Stack>
                    </Box>
                  </Collapse>
                </Box>
              ))}
            </Stack>
          </Box>

          {/* Pagination */}
          {totalPages > 1 && (
            <Box sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              gap: 2,
              py: 3
            }}>
              <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>
                Page {currentPage} of {totalPages}
              </Typography>
              <Pagination
                count={totalPages}
                page={currentPage}
                onChange={handlePageChange}
                color="primary"
                showFirstButton
                showLastButton
                size="large"
              />
            </Box>
          )}
        </>
      )}
    </Container>
  );
};

export default CredentialIntelPage;
