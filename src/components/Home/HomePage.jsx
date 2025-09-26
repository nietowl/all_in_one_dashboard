import React from 'react';
import QuickStats from './QuickStats';
import QuickAccessCards from './QuickAccessCards';
import RecentActivity from './RecentActivity';

const HomePage = ({ setActiveSection }) => {
  return (
    <div>
      <div className="mb-8">
        <h2 className="text-4xl font-bold text-white mb-2">Welcome to ThreatIntel Dashboard</h2>
        <p className="text-slate-400">Monitor and analyze security threats in real-time</p>
      </div>

      <QuickStats />
      <QuickAccessCards setActiveSection={setActiveSection} />
      <RecentActivity />
    </div>
  );
};

export default HomePage;