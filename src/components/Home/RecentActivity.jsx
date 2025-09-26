import React from 'react';

const RecentActivity = () => {
  const activities = [
    { message: 'New darkweb breach detected', time: '2 minutes ago', color: 'green' },
    { message: 'Stealer log analysis completed', time: '15 minutes ago', color: 'blue' },
    { message: 'Combolist database updated', time: '1 hour ago', color: 'purple' }
  ];

  return (
    <div className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-xl p-6">
      <h3 className="text-xl font-semibold text-white mb-4">Recent Activity</h3>
      <div className="space-y-3">
        {activities.map((activity, index) => (
          <div key={index} className="flex items-center justify-between p-3 bg-slate-900/50 rounded-lg">
            <div className="flex items-center space-x-3">
              <div className={`w-2 h-2 bg-${activity.color}-400 rounded-full`}></div>
              <span className="text-slate-300">{activity.message}</span>
            </div>
            <span className="text-sm text-slate-500">{activity.time}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentActivity;