import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import {
  Building,
  Globe,
  Shield,
  Bell,
  Users,
  Database,
  Settings,
  Save,
  Upload,
  Download,
  AlertTriangle,
  CheckCircle,
  Eye,
  EyeOff,
  Clock,
  Mail,
  Lock,
  Key,
  Zap
} from 'lucide-react';

const OrganizationSettings = () => {
  const { user } = useSelector(state => state.auth);

  const [settings, setSettings] = useState({
    // General Settings
    organizationName: 'TraceCore Security',
    domain: 'tracecore.com',
    description: 'Advanced threat intelligence and security monitoring platform',
    timezone: 'UTC-05:00',
    language: 'en',

    // Security Settings
    twoFactorRequired: true,
    passwordMinLength: 12,
    passwordComplexity: true,
    sessionTimeout: 24, // hours
    allowedDomains: ['tracecore.com', 'security.tracecore.com'],
    ipWhitelist: ['192.168.1.0/24', '10.0.0.0/8'],

    // Data Settings
    dataRetention: 90, // days
    automaticBackup: true,
    backupFrequency: 'daily',
    exportFormats: ['json', 'csv', 'xml'],

    // Notification Settings
    emailNotifications: true,
    threatAlerts: true,
    systemMaintenance: true,
    weeklyReports: true,
    alertThresholds: {
      critical: 1,
      high: 5,
      medium: 20
    },

    // Integration Settings
    apiRateLimit: 1000, // requests per hour
    webhookEndpoints: ['https://api.tracecore.com/webhooks/alerts'],
    syslogEnabled: true,
    syslogServer: 'logs.tracecore.com:514'
  });

  const [activeTab, setActiveTab] = useState('general');
  const [unsavedChanges, setUnsavedChanges] = useState(false);

  const handleSettingChange = (path, value) => {
    const newSettings = { ...settings };
    const keys = path.split('.');
    let current = newSettings;

    for (let i = 0; i < keys.length - 1; i++) {
      current = current[keys[i]];
    }

    current[keys[keys.length - 1]] = value;
    setSettings(newSettings);
    setUnsavedChanges(true);
  };

  const handleSaveSettings = () => {
    // In real app, this would call API to save settings
    console.log('Saving settings:', settings);
    setUnsavedChanges(false);
    // Show success notification
  };

  const tabs = [
    { id: 'general', name: 'General', icon: Building },
    { id: 'security', name: 'Security', icon: Shield },
    { id: 'data', name: 'Data & Storage', icon: Database },
    { id: 'notifications', name: 'Notifications', icon: Bell },
    { id: 'integrations', name: 'Integrations', icon: Zap }
  ];

  const GeneralSettings = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            Organization Name
          </label>
          <input
            type="text"
            value={settings.organizationName}
            onChange={(e) => handleSettingChange('organizationName', e.target.value)}
            className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            Primary Domain
          </label>
          <input
            type="text"
            value={settings.domain}
            onChange={(e) => handleSettingChange('domain', e.target.value)}
            className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-300 mb-2">
          Description
        </label>
        <textarea
          value={settings.description}
          onChange={(e) => handleSettingChange('description', e.target.value)}
          rows={3}
          className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            Timezone
          </label>
          <select
            value={settings.timezone}
            onChange={(e) => handleSettingChange('timezone', e.target.value)}
            className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="UTC-05:00">UTC-05:00 (Eastern)</option>
            <option value="UTC-06:00">UTC-06:00 (Central)</option>
            <option value="UTC-07:00">UTC-07:00 (Mountain)</option>
            <option value="UTC-08:00">UTC-08:00 (Pacific)</option>
            <option value="UTC+00:00">UTC+00:00 (GMT)</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            Language
          </label>
          <select
            value={settings.language}
            onChange={(e) => handleSettingChange('language', e.target.value)}
            className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="en">English</option>
            <option value="es">Spanish</option>
            <option value="fr">French</option>
            <option value="de">German</option>
          </select>
        </div>
      </div>
    </div>
  );

  const SecuritySettings = () => (
    <div className="space-y-6">
      <div className="bg-slate-700/30 border border-slate-600 rounded-lg p-4">
        <h4 className="text-lg font-semibold text-white mb-4 flex items-center">
          <Lock className="h-5 w-5 mr-2" />
          Authentication & Access
        </h4>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <label className="text-sm font-medium text-slate-300">Two-Factor Authentication</label>
              <p className="text-xs text-slate-400">Require 2FA for all users</p>
            </div>
            <button
              onClick={() => handleSettingChange('twoFactorRequired', !settings.twoFactorRequired)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                settings.twoFactorRequired ? 'bg-blue-600' : 'bg-slate-600'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  settings.twoFactorRequired ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Minimum Password Length
              </label>
              <input
                type="number"
                value={settings.passwordMinLength}
                onChange={(e) => handleSettingChange('passwordMinLength', parseInt(e.target.value))}
                min="8"
                max="32"
                className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Session Timeout (hours)
              </label>
              <input
                type="number"
                value={settings.sessionTimeout}
                onChange={(e) => handleSettingChange('sessionTimeout', parseInt(e.target.value))}
                min="1"
                max="168"
                className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-slate-700/30 border border-slate-600 rounded-lg p-4">
        <h4 className="text-lg font-semibold text-white mb-4 flex items-center">
          <Globe className="h-5 w-5 mr-2" />
          Domain & IP Restrictions
        </h4>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Allowed Email Domains
            </label>
            <div className="flex flex-wrap gap-2 mb-2">
              {settings.allowedDomains.map((domain, index) => (
                <span
                  key={index}
                  className="bg-blue-600/20 text-blue-300 px-2 py-1 rounded text-sm flex items-center"
                >
                  {domain}
                  <button
                    onClick={() => {
                      const newDomains = settings.allowedDomains.filter((_, i) => i !== index);
                      handleSettingChange('allowedDomains', newDomains);
                    }}
                    className="ml-2 hover:text-red-300"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
            <input
              type="text"
              placeholder="Add domain (e.g., company.com)"
              className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              onKeyPress={(e) => {
                if (e.key === 'Enter' && e.target.value.trim()) {
                  const newDomains = [...settings.allowedDomains, e.target.value.trim()];
                  handleSettingChange('allowedDomains', newDomains);
                  e.target.value = '';
                }
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );

  const DataSettings = () => (
    <div className="space-y-6">
      <div className="bg-slate-700/30 border border-slate-600 rounded-lg p-4">
        <h4 className="text-lg font-semibold text-white mb-4 flex items-center">
          <Database className="h-5 w-5 mr-2" />
          Data Retention & Backup
        </h4>

        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Data Retention Period (days)
              </label>
              <input
                type="number"
                value={settings.dataRetention}
                onChange={(e) => handleSettingChange('dataRetention', parseInt(e.target.value))}
                min="30"
                max="365"
                className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Backup Frequency
              </label>
              <select
                value={settings.backupFrequency}
                onChange={(e) => handleSettingChange('backupFrequency', e.target.value)}
                className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="hourly">Hourly</option>
                <option value="daily">Daily</option>
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
              </select>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <label className="text-sm font-medium text-slate-300">Automatic Backup</label>
              <p className="text-xs text-slate-400">Enable automated data backups</p>
            </div>
            <button
              onClick={() => handleSettingChange('automaticBackup', !settings.automaticBackup)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                settings.automaticBackup ? 'bg-blue-600' : 'bg-slate-600'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  settings.automaticBackup ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
        </div>
      </div>

      <div className="bg-slate-700/30 border border-slate-600 rounded-lg p-4">
        <h4 className="text-lg font-semibold text-white mb-4">Export & Import</h4>
        <div className="flex space-x-4">
          <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors">
            <Download className="h-4 w-4" />
            <span>Export Data</span>
          </button>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors">
            <Upload className="h-4 w-4" />
            <span>Import Data</span>
          </button>
        </div>
      </div>
    </div>
  );

  const NotificationSettings = () => (
    <div className="space-y-6">
      <div className="bg-slate-700/30 border border-slate-600 rounded-lg p-4">
        <h4 className="text-lg font-semibold text-white mb-4 flex items-center">
          <Bell className="h-5 w-5 mr-2" />
          Alert Configuration
        </h4>

        <div className="space-y-4">
          <div className="space-y-3">
            {[
              { key: 'threatAlerts', label: 'Threat Alerts', desc: 'New threats detected' },
              { key: 'systemMaintenance', label: 'System Maintenance', desc: 'Scheduled maintenance notifications' },
              { key: 'weeklyReports', label: 'Weekly Reports', desc: 'Automated weekly summaries' }
            ].map((item) => (
              <div key={item.key} className="flex items-center justify-between">
                <div>
                  <label className="text-sm font-medium text-slate-300">{item.label}</label>
                  <p className="text-xs text-slate-400">{item.desc}</p>
                </div>
                <button
                  onClick={() => handleSettingChange(item.key, !settings[item.key])}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    settings[item.key] ? 'bg-blue-600' : 'bg-slate-600'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      settings[item.key] ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
            ))}
          </div>

          <div>
            <h5 className="text-sm font-semibold text-slate-300 mb-3">Alert Thresholds</h5>
            <div className="grid grid-cols-3 gap-4">
              {Object.entries(settings.alertThresholds).map(([level, value]) => (
                <div key={level}>
                  <label className="block text-xs font-medium text-slate-400 mb-1 capitalize">
                    {level} Threats
                  </label>
                  <input
                    type="number"
                    value={value}
                    onChange={(e) => handleSettingChange(`alertThresholds.${level}`, parseInt(e.target.value))}
                    min="1"
                    className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const IntegrationSettings = () => (
    <div className="space-y-6">
      <div className="bg-slate-700/30 border border-slate-600 rounded-lg p-4">
        <h4 className="text-lg font-semibold text-white mb-4 flex items-center">
          <Key className="h-5 w-5 mr-2" />
          API Configuration
        </h4>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              API Rate Limit (requests/hour)
            </label>
            <input
              type="number"
              value={settings.apiRateLimit}
              onChange={(e) => handleSettingChange('apiRateLimit', parseInt(e.target.value))}
              min="100"
              max="10000"
              className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Syslog Server
            </label>
            <div className="flex items-center space-x-3">
              <input
                type="text"
                value={settings.syslogServer}
                onChange={(e) => handleSettingChange('syslogServer', e.target.value)}
                className="flex-1 px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="logs.company.com:514"
              />
              <button
                onClick={() => handleSettingChange('syslogEnabled', !settings.syslogEnabled)}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  settings.syslogEnabled
                    ? 'bg-green-600 hover:bg-green-700 text-white'
                    : 'bg-slate-600 hover:bg-slate-700 text-slate-300'
                }`}
              >
                {settings.syslogEnabled ? 'Enabled' : 'Disabled'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'general': return <GeneralSettings />;
      case 'security': return <SecuritySettings />;
      case 'data': return <DataSettings />;
      case 'notifications': return <NotificationSettings />;
      case 'integrations': return <IntegrationSettings />;
      default: return <GeneralSettings />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Organization Settings</h1>
          <p className="text-slate-400 mt-1">Configure your organization preferences and security settings</p>
        </div>
        {unsavedChanges && (
          <button
            onClick={handleSaveSettings}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
          >
            <Save className="h-4 w-4" />
            <span>Save Changes</span>
          </button>
        )}
      </div>

      {/* Unsaved Changes Warning */}
      {unsavedChanges && (
        <div className="bg-yellow-600/20 border border-yellow-500/30 rounded-lg p-4 flex items-center space-x-3">
          <AlertTriangle className="h-5 w-5 text-yellow-400" />
          <span className="text-yellow-300">You have unsaved changes. Don't forget to save your settings.</span>
        </div>
      )}

      {/* Navigation Tabs */}
      <div className="bg-slate-800/50 border border-slate-700 rounded-lg">
        <div className="flex overflow-x-auto">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-6 py-4 font-medium transition-colors whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'bg-blue-600/20 text-blue-300 border-b-2 border-blue-400'
                    : 'text-slate-400 hover:text-white hover:bg-slate-700/50'
                }`}
              >
                <Icon className="h-4 w-4" />
                <span>{tab.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Tab Content */}
      <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6">
        {renderTabContent()}
      </div>
    </div>
  );
};

export default OrganizationSettings;