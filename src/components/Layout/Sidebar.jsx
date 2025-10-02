import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Box,
  Typography,
  Avatar,
  Chip,
  IconButton,
  Badge,
  useTheme,
  alpha
} from '@mui/material';
import {
  Globe,
  Database,
  List as ListIcon,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Shield,
  Eye
} from 'lucide-react';
import { logoutUser } from '../../store/slices/authSlice';
import { addNotification } from '../../store/slices/uiSlice';
import { useAppTheme } from '../../hooks/useAppTheme';

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector(state => state.auth);
  const theme = useTheme();
  const { isDarkMode } = useAppTheme(); // eslint-disable-line no-unused-vars

  const handleLogout = async () => {
    try {
      await dispatch(logoutUser()).unwrap();
      dispatch(addNotification({
        type: 'success',
        title: 'Logged Out',
        message: 'You have been successfully logged out.'
      }));
      navigate('/login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const allNavigationItems = [
    {
      name: 'Threat Intelligence',
      path: '/dashboard',
      icon: Shield,
      description: 'Real-time threat overview',
      count: '24'
    },
    {
      name: 'Dark Web Monitor',
      path: '/darkweb',
      icon: Globe,
      description: 'Underground monitoring',
      count: '156'
    },
    {
      name: 'Stealer Intelligence',
      path: '/stealer-logs',
      icon: Database,
      description: 'Compromised assets',
      count: '2.3k'
    },
    {
      name: 'Combolist',
      path: '/combolist',
      icon: ListIcon,
      description: 'Leaked credentials',
      count: '892'
    }
  ];

  // Show all navigation items for now (permissions can be added later)
  const navigationItems = allNavigationItems;



  const sidebarWidth = isCollapsed ? 64 : 320;

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: sidebarWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: sidebarWidth,
          boxSizing: 'border-box',
          background: theme.palette.background.paper,
          borderRight: `1px solid ${theme.palette.divider}`,
          transition: 'width 0.3s ease-in-out',
          overflow: 'hidden',
        },
      }}
    >
      {/* Header */}
      <Box sx={{
        p: 2,
        borderBottom: `2px solid ${theme.palette.divider}`,
        background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.08)} 0%, ${alpha(theme.palette.primary.main, 0.03)} 100%)`,
        position: 'relative',
        '&::after': {
          content: '""',
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '3px',
          background: `linear-gradient(90deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
        }
      }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          {!isCollapsed && (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Avatar
                sx={{
                  background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
                  width: 40,
                  height: 40,
                  boxShadow: `0px 4px 12px ${alpha(theme.palette.primary.main, 0.3)}`,
                  border: `2px solid ${alpha(theme.palette.primary.main, 0.2)}`,
                  transition: 'all 0.3s ease'
                }}
              >
                <Shield size={24} />
              </Avatar>
              <Box>
                <Typography variant="h6" sx={{ fontWeight: 700, color: theme.palette.text.primary }}>
                  FortiCore
                </Typography>
                <Typography variant="caption" sx={{ color: theme.palette.text.secondary }}>
                  Dashboard
                </Typography>
              </Box>
            </Box>
          )}
          <IconButton
            onClick={() => setIsCollapsed(!isCollapsed)}
            size="small"
            sx={{
              color: theme.palette.text.secondary,
              border: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`,
              borderRadius: 2,
              transition: 'all 0.2s ease',
              '&:hover': {
                bgcolor: alpha(theme.palette.primary.main, 0.1),
                color: theme.palette.primary.main,
                borderColor: theme.palette.primary.main,
                transform: 'scale(1.05)'
              }
            }}
          >
            {isCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
          </IconButton>
        </Box>
      </Box>


      {/* Main Navigation */}
      <Box sx={{ flexGrow: 1, overflow: 'auto' }}>
        {!isCollapsed && (
          <Box sx={{ p: 2 }}>
            <Typography
              variant="overline"
              sx={{
                color: theme.palette.text.secondary,
                fontWeight: 700,
                letterSpacing: 1,
                display: 'flex',
                alignItems: 'center',
                gap: 1
              }}
            >
              <Eye size={12} />
              Intelligence Center
            </Typography>
          </Box>
        )}

        <List sx={{ px: 1 }}>
          {navigationItems.map((item) => {
            const Icon = item.icon;
            return (
              <ListItem key={item.path} disablePadding sx={{ mb: 0.5 }}>
                <ListItemButton
                  component={NavLink}
                  to={item.path}
                  sx={{
                    borderRadius: 3,
                    mx: 0.5,
                    py: 1.5,
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    position: 'relative',
                    overflow: 'hidden',
                    '&.active': {
                      background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.15)} 0%, ${alpha(theme.palette.primary.main, 0.08)} 100%)`,
                      borderLeft: `4px solid ${theme.palette.primary.main}`,
                      boxShadow: `0px 4px 12px ${alpha(theme.palette.primary.main, 0.2)}`,
                      transform: 'translateX(4px)',
                      '& .MuiListItemIcon-root': {
                        color: theme.palette.primary.main,
                        transform: 'scale(1.1)'
                      },
                      '& .MuiListItemText-primary': {
                        color: theme.palette.primary.main,
                        fontWeight: 700
                      },
                      '&::before': {
                        content: '""',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        background: `linear-gradient(90deg, ${alpha(theme.palette.primary.main, 0.1)} 0%, transparent 100%)`,
                        zIndex: -1
                      }
                    },
                    '&:hover': {
                      bgcolor: alpha(theme.palette.primary.main, 0.08),
                      transform: 'translateX(2px)',
                      boxShadow: `0px 2px 8px ${alpha(theme.palette.primary.main, 0.15)}`,
                      '& .MuiListItemIcon-root': {
                        transform: 'scale(1.05)'
                      }
                    },
                    '&:active': {
                      transform: 'translateX(1px)'
                    }
                  }}
                >
                  <ListItemIcon sx={{
                    minWidth: 40,
                    transition: 'all 0.3s ease'
                  }}>
                    <Icon size={20} />
                  </ListItemIcon>
                  {!isCollapsed && (
                    <ListItemText
                      primary={item.name}
                      secondary={item.description}
                      primaryTypographyProps={{
                        variant: 'body2',
                        fontWeight: 500
                      }}
                      secondaryTypographyProps={{
                        variant: 'caption'
                      }}
                    />
                  )}
                  {!isCollapsed && (
                    <Chip
                      label={item.count}
                      size="small"
                      sx={{
                        bgcolor: alpha(theme.palette.primary.main, 0.1),
                        color: theme.palette.primary.main,
                        fontWeight: 700,
                        fontSize: '0.7rem',
                        border: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`,
                        transition: 'all 0.2s ease',
                        '&:hover': {
                          bgcolor: alpha(theme.palette.primary.main, 0.15),
                          transform: 'scale(1.05)'
                        }
                      }}
                    />
                  )}
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>

      </Box>

      {/* User Profile */}
      <Box sx={{ p: 2, borderTop: `1px solid ${theme.palette.divider}` }}>
        {user && (
          <Box
            sx={{
              background: `linear-gradient(135deg, ${alpha(theme.palette.background.paper, 0.9)} 0%, ${alpha(theme.palette.background.paper, 0.7)} 100%)`,
              border: `2px solid ${alpha(theme.palette.primary.main, 0.1)}`,
              borderRadius: 3,
              p: 2,
              mb: 2,
              transition: 'all 0.3s ease',
              position: 'relative',
              '&::before': {
                content: '""',
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: '3px',
                background: `linear-gradient(90deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
                borderRadius: '3px 3px 0 0'
              },
              '&:hover': {
                borderColor: alpha(theme.palette.primary.main, 0.2),
                boxShadow: `0px 4px 12px ${alpha(theme.palette.primary.main, 0.1)}`
              }
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Badge
                overlap="circular"
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                badgeContent={
                  <Box
                    sx={{
                      width: 12,
                      height: 12,
                      bgcolor: theme.palette.success.main,
                      borderRadius: '50%',
                      border: `2px solid ${theme.palette.background.paper}`
                    }}
                  />
                }
              >
                <Avatar
                  sx={{
                    background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
                    width: 40,
                    height: 40,
                    fontWeight: 700,
                    boxShadow: `0px 4px 12px ${alpha(theme.palette.primary.main, 0.3)}`,
                    border: `2px solid ${alpha(theme.palette.primary.main, 0.2)}`,
                    transition: 'all 0.3s ease'
                  }}
                >
                  {user.firstName?.charAt(0) || user.email?.charAt(0) || 'U'}
                </Avatar>
              </Badge>
              {!isCollapsed && (
                <Box sx={{ flexGrow: 1, minWidth: 0 }}>
                  <Typography
                    variant="body2"
                    sx={{
                      fontWeight: 600,
                      color: theme.palette.text.primary,
                      overflow: 'hidden',
                      textOverflow: 'ellipsis'
                    }}
                  >
                    {user.firstName && user.lastName
                      ? `${user.firstName} ${user.lastName}`
                      : user.email
                    }
                  </Typography>
                  <Typography
                    variant="caption"
                    sx={{
                      color: theme.palette.text.secondary,
                      overflow: 'hidden',
                      textOverflow: 'ellipsis'
                    }}
                  >
                    {user.organizationName || 'No Organization'}
                  </Typography>
                  <Box sx={{ mt: 0.5 }}>
                    <Chip
                      label={user.role || 'User'}
                      size="small"
                      sx={{
                        bgcolor: alpha(theme.palette.primary.main, 0.1),
                        color: theme.palette.primary.main,
                        fontSize: '0.7rem',
                        height: 20,
                        fontWeight: 700,
                        border: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`,
                        transition: 'all 0.2s ease',
                        '&:hover': {
                          bgcolor: alpha(theme.palette.primary.main, 0.15),
                          transform: 'scale(1.05)'
                        }
                      }}
                    />
                  </Box>
                </Box>
              )}
            </Box>
          </Box>
        )}

        {/* Logout Button */}
        <Box
          component="button"
          onClick={handleLogout}
          sx={{
            width: '100%',
            background: `linear-gradient(135deg, ${theme.palette.error.main} 0%, ${theme.palette.error.dark} 100%)`,
            color: '#ffffff',
            border: `2px solid ${alpha(theme.palette.error.main, 0.3)}`,
            borderRadius: 3,
            p: isCollapsed ? 1.5 : 2,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 1,
            cursor: 'pointer',
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            position: 'relative',
            overflow: 'hidden',
            boxShadow: `0px 4px 12px ${alpha(theme.palette.error.main, 0.3)}`,
            '&::before': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: '-100%',
              width: '100%',
              height: '100%',
              background: `linear-gradient(90deg, transparent, ${alpha('#ffffff', 0.2)}, transparent)`,
              transition: 'left 0.5s ease'
            },
            '&:hover': {
              background: `linear-gradient(135deg, ${theme.palette.error.dark} 0%, #B71C1C 100%)`,
              transform: 'translateY(-2px) scale(1.02)',
              boxShadow: `0px 6px 20px ${alpha(theme.palette.error.main, 0.4)}`,
              borderColor: alpha(theme.palette.error.main, 0.5),
              '&::before': {
                left: '100%'
              }
            },
            '&:active': {
              transform: 'translateY(-1px) scale(1.01)'
            }
          }}
        >
          <LogOut size={18} />
          {!isCollapsed && (
            <Typography variant="body2" sx={{ fontWeight: 600 }}>
              Secure Logout
            </Typography>
          )}
        </Box>
      </Box>
    </Drawer>
  );
};

export default Sidebar;