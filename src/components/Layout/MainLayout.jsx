import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Box, useTheme } from '@mui/material';
import Sidebar from './Sidebar';
import ThemeToggle from '../UI/ThemeToggle';
import { fetchOrganizationData } from '../../store/slices/organizationSlice';

const MainLayout = ({ children }) => {
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.auth);
  const theme = useTheme();

  useEffect(() => {
    // Fetch organization data when layout mounts
    if (user?.organizationId) {
      dispatch(fetchOrganizationData());
    }
  }, [dispatch, user?.organizationId]);

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          bgcolor: theme.palette.background.default,
          transition: 'margin 0.3s ease-in-out',
          minHeight: '100vh',
          position: 'relative'
        }}
      >
        {/* Global Theme Toggle - Top Right */}
        <Box sx={{
          position: 'fixed',
          top: 20,
          right: 24,
          zIndex: 1200
        }}>
          <ThemeToggle />
        </Box>

        <Box sx={{ p: 3, height: '100%' }}>
          {children}
        </Box>
      </Box>
    </Box>
  );
};

export default MainLayout;