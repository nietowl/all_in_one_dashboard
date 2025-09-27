import React from 'react';
import { useSelector } from 'react-redux';
import {
  Shield, AlertTriangle, Database, Globe, TrendingUp, TrendingDown,
  Eye, BarChart3, ArrowRight, Download, RefreshCw, Search
} from 'lucide-react';

const HomePage = () => {
  const { user } = useSelector(state => state.auth);

  const threatStats = [
    {
      title: 'Active Threats',
      value: '247',
      change: '+12%',
      trend: 'up',
      icon: AlertTriangle,
      color: 'red',
      bgColor: 'bg-red-600/20',
      iconBg: 'bg-red-600'
    },
    {
      title: 'Assets Monitored',
      value: '15.2k',
      change: '+3%',
      trend: 'up',
      icon: Shield,
      color: 'blue',
      bgColor: 'bg-blue-600/20',
      iconBg: 'bg-blue-600'
    },
    {
      title: 'Compromised Credentials',
      value: '2,341',
      change: '+8%',
      trend: 'up',
      icon: Database,
      color: 'orange',
      bgColor: 'bg-orange-600/20',
      iconBg: 'bg-orange-600'
    },
    {
      title: 'Dark Web Mentions',
      value: '156',
      change: '-5%',
      trend: 'down',
      icon: Globe,
      color: 'green',
      bgColor: 'bg-emerald-600/20',
      iconBg: 'bg-emerald-600'
    }
  ];

  const recentAlerts = [
    {
      id: 1,
      type: 'critical',
      title: 'High-Value Credentials Detected',
      description: 'Domain admin credentials found on dark web marketplace',
      source: 'Dark Web Monitor',
      time: '2 minutes ago',
      status: 'investigating'
    },
    {
      id: 2,
      type: 'high',
      title: 'RedLine Stealer Campaign',
      description: 'New RedLine malware variant targeting finance sector',
      source: 'Stealer Intelligence',
      time: '15 minutes ago',
      status: 'new'
    },
    {
      id: 3,
      type: 'medium',
      title: 'Credential Stuffing Attack',
      description: 'Unusual login patterns detected across multiple accounts',
      source: 'Behavior Analytics',
      time: '1 hour ago',
      status: 'monitoring'
    }
  ];

  const quickActions = [
    { name: 'Threat Hunt', icon: Eye },
    { name: 'Generate Report', icon: BarChart3 },
    { name: 'Export Data', icon: Download },
    { name: 'System Scan', icon: RefreshCw }
  ];

  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="space-y-4">
        <div className="bg-gray-800/30 border border-gray-700 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-semibold text-white">
                Welcome back, {user?.firstName || 'Security Analyst'}
              </h1>
              <p className="text-sm text-gray-400 mt-1">Security Operations Dashboard</p>
              {user?.organizationName && (
                <div className="flex items-center space-x-2 mt-2">
                  <span className="px-2 py-1 bg-gray-700 text-gray-300 rounded text-xs">
                    {user.organizationName}
                  </span>
                  <span className="px-2 py-1 bg-gray-700 text-gray-300 rounded text-xs">
                    {user.role}
                  </span>
                </div>
              )}
            </div>
            <div className="text-right">
              <div className="text-xs text-gray-500 mb-1">Last Update</div>
              <div className="text-sm text-gray-300">{new Date().toLocaleTimeString()}</div>
            </div>
          </div>
        </div>

        {/* Compact Search Bar */}
        <div className="bg-slate-800/30 border border-slate-700 rounded-lg p-3">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search threats, IOCs, domains..."
              className="w-full pl-10 pr-4 py-2 bg-slate-700/50 border border-slate-600 rounded-lg text-sm text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

      </div>

      {/* Threat Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {threatStats.map((stat, index) => {
          const Icon = stat.icon;
          const TrendIcon = stat.trend === 'up' ? TrendingUp : TrendingDown;

          return (
            <div key={index} className={`${stat.bgColor} border border-slate-600 rounded-lg p-4`}>
              <div className="flex items-center justify-between mb-3">
                <div className={`p-2 rounded ${stat.iconBg}`}>
                  <Icon className="h-5 w-5 text-white" />
                </div>
                <div className={`flex items-center space-x-1 ${
                  stat.trend === 'up' ? 'text-red-400' : 'text-green-400'
                }`}>
                  <TrendIcon className="h-3 w-3" />
                  <span className="text-xs">{stat.change}</span>
                </div>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-white mb-1">{stat.value}</h3>
                <p className="text-gray-400 text-xs">{stat.title}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div className="bg-gray-800/30 border border-gray-700 rounded-lg p-4">
        <h3 className="text-lg font-semibold text-white mb-3">Quick Actions</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {quickActions.map((action, index) => {
            const Icon = action.icon;
            return (
              <button
                key={index}
                className="bg-gray-700 hover:bg-gray-600 border border-gray-600 rounded-lg p-3 flex flex-col items-center space-y-2 transition-colors"
              >
                <Icon className="h-4 w-4 text-gray-300" />
                <span className="text-xs text-gray-300">{action.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Dashboard Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Threat Alerts */}
        <div className="lg:col-span-2">
          <div className="bg-gray-800/30 border border-gray-700 rounded-lg p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-white">Recent Threat Alerts</h3>
              <button className="text-gray-400 hover:text-white text-sm flex items-center space-x-1">
                <span>View All</span>
                <ArrowRight className="h-3 w-3" />
              </button>
            </div>
            <div className="space-y-4">
              {recentAlerts.map((alert) => (
                <div key={alert.id} className="bg-gray-700/50 border border-gray-600 rounded p-3">
                  <div className="flex items-start space-x-3">
                    <div className={`p-2 rounded ${
                      alert.type === 'critical' ? 'bg-red-900/50 text-red-400' :
                      alert.type === 'high' ? 'bg-orange-900/50 text-orange-400' :
                      'bg-yellow-900/50 text-yellow-400'
                    }`}>
                      <AlertTriangle className="h-4 w-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium text-white text-sm truncate">{alert.title}</h4>
                        <span className={`px-2 py-1 text-xs rounded ${
                          alert.status === 'investigating' ? 'bg-blue-900/50 text-blue-300' :
                          alert.status === 'new' ? 'bg-red-900/50 text-red-300' :
                          'bg-yellow-900/50 text-yellow-300'
                        }`}>
                          {alert.status}
                        </span>
                      </div>
                      <p className="text-gray-400 text-xs mt-1">{alert.description}</p>
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-xs text-gray-500">{alert.source}</span>
                        <span className="text-xs text-gray-500">{alert.time}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Threat Distribution */}
        <div>
          <div className="bg-gray-800/30 border border-gray-700 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-white mb-4">Threat Distribution</h3>
            <div className="space-y-3">
              {[
                { name: 'Info Stealers', percentage: 45, color: 'bg-gray-600' },
                { name: 'Credential Dumps', percentage: 30, color: 'bg-gray-500' },
                { name: 'Dark Web Mentions', percentage: 15, color: 'bg-gray-400' },
                { name: 'Other Threats', percentage: 10, color: 'bg-gray-300' }
              ].map((threat, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-300">{threat.name}</span>
                    <span className="text-white font-medium">{threat.percentage}%</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded h-2">
                    <div
                      className={`${threat.color} h-2 rounded transition-all duration-300`}
                      style={{ width: `${threat.percentage}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;