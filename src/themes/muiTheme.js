import { createTheme } from '@mui/material/styles';

// Clean Professional Light Theme
const airframeLightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#2563EB', // Modern blue
      light: '#60A5FA',
      dark: '#1E40AF',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#10B981', // Clean green
      light: '#34D399',
      dark: '#059669',
      contrastText: '#ffffff',
    },
    background: {
      default: '#F8FAFC', // Very light blue-gray
      paper: '#FFFFFF',
    },
    text: {
      primary: '#1E293B', // Slate 800
      secondary: '#64748B', // Slate 500
    },
    grey: {
      50: '#F8FAFC',
      100: '#F1F5F9',
      200: '#E2E8F0',
      300: '#CBD5E1',
      400: '#94A3B8',
      500: '#64748B',
      600: '#475569',
      700: '#334155',
      800: '#1E293B',
      900: '#0F172A',
    },
    divider: '#E2E8F0',
    success: {
      main: '#10B981',
      light: '#34D399',
      dark: '#059669',
    },
    warning: {
      main: '#F59E0B',
      light: '#FBBF24',
      dark: '#D97706',
    },
    error: {
      main: '#EF4444',
      light: '#F87171',
      dark: '#DC2626',
    },
    info: {
      main: '#3B82F6',
      light: '#60A5FA',
      dark: '#2563EB',
    },
    security: {
      critical: '#EF4444',
      high: '#F59E0B',
      medium: '#FBBF24',
      low: '#3B82F6',
      safe: '#10B981'
    }
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: '2.5rem',
      fontWeight: 700,
      color: '#1E293B',
      lineHeight: 1.2,
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 700,
      color: '#1E293B',
      lineHeight: 1.3,
    },
    h3: {
      fontSize: '1.75rem',
      fontWeight: 700,
      color: '#1E293B',
      lineHeight: 1.3,
    },
    h4: {
      fontSize: '1.5rem',
      fontWeight: 600,
      color: '#1E293B',
      lineHeight: 1.4,
    },
    h5: {
      fontSize: '1.25rem',
      fontWeight: 600,
      color: '#1E293B',
      lineHeight: 1.4,
    },
    h6: {
      fontSize: '1rem',
      fontWeight: 600,
      color: '#1E293B',
      lineHeight: 1.5,
      letterSpacing: '0.02em'
    },
    body1: {
      fontSize: '1rem',
      color: '#64748B',
      lineHeight: 1.6,
    },
    body2: {
      fontSize: '0.875rem',
      color: '#64748B',
      lineHeight: 1.5,
    },
    caption: {
      fontSize: '0.75rem',
      color: '#64748B',
      lineHeight: 1.4,
    },
    overline: {
      fontWeight: 700,
      letterSpacing: '0.1em',
      fontSize: '0.75rem'
    }
  },
  shape: {
    borderRadius: 12,
  },
  shadows: [
    'none',
    '0px 1px 2px rgba(0, 0, 0, 0.05)',
    '0px 2px 4px rgba(0, 0, 0, 0.06)',
    '0px 4px 8px rgba(0, 0, 0, 0.07)',
    '0px 8px 16px rgba(0, 0, 0, 0.08)',
    '0px 12px 24px rgba(0, 0, 0, 0.09)',
    '0px 16px 32px rgba(0, 0, 0, 0.10)',
    '0px 20px 40px rgba(0, 0, 0, 0.11)',
    ...Array(17).fill('0px 20px 40px rgba(0, 0, 0, 0.11)')
  ],
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
        },
        elevation0: {
          boxShadow: 'none',
        },
        elevation1: {
          boxShadow: '0px 1px 3px rgba(0, 0, 0, 0.05)',
        },
        elevation2: {
          boxShadow: '0px 2px 6px rgba(0, 0, 0, 0.06)',
        },
        elevation3: {
          boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.07)',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: 8,
          padding: '10px 20px',
          fontWeight: 600,
          transition: 'all 0.2s ease-in-out',
        },
        contained: {
          background: 'linear-gradient(135deg, #2563EB 0%, #3B82F6 100%)',
          boxShadow: '0px 2px 8px rgba(37, 99, 235, 0.2)',
          '&:hover': {
            background: 'linear-gradient(135deg, #1E40AF 0%, #2563EB 100%)',
            boxShadow: '0px 4px 12px rgba(37, 99, 235, 0.3)',
            transform: 'translateY(-1px)',
          },
          '&:active': {
            transform: 'translateY(0px)',
          }
        },
        outlined: {
          borderColor: '#E2E8F0',
          borderWidth: '1.5px',
          '&:hover': {
            borderColor: '#2563EB',
            backgroundColor: 'rgba(37, 99, 235, 0.04)',
            borderWidth: '1.5px',
          }
        }
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          border: '1px solid #E2E8F0',
          boxShadow: '0px 1px 3px rgba(0, 0, 0, 0.05)',
          transition: 'all 0.2s ease-in-out',
          '&:hover': {
            boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.08)',
            transform: 'translateY(-2px)',
          }
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundImage: 'none',
          backgroundColor: '#FFFFFF',
          borderRight: '1px solid #E2E8F0',
        },
      },
    },
    MuiListItemButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          margin: '2px 8px',
          transition: 'all 0.2s ease-in-out',
          '&:hover': {
            backgroundColor: 'rgba(37, 99, 235, 0.06)',
            transform: 'translateX(4px)',
          },
          '&.Mui-selected': {
            backgroundColor: 'rgba(37, 99, 235, 0.1)',
            borderLeft: '3px solid #2563EB',
            '&:hover': {
              backgroundColor: 'rgba(37, 99, 235, 0.14)',
            }
          }
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          fontWeight: 600,
        },
        colorPrimary: {
          backgroundColor: 'rgba(37, 99, 235, 0.1)',
          color: '#2563EB',
        }
      },
    },
  },
});

