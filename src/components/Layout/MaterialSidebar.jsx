import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  IconButton,
  Avatar,
  Typography,
  Box,
  Divider,
  Tooltip,
  Chip,
  alpha,
} from '@mui/material';
import {
  Shield,
  Language,
  Storage,
  List as ListIcon,
  Settings,
  People,
  Key,
  Logout,
  ChevronLeft,
  ChevronRight,
  Business,
} from '@mui/icons-material';
import { logoutUser } from '../../store/slices/authSlice';
import { addNotification } from '../../store/slices/uiSlice';
import { useTheme } from '../../contexts/ThemeContext';
import ThemeToggle from '../UI/ThemeToggle';

const DRAWER_WIDTH = 280;
const COLLAPSED_WIDTH = 72;

const MaterialSidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const { isDarkMode } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.auth);

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

  const mainNavigationItems = [
    {
      name: 'Threat Intelligence',
      path: '/dashboard',
      icon: Shield,
      count: '24'
    },
    {
      name: 'Dark Web Monitor',
      path: '/darkweb',
      icon: Language,
      count: '156'
    },
    {
      name: 'Stealer Intelligence',
      path: '/stealer-logs',
      icon: Storage,
      count: '2.3k'
    },
    {
      name: 'Credential Intel',
      path: '/combolist',
      icon: ListIcon,
      count: '892'
    }
  ];

  const organizationItems = [
    {
      name: 'Organization',
      path: '/organization/settings',
      icon: Business,
    },
    {
      name: 'Team Access',
      path: '/organization/users',
      icon: People,
    },
    {
      name: 'API Center',
      path: '/organization/api-keys',
      icon: Key,
    }
  ];

  const isActiveRoute = (path) => location.pathname === path;

  const sidebarContent = (
    <Box
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        background: isDarkMode
          ? 'linear-gradient(180deg, #0F172A 0%, #1E293B 100%)'
          : 'linear-gradient(180deg, #F8F9FA 0%, #E2E8F0 100%)',
      }}
    >
      {/* Header */}
      <Box sx={{ p: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        {!isCollapsed && (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
            <Avatar
              sx={{
                width: 36,
                height: 36,
                bgcolor: 'primary.main',
                background: isDarkMode
                  ? 'linear-gradient(135deg, #6366F1 0%, #8B5CF6 100%)'
                  : 'linear-gradient(135deg, #5C6BC0 0%, #3F4192 100%)',
              }}
            >
              <Shield />
            </Avatar>
            <Box>
              <Typography variant="h6" sx={{ fontWeight: 700, lineHeight: 1.2 }}>
                FortiCore
              </Typography>
              <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.75rem' }}>
                Dashboard
              </Typography>
            </Box>
          </Box>
        )}
        <Tooltip title={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}>
          <IconButton
            onClick={() => setIsCollapsed(!isCollapsed)}
            size="small"
            sx={{
              borderRadius: 2,
              border: '1px solid',
              borderColor: 'divider',
            }}
          >
            {isCollapsed ? <ChevronRight /> : <ChevronLeft />}
          </IconButton>
        </Tooltip>
      </Box>

      <Divider sx={{ opacity: 0.3 }} />

      {/* Theme Toggle */}
      <Box sx={{ px: 2, py: 1, display: 'flex', justifyContent: isCollapsed ? 'center' : 'flex-end' }}>
        <ThemeToggle />
      </Box>

      <Divider sx={{ opacity: 0.3 }} />

      {/* Navigation */}
      <Box sx={{ flex: 1, px: 1.5, py: 1 }}>
        {/* Main Navigation */}
        {!isCollapsed && (
          <Typography
            variant="overline"
            sx={{
              px: 1,
              py: 1,
              display: 'block',
              fontWeight: 600,
              fontSize: '0.75rem',
              color: 'text.secondary',
              letterSpacing: 1,
            }}
          >
            Intelligence Center
          </Typography>
        )}

        <List sx={{ p: 0 }}>
          {mainNavigationItems.map((item) => {
            const isActive = isActiveRoute(item.path);
            const IconComponent = item.icon;

            return (
              <ListItem key={item.path} sx={{ px: 0, py: 0.5 }}>
                <Tooltip title={isCollapsed ? item.name : ''} placement="right">
                  <ListItemButton
                    onClick={() => navigate(item.path)}
                    sx={{
                      borderRadius: 2,
                      mb: 0.5,
                      backgroundColor: isActive
                        ? alpha(isDarkMode ? '#6366F1' : '#5C6BC0', 0.15)
                        : 'transparent',
                      border: isActive
                        ? `1px solid ${alpha(isDarkMode ? '#6366F1' : '#5C6BC0', 0.3)}`
                        : '1px solid transparent',
                      '&:hover': {
                        backgroundColor: alpha(isDarkMode ? '#6366F1' : '#5C6BC0', 0.1),
                      },
                      py: 1.5,
                      px: 1.5,
                      minHeight: 48,
                    }}
                  >
                    <ListItemIcon sx={{
                      minWidth: isCollapsed ? 'auto' : 40,
                      color: isActive
                        ? (isDarkMode ? '#6366F1' : '#5C6BC0')
                        : 'text.secondary'
                    }}>
                      <IconComponent />
                    </ListItemIcon>
                    {!isCollapsed && (
                      <>
                        <ListItemText
                          primary={item.name}
                          primaryTypographyProps={{
                            fontWeight: isActive ? 600 : 500,
                            fontSize: '0.875rem',
                            color: isActive ? 'text.primary' : 'text.secondary',
                          }}
                        />
                        <Chip
                          label={item.count}
                          size="small"
                          sx={{
                            backgroundColor: isActive
                              ? (isDarkMode ? '#6366F1' : '#5C6BC0')
                              : (isDarkMode ? alpha('#ffffff', 0.1) : alpha('#000000', 0.1)),
                            color: isActive ? 'white' : 'text.secondary',
                            fontWeight: 600,
                            fontSize: '0.75rem',
                            height: 20,
                          }}
                        />
                      </>
                    )}
                  </ListItemButton>
                </Tooltip>
              </ListItem>
            );
          })}
        </List>

        {/* Organization Section */}
        <Box sx={{ mt: 3 }}>
          {!isCollapsed && (
            <Typography
              variant="overline"
              sx={{
                px: 1,
                py: 1,
                display: 'block',
                fontWeight: 600,
                fontSize: '0.75rem',
                color: 'text.secondary',
                letterSpacing: 1,
              }}
            >
              Administration
            </Typography>
          )}

          <List sx={{ p: 0 }}>
            {organizationItems.map((item) => {
              const isActive = isActiveRoute(item.path);
              const IconComponent = item.icon;

              return (
                <ListItem key={item.path} sx={{ px: 0, py: 0.5 }}>
                  <Tooltip title={isCollapsed ? item.name : ''} placement="right">
                    <ListItemButton
                      onClick={() => navigate(item.path)}
                      sx={{
                        borderRadius: 2,
                        mb: 0.5,
                        backgroundColor: isActive
                          ? alpha(isDarkMode ? '#F59E0B' : '#FF7043', 0.15)
                          : 'transparent',
                        border: isActive
                          ? `1px solid ${alpha(isDarkMode ? '#F59E0B' : '#FF7043', 0.3)}`
                          : '1px solid transparent',
                        '&:hover': {
                          backgroundColor: alpha(isDarkMode ? '#F59E0B' : '#FF7043', 0.1),
                        },
                        py: 1,
                        px: 1.5,
                        minHeight: 40,
                      }}
                    >
                      <ListItemIcon sx={{
                        minWidth: isCollapsed ? 'auto' : 40,
                        color: isActive
                          ? (isDarkMode ? '#F59E0B' : '#FF7043')
                          : 'text.secondary'
                      }}>
                        <IconComponent fontSize="small" />
                      </ListItemIcon>
                      {!isCollapsed && (
                        <ListItemText
                          primary={item.name}
                          primaryTypographyProps={{
                            fontWeight: isActive ? 600 : 500,
                            fontSize: '0.8rem',
                            color: isActive ? 'text.primary' : 'text.secondary',
                          }}
                        />
                      )}
                    </ListItemButton>
                  </Tooltip>
                </ListItem>
              );
            })}
          </List>
        </Box>
      </Box>

      <Divider sx={{ opacity: 0.3 }} />

      {/* User Profile & Logout */}
      <Box sx={{ p: 2 }}>
        {user && !isCollapsed && (
          <Box sx={{
            mb: 2,
            p: 1.5,
            borderRadius: 2,
            backgroundColor: isDarkMode ? alpha('#ffffff', 0.05) : alpha('#000000', 0.05),
            border: '1px solid',
            borderColor: 'divider',
          }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
              <Avatar
                sx={{
                  width: 32,
                  height: 32,
                  bgcolor: 'secondary.main',
                  fontSize: '0.875rem',
                  fontWeight: 600,
                }}
              >
                {user.firstName?.charAt(0) || user.email?.charAt(0) || 'U'}
              </Avatar>
              <Box sx={{ flex: 1, minWidth: 0 }}>
                <Typography variant="body2" sx={{ fontWeight: 600, fontSize: '0.875rem' }} noWrap>
                  {user.firstName && user.lastName
                    ? `${user.firstName} ${user.lastName}`
                    : user.email
                  }
                </Typography>
                <Typography variant="caption" color="text.secondary" noWrap>
                  {user.organizationName || 'No Organization'}
                </Typography>
              </Box>
            </Box>
          </Box>
        )}

        <Tooltip title={isCollapsed ? 'Logout' : ''} placement="right">
          <ListItemButton
            onClick={handleLogout}
            sx={{
              borderRadius: 2,
              backgroundColor: alpha('#EF4444', 0.1),
              border: '1px solid',
              borderColor: alpha('#EF4444', 0.2),
              '&:hover': {
                backgroundColor: alpha('#EF4444', 0.2),
              },
              py: 1.5,
              px: 1.5,
              justifyContent: isCollapsed ? 'center' : 'flex-start',
            }}
          >
            <ListItemIcon sx={{
              minWidth: isCollapsed ? 'auto' : 40,
              color: '#EF4444'
            }}>
              <Logout />
            </ListItemIcon>
            {!isCollapsed && (
              <ListItemText
                primary="Secure Logout"
                primaryTypographyProps={{
                  fontWeight: 600,
                  fontSize: '0.875rem',
                  color: '#EF4444',
                }}
              />
            )}
          </ListItemButton>
        </Tooltip>
      </Box>
    </Box>
  );

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: isCollapsed ? COLLAPSED_WIDTH : DRAWER_WIDTH,
        flexShrink: 0,
        transition: 'width 0.3s ease',
        '& .MuiDrawer-paper': {
          width: isCollapsed ? COLLAPSED_WIDTH : DRAWER_WIDTH,
          boxSizing: 'border-box',
          border: 'none',
          transition: 'width 0.3s ease',
          background: 'transparent',
        },
      }}
    >
      {sidebarContent}
    </Drawer>
  );
};

export default MaterialSidebar;