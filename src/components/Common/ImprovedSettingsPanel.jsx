import React, { useState } from 'react';
import { Settings, X, User, Shield, Bell, Monitor, Save, Crown, Calendar, CreditCard, CheckCircle } from 'lucide-react';

const ImprovedSettingsPanel = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('account');

  // Mock user data - in real app this would come from auth context
  const userAccount = {
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@forticore.com',
    role: 'Security Analyst',
    plan: 'Enterprise Pro',
    planExpiry: '2024-12-31',
    subscription: {
      status: 'active',
      features: [
        'Unlimited Threat Intelligence',
        'Real-time Dark Web Monitoring',
        'Advanced Analytics Dashboard',
        'API Access & Integrations',
        'Priority Support',
        'Custom Threat Feeds'
      ],
      limits: {
        apiCalls: { used: 2847, total: 10000 },
        storage: { used: 45.2, total: 100 }, // GB
        users: { used: 12, total: 25 }
      }
    },
    permissions: [
      'threat_intelligence_view',
      'darkweb_monitoring',
      'stealer_logs_access',
      'credential_analysis',
      'export_data',
      'manage_users'
    ],
    lastLogin: '2024-01-15T10:30:00Z',
    accountCreated: '2023-06-15T09:00:00Z'
  };

  const [settings, setSettings] = useState({
    general: {
      theme: 'dark',
      language: 'en',
      timezone: 'UTC',
      autoRefresh: true,
      refreshInterval: 30
    },
    security: {
      twoFactorAuth: true,
      sessionTimeout: 60,
      passwordExpiry: 90,
      loginNotifications: true
    },
    notifications: {
      emailAlerts: true,
      pushNotifications: true,
      threatAlerts: true,
      systemUpdates: false,
      alertFrequency: 'immediate'
    },
    monitoring: {
      realTimeMonitoring: true,
      dataRetention: 365,
      alertThreshold: 'medium',
      autoExport: false
    }
  });

  const handleSettingChange = (category, key, value) => {
    setSettings(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [key]: value
      }
    }));
  };

  const handleSave = () => {
    console.log('Saving settings:', settings);
    alert('Settings saved successfully!');
  };

  const tabs = [
    { id: 'account', name: 'Account', icon: User },
    { id: 'security', name: 'Security', icon: Shield },
    { id: 'notifications', name: 'Notifications', icon: Bell },
    { id: 'monitoring', name: 'Monitoring', icon: Monitor }
  ];

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const renderAccountTab = () => (
    <div className="space-y-6">
      {/* User Profile Section */}
      <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
          <User className="h-5 w-5 mr-2" />
          Profile Information
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">First Name</label>
            <input
              type="text"
              value={userAccount.firstName}
              className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white"
              readOnly
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Last Name</label>
            <input
              type="text"
              value={userAccount.lastName}
              className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white"
              readOnly
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Email</label>
            <input
              type="email"
              value={userAccount.email}
              className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white"
              readOnly
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Role</label>
            <input
              type="text"
              value={userAccount.role}
              className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white"
              readOnly
            />
          </div>
        </div>
      </div>

      {/* Subscription Information */}
      <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
          <Crown className="h-5 w-5 mr-2 text-yellow-400" />
          Subscription Details
        </h3>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h4 className="text-xl font-bold text-white">{userAccount.plan}</h4>
                <p className="text-slate-400">Current Plan</p>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-5 w-5 text-green-400" />
                <span className="text-green-400 font-medium">Active</span>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-slate-300">Expires on:</span>
                <span className="text-white font-medium">{formatDate(userAccount.planExpiry)}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-300">Account created:</span>
                <span className="text-white font-medium">{formatDate(userAccount.accountCreated)}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-300">Last login:</span>
                <span className="text-white font-medium">{formatDate(userAccount.lastLogin)}</span>
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Plan Features</h4>
            <div className="space-y-2">
              {userAccount.subscription.features.map((feature, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-400" />
                  <span className="text-slate-300 text-sm">{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Usage Statistics */}
      <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Usage Statistics</h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-slate-300">API Calls</span>
              <span className="text-white font-medium">
                {userAccount.subscription.limits.apiCalls.used.toLocaleString()} / {userAccount.subscription.limits.apiCalls.total.toLocaleString()}
              </span>
            </div>
            <div className="w-full bg-slate-700 rounded-full h-2">
              <div
                className="bg-blue-500 h-2 rounded-full"
                style={{ width: `${(userAccount.subscription.limits.apiCalls.used / userAccount.subscription.limits.apiCalls.total) * 100}%` }}
              ></div>
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-slate-300">Storage</span>
              <span className="text-white font-medium">
                {userAccount.subscription.limits.storage.used} GB / {userAccount.subscription.limits.storage.total} GB
              </span>
            </div>
            <div className="w-full bg-slate-700 rounded-full h-2">
              <div
                className="bg-green-500 h-2 rounded-full"
                style={{ width: `${(userAccount.subscription.limits.storage.used / userAccount.subscription.limits.storage.total) * 100}%` }}
              ></div>
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-slate-300">Team Members</span>
              <span className="text-white font-medium">
                {userAccount.subscription.limits.users.used} / {userAccount.subscription.limits.users.total}
              </span>
            </div>
            <div className="w-full bg-slate-700 rounded-full h-2">
              <div
                className="bg-purple-500 h-2 rounded-full"
                style={{ width: `${(userAccount.subscription.limits.users.used / userAccount.subscription.limits.users.total) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      {/* Permissions */}
      <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Access Permissions</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {userAccount.permissions.map((permission, index) => (
            <div key={index} className="flex items-center space-x-2 px-3 py-2 bg-slate-700 rounded-lg">
              <CheckCircle className="h-4 w-4 text-green-400" />
              <span className="text-slate-300 text-sm capitalize">
                {permission.replace(/_/g, ' ')}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderSecurityTab = () => (
    <div className="space-y-6">
      <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Security Settings</h3>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <label className="text-sm font-medium text-slate-300">Two-Factor Authentication</label>
              <p className="text-xs text-slate-400">Add an extra layer of security</p>
            </div>
            <button
              onClick={() => handleSettingChange('security', 'twoFactorAuth', !settings.security.twoFactorAuth)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                settings.security.twoFactorAuth ? 'bg-blue-600' : 'bg-slate-600'
              }`}
            >
              <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                settings.security.twoFactorAuth ? 'translate-x-6' : 'translate-x-1'
              }`} />
            </button>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Session Timeout (minutes)</label>
            <input
              type="number"
              value={settings.security.sessionTimeout}
              onChange={(e) => handleSettingChange('security', 'sessionTimeout', parseInt(e.target.value))}
              className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white"
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <label className="text-sm font-medium text-slate-300">Login Notifications</label>
              <p className="text-xs text-slate-400">Get notified of new logins</p>
            </div>
            <button
              onClick={() => handleSettingChange('security', 'loginNotifications', !settings.security.loginNotifications)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                settings.security.loginNotifications ? 'bg-blue-600' : 'bg-slate-600'
              }`}
            >
              <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                settings.security.loginNotifications ? 'translate-x-6' : 'translate-x-1'
              }`} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderNotificationsTab = () => (
    <div className="space-y-6">
      <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Notification Preferences</h3>

        <div className="space-y-4">
          {[
            { key: 'emailAlerts', label: 'Email Alerts', desc: 'Receive alerts via email' },
            { key: 'threatAlerts', label: 'Threat Alerts', desc: 'Critical threat notifications' },
            { key: 'systemUpdates', label: 'System Updates', desc: 'Platform update notifications' }
          ].map((item) => (
            <div key={item.key} className="flex items-center justify-between">
              <div>
                <label className="text-sm font-medium text-slate-300">{item.label}</label>
                <p className="text-xs text-slate-400">{item.desc}</p>
              </div>
              <button
                onClick={() => handleSettingChange('notifications', item.key, !settings.notifications[item.key])}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  settings.notifications[item.key] ? 'bg-blue-600' : 'bg-slate-600'
                }`}
              >
                <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  settings.notifications[item.key] ? 'translate-x-6' : 'translate-x-1'
                }`} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderMonitoringTab = () => (
    <div className="space-y-6">
      <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Monitoring Settings</h3>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <label className="text-sm font-medium text-slate-300">Real-time Monitoring</label>
              <p className="text-xs text-slate-400">Enable live threat monitoring</p>
            </div>
            <button
              onClick={() => handleSettingChange('monitoring', 'realTimeMonitoring', !settings.monitoring.realTimeMonitoring)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                settings.monitoring.realTimeMonitoring ? 'bg-blue-600' : 'bg-slate-600'
              }`}
            >
              <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                settings.monitoring.realTimeMonitoring ? 'translate-x-6' : 'translate-x-1'
              }`} />
            </button>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Data Retention (days)</label>
            <input
              type="number"
              value={settings.monitoring.dataRetention}
              onChange={(e) => handleSettingChange('monitoring', 'dataRetention', parseInt(e.target.value))}
              className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Alert Threshold</label>
            <select
              value={settings.monitoring.alertThreshold}
              onChange={(e) => handleSettingChange('monitoring', 'alertThreshold', e.target.value)}
              className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white"
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
              <option value="critical">Critical Only</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'account': return renderAccountTab();
      case 'security': return renderSecurityTab();
      case 'notifications': return renderNotificationsTab();
      case 'monitoring': return renderMonitoringTab();
      default: return renderAccountTab();
    }
  };

  return (
    <>
      {/* Settings Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 rounded-lg transition-colors duration-200 hover:bg-slate-700"
      >
        <Settings className="h-5 w-5 text-slate-300" />
      </button>

      {/* Settings Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          <div className="absolute inset-0 bg-black bg-opacity-50" onClick={() => setIsOpen(false)} />
          <div className="absolute right-0 top-0 h-full w-[600px] bg-slate-900 border-l border-slate-700 shadow-xl overflow-y-auto">
            {/* Header */}
            <div className="sticky top-0 bg-slate-900 border-b border-slate-700 p-6 z-10">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-white">Settings</h2>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-slate-400 hover:text-white"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              <p className="text-sm text-slate-400 mt-1">
                Manage your FortiCore account and preferences
              </p>
            </div>

            {/* Tabs */}
            <div className="border-b border-slate-700">
              <div className="flex space-x-1 p-4">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                        activeTab === tab.id
                          ? 'bg-blue-600 text-white'
                          : 'text-slate-300 hover:bg-slate-700'
                      }`}
                    >
                      <Icon className="h-4 w-4" />
                      <span>{tab.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Content */}
            <div className="p-6">
              {renderTabContent()}
            </div>

            {/* Footer */}
            <div className="sticky bottom-0 bg-slate-900 border-t border-slate-700 p-6">
              <div className="flex items-center justify-between">
                <button
                  onClick={() => setIsOpen(false)}
                  className="px-4 py-2 text-slate-300 hover:text-white transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors flex items-center space-x-2"
                >
                  <Save className="h-4 w-4" />
                  <span>Save Settings</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ImprovedSettingsPanel;