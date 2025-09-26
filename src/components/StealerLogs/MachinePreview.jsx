import React from 'react';
import { X, Monitor, MapPin, HardDrive, Cpu, Key, Globe, AlertTriangle, Copy, Shield } from 'lucide-react';

const MachinePreview = ({ machine, onClose }) => {
  if (!machine) return null;

  const getStrengthClass = (strength) => {
    if (strength === 'Weak') return 'bg-red-500/20 text-red-400 border-red-500/30';
    if (strength === 'Medium') return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
    return 'bg-green-500/20 text-green-400 border-green-500/30';
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-lg h-full flex flex-col overflow-hidden">
      {/* Fixed Header */}
      <div className="flex-shrink-0 bg-gradient-to-r from-slate-900 to-slate-800 border-b border-slate-700 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="p-1.5 bg-blue-500/20 rounded">
              <Monitor className="w-4 h-4 text-blue-400" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white">{machine.computer_name || 'Unknown'}</h3>
              <p className="text-xs text-slate-500 font-mono">{machine.machine_id?.substring(0, 16)}...</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 hover:bg-slate-700 rounded-lg transition-colors"
          >
            <X className="w-4 h-4 text-slate-400 hover:text-white" />
          </button>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-2 mt-3">
          <div className="bg-slate-900/50 rounded p-2 text-center border border-slate-700">
            <div className="text-sm font-bold text-blue-400">{machine.credentials?.length || 0}</div>
            <div className="text-xs text-slate-400">Creds</div>
          </div>
          <div className="bg-slate-900/50 rounded p-2 text-center border border-slate-700">
            <div className="text-sm font-bold text-purple-400">{Object.keys(machine.browsers || {}).length}</div>
            <div className="text-xs text-slate-400">Browsers</div>
          </div>
          <div className="bg-slate-900/50 rounded p-2 text-center border border-slate-700">
            <div className="text-sm font-bold text-green-400">{machine.applications?.length || 0}</div>
            <div className="text-xs text-slate-400">Apps</div>
          </div>
        </div>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {/* System Info */}
        <div className="bg-slate-900/50 rounded-lg p-3 border border-slate-700">
          <div className="flex items-center space-x-1.5 mb-2">
            <Shield className="w-4 h-4 text-blue-400" />
            <h4 className="text-xs font-bold text-white">System Information</h4>
          </div>
          <div className="space-y-2">
            <InfoRow icon={<Globe className="w-3 h-3 text-cyan-400" />} label="IP" value={machine.ip_address} />
            <InfoRow icon={<MapPin className="w-3 h-3 text-orange-400" />} label="Country" value={machine.country || 'Unknown'} />
            <InfoRow icon={<Cpu className="w-3 h-3 text-purple-400" />} label="OS" value={machine.operating_system || 'Unknown'} />
            <InfoRow icon={<HardDrive className="w-3 h-3 text-green-400" />} label="RAM" value={machine.ram_size || 'N/A'} />
          </div>
        </div>

        {/* CPU Info */}
        {machine.cpu_name && (
          <div className="bg-slate-900/50 rounded-lg p-3 border border-slate-700">
            <div className="flex items-center space-x-1.5 mb-2">
              <Cpu className="w-4 h-4 text-purple-400" />
              <h4 className="text-xs font-bold text-white">Processor</h4>
            </div>
            <div className="text-xs text-slate-300 mb-2">{machine.cpu_name}</div>
            <div className="flex gap-2">
              <div className="flex-1 bg-slate-800/50 rounded p-2 border border-slate-700 text-center">
                <div className="text-sm font-bold text-white">{machine.cpu_cores || 'N/A'}</div>
                <div className="text-xs text-slate-400">Cores</div>
              </div>
              <div className="flex-1 bg-slate-800/50 rounded p-2 border border-slate-700 text-center">
                <div className="text-sm font-bold text-white">{machine.cpu_threads || 'N/A'}</div>
                <div className="text-xs text-slate-400">Threads</div>
              </div>
            </div>
          </div>
        )}

        {/* Malware Info */}
        <div className="bg-gradient-to-br from-red-500/20 to-red-600/10 rounded-lg p-3 border border-red-500/40">
          <div className="flex items-center space-x-1.5 mb-2">
            <AlertTriangle className="w-4 h-4 text-red-400" />
            <h4 className="text-xs font-bold text-red-400">Malware Information</h4>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-xs">
              <span className="text-slate-400">Family:</span>
              <span className="text-red-400 font-semibold">{machine.stealer_family || 'Unknown'}</span>
            </div>
            <div className="text-xs">
              <div className="text-slate-400 mb-1">Path:</div>
              <div className="text-red-300 font-mono text-xs break-all bg-slate-900/50 p-2 rounded border border-red-500/20">
                {machine.malware_path || 'Unknown'}
              </div>
            </div>
          </div>
        </div>

        {/* HWID */}
        <div className="bg-slate-900/50 rounded-lg p-3 border border-slate-700">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-white">Hardware ID</span>
            <button
              onClick={() => copyToClipboard(machine.hwid)}
              className="p-1 hover:bg-slate-700 rounded transition-colors"
            >
              <Copy className="w-3 h-3 text-slate-400 hover:text-blue-400" />
            </button>
          </div>
          <div className="text-xs text-slate-300 font-mono break-all bg-slate-800/50 p-2 rounded border border-slate-700">
            {machine.hwid}
          </div>
        </div>

        {/* Browsers */}
        {machine.browsers && Object.keys(machine.browsers).length > 0 && (
          <div className="bg-slate-900/50 rounded-lg p-3 border border-slate-700">
            <div className="flex items-center space-x-1.5 mb-2">
              <Globe className="w-4 h-4 text-cyan-400" />
              <h4 className="text-xs font-bold text-white">Browsers</h4>
            </div>
            <div className="space-y-1.5">
              {Object.keys(machine.browsers).map((browser, idx) => (
                <div key={idx} className="flex items-center justify-between bg-slate-800/50 rounded p-2 border border-slate-700">
                  <span className="text-xs text-white font-medium">{browser}</span>
                  <span className="text-xs bg-cyan-500/20 text-cyan-400 px-2 py-0.5 rounded border border-cyan-500/30">
                    {machine.browsers[browser].cookies?.length || 0}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Applications */}
        {machine.applications && machine.applications.length > 0 && (
          <div className="bg-slate-900/50 rounded-lg p-3 border border-slate-700">
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-xs font-bold text-white">Applications</h4>
              <span className="text-xs bg-green-500/20 text-green-400 px-2 py-0.5 rounded border border-green-500/30">
                {machine.applications.length}
              </span>
            </div>
            <div className="flex flex-wrap gap-1.5">
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

        {/* Credentials */}
        {machine.credentials && machine.credentials.length > 0 && (
          <div className="bg-slate-900/50 rounded-lg p-3 border border-slate-700">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-1.5">
                <Key className="w-4 h-4 text-yellow-400" />
                <h4 className="text-xs font-bold text-white">Credentials</h4>
              </div>
              <span className="text-xs bg-yellow-500/20 text-yellow-400 px-2 py-0.5 rounded border border-yellow-500/30 font-semibold">
                {machine.credentials.length}
              </span>
            </div>
            <div className="space-y-2">
              {machine.credentials.map((cred, idx) => (
                <div key={idx} className="bg-gradient-to-br from-slate-800 to-slate-800/50 rounded-lg p-2.5 border border-slate-700">
                  <div className="flex items-center justify-between mb-2">
                    <a
                      href={cred.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-blue-400 hover:text-blue-300 truncate flex-1 hover:underline"
                    >
                      {cred.url}
                    </a>
                    <span className={`text-xs px-1.5 py-0.5 rounded ml-2 border font-semibold ${getStrengthClass(cred.strength)}`}>
                      {cred.strength}
                    </span>
                  </div>
                  <div className="space-y-1.5">
                    <div className="bg-slate-900/50 rounded p-2 border border-slate-700">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs text-slate-500">Login</span>
                        <button
                          onClick={() => copyToClipboard(cred.login)}
                          className="p-0.5 hover:bg-slate-700 rounded transition-colors"
                        >
                          <Copy className="w-3 h-3 text-slate-400 hover:text-blue-400" />
                        </button>
                      </div>
                      <span className="text-xs text-white font-mono break-all">{cred.login}</span>
                    </div>
                    <div className="bg-slate-900/50 rounded p-2 border border-slate-700">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs text-slate-500">Password</span>
                        <button
                          onClick={() => copyToClipboard(cred.password)}
                          className="p-0.5 hover:bg-slate-700 rounded transition-colors"
                        >
                          <Copy className="w-3 h-3 text-slate-400 hover:text-blue-400" />
                        </button>
                      </div>
                      <span className="text-xs text-white font-mono break-all">{cred.password}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {machine.credentials?.length === 0 && (
          <div className="bg-slate-900/50 rounded-lg p-6 border border-slate-700 text-center">
            <Key className="w-8 h-8 text-slate-600 mx-auto mb-2" />
            <p className="text-xs text-slate-400">No credentials found</p>
          </div>
        )}
      </div>
    </div>
  );
};

const InfoRow = ({ icon, label, value }) => (
  <div className="flex items-center justify-between bg-slate-800/30 rounded p-2 border border-slate-700/50">
    <span className="text-xs text-slate-400 flex items-center space-x-1.5">
      {icon}
      <span>{label}</span>
    </span>
    <span className="text-xs text-white truncate ml-2 max-w-[140px]">{value}</span>
  </div>
);

export default MachinePreview;