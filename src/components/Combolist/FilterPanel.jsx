import React, { useState } from 'react';
import {
  Paper,
  Box,
  Typography,
  Grid,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Button,
  Chip,
  Collapse,
  IconButton,
  useTheme,
  alpha,
  CircularProgress
} from '@mui/material';
import { Search, Filter, Calendar, Globe, RefreshCw, ChevronDown, ChevronUp } from 'lucide-react';

const FilterPanel = ({ onFilterChange, loading, currentFilters }) => {
  const theme = useTheme();
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 5 }, (_, i) => currentYear - i);

  const months = [
    'january', 'february', 'march', 'april', 'may', 'june',
    'july', 'august', 'september', 'october', 'november', 'december'
  ];

  const [showAdvanced, setShowAdvanced] = useState(false);

  const handleFilterChange = (key, value) => {
    const newFilters = { ...currentFilters, [key]: value };
    // Reset start to 1 when max changes or when filter criteria change
    if (key === 'max' || key === 'domain' || key === 'year' || key === 'month') {
      newFilters.start = 1;
    }
    onFilterChange(newFilters);
  };

  const handleSearch = () => {
    // Reset to page 1 when explicitly searching
    onFilterChange({ ...currentFilters, start: 1 });
  };

  return (
    <Paper
      sx={{
        p: 3,
        background: `linear-gradient(135deg, ${alpha(theme.palette.background.paper, 0.9)} 0%, ${alpha(theme.palette.background.paper, 0.7)} 100%)`,
        border: `2px solid ${theme.palette.divider}`,
        borderRadius: 3,
        boxShadow: `0px 4px 12px ${alpha(theme.palette.primary.main, 0.1)}`
      }}
    >
      {/* Header */}
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Filter size={20} color={theme.palette.primary.main} />
          <Typography variant="h6" sx={{ fontWeight: 600, color: theme.palette.text.primary }}>
            Intelligence Filters
          </Typography>
        </Box>
        <Button
          onClick={() => setShowAdvanced(!showAdvanced)}
          endIcon={showAdvanced ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          sx={{
            color: theme.palette.text.secondary,
            fontWeight: 500,
            '&:hover': {
              color: theme.palette.primary.main,
              bgcolor: alpha(theme.palette.primary.main, 0.05)
            }
          }}
        >
          {showAdvanced ? 'Hide Advanced' : 'Show Advanced'}
        </Button>
      </Box>


      {/* Main Filters */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} md={3}>
          <TextField
            fullWidth
            label="Target Domain"
            value={currentFilters.domain}
            onChange={(e) => handleFilterChange('domain', e.target.value)}
            onKeyPress={(e) => {
              if (e.key === 'Enter' && !loading) {
                handleSearch();
              }
            }}
            placeholder="Enter domain..."
            InputProps={{
              startAdornment: <Globe size={16} style={{ marginRight: 8, color: theme.palette.text.secondary }} />
            }}
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: 2,
                '&:hover .MuiOutlinedInput-notchedOutline': {
                  borderColor: theme.palette.primary.main
                }
              }
            }}
          />
        </Grid>

        <Grid item xs={12} md={2}>
          <FormControl fullWidth>
            <InputLabel>Year</InputLabel>
            <Select
              value={currentFilters.year}
              onChange={(e) => handleFilterChange('year', e.target.value)}
              label="Year"
              startAdornment={<Calendar size={16} style={{ marginRight: 8, color: theme.palette.text.secondary }} />}
              sx={{ borderRadius: 2 }}
            >
              {years.map(year => (
                <MenuItem key={year} value={year.toString()}>{year}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} md={2}>
          <FormControl fullWidth>
            <InputLabel>Month</InputLabel>
            <Select
              value={currentFilters.month}
              onChange={(e) => handleFilterChange('month', e.target.value)}
              label="Month"
              startAdornment={<Calendar size={16} style={{ marginRight: 8, color: theme.palette.text.secondary }} />}
              sx={{ borderRadius: 2 }}
            >
              {months.map(month => (
                <MenuItem key={month} value={month} sx={{ textTransform: 'capitalize' }}>
                  {month}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} md={5} sx={{ display: 'flex', alignItems: 'end' }}>
          <Button
            onClick={handleSearch}
            disabled={loading}
            variant="contained"
            fullWidth
            startIcon={loading ? <CircularProgress size={16} /> : <Search size={16} />}
            sx={{
              height: 56,
              background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
              boxShadow: `0px 4px 12px ${alpha(theme.palette.primary.main, 0.3)}`,
              fontSize: '1rem',
              fontWeight: 600,
              borderRadius: 2,
              transition: 'all 0.3s ease',
              '&:hover': {
                transform: 'translateY(-2px)',
                boxShadow: `0px 6px 20px ${alpha(theme.palette.primary.main, 0.4)}`
              },
              '&:disabled': {
                background: alpha(theme.palette.action.disabled, 0.12)
              }
            }}
          >
            {loading ? 'Searching...' : 'Search Intelligence'}
          </Button>
        </Grid>
      </Grid>

      {/* Advanced Options */}
      <Collapse in={showAdvanced}>
        <Box sx={{ borderTop: `1px solid ${theme.palette.divider}`, pt: 3 }}>
          <Typography variant="body2" sx={{ fontWeight: 600, color: theme.palette.text.primary, mb: 2 }}>
            Advanced Options
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                label="Start Index"
                type="number"
                value={currentFilters.start}
                onChange={(e) => handleFilterChange('start', parseInt(e.target.value) || 1)}
                inputProps={{ min: 1 }}
                sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
              />
            </Grid>

            <Grid item xs={12} md={4}>
              <FormControl fullWidth>
                <InputLabel>Max Results</InputLabel>
                <Select
                  value={currentFilters.max}
                  onChange={(e) => handleFilterChange('max', parseInt(e.target.value))}
                  label="Max Results"
                  sx={{ borderRadius: 2 }}
                >
                  <MenuItem value={10}>10</MenuItem>
                  <MenuItem value={25}>25</MenuItem>
                  <MenuItem value={50}>50</MenuItem>
                  <MenuItem value={100}>100</MenuItem>
                  <MenuItem value={200}>200</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                label="Active Domain"
                value={currentFilters.domain}
                disabled
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 2,
                    bgcolor: alpha(theme.palette.success.main, 0.1),
                    color: theme.palette.success.main
                  },
                  '& .MuiInputLabel-root': {
                    color: theme.palette.success.main
                  }
                }}
              />
            </Grid>
          </Grid>
        </Box>
      </Collapse>

      {/* Query Summary */}
      <Paper
        sx={{
          mt: 3,
          p: 2,
          bgcolor: alpha(theme.palette.background.default, 0.5),
          border: `1px solid ${theme.palette.divider}`,
          borderRadius: 2
        }}
      >
        <Typography variant="caption" sx={{ color: theme.palette.text.secondary }}>
          <Box component="span" sx={{ fontWeight: 600, color: theme.palette.text.primary }}>
            Query:
          </Box>{' '}
          {currentFilters.domain} • {currentFilters.month} {currentFilters.year} •
          Records {currentFilters.start} to {currentFilters.start + currentFilters.max - 1}
        </Typography>
      </Paper>
    </Paper>
  );
};

export default FilterPanel;