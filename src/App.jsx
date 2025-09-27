import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store/store';

// Layout Components
import MainLayout from './components/Layout/MainLayout';
import NotificationCenter from './components/Layout/NotificationCenter';
import ErrorBoundary from './components/Common/ErrorBoundary';

// Services
import monitoringService from './services/monitoringService';
import logger from './utils/logger';

// Auth Components
import LoginPage from './components/Auth/LoginPage';
import RegisterPage from './components/Auth/RegisterPage';
import ProtectedRoute from './components/Auth/ProtectedRoute';
import { AuthProvider } from './contexts/AuthContext';

// Page Components
import HomePage from './components/Home/HomePage';
import DarkwebPage from './components/Darkweb/DarkwebPage';
import StealerLogsPage from './components/StealerLogs/StealerLogsPage';
import CombolistPage from './components/Combolist/CombolistPage';

// Organization Pages (placeholder for now)
const OrganizationSettings = () => (
  <div className="p-6">
    <h1 className="text-2xl font-bold mb-4">Organization Settings</h1>
    <p>Organization management features coming soon...</p>
  </div>
);

const UserManagement = () => (
  <div className="p-6">
    <h1 className="text-2xl font-bold mb-4">User Management</h1>
    <p>User management features coming soon...</p>
  </div>
);

const ApiKeys = () => (
  <div className="p-6">
    <h1 className="text-2xl font-bold mb-4">API Keys</h1>
    <p>API key management features coming soon...</p>
  </div>
);

// Dashboard wrapper that includes the main layout
const DashboardWrapper = ({ children }) => {
  return (
    <ProtectedRoute>
      <MainLayout>
        {children}
      </MainLayout>
    </ProtectedRoute>
  );
};

function App() {
  useEffect(() => {
    // Set theme from localStorage on app load
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);

    // Initialize monitoring and logging
    logger.info('Application Started', {
      version: import.meta.env.VITE_APP_VERSION || '1.0.0',
      environment: import.meta.env.MODE,
      userAgent: navigator.userAgent
    });

    // Start health reporting in production
    if (import.meta.env.MODE === 'production') {
      monitoringService.startHealthReporting();
    }

    // Track initial page load
    monitoringService.trackUserInteraction('app_loaded');
  }, []);

  return (
    <ErrorBoundary>
      <Provider store={store}>
        <AuthProvider>
          <Router>
            <div className="App">
              <Routes>
            {/* Public Routes */}
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />

            {/* Protected Dashboard Routes */}
            <Route path="/dashboard" element={
              <DashboardWrapper>
                <HomePage />
              </DashboardWrapper>
            } />

            <Route path="/darkweb" element={
              <DashboardWrapper>
                <DarkwebPage />
              </DashboardWrapper>
            } />

            <Route path="/stealer-logs" element={
              <DashboardWrapper>
                <StealerLogsPage />
              </DashboardWrapper>
            } />

            <Route path="/combolist" element={
              <DashboardWrapper>
                <CombolistPage />
              </DashboardWrapper>
            } />

            {/* Organization Management Routes */}
            <Route path="/organization/settings" element={
              <DashboardWrapper>
                <OrganizationSettings />
              </DashboardWrapper>
            } />

            <Route path="/organization/users" element={
              <DashboardWrapper>
                <UserManagement />
              </DashboardWrapper>
            } />

            <Route path="/organization/api-keys" element={
              <DashboardWrapper>
                <ApiKeys />
              </DashboardWrapper>
            } />

            {/* Redirect root to dashboard */}
            <Route path="/" element={<Navigate to="/dashboard" replace />} />

            {/* 404 Route */}
            <Route path="*" element={
              <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="text-center">
                  <h1 className="text-4xl font-bold text-gray-900 mb-2">404</h1>
                  <p className="text-gray-600">Page not found</p>
                </div>
              </div>
            } />
          </Routes>

              {/* Global Notification Center */}
              <NotificationCenter />
            </div>
          </Router>
        </AuthProvider>
      </Provider>
    </ErrorBoundary>
  );
}

export default App;