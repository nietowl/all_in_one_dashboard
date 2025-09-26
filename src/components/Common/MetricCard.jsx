import React from 'react';

const MetricCard = ({ icon, title, value, color, trend, subtitle }) => {
  const colorClasses = {
    blue: 'from-blue-500/20 to-blue-600/10 border-blue-500/30',
    purple: 'from-purple-500/20 to-purple-600/10 border-purple-500/30',
    green: 'from-green-500/20 to-green-600/10 border-green-500/30',
    red: 'from-red-500/20 to-red-600/10 border-red-500/30',
    orange: 'from-orange-500/20 to-orange-600/10 border-orange-500/30'
  };

  return (
    <div className={`bg-gradient-to-br ${colorClasses[color]} border rounded-xl p-6 hover:scale-105 transition-transform`}>
      <div className="flex items-center justify-between mb-3">
        <div className={`p-2 bg-${color}-500/20 rounded-lg`}>{icon}</div>
        {trend && <span className="text-green-400 text-sm font-semibold">{trend}</span>}
      </div>
      <h3 className="text-slate-400 text-sm mb-1">{title}</h3>
      <p className="text-3xl font-bold text-white mb-1">{value}</p>
      {subtitle && <p className="text-slate-400 text-xs">{subtitle}</p>}
    </div>
  );
};

export default MetricCard;