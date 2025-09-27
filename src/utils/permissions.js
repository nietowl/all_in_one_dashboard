// Role-based permission system
export const ROLES = {
  ADMIN: 'admin',
  ANALYST: 'analyst',
  VIEWER: 'viewer',
  STEALER_ANALYST: 'stealer_analyst', // Only stealer logs access
  DARKWEB_ANALYST: 'darkweb_analyst'  // Only dark web access
};

export const PERMISSIONS = {
  // Dashboard permissions
  VIEW_DASHBOARD: 'view_dashboard',

  // Stealer logs permissions
  VIEW_STEALER_LOGS: 'view_stealer_logs',
  EXPORT_STEALER_LOGS: 'export_stealer_logs',

  // Dark web permissions
  VIEW_DARKWEB: 'view_darkweb',
  EXPORT_DARKWEB: 'export_darkweb',

  // Credential intel permissions
  VIEW_CREDENTIALS: 'view_credentials',
  EXPORT_CREDENTIALS: 'export_credentials',

  // Administration permissions
  MANAGE_USERS: 'manage_users',
  MANAGE_ORGANIZATION: 'manage_organization',
  MANAGE_API_KEYS: 'manage_api_keys',

  // System permissions
  VIEW_SYSTEM_STATUS: 'view_system_status',
  EXPORT_REPORTS: 'export_reports'
};

// Role-permission mapping
export const ROLE_PERMISSIONS = {
  [ROLES.ADMIN]: [
    PERMISSIONS.VIEW_DASHBOARD,
    PERMISSIONS.VIEW_STEALER_LOGS,
    PERMISSIONS.EXPORT_STEALER_LOGS,
    PERMISSIONS.VIEW_DARKWEB,
    PERMISSIONS.EXPORT_DARKWEB,
    PERMISSIONS.VIEW_CREDENTIALS,
    PERMISSIONS.EXPORT_CREDENTIALS,
    PERMISSIONS.MANAGE_USERS,
    PERMISSIONS.MANAGE_ORGANIZATION,
    PERMISSIONS.MANAGE_API_KEYS,
    PERMISSIONS.VIEW_SYSTEM_STATUS,
    PERMISSIONS.EXPORT_REPORTS
  ],

  [ROLES.ANALYST]: [
    PERMISSIONS.VIEW_DASHBOARD,
    PERMISSIONS.VIEW_STEALER_LOGS,
    PERMISSIONS.EXPORT_STEALER_LOGS,
    PERMISSIONS.VIEW_DARKWEB,
    PERMISSIONS.EXPORT_DARKWEB,
    PERMISSIONS.VIEW_CREDENTIALS,
    PERMISSIONS.EXPORT_CREDENTIALS,
    PERMISSIONS.VIEW_SYSTEM_STATUS,
    PERMISSIONS.EXPORT_REPORTS
  ],

  [ROLES.STEALER_ANALYST]: [
    PERMISSIONS.VIEW_DASHBOARD,
    PERMISSIONS.VIEW_STEALER_LOGS,
    PERMISSIONS.EXPORT_STEALER_LOGS,
    PERMISSIONS.VIEW_SYSTEM_STATUS
  ],

  [ROLES.DARKWEB_ANALYST]: [
    PERMISSIONS.VIEW_DASHBOARD,
    PERMISSIONS.VIEW_DARKWEB,
    PERMISSIONS.EXPORT_DARKWEB,
    PERMISSIONS.VIEW_SYSTEM_STATUS
  ],

  [ROLES.VIEWER]: [
    PERMISSIONS.VIEW_DASHBOARD,
    PERMISSIONS.VIEW_SYSTEM_STATUS
  ]
};

/**
 * Check if a user has a specific permission
 * @param {Object} user - User object with role property
 * @param {string} permission - Permission to check
 * @returns {boolean} - Whether user has permission
 */
export const hasPermission = (user, permission) => {
  if (!user || !user.role) return false;

  const userPermissions = ROLE_PERMISSIONS[user.role] || [];
  return userPermissions.includes(permission);
};

/**
 * Get all permissions for a user role
 * @param {string} role - User role
 * @returns {Array} - Array of permissions
 */
export const getRolePermissions = (role) => {
  return ROLE_PERMISSIONS[role] || [];
};

/**
 * Check if user can access a specific route
 * @param {Object} user - User object
 * @param {string} route - Route path
 * @returns {boolean} - Whether user can access route
 */
export const canAccessRoute = (user, route) => {
  const routePermissions = {
    '/dashboard': PERMISSIONS.VIEW_DASHBOARD,
    '/stealer-logs': PERMISSIONS.VIEW_STEALER_LOGS,
    '/darkweb': PERMISSIONS.VIEW_DARKWEB,
    '/combolist': PERMISSIONS.VIEW_CREDENTIALS,
    '/organization/settings': PERMISSIONS.MANAGE_ORGANIZATION,
    '/organization/users': PERMISSIONS.MANAGE_USERS,
    '/organization/api-keys': PERMISSIONS.MANAGE_API_KEYS
  };

  const requiredPermission = routePermissions[route];
  return requiredPermission ? hasPermission(user, requiredPermission) : true;
};

/**
 * Filter navigation items based on user permissions
 * @param {Array} navigationItems - Array of navigation items
 * @param {Object} user - User object
 * @returns {Array} - Filtered navigation items
 */
export const filterNavigationByPermissions = (navigationItems, user) => {
  return navigationItems.filter(item => canAccessRoute(user, item.path));
};