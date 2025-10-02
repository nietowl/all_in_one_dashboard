import React from 'react';
import { IconButton, Tooltip, Box } from '@mui/material';
import { LightMode, DarkMode } from '@mui/icons-material';
import { useAppTheme } from '../../hooks/useAppTheme';

const ThemeToggle = ({ className = '' }) => {
  const { isDarkMode, toggleTheme } = useAppTheme();

  return (
    <Tooltip title={`Switch to ${isDarkMode ? 'Airframe Light' : 'Corona Dark'} theme`}>
      <Box className={className}>
        <IconButton
          onClick={toggleTheme}
          sx={{
            position: 'relative',
            width: 56,
            height: 28,
            borderRadius: 7,
            p: 0,
            overflow: 'hidden',
            background: isDarkMode
              ? 'linear-gradient(135deg, #6366F1 0%, #8B5CF6 100%)'
              : 'linear-gradient(135deg, #5C6BC0 0%, #FF7043 100%)',
            border: 'none',
            '&:hover': {
              background: isDarkMode
                ? 'linear-gradient(135deg, #4338CA 0%, #7C3AED 100%)'
                : 'linear-gradient(135deg, #3F4192 0%, #C63E14 100%)',
              transform: 'scale(1.05)',
            },
            '&:active': {
              transform: 'scale(0.95)',
            },
            transition: 'all 0.3s ease-in-out',
            boxShadow: isDarkMode
              ? '0 4px 12px rgba(99, 102, 241, 0.3)'
              : '0 4px 12px rgba(92, 107, 192, 0.3)',
          }}
        >
          {/* Toggle thumb */}
          <Box
            sx={{
              position: 'absolute',
              top: 2,
              left: isDarkMode ? 30 : 2,
              width: 24,
              height: 24,
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #FFFFFF 0%, #F8F9FA 100%)',
              transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
              transform: isDarkMode ? 'rotate(0deg)' : 'rotate(180deg)',
            }}
          >
            {isDarkMode ? (
              <DarkMode sx={{ color: '#6366F1', fontSize: 16 }} />
            ) : (
              <LightMode sx={{ color: '#FF7043', fontSize: 16 }} />
            )}
          </Box>

          {/* Background stars for dark mode */}
          {isDarkMode && (
            <Box
              sx={{
                position: 'absolute',
                inset: 0,
                '&::before, &::after': {
                  content: '""',
                  position: 'absolute',
                  width: 2,
                  height: 2,
                  backgroundColor: 'rgba(255, 255, 255, 0.6)',
                  borderRadius: '50%',
                  animation: 'twinkle 2s infinite',
                },
                '&::before': {
                  top: 6,
                  left: 8,
                  animationDelay: '0s',
                },
                '&::after': {
                  top: 18,
                  left: 12,
                  animationDelay: '1s',
                },
                '@keyframes twinkle': {
                  '0%, 100%': { opacity: 0.3 },
                  '50%': { opacity: 1 },
                },
              }}
            />
          )}

          {/* Sun rays for light mode */}
          {!isDarkMode && (
            <Box
              sx={{
                position: 'absolute',
                right: 4,
                top: '50%',
                transform: 'translateY(-50%)',
                '&::before, &::after': {
                  content: '""',
                  position: 'absolute',
                  width: 1,
                  height: 8,
                  backgroundColor: 'rgba(255, 255, 255, 0.8)',
                  borderRadius: 1,
                  animation: 'sunRays 3s linear infinite',
                },
                '&::before': {
                  left: 2,
                  transform: 'rotate(45deg)',
                },
                '&::after': {
                  left: 2,
                  transform: 'rotate(-45deg)',
                },
                '@keyframes sunRays': {
                  '0%': { opacity: 0.5 },
                  '50%': { opacity: 1 },
                  '100%': { opacity: 0.5 },
                },
              }}
            />
          )}
        </IconButton>
      </Box>
    </Tooltip>
  );
};

export default ThemeToggle;