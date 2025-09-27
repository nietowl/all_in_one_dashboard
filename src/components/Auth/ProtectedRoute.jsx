import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';
import LoadingSpinner from '../Common/LoadingSpinner';

const ProtectedRoute = ({ children, requiredPermissions = [], requiredRole = null }) => {
  const { isAuthenticated, user, isLoading, isInitialized } = useSelector(state => state.auth);
  const location = useLocation();

  // Show loading spinner while initializing auth
  if (!isInitialized || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  // Redirect to login if not authenticated
  if (!isAuthenticated || !user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Check role-based access
  if (requiredRole && user.role !== requiredRole) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Access Denied</h1>
          <p className="text-gray-600">You don't have permission to access this page.</p>
          <p className="text-sm text-gray-500 mt-2">Required role: {requiredRole}</p>
        </div>
      </div>
    );
  }

  // Check permission-based access
  if (requiredPermissions.length > 0) {
    const userPermissions = user.permissions || [];
    const hasRequiredPermissions = requiredPermissions.every(permission =>
      userPermissions.includes(permission)
    );

    if (!hasRequiredPermissions) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Access Denied</h1>
            <p className="text-gray-600">You don't have the required permissions to access this page.</p>
            <p className="text-sm text-gray-500 mt-2">
              Required permissions: {requiredPermissions.join(', ')}
            </p>
          </div>
        </div>
      );
    }
  }

  // User is authenticated and has required permissions
  return children;
};

export default ProtectedRoute;