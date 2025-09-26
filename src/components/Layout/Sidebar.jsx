import React from 'react';
import { Home, Shield, Database, List, Activity } from 'lucide-react';

const Sidebar = ({ activeSection, setActiveSection }) => {
  const sections = [
    { id: 'home', name: 'Home', icon: Home },
    { id: 'darkweb', name: 'Darkweb Data', icon: Shield },
    { id: 'stealerlogs', name: 'Stealer Logs', icon: Database },
    { id: 'combolist', name: 'Combolist', icon: List }
  ];

  return (
    <div className="fixed left-0 top-0 h-full w-64 bg-slate-900/50 backdrop-blur border-r border-slate-700 p-6 z-50">
      <div className="mb-8">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent mb-2">
          ThreatIntel
        </h1>
        <p className="text-xs text-slate-400">Advanced Analytics Platform</p>
      </div>

      <nav className="space-y-2">
        {sections.map(section => {
          const Icon = section.icon;
          return (
            <button
              key={section.id}
              onClick={() => setActiveSection(section.id)}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all ${
                activeSection === section.id
                  ? 'bg-blue-500 text-white'
                  : 'text-slate-400 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="font-medium">{section.name}</span>
            </button>
          );
        })}
      </nav>

      <div className="absolute bottom-6 left-6 right-6">
        <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700">
          <div className="flex items-center space-x-2 mb-2">
            <Activity className="w-4 h-4 text-green-400" />
            <span className="text-sm font-semibold text-green-400">System Online</span>
          </div>
          <p className="text-xs text-slate-400">All services operational</p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;