// Enhanced Corona Dark Theme
const coronaDarkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#3F51B5',
      light: '#7986CB',
      dark: '#303F9F',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#FF6D00',
      light: '#FF9800',
      dark: '#E65100',
      contrastText: '#ffffff',
    },
    background: {
      default: '#0A0E1A',
      paper: '#1E2530',
    },
    text: {
      primary: '#FFFFFF',
      secondary: '#B0BEC5',
    },
    grey: {
      50: '#FAFAFA',
      100: '#F5F5F5',
      200: '#EEEEEE',
      300: '#E0E0E0',
      400: '#BDBDBD',
      500: '#9E9E9E',
      600: '#757575',
      700: '#616161',
      800: '#424242',
      900: '#212121',
    },
    divider: '#37474F',
    success: {
      main: '#4CAF50',
      light: '#81C784',
      dark: '#2E7D32',
    },
    warning: {
      main: '#FFC107',
      light: '#FFD54F',
      dark: '#F57C00',
    },
    error: {
      main: '#F44336',
      light: '#EF5350',
      dark: '#C62828',
    },
    info: {
      main: '#29B6F6',
      light: '#4FC3F7',
      dark: '#0288D1',
    },
    security: {
      critical: '#F44336',
      high: '#FFC107',
      medium: '#FF9800',
      low: '#29B6F6',
      safe: '#4CAF50'
    }
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: '2.5rem',
      fontWeight: 700,
      color: '#FFFFFF',
      lineHeight: 1.2,
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 700,
      color: '#FFFFFF',
      lineHeight: 1.3,
    },
    h3: {
      fontSize: '1.75rem',
      fontWeight: 700,
      color: '#FFFFFF',
      lineHeight: 1.3,
    },
    h4: {
      fontSize: '1.5rem',
      fontWeight: 600,
      color: '#FFFFFF',
      lineHeight: 1.4,
    },
    h5: {
      fontSize: '1.25rem',
      fontWeight: 600,
      color: '#FFFFFF',
      lineHeight: 1.4,
    },
    h6: {
      fontSize: '1rem',
      fontWeight: 600,
      color: '#FFFFFF',
      lineHeight: 1.5,
      letterSpacing: '0.02em'
    },
    body1: {
      fontSize: '1rem',
      color: '#B0BEC5',
      lineHeight: 1.6,
    },
    body2: {
      fontSize: '0.875rem',
      color: '#B0BEC5',
      lineHeight: 1.5,
    },
    caption: {
      fontSize: '0.75rem',
      color: '#B0BEC5',
      lineHeight: 1.4,
    },
    overline: {
      fontWeight: 700,
      letterSpacing: '0.1em',
      fontSize: '0.75rem'
    }
  },
  shape: {
    borderRadius: 12,
  },
  shadows: [
    'none',
    '0px 2px 8px rgba(0, 0, 0, 0.3)',
    '0px 4px 12px rgba(0, 0, 0, 0.4)',
    '0px 8px 20px rgba(0, 0, 0, 0.5)',
    '0px 12px 28px rgba(0, 0, 0, 0.6)',
    '0px 16px 36px rgba(0, 0, 0, 0.7)',
    '0px 20px 44px rgba(0, 0, 0, 0.8)',
    '0px 24px 52px rgba(0, 0, 0, 0.9)',
    ...Array(17).fill('0px 24px 52px rgba(0, 0, 0, 0.9)')
  ],
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
          backgroundColor: '#1E2530',
        },
        elevation0: {
          boxShadow: 'none',
        },
        elevation1: {
          boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.3)',
        },
        elevation2: {
          boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.4)',
        },
        elevation3: {
          boxShadow: '0px 8px 20px rgba(0, 0, 0, 0.5)',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: 8,
          padding: '10px 20px',
          fontWeight: 600,
          transition: 'all 0.2s ease-in-out',
        },
        contained: {
          background: 'linear-gradient(135deg, #3F51B5 0%, #5C6BC0 100%)',
          boxShadow: '0px 4px 12px rgba(63, 81, 181, 0.4)',
          '&:hover': {
            background: 'linear-gradient(135deg, #303F9F 0%, #3F51B5 100%)',
            boxShadow: '0px 6px 16px rgba(63, 81, 181, 0.5)',
            transform: 'translateY(-2px)',
          },
          '&:active': {
            transform: 'translateY(0px)',
          }
        },
        outlined: {
          borderColor: '#37474F',
          borderWidth: '2px',
          color: '#FFFFFF',
          '&:hover': {
            borderColor: '#3F51B5',
            backgroundColor: 'rgba(63, 81, 181, 0.08)',
            borderWidth: '2px',
          }
        }
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: '#1E2530',
          border: '1px solid #37474F',
          borderRadius: 12,
          boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.3)',
          transition: 'all 0.3s ease-in-out',
          '&:hover': {
            boxShadow: '0px 8px 24px rgba(0, 0, 0, 0.4)',
            transform: 'translateY(-2px)',
            border: '1px solid #455A64',
          }
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundImage: 'none',
          backgroundColor: '#1E2530',
          borderRight: '2px solid #37474F',
        },
      },
    },
    MuiListItemButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          margin: '2px 8px',
          transition: 'all 0.2s ease-in-out',
          '&:hover': {
            backgroundColor: 'rgba(63, 81, 181, 0.12)',
            transform: 'translateX(4px)',
          },
          '&.Mui-selected': {
            backgroundColor: 'rgba(63, 81, 181, 0.16)',
            borderLeft: '4px solid #3F51B5',
            '&:hover': {
              backgroundColor: 'rgba(63, 81, 181, 0.20)',
            }
          }
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          fontWeight: 600,
        },
        colorPrimary: {
          backgroundColor: 'rgba(63, 81, 181, 0.2)',
          color: '#7986CB',
        }
      },
    },
  },
});

export { airframeLightTheme, coronaDarkTheme };
