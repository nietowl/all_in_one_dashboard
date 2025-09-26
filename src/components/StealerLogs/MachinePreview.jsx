import React from 'react';
import { X, Monitor, MapPin, HardDrive, Cpu, Key, Globe, AlertTriangle } from 'lucide-react';

const MachinePreview = ({ machine, onClose }) => {
  if (!machine) return null;

  const getStrengthClass = (strength) => {
    if (strength === 'Weak') return 'bg-red-500/20 text-red-400';
    if (strength === 'Medium') return 'bg-yellow-500/20 text-yellow-400';
    return 'bg-green-500/20 text-green-400';
  };

  return (
    <div className="bg-slate-800/50 backdrop-blur border-l border-slate-700 h-full overflow-y-auto">
      {/* Header */}
      <div className="sticky top-0 bg-slate-900/90 backdrop-blur border-b border-slate-700 p-4 flex items-center justify-between z-10">
        <div className="flex items-center space-x-2">
          <Monitor className="w-5 h-5 text-blue-400" />
          <h3 className="text-lg font-semibold text-white">Machine Details</h3>
        </div>
        <button
          onClick={onClose}
          className="p-2 hover:bg-slate-700 rounded-lg transition-colors"
        >
          <X className="w-5 h-5 text-slate-400" />
        </button>
      </div>

      <div className="p-4 space-y-4">
        {/* Basic Info */}
        <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700">
          <h4 className="text-sm font-semibold text-slate-300 mb-3">Basic Information</h4>
          <div className="space-y-2">
            <InfoRow label="Computer Name" value={machine.computer_name || 'Unknown'} />
            <InfoRow label="Machine ID" value={machine.machine_id} mono />
            <InfoRow label="HWID" value={machine.hwid} mono />
            <InfoRow label="IP Address" value={machine.ip_address} mono />
            <InfoRow label="Country" value={machine.country || 'Unknown'} icon={<MapPin className="w-3 h-3" />} />
          </div>
        </div>

        {/* System Info */}
        <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700">
          <h4 className="text-sm font-semibold text-slate-300 mb-3 flex items-center space-x-2">
            <Cpu className="w-4 h-4" />
            <span>System Specifications</span>
          </h4>
          <div className="space-y-2">
            <InfoRow label="Operating System" value={machine.operating_system || 'Unknown'} />
            <InfoRow label="CPU" value={machine.cpu_name || 'Unknown'} />
            <InfoRow label="CPU Cores" value={machine.cpu_cores || 'N/A'} />
            <InfoRow label="CPU Threads" value={machine.cpu_threads || 'N/A'} />
            <InfoRow label="RAM" value={machine.ram_size || 'N/A'} icon={<HardDrive className="w-3 h-3" />} />
            <InfoRow label="Resolution" value={machine.display_resolution || 'N/A'} />
          </div>
        </div>

        {/* Malware Info */}
        <div className="bg-red-500/10 rounded-lg p-4 border border-red-500/30">
          <h4 className="text-sm font-semibold text-red-400 mb-3 flex items-center space-x-2">
            <AlertTriangle className="w-4 h-4" />
            <span>Malware Information</span>
          </h4>
          <div className="space-y-2">
            <InfoRow label="Stealer Family" value={machine.stealer_family || 'Unknown'} />
            <InfoRow label="Malware Path" value={machine.malware_path || 'Unknown'} mono />
            <InfoRow label="Date Compromised" value={machine.date_compromised || 'Unknown'} />
          </div>
        </div>

        {/* Applications */}
        {machine.applications && machine.applications.length > 0 && (
          <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700">
            <h4 className="text-sm font-semibold text-slate-300 mb-3">Installed Applications</h4>
            <div className="flex flex-wrap gap-2">
              {machine.applications.map((app, idx) => (
                <span
                  key={idx}
                  className="px-2 py-1 bg-slate-800 text-slate-300 text-xs rounded border border-slate-700"
                >
                  {app}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Browsers */}
        {machine.browsers && Object.keys(machine.browsers).length > 0 && (
          <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700">
            <h4 className="text-sm font-semibold text-slate-300 mb-3 flex items-center space-x-2">
              <Globe className="w-4 h-4" />
              <span>Browsers</span>
            </h4>
            <div className="space-y-2">
              {Object.keys(machine.browsers).map((browser, idx) => (
                <div key={idx} className="flex items-center justify-between">
                  <span className="text-sm text-slate-400">{browser}</span>
                  <span className="text-xs text-slate-500">
                    {machine.browsers[browser].cookies?.length || 0} cookies
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Credentials */}
        {machine.credentials && machine.credentials.length > 0 && (
          <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700">
            <h4 className="text-sm font-semibold text-slate-300 mb-3 flex items-center space-x-2">
              <Key className="w-4 h-4" />
              <span>Credentials ({machine.credentials.length})</span>
            </h4>
            <div className="space-y-3">
              {machine.credentials.map((cred, idx) => (
                <div key={idx} className="p-3 bg-slate-800/50 rounded-lg border border-slate-700">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    
                      href={cred.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-blue-400 hover:text-blue-300 truncate flex-1"
                    >
                      {cred.url}
                    </a>
                    <span className={`text-xs px-2 py-0.5 rounded whitespace-nowrap ${getStrengthClass(cred.strength)}`}>
                      {cred.strength}
                    </span>
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-slate-500">Login:</span>
                      <span className="text-slate-300 font-mono truncate ml-2">{cred.login}</span>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-slate-500">Password:</span>
                      <span className="text-slate-300 font-mono truncate ml-2">{cred.password}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {machine.credentials?.length === 0 && (
          <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700 text-center">
            <Key className="w-8 h-8 text-slate-600 mx-auto mb-2" />
            <p className="text-sm text-slate-400">No credentials found</p>
          </div>
        )}
      </div>
    </div>
  );
};

const InfoRow = ({ label, value, mono = false, icon = null }) => (
  <div className="flex items-center justify-between text-xs">
    <span className="text-slate-500 flex items-center space-x-1">
      {icon}
      <span>{label}:</span>
    </span>
    <span className={`text-slate-300 ${mono ? 'font-mono text-right break-all' : ''} max-w-[60%]`}>
      {value}
    </span>
  </div>
);

export default MachinePreview;