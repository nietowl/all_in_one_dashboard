import React from 'react';
import { Monitor, MapPin, Key, HardDrive, AlertCircle } from 'lucide-react';

const MachineCard = ({ machine, onClick, isSelected }) => {
  const credentialCount = machine.credentials?.length || 0;
  const browserCount = Object.keys(machine.browsers || {}).length;
  
  return (
    <div
      onClick={() => onClick(machine)}
      className={`bg-slate-800/50 backdrop-blur border rounded-xl p-4 cursor-pointer transition-all hover:scale-[1.02] ${
        isSelected 
          ? 'border-blue-500 ring-2 ring-blue-500/50' 
          : 'border-slate-700 hover:border-slate-600'
      }`}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center space-x-2">
          <Monitor className="w-5 h-5 text-blue-400" />
          <div>
            <h3 className="text-white font-semibold text-sm">
              {machine.computer_name || 'Unknown'}
            </h3>
            <p className="text-xs text-slate-500 font-mono">
              {machine.machine_id?.substring(0, 8)}...
            </p>
          </div>
        </div>
        {credentialCount > 0 && (
          <span className="px-2 py-1 bg-red-500/20 text-red-400 text-xs font-semibold rounded">
            {credentialCount} creds
          </span>
        )}
      </div>

      {/* Info Grid */}
      <div className="grid grid-cols-2 gap-2 mb-3">
        <div className="flex items-center space-x-2">
          <MapPin className="w-3 h-3 text-slate-500" />
          <span className="text-xs text-slate-400">{machine.country || 'Unknown'}</span>
        </div>
        <div className="flex items-center space-x-2">
          <HardDrive className="w-3 h-3 text-slate-500" />
          <span className="text-xs text-slate-400">{machine.ram_size || 'N/A'}</span>
        </div>
      </div>

      {/* IP Address */}
      <div className="flex items-center justify-between text-xs mb-2">
        <span className="text-slate-500">IP:</span>
        <span className="text-slate-300 font-mono">{machine.ip_address}</span>
      </div>

      {/* OS */}
      <div className="flex items-center justify-between text-xs mb-3">
        <span className="text-slate-500">OS:</span>
        <span className="text-slate-300">{machine.operating_system || 'Unknown'}</span>
      </div>

      {/* Footer Stats */}
      <div className="flex items-center justify-between pt-3 border-t border-slate-700">
        <div className="flex items-center space-x-3 text-xs">
          <div className="flex items-center space-x-1">
            <Key className="w-3 h-3 text-purple-400" />
            <span className="text-slate-400">{credentialCount}</span>
          </div>
          <div className="flex items-center space-x-1">
            <AlertCircle className="w-3 h-3 text-orange-400" />
            <span className="text-slate-400">{browserCount}</span>
          </div>
        </div>
        <span className="text-xs text-slate-500">
          {machine.stealer_family || 'Unknown'}
        </span>
      </div>
    </div>
  );
};

export default MachineCard;