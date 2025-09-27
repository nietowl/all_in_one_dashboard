import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { logoutUser } from '../../store/slices/authSlice';
import { addNotification } from '../../store/slices/uiSlice';
import {
  Home, Shield, Database, List, Activity, Settings, Users, Key,
  ChevronDown, LogOut, User, Building
} from 'lucide-react';

const Sidebar = () => {
  const [organizationDropdownOpen, setOrganizationDropdownOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const { user } = useSelector(state => state.auth);
  const { stats } = useSelector(state => state.organization);

  const sections = [
    { id: 'dashboard', name: 'Dashboard', icon: Home, path: '/dashboard' },
    { id: 'darkweb', name: 'Darkweb Data', icon: Shield, path: '/darkweb' },
    { id: 'stealer-logs', name: 'Stealer Logs', icon: Database, path: '/stealer-logs' },
    { id: 'combolist', name: 'Combolist', icon: List, path: '/combolist' }
  ];

  const organizationSections = [
    { id: 'org-settings', name: 'Organization Settings', icon: Settings, path: '/organization/settings' },
    { id: 'user-management', name: 'User Management', icon: Users, path: '/organization/users' },
    { id: 'api-keys', name: 'API Keys', icon: Key, path: '/organization/api-keys' }
  ];

  const handleNavigation = (path) => {
    navigate(path);
  };

  const handleLogout = async () => {
    try {
      await dispatch(logoutUser()).unwrap();
      dispatch(addNotification({
        type: 'success',
        title: 'Logged Out',
        message: 'You have been successfully logged out'
      }));
      navigate('/login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const isActivePath = (path) => {
    return location.pathname === path;
  };

  return (
    <div className="fixed left-0 top-0 h-full w-64 bg-slate-900/50 backdrop-blur border-r border-slate-700 p-6 z-50 flex flex-col">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent mb-2">
          ThreatIntel
        </h1>
        <p className="text-xs text-slate-400">Advanced Analytics Platform</p>
      </div>

      {/* Organization Info */}
      {user && (
        <div className="mb-6 p-3 bg-slate-800/30 rounded-lg border border-slate-700">
          <div className="text-xs text-slate-400 mb-1">Organization</div>
          <div className="text-sm font-medium text-white truncate">
            {user.organizationName}
          </div>
          <div className="text-xs text-slate-500 mt-1">
            {stats?.activeUsers || 1} active users
          </div>
        </div>
      )}

      {/* Main Navigation */}
      <nav className="space-y-2 flex-1">
        {sections.map(section => {
          const Icon = section.icon;
          const isActive = isActivePath(section.path);

          return (
            <button
              key={section.id}
              onClick={() => handleNavigation(section.path)}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all ${
                isActive
                  ? 'bg-blue-500 text-white'
                  : 'text-slate-400 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="font-medium">{section.name}</span>
            </button>
          );
        })}

        {/* Organization Management Dropdown */}
        {user && (user.role === 'admin' || user.role === 'owner') && (
          <div className="pt-4">
            <button
              onClick={() => setOrganizationDropdownOpen(!organizationDropdownOpen)}
              className="w-full flex items-center justify-between px-4 py-3 text-slate-400 hover:bg-slate-800 hover:text-white rounded-lg transition-all"
            >
              <div className="flex items-center space-x-3">
                <Building className="w-5 h-5" />
                <span className="font-medium">Organization</span>
              </div>
              <ChevronDown className={`w-4 h-4 transition-transform ${organizationDropdownOpen ? 'rotate-180' : ''}`} />
            </button>

            {organizationDropdownOpen && (
              <div className="ml-4 mt-2 space-y-1">
                {organizationSections.map(section => {
                  const Icon = section.icon;
                  const isActive = isActivePath(section.path);

                  return (
                    <button
                      key={section.id}
                      onClick={() => handleNavigation(section.path)}
                      className={`w-full flex items-center space-x-3 px-4 py-2 rounded-lg transition-all text-sm ${
                        isActive
                          ? 'bg-blue-500 text-white'
                          : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      <span>{section.name}</span>
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        )}
      </nav>

      {/* User Profile & Logout */}
      <div className="border-t border-slate-700 pt-4">
        {user && (
          <div className="mb-4">
            <button
              onClick={() => setUserDropdownOpen(!userDropdownOpen)}
              className="w-full flex items-center justify-between p-3 text-slate-400 hover:bg-slate-800 hover:text-white rounded-lg transition-all"
            >
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                  <User className="w-4 h-4 text-white" />
                </div>
                <div className="text-left">
                  <div className="text-sm font-medium text-white">
                    {user.firstName} {user.lastName}
                  </div>
                  <div className="text-xs text-slate-400">{user.role}</div>
                </div>
              </div>
              <ChevronDown className={`w-4 h-4 transition-transform ${userDropdownOpen ? 'rotate-180' : ''}`} />
            </button>

            {userDropdownOpen && (
              <div className="mt-2 space-y-1">
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center space-x-3 px-4 py-2 text-red-400 hover:bg-red-900/20 hover:text-red-300 rounded-lg transition-all text-sm"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Logout</span>
                </button>
              </div>
            )}
          </div>
        )}

        {/* System Status */}
        <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700">
          <div className="flex items-center space-x-2 mb-2">
            <Activity className="w-4 h-4 text-green-400" />
            <span className="text-sm font-semibold text-green-400">System Online</span>
          </div>
          <p className="text-xs text-slate-400">All services operational</p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;