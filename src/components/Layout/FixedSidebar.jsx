import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../../store/slices/authSlice';
import { addNotification } from '../../store/slices/uiSlice';
import {
  Home,
  Globe,
  Database,
  List,
  Users,
  Key,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Shield,
  Building,
  Settings
} from 'lucide-react';

const FixedSidebar = ({ onToggle }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
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

  const handleNavigation = (path) => {
    console.log('Navigating to:', path);
    navigate(path);
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  const mainNavigationItems = [
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
      name: 'Credential Intel',
      path: '/combolist',
      icon: List,
      description: 'Leaked credentials',
      count: '892'
    }
  ];

  const organizationItems = [
    {
      name: 'Organization',
      path: '/organization/settings',
      icon: Building,
      description: 'Manage settings'
    },
    {
      name: 'Team Access',
      path: '/organization/users',
      icon: Users,
      description: 'User permissions'
    },
    {
      name: 'API Center',
      path: '/organization/api-keys',
      icon: Key,
      description: 'Integration keys'
    }
  ];

  return (
    <div className={`h-full flex flex-col transition-all duration-300 bg-slate-900 border-r border-slate-700 ${
      isCollapsed ? 'w-16' : 'w-80'
    }`}>
      {/* Header */}
      <div className="p-4 border-b border-slate-700">
        <div className="flex items-center justify-between">
          {!isCollapsed && (
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center">
                <Shield className="h-5 w-5 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-semibold text-white">FortiCore</h1>
                <p className="text-xs text-slate-400">Threat Intelligence</p>
              </div>
            </div>
          )}
          <button
            onClick={() => {
              const newCollapsedState = !isCollapsed;
              setIsCollapsed(newCollapsedState);
              onToggle?.(newCollapsedState);
            }}
            className="p-2 rounded-lg transition-colors hover:bg-slate-700 text-slate-400 hover:text-white"
          >
            {isCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {!isCollapsed && (
          <h2 className="text-xs font-medium uppercase tracking-wider mb-4 text-slate-400">
            Main Navigation
          </h2>
        )}

        <div className="space-y-1">
          {mainNavigationItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.path);

            return (
              <button
                key={item.path}
                onClick={() => handleNavigation(item.path)}
                className={`w-full group flex items-center px-3 py-3 rounded-lg transition-all duration-200 text-left ${
                  active
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                }`}
              >
                <div className="flex items-center justify-center w-6 h-6 mr-3">
                  <Icon className="h-5 w-5" />
                </div>
                {!isCollapsed && (
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-sm truncate">{item.name}</span>
                      <span className={`px-2 py-0.5 text-xs rounded-full ml-2 ${
                        active ? 'bg-blue-700 text-blue-100' : 'bg-slate-700 text-slate-300'
                      }`}>
                        {item.count}
                      </span>
                    </div>
                    <p className="text-xs opacity-75 mt-0.5">{item.description}</p>
                  </div>
                )}
              </button>
            );
          })}
        </div>

        {/* Organization Section */}
        <div className="pt-6">
          {!isCollapsed && (
            <h2 className="text-xs font-medium uppercase tracking-wider mb-4 text-slate-400">
              Organization
            </h2>
          )}

          <div className="space-y-1">
            {organizationItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.path);

              return (
                <button
                  key={item.path}
                  onClick={() => handleNavigation(item.path)}
                  className={`w-full group flex items-center px-3 py-3 rounded-lg transition-all duration-200 text-left ${
                    active
                      ? 'bg-green-600 text-white shadow-lg'
                      : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                  }`}
                >
                  <div className="flex items-center justify-center w-6 h-6 mr-3">
                    <Icon className="h-5 w-5" />
                  </div>
                  {!isCollapsed && (
                    <div className="flex-1 min-w-0">
                      <span className="font-medium text-sm block">{item.name}</span>
                      <p className="text-xs opacity-75">{item.description}</p>
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </nav>

      {/* User Profile & Logout */}
      <div className="p-4 border-t border-slate-700">
        {/* User Profile */}
        {user && (
          <div className="flex items-center space-x-3 mb-4">
            <div className="relative">
              <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center">
                <span className="text-sm font-semibold text-white">
                  {user.firstName?.charAt(0) || user.email?.charAt(0) || 'U'}
                </span>
              </div>
              <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 rounded-full border-2 border-slate-900"></div>
            </div>
            {!isCollapsed && (
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-white truncate">
                  {user.firstName && user.lastName
                    ? `${user.firstName} ${user.lastName}`
                    : user.email
                  }
                </p>
                <p className="text-xs text-slate-400 truncate">FortiCore Security</p>
              </div>
            )}
          </div>
        )}

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center space-x-2 p-3 rounded-lg transition-colors bg-red-600/20 text-red-300 hover:bg-red-600 hover:text-white"
        >
          <LogOut className="h-4 w-4" />
          {!isCollapsed && <span className="text-sm font-medium">Logout</span>}
        </button>
      </div>
    </div>
  );
};

export default FixedSidebar;