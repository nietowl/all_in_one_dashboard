import React, { useState } from 'react';
import { Settings, X, User, Shield, Bell, Monitor, Save, RefreshCw } from 'lucide-react';

const SettingsPanel = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('general');
  const [settings, setSettings] = useState({
    general: {
      theme: 'dark',
      language: 'en',
      timezone: 'UTC',
      autoRefresh: true,
      refreshInterval: 30
    },
    security: {
      twoFactorAuth: false,
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
    // Here you would typically send settings to an API
    alert('Settings saved successfully!');
  };

  const tabs = [
    { id: 'general', name: 'General', icon: Settings },
    { id: 'security', name: 'Security', icon: Shield },
    { id: 'notifications', name: 'Notifications', icon: Bell },
    { id: 'monitoring', name: 'Monitoring', icon: Monitor }
  ];

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
          <div className="absolute right-0 top-0 h-full w-96 bg-slate-800 border-l border-slate-700 shadow-xl">
            {/* Header */}
            <div className="p-6 border-b border-slate-700">
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
                Configure your FortiCore dashboard preferences
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
                      className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
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
            <div className="p-6 space-y-6 h-full overflow-y-auto">
              {activeTab === 'general' && (
                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-white">General Settings</h3>

                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">Theme</label>
                    <select
                      value={settings.general.theme}
                      onChange={(e) => handleSettingChange('general', 'theme', e.target.value)}
                      className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white"
                    >
                      <option value="dark">Dark</option>
                      <option value="light">Light</option>
                      <option value="auto">Auto</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">Language</label>
                    <select
                      value={settings.general.language}
                      onChange={(e) => handleSettingChange('general', 'language', e.target.value)}
                      className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white"
                    >
                      <option value="en">English</option>
                      <option value="es">Spanish</option>
                      <option value="fr">French</option>
                      <option value="de">German</option>
                    </select>
                  </div>

                  <div className="flex items-center justify-between">
                    <label className="text-sm font-medium text-slate-300">Auto Refresh</label>
                    <input
                      type="checkbox"
                      checked={settings.general.autoRefresh}
                      onChange={(e) => handleSettingChange('general', 'autoRefresh', e.target.checked)}
                      className="rounded"
                    />
                  </div>
                </div>
              )}

              {activeTab === 'security' && (
                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-white">Security Settings</h3>

                  <div className="flex items-center justify-between">
                    <label className="text-sm font-medium text-slate-300">Two-Factor Authentication</label>
                    <input
                      type="checkbox"
                      checked={settings.security.twoFactorAuth}
                      onChange={(e) => handleSettingChange('security', 'twoFactorAuth', e.target.checked)}
                      className="rounded"
                    />
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
                    <label className="text-sm font-medium text-slate-300">Login Notifications</label>
                    <input
                      type="checkbox"
                      checked={settings.security.loginNotifications}
                      onChange={(e) => handleSettingChange('security', 'loginNotifications', e.target.checked)}
                      className="rounded"
                    />
                  </div>
                </div>
              )}

              {activeTab === 'notifications' && (
                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-white">Notification Settings</h3>

                  <div className="flex items-center justify-between">
                    <label className="text-sm font-medium text-slate-300">Email Alerts</label>
                    <input
                      type="checkbox"
                      checked={settings.notifications.emailAlerts}
                      onChange={(e) => handleSettingChange('notifications', 'emailAlerts', e.target.checked)}
                      className="rounded"
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <label className="text-sm font-medium text-slate-300">Threat Alerts</label>
                    <input
                      type="checkbox"
                      checked={settings.notifications.threatAlerts}
                      onChange={(e) => handleSettingChange('notifications', 'threatAlerts', e.target.checked)}
                      className="rounded"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">Alert Frequency</label>
                    <select
                      value={settings.notifications.alertFrequency}
                      onChange={(e) => handleSettingChange('notifications', 'alertFrequency', e.target.value)}
                      className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white"
                    >
                      <option value="immediate">Immediate</option>
                      <option value="hourly">Hourly</option>
                      <option value="daily">Daily</option>
                      <option value="weekly">Weekly</option>
                    </select>
                  </div>
                </div>
              )}

              {activeTab === 'monitoring' && (
                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-white">Monitoring Settings</h3>

                  <div className="flex items-center justify-between">
                    <label className="text-sm font-medium text-slate-300">Real-time Monitoring</label>
                    <input
                      type="checkbox"
                      checked={settings.monitoring.realTimeMonitoring}
                      onChange={(e) => handleSettingChange('monitoring', 'realTimeMonitoring', e.target.checked)}
                      className="rounded"
                    />
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
              )}
            </div>

            {/* Footer */}
            <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-slate-700 bg-slate-800">
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

export default SettingsPanel;