import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../../store/slices/authSlice';
import { addNotification } from '../../store/slices/uiSlice';
import { filterNavigationByPermissions, hasPermission, PERMISSIONS } from '../../utils/permissions';
import Button3D from '../UI/Button3D';
import GlassPanel from '../UI/GlassPanel';
import {
  Home,
  Globe,
  Database,
  List,
  Settings,
  Users,
  Key,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Shield,
  Building,
  Activity,
  Bell,
  Search,
  TrendingUp,
  Eye,
  AlertTriangle,
  Zap
} from 'lucide-react';

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
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
      name: 'Credential Intel',
      path: '/combolist',
      icon: List,
      description: 'Leaked credentials',
      count: '892'
    }
  ];

  // Show all navigation items for now (permissions can be added later)
  const navigationItems = allNavigationItems;

  const quickActions = [
    {
      name: 'Threat Hunt',
      icon: Search
    },
    {
      name: 'Alerts',
      icon: Bell,
      badge: '3'
    },
    {
      name: 'Live Feed',
      icon: Activity
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
    <div className={`
      bg-slate-900 border-r border-slate-700
      text-white h-full flex flex-col transition-all duration-300
      ${isCollapsed ? 'w-16' : 'w-80'}
    `}>
      {/* Header */}
      <div className="bg-slate-800/50 border border-slate-700 rounded-lg m-3 p-4">
        <div className="flex items-center justify-between">
          {!isCollapsed && (
            <div className="flex items-center space-x-3">
              <div className="relative">
                <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                  <Shield className="h-6 w-6 text-white" />
                </div>
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-slate-900"></div>
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">
                  ThreatScope
                </h1>
                <p className="text-xs text-slate-400 font-medium">Security Intelligence Platform</p>
              </div>
            </div>
          )}
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-2 hover:bg-slate-700 rounded-lg transition-colors"
          >
            {isCollapsed ? (
              <ChevronRight className="h-4 w-4 text-slate-400" />
            ) : (
              <ChevronLeft className="h-4 w-4 text-slate-400" />
            )}
          </button>
        </div>
      </div>

      {/* Quick Actions */}
      {!isCollapsed && (
        <div className="mx-3 mb-4">
          <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-3">
            <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
              Quick Actions
            </h3>
            <div className="grid grid-cols-3 gap-2">
              {quickActions.map((action, index) => {
                const Icon = action.icon;
                return (
                  <button
                    key={index}
                    className="relative p-3 rounded-lg bg-slate-700 hover:bg-slate-600 transition-colors group"
                    onClick={() => {
                      if (action.name === 'Threat Hunt') {
                        console.log('Opening threat hunt...');
                      } else if (action.name === 'Alerts') {
                        console.log('Opening alerts...');
                      } else if (action.name === 'Live Feed') {
                        console.log('Opening live feed...');
                      }
                    }}
                  >
                    <Icon className="h-4 w-4 text-slate-300 group-hover:text-white mb-1" />
                    <p className="text-xs text-slate-300 group-hover:text-white font-medium">{action.name}</p>
                    {action.badge && (
                      <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                        {action.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Navigation */}
      <nav className="flex-1 px-3 space-y-2 overflow-y-auto custom-scrollbar">
        {/* Main Navigation */}
        <div>
          {!isCollapsed && (
            <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3 px-3">
              <Eye className="h-3 w-3 mr-2 inline" />
              Intelligence Center
            </h2>
          )}
          {navigationItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `group relative block mb-2 transition-all duration-300 ${
                    isActive ? 'scale-[1.02]' : 'hover:scale-[1.01]'
                  }`
                }
              >
                {({ isActive }) => (
                  <div
                    className={`
                      p-4 cursor-pointer transition-all duration-300 rounded-lg border
                      ${isActive
                        ? 'bg-blue-600/20 border-blue-400/50 shadow-lg'
                        : 'bg-slate-800/30 border-slate-700 hover:bg-slate-700/50 hover:border-slate-600'
                      }
                    `}
                  >
                    <div className="flex items-center space-x-3">
                      <div className={`p-2 rounded-lg ${
                        isActive ? 'bg-blue-600' : 'bg-slate-700'
                      }`}>
                        <Icon className="h-5 w-5 text-white" />
                      </div>
                      {!isCollapsed && (
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <span className={`font-semibold ${
                              isActive ? 'text-blue-300' : 'text-white group-hover:text-blue-300'
                            }`}>
                              {item.name}
                            </span>
                            <span className={`
                              px-2 py-1 text-xs font-bold rounded-full
                              ${isActive
                                ? 'bg-blue-400/20 text-blue-300'
                                : 'bg-slate-700 text-slate-300 group-hover:bg-slate-600'
                              }
                            `}>
                              {item.count}
                            </span>
                          </div>
                          <p className={`text-xs mt-1 ${
                            isActive ? 'text-blue-400/80' : 'text-slate-400 group-hover:text-slate-300'
                          }`}>
                            {item.description}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </NavLink>
            );
          })}
        </div>

        {/* Organization Management */}
        <div className="pt-4">
          {!isCollapsed && (
            <h2 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3 px-3">
              <Building className="h-3 w-3 mr-2 inline" />
              Administration
            </h2>
          )}
          {organizationItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `group block mb-2 transition-all duration-300 ${
                    isActive ? 'scale-[1.02]' : 'hover:scale-[1.01]'
                  }`
                }
              >
                {({ isActive }) => (
                  <div
                    className={`
                      p-3 cursor-pointer transition-all duration-300 rounded-lg border
                      ${isActive
                        ? 'bg-emerald-600/20 border-emerald-400/50'
                        : 'bg-slate-800/30 border-slate-700 hover:bg-slate-700/50 hover:border-slate-600'
                      }
                    `}
                  >
                    <div className="flex items-center space-x-3">
                      <Icon className={`h-5 w-5 ${
                        isActive ? 'text-emerald-400' : 'text-slate-400 group-hover:text-emerald-400'
                      }`} />
                      {!isCollapsed && (
                        <div>
                          <span className={`font-medium text-sm ${
                            isActive ? 'text-emerald-300' : 'text-white group-hover:text-emerald-300'
                          }`}>
                            {item.name}
                          </span>
                          <p className={`text-xs ${
                            isActive ? 'text-emerald-400/80' : 'text-slate-400 group-hover:text-slate-300'
                          }`}>
                            {item.description}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </NavLink>
            );
          })}
        </div>
      </nav>

      {/* User Profile */}
      <div className="p-3 space-y-3">

        {/* User Profile */}
        {user && (
          <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-4">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center">
                  <span className="text-sm font-bold text-white">
                    {user.firstName?.charAt(0) || user.email?.charAt(0) || 'U'}
                  </span>
                </div>
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-slate-900 flex items-center justify-center">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                </div>
              </div>
              {!isCollapsed && (
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-white truncate">
                    {user.firstName && user.lastName
                      ? `${user.firstName} ${user.lastName}`
                      : user.email
                    }
                  </p>
                  <p className="text-xs text-slate-400 truncate">
                    {user.organizationName || 'No Organization'}
                  </p>
                  <div className="flex items-center space-x-2 mt-1">
                    <span className="text-xs bg-indigo-600/20 text-indigo-300 px-2 py-0.5 rounded">
                      {user.role || 'User'}
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className={`w-full bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors flex items-center justify-center space-x-2 ${isCollapsed ? 'p-3' : 'p-3'}`}
        >
          <LogOut className="h-4 w-4" />
          {!isCollapsed && <span className="text-sm font-medium">Secure Logout</span>}
        </button>
      </div>
    </div>
  );
};

export default Sidebar;