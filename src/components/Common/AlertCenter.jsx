import React, { useState, useEffect } from 'react';
import { AlertTriangle, X, ExternalLink, Clock, Shield, Database, Globe } from 'lucide-react';

const AlertCenter = () => {
  const [alerts, setAlerts] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Mock real-time alerts
    const mockAlerts = [
      {
        id: 1,
        severity: 'critical',
        title: 'High-Risk Credential Leak Detected',
        description: 'FortiCore domain credentials found in darkweb marketplace',
        source: 'Darkweb Monitor',
        timestamp: new Date(Date.now() - 5 * 60 * 1000),
        category: 'credential-leak',
        affected: 'forticore.com',
        status: 'active',
        icon: Database
      },
      {
        id: 2,
        severity: 'high',
        title: 'Stealer Malware Campaign Active',
        description: 'RedLine stealer targeting financial institutions detected',
        source: 'Threat Intelligence',
        timestamp: new Date(Date.now() - 15 * 60 * 1000),
        category: 'malware',
        affected: 'Banking Sector',
        status: 'investigating',
        icon: Shield
      },
      {
        id: 3,
        severity: 'medium',
        title: 'Suspicious Network Activity',
        description: 'Unusual traffic patterns from Eastern Europe detected',
        source: 'Network Monitor',
        timestamp: new Date(Date.now() - 30 * 60 * 1000),
        category: 'network',
        affected: 'Corporate Network',
        status: 'monitoring',
        icon: Globe
      },
      {
        id: 4,
        severity: 'high',
        title: 'New Telegram Channel Threat',
        description: 'Telegram channel selling corporate data including FortiCore',
        source: 'Social Intelligence',
        timestamp: new Date(Date.now() - 45 * 60 * 1000),
        category: 'social-threat',
        affected: 'Multiple Organizations',
        status: 'active',
        icon: AlertTriangle
      }
    ];

    // Simulate real-time alert loading
    setAlerts(mockAlerts);

    // Simulate new alerts coming in
    const interval = setInterval(() => {
      const randomAlert = {
        id: Date.now(),
        severity: ['critical', 'high', 'medium'][Math.floor(Math.random() * 3)],
        title: 'New Threat Detected',
        description: 'Real-time threat intelligence update',
        source: 'Live Monitor',
        timestamp: new Date(),
        category: 'real-time',
        affected: 'Multiple Targets',
        status: 'active',
        icon: AlertTriangle
      };

      setAlerts(prev => [randomAlert, ...prev.slice(0, 9)]); // Keep only 10 alerts
    }, 30000); // New alert every 30 seconds

    return () => clearInterval(interval);
  }, []);

  const handleAlertAction = (alertId, action) => {
    setAlerts(prev => prev.map(alert =>
      alert.id === alertId
        ? { ...alert, status: action === 'dismiss' ? 'dismissed' : action }
        : alert
    ));
  };

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'critical': return 'bg-red-500';
      case 'high': return 'bg-orange-500';
      case 'medium': return 'bg-yellow-500';
      default: return 'bg-blue-500';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'text-red-400';
      case 'investigating': return 'text-orange-400';
      case 'monitoring': return 'text-yellow-400';
      case 'dismissed': return 'text-gray-400';
      default: return 'text-blue-400';
    }
  };

  const activeAlerts = alerts.filter(alert => alert.status !== 'dismissed');

  return (
    <>
      {/* Alert Bell Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 rounded-lg transition-colors duration-200 hover:bg-slate-700"
      >
        <AlertTriangle className="h-5 w-5 text-slate-300" />
        {activeAlerts.length > 0 && (
          <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-bold">
            {activeAlerts.length > 9 ? '9+' : activeAlerts.length}
          </span>
        )}
      </button>

      {/* Alert Panel */}
      {isOpen && (
        <div className="absolute top-12 right-0 w-[450px] bg-slate-800 border border-slate-700 rounded-lg shadow-lg z-50 max-h-[500px] overflow-hidden card-section-border">
          <div className="p-4 border-b border-slate-700">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-white">Threat Intelligence Alerts</h3>
              <button
                onClick={() => setIsOpen(false)}
                className="text-slate-400 hover:text-white"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <p className="text-sm text-slate-400 mt-1">
              {activeAlerts.length} active threats detected • Live monitoring enabled
            </p>
            <div className="text-xs text-slate-500 mt-2">
              Real-time threat intelligence from FortiCore monitoring systems
            </div>
          </div>

          <div className="max-h-80 overflow-y-auto">
            {activeAlerts.length === 0 ? (
              <div className="p-6 text-center">
                <Shield className="h-12 w-12 text-green-400 mx-auto mb-2" />
                <p className="text-slate-300">No active threats detected</p>
                <p className="text-sm text-slate-500">FortiCore monitoring systems secure</p>
              </div>
            ) : (
              <div className="space-y-1">
                {activeAlerts.map((alert) => {
                  const Icon = alert.icon;
                  return (
                    <div key={alert.id} className="p-4 border-b border-slate-700 hover:bg-slate-750 transition-colors alert-card border-0">
                      <div className="flex items-start space-x-3">
                        <div className={`p-2 rounded-lg ${getSeverityColor(alert.severity)}`}>
                          <Icon className="h-4 w-4 text-white" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between mb-1">
                            <h4 className="text-sm font-semibold text-white truncate">
                              {alert.title}
                            </h4>
                            <span className={`text-xs font-medium ${getStatusColor(alert.status)} capitalize px-2 py-1 rounded-full bg-slate-700`}>
                              {alert.status}
                            </span>
                          </div>
                          <p className="text-xs text-slate-400 mb-2 line-clamp-2">
                            {alert.description}
                          </p>
                          <div className="flex items-center justify-between mb-2">
                            <div className="text-xs text-slate-500">
                              <span className="font-medium">Target:</span> {alert.affected}
                            </div>
                            <div className="text-xs text-slate-500">
                              <span className="font-medium">Category:</span> {alert.category.replace('-', ' ')}
                            </div>
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3 text-xs text-slate-500">
                              <span>{alert.source}</span>
                              <span>•</span>
                              <div className="flex items-center space-x-1">
                                <Clock className="h-3 w-3" />
                                <span>{alert.timestamp.toLocaleTimeString()}</span>
                              </div>
                            </div>
                            <div className="flex items-center space-x-2">
                              <button
                                onClick={() => handleAlertAction(alert.id, 'investigating')}
                                className="text-xs px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                                title="Start investigation process"
                              >
                                Investigate
                              </button>
                              <button
                                onClick={() => handleAlertAction(alert.id, 'dismiss')}
                                className="text-xs px-3 py-1 bg-slate-600 text-white rounded hover:bg-slate-700 transition-colors"
                                title="Mark as false positive"
                              >
                                Dismiss
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          <div className="p-4 border-t border-slate-700 bg-slate-750">
            <div className="flex items-center justify-between">
              <div className="text-xs text-slate-500">
                Auto-refresh: <span className="text-green-400">Enabled</span>
              </div>
              <button className="text-sm text-blue-400 hover:text-blue-300 font-medium flex items-center space-x-1 transition-colors">
                <span>View All Alerts</span>
                <ExternalLink className="h-3 w-3" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AlertCenter;