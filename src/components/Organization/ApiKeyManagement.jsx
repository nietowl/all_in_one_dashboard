import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import {
  Key,
  Plus,
  Copy,
  Eye,
  EyeOff,
  Trash2,
  Edit3,
  Calendar,
  Clock,
  AlertTriangle,
  CheckCircle,
  Activity,
  Shield,
  Database,
  Globe,
  BarChart3,
  Settings,
  RefreshCw,
  Download
} from 'lucide-react';

const ApiKeyManagement = () => {
  const { user } = useSelector(state => state.auth);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [visibleKeys, setVisibleKeys] = useState(new Set());

  // Mock API keys data
  const [apiKeys, setApiKeys] = useState([
    {
      id: 'ak_1',
      name: 'Production API Key',
      key: 'tc_prod_a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6',
      description: 'Main production API key for threat intelligence feeds',
      permissions: ['view_dashboard', 'view_stealer_logs', 'view_darkweb', 'export_reports'],
      status: 'active',
      lastUsed: new Date(Date.now() - 3600000), // 1 hour ago
      createdAt: new Date('2024-01-15'),
      expiresAt: new Date('2025-01-15'),
      requestsToday: 847,
      requestsLimit: 1000,
      createdBy: 'admin@tracecore.com'
    },
    {
      id: 'ak_2',
      name: 'Development API Key',
      key: 'tc_dev_z9y8x7w6v5u4t3s2r1q0p9o8n7m6l5k4',
      description: 'Development environment testing',
      permissions: ['view_dashboard', 'view_stealer_logs'],
      status: 'active',
      lastUsed: new Date(Date.now() - 86400000), // 1 day ago
      createdAt: new Date('2024-02-01'),
      expiresAt: new Date('2024-12-01'),
      requestsToday: 23,
      requestsLimit: 500,
      createdBy: 'john.analyst@tracecore.com'
    },
    {
      id: 'ak_3',
      name: 'Integration API Key',
      key: 'tc_int_m5n4o3p2q1r0s9t8u7v6w5x4y3z2a1b0',
      description: 'Third-party SIEM integration',
      permissions: ['view_dashboard', 'view_stealer_logs', 'view_darkweb', 'view_credentials'],
      status: 'inactive',
      lastUsed: new Date(Date.now() - 604800000), // 1 week ago
      createdAt: new Date('2024-01-20'),
      expiresAt: new Date('2024-11-20'),
      requestsToday: 0,
      requestsLimit: 2000,
      createdBy: 'admin@tracecore.com'
    }
  ]);

  const permissionLabels = {
    view_dashboard: { label: 'Dashboard Access', icon: BarChart3, color: 'blue' },
    view_stealer_logs: { label: 'Stealer Intelligence', icon: Database, color: 'orange' },
    view_darkweb: { label: 'Dark Web Monitor', icon: Globe, color: 'purple' },
    view_credentials: { label: 'Credential Intel', icon: Shield, color: 'green' },
    export_reports: { label: 'Export Reports', icon: Download, color: 'indigo' },
    manage_users: { label: 'User Management', icon: Settings, color: 'red' }
  };

  const toggleKeyVisibility = (keyId) => {
    const newVisibleKeys = new Set(visibleKeys);
    if (newVisibleKeys.has(keyId)) {
      newVisibleKeys.delete(keyId);
    } else {
      newVisibleKeys.add(keyId);
    }
    setVisibleKeys(newVisibleKeys);
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    // Show toast notification in real app
  };

  const maskApiKey = (key) => {
    if (!key) return '';
    return key.substring(0, 8) + '•'.repeat(20) + key.substring(key.length - 8);
  };

  const getUsagePercentage = (used, limit) => {
    return Math.round((used / limit) * 100);
  };

  const getUsageColor = (percentage) => {
    if (percentage >= 90) return 'text-red-400';
    if (percentage >= 70) return 'text-yellow-400';
    return 'text-green-400';
  };

  const CreateApiKeyModal = () => {
    const [newKey, setNewKey] = useState({
      name: '',
      description: '',
      permissions: [],
      expiresAt: '',
      requestsLimit: 1000
    });

    const handlePermissionToggle = (permission) => {
      const newPermissions = newKey.permissions.includes(permission)
        ? newKey.permissions.filter(p => p !== permission)
        : [...newKey.permissions, permission];
      setNewKey({ ...newKey, permissions: newPermissions });
    };

    const handleSubmit = (e) => {
      e.preventDefault();
      const apiKey = {
        id: `ak_${Date.now()}`,
        key: `tc_${Math.random().toString(36).substring(2, 15)}_${Math.random().toString(36).substring(2, 15)}`,
        ...newKey,
        status: 'active',
        lastUsed: null,
        createdAt: new Date(),
        expiresAt: new Date(newKey.expiresAt),
        requestsToday: 0,
        createdBy: user.email
      };
      setApiKeys([...apiKeys, apiKey]);
      setShowCreateModal(false);
      setNewKey({ name: '', description: '', permissions: [], expiresAt: '', requestsLimit: 1000 });
    };

    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
        <div className="bg-slate-800 rounded-lg p-6 w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
          <h3 className="text-lg font-semibold text-white mb-4">Create New API Key</h3>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Name</label>
                <input
                  type="text"
                  value={newKey.name}
                  onChange={(e) => setNewKey({ ...newKey, name: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                  placeholder="e.g., Production API Key"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Expires At</label>
                <input
                  type="date"
                  value={newKey.expiresAt}
                  onChange={(e) => setNewKey({ ...newKey, expiresAt: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Description</label>
              <textarea
                value={newKey.description}
                onChange={(e) => setNewKey({ ...newKey, description: e.target.value })}
                rows={3}
                className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Describe the purpose of this API key"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Request Limit (per day)</label>
              <input
                type="number"
                value={newKey.requestsLimit}
                onChange={(e) => setNewKey({ ...newKey, requestsLimit: parseInt(e.target.value) })}
                className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                min="100"
                max="10000"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-3">Permissions</label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {Object.entries(permissionLabels).map(([key, perm]) => {
                  const Icon = perm.icon;
                  return (
                    <label
                      key={key}
                      className={`flex items-center space-x-3 p-3 rounded-lg border-2 cursor-pointer transition-colors ${
                        newKey.permissions.includes(key)
                          ? `border-${perm.color}-500 bg-${perm.color}-500/10`
                          : 'border-slate-600 hover:border-slate-500'
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={newKey.permissions.includes(key)}
                        onChange={() => handlePermissionToggle(key)}
                        className="sr-only"
                      />
                      <Icon className={`h-5 w-5 ${newKey.permissions.includes(key) ? `text-${perm.color}-400` : 'text-slate-400'}`} />
                      <span className={`text-sm font-medium ${newKey.permissions.includes(key) ? 'text-white' : 'text-slate-300'}`}>
                        {perm.label}
                      </span>
                    </label>
                  );
                })}
              </div>
            </div>

            <div className="flex justify-end space-x-3 pt-4">
              <button
                type="button"
                onClick={() => setShowCreateModal(false)}
                className="px-4 py-2 text-slate-300 hover:text-white transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
              >
                Create API Key
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">API Key Management</h1>
          <p className="text-slate-400 mt-1">Manage API keys for integrations and external access</p>
        </div>
        <button
          onClick={() => setShowCreateModal(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
        >
          <Plus className="h-4 w-4" />
          <span>Create API Key</span>
        </button>
      </div>

      {/* API Usage Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Keys', value: apiKeys.length, color: 'blue', icon: Key },
          { label: 'Active Keys', value: apiKeys.filter(k => k.status === 'active').length, color: 'green', icon: CheckCircle },
          { label: 'Requests Today', value: apiKeys.reduce((sum, key) => sum + key.requestsToday, 0), color: 'orange', icon: Activity },
          { label: 'Avg Usage', value: `${Math.round(apiKeys.reduce((sum, key) => sum + getUsagePercentage(key.requestsToday, key.requestsLimit), 0) / apiKeys.length)}%`, color: 'purple', icon: BarChart3 }
        ].map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className={`bg-${stat.color}-600/20 border border-${stat.color}-500/30 rounded-lg p-4`}>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-400">{stat.label}</p>
                  <p className="text-2xl font-bold text-white">{stat.value}</p>
                </div>
                <Icon className={`h-8 w-8 text-${stat.color}-400`} />
              </div>
            </div>
          );
        })}
      </div>

      {/* API Keys List */}
      <div className="space-y-4">
        {apiKeys.map((apiKey) => (
          <div key={apiKey.id} className="bg-slate-800/50 border border-slate-700 rounded-lg p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <h3 className="text-lg font-semibold text-white">{apiKey.name}</h3>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    apiKey.status === 'active'
                      ? 'bg-green-600/20 text-green-300'
                      : 'bg-red-600/20 text-red-300'
                  }`}>
                    {apiKey.status}
                  </span>
                </div>
                <p className="text-slate-400 text-sm mb-3">{apiKey.description}</p>

                {/* API Key Display */}
                <div className="bg-slate-700/50 border border-slate-600 rounded-lg p-3 flex items-center justify-between">
                  <code className="text-green-400 font-mono text-sm">
                    {visibleKeys.has(apiKey.id) ? apiKey.key : maskApiKey(apiKey.key)}
                  </code>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => toggleKeyVisibility(apiKey.id)}
                      className="p-1 hover:bg-slate-600 rounded transition-colors text-slate-400 hover:text-white"
                      title={visibleKeys.has(apiKey.id) ? 'Hide key' : 'Show key'}
                    >
                      {visibleKeys.has(apiKey.id) ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                    <button
                      onClick={() => copyToClipboard(apiKey.key)}
                      className="p-1 hover:bg-slate-600 rounded transition-colors text-slate-400 hover:text-white"
                      title="Copy to clipboard"
                    >
                      <Copy className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-2 ml-4">
                <button className="p-2 hover:bg-slate-700 rounded-lg transition-colors text-slate-400 hover:text-white">
                  <Edit3 className="h-4 w-4" />
                </button>
                <button className="p-2 hover:bg-red-600 rounded-lg transition-colors text-slate-400 hover:text-white">
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Usage Statistics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div className="bg-slate-700/30 rounded-lg p-3">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-slate-400">Daily Usage</span>
                  <span className={`text-sm font-medium ${getUsageColor(getUsagePercentage(apiKey.requestsToday, apiKey.requestsLimit))}`}>
                    {getUsagePercentage(apiKey.requestsToday, apiKey.requestsLimit)}%
                  </span>
                </div>
                <div className="w-full bg-slate-600 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full transition-all duration-300 ${
                      getUsagePercentage(apiKey.requestsToday, apiKey.requestsLimit) >= 90
                        ? 'bg-red-500'
                        : getUsagePercentage(apiKey.requestsToday, apiKey.requestsLimit) >= 70
                        ? 'bg-yellow-500'
                        : 'bg-green-500'
                    }`}
                    style={{ width: `${Math.min(getUsagePercentage(apiKey.requestsToday, apiKey.requestsLimit), 100)}%` }}
                  />
                </div>
                <div className="text-xs text-slate-500 mt-1">
                  {apiKey.requestsToday.toLocaleString()} / {apiKey.requestsLimit.toLocaleString()} requests
                </div>
              </div>

              <div className="bg-slate-700/30 rounded-lg p-3">
                <div className="flex items-center space-x-2 mb-1">
                  <Clock className="h-4 w-4 text-slate-400" />
                  <span className="text-sm text-slate-400">Last Used</span>
                </div>
                <div className="text-sm text-white">
                  {apiKey.lastUsed ? apiKey.lastUsed.toLocaleDateString() : 'Never'}
                </div>
              </div>

              <div className="bg-slate-700/30 rounded-lg p-3">
                <div className="flex items-center space-x-2 mb-1">
                  <Calendar className="h-4 w-4 text-slate-400" />
                  <span className="text-sm text-slate-400">Expires</span>
                </div>
                <div className={`text-sm ${
                  apiKey.expiresAt < new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
                    ? 'text-yellow-400'
                    : 'text-white'
                }`}>
                  {apiKey.expiresAt.toLocaleDateString()}
                </div>
              </div>
            </div>

            {/* Permissions */}
            <div>
              <h4 className="text-sm font-medium text-slate-300 mb-2">Permissions</h4>
              <div className="flex flex-wrap gap-2">
                {apiKey.permissions.map((permission) => {
                  const perm = permissionLabels[permission];
                  if (!perm) return null;
                  const Icon = perm.icon;
                  return (
                    <span
                      key={permission}
                      className={`inline-flex items-center space-x-1 px-2 py-1 bg-${perm.color}-600/20 text-${perm.color}-300 rounded text-xs`}
                    >
                      <Icon className="h-3 w-3" />
                      <span>{perm.label}</span>
                    </span>
                  );
                })}
              </div>
            </div>

            {/* Metadata */}
            <div className="flex items-center justify-between text-xs text-slate-500 mt-4 pt-4 border-t border-slate-700">
              <span>Created by {apiKey.createdBy}</span>
              <span>Created {apiKey.createdAt.toLocaleDateString()}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Create Modal */}
      {showCreateModal && <CreateApiKeyModal />}
    </div>
  );
};

export default ApiKeyManagement;