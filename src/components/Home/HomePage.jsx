import React from 'react';
import { useSelector } from 'react-redux';
import QuickStats from './QuickStats';
import QuickAccessCards from './QuickAccessCards';
import RecentActivity from './RecentActivity';

const HomePage = () => {
  const { user } = useSelector(state => state.auth);

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-4xl font-bold text-white mb-2">
          Welcome back, {user?.firstName}
        </h2>
        <p className="text-slate-400">Monitor and analyze security threats in real-time</p>
        {user?.organizationName && (
          <p className="text-slate-500 text-sm mt-1">
            {user.organizationName} • {user.role}
          </p>
        )}
      </div>

      <QuickStats />
      <QuickAccessCards />
      <RecentActivity />
    </div>
  );
};

export default HomePage;