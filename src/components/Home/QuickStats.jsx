import React from 'react';
import { Shield, Database, List, AlertTriangle } from 'lucide-react';

const QuickStats = () => {
  const stats = [
    { icon: Shield, label: 'Darkweb Records', value: '1.2M+', color: 'blue' },
    { icon: Database, label: 'Stealer Logs', value: '850K+', color: 'purple' },
    { icon: List, label: 'Combolists', value: '2.5M+', color: 'green' },
    { icon: AlertTriangle, label: 'Active Threats', value: '15K+', color: 'red' }
  ];

  const colorClasses = {
    blue: 'from-blue-500/20 to-blue-600/10 border-blue-500/30 text-blue-400',
    purple: 'from-purple-500/20 to-purple-600/10 border-purple-500/30 text-purple-400',
    green: 'from-green-500/20 to-green-600/10 border-green-500/30 text-green-400',
    red: 'from-red-500/20 to-red-600/10 border-red-500/30 text-red-400'
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <div
            key={index}
            className={`bg-gradient-to-br ${colorClasses[stat.color]} border rounded-xl p-6`}
          >
            <Icon className={`w-12 h-12 ${colorClasses[stat.color].split(' ')[2]} mb-4`} />
            <h3 className="text-2xl font-bold text-white mb-1">{stat.value}</h3>
            <p className="text-slate-400 text-sm">{stat.label}</p>
          </div>
        );
      })}
    </div>
  );
};

export default QuickStats;