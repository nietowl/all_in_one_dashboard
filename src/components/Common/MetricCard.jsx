import React from 'react';
import { Card, CardContent, Box, Typography, useTheme, alpha } from '@mui/material';

const MetricCard = ({ icon, title, value, color = 'primary', trend, subtitle, severity }) => {
  const theme = useTheme();

  const getColorValue = (colorName, severityLevel) => {
    // If severity is provided and security colors are available, use security colors
    if (severityLevel && theme.palette.security) {
      switch (severityLevel) {
        case 'critical':
          return theme.palette.security.critical;
        case 'high':
          return theme.palette.security.high;
        case 'medium':
          return theme.palette.security.medium;
        case 'low':
          return theme.palette.security.low;
        case 'safe':
          return theme.palette.security.safe;
        default:
          break;
      }
    }

    // Fallback to regular color palette
    switch (colorName) {
      case 'blue':
      case 'primary':
        return theme.palette.primary.main;
      case 'purple':
        return theme.palette.mode === 'dark' ? '#9C27B0' : '#7B1FA2';
      case 'green':
        return theme.palette.success.main;
      case 'red':
        return theme.palette.error.main;
      case 'orange':
        return theme.palette.warning.main;
      default:
        return theme.palette.primary.main;
    }
  };

  const colorValue = getColorValue(color, severity);

  return (
    <Card
      elevation={2}
      sx={{
        background: theme.palette.mode === 'dark'
          ? `linear-gradient(135deg, ${alpha(colorValue, 0.15)} 0%, ${alpha(colorValue, 0.08)} 100%)`
          : `linear-gradient(135deg, ${alpha(colorValue, 0.08)} 0%, ${alpha(colorValue, 0.03)} 100%)`,
        border: `2px solid ${alpha(colorValue, theme.palette.mode === 'dark' ? 0.3 : 0.2)}`,
        borderRadius: 3,
        position: 'relative',
        overflow: 'hidden',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        '&:hover': {
          transform: 'translateY(-6px) scale(1.02)',
          boxShadow: `0px 12px 32px ${alpha(colorValue, 0.25)}`,
          border: `2px solid ${alpha(colorValue, theme.palette.mode === 'dark' ? 0.5 : 0.4)}`,
        },
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '4px',
          background: `linear-gradient(90deg, ${colorValue} 0%, ${alpha(colorValue, 0.6)} 100%)`,
        }
      }}
    >
      <CardContent sx={{ p: 3, pt: 4 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
          <Box
            sx={{
              p: 2,
              borderRadius: 3,
              bgcolor: alpha(colorValue, theme.palette.mode === 'dark' ? 0.25 : 0.15),
              color: colorValue,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: `0px 4px 12px ${alpha(colorValue, 0.2)}`,
              border: `1px solid ${alpha(colorValue, 0.3)}`
            }}
          >
            {icon}
          </Box>
          {trend && (
            <Box
              sx={{
                px: 1.5,
                py: 0.5,
                borderRadius: 2,
                bgcolor: alpha(theme.palette.success.main, 0.15),
                border: `1px solid ${alpha(theme.palette.success.main, 0.3)}`,
                display: 'flex',
                alignItems: 'center',
                gap: 0.5
              }}
            >
              <Typography
                variant="body2"
                sx={{
                  color: theme.palette.success.main,
                  fontWeight: 700,
                  fontSize: '0.875rem'
                }}
              >
                {trend}
              </Typography>
            </Box>
          )}
        </Box>

        <Typography
          variant="body2"
          sx={{
            color: theme.palette.text.secondary,
            mb: 2,
            fontWeight: 600,
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            fontSize: '0.75rem'
          }}
        >
          {title}
        </Typography>

        <Typography
          variant="h3"
          sx={{
            color: theme.palette.text.primary,
            fontWeight: 800,
            mb: subtitle ? 1 : 0,
            lineHeight: 1.1,
            fontSize: '2.5rem'
          }}
        >
          {value}
        </Typography>

        {subtitle && (
          <Typography
            variant="caption"
            sx={{
              color: theme.palette.text.secondary,
              fontSize: '0.8rem',
              fontWeight: 500,
              opacity: 0.8
            }}
          >
            {subtitle}
          </Typography>
        )}
      </CardContent>
    </Card>
  );
};

export default MetricCard;