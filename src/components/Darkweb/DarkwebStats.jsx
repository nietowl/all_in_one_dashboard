import React from 'react';
import { Shield, MessageSquare, Send, AlertTriangle, Activity, TrendingUp } from 'lucide-react';
import MetricCard from '../Common/MetricCard';
import ChartCard from '../Common/ChartCard';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const DarkwebStats = ({ stats, loading }) => {
  // Mock data for charts
  const activityData = [
    { date: 'Mon', forums: 450, telegram: 320 },
    { date: 'Tue', forums: 520, telegram: 380 },
    { date: 'Wed', forums: 480, telegram: 410 },
    { date: 'Thu', forums: 600, telegram: 450 },
    { date: 'Fri', forums: 550, telegram: 490 },
    { date: 'Sat', forums: 420, telegram: 380 },
    { date: 'Sun', forums: 390, telegram: 340 }
  ];

  const categoryData = [
    { name: 'Marketplaces', count: 1200 },
    { name: 'Hacking Forums', count: 800 },
    { name: 'Data Leaks', count: 650 },
    { name: 'Cryptocurrency', count: 500 },
    { name: 'Drugs', count: 450 }
  ];

  if (loading) {
    return (
      <div className="text-center py-20">
        <div className="animate-spin w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"></div>
        <p className="text-slate-400">Loading statistics...</p>
      </div>
    );
  }

  return (
    <div>
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <MetricCard
          icon={<MessageSquare className="w-6 h-6" />}
          title="Forum Posts"
          value={stats.totalForumPosts?.toLocaleString() || '0'}
          color="blue"
          trend="+12%"
        />
        <MetricCard
          icon={<Send className="w-6 h-6" />}
          title="Telegram Channels"
          value={stats.totalTelegramChannels?.toLocaleString() || '0'}
          color="purple"
          trend="+8%"
        />
        <MetricCard
          icon={<Activity className="w-6 h-6" />}
          title="Active Sources"
          value={stats.activeSources || '0'}
          color="green"
        />
        <MetricCard
          icon={<AlertTriangle className="w-6 h-6" />}
          title="Recent Breaches"
          value={stats.recentBreaches || '0'}
          color="red"
          trend="+5%"
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Activity Timeline */}
        <ChartCard title="Weekly Activity" icon={<TrendingUp className="w-5 h-5" />}>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={activityData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis dataKey="date" stroke="#94a3b8" />
              <YAxis stroke="#94a3b8" />
              <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155' }} />
              <Line type="monotone" dataKey="forums" stroke="#3b82f6" strokeWidth={2} name="Forums" />
              <Line type="monotone" dataKey="telegram" stroke="#8b5cf6" strokeWidth={2} name="Telegram" />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>

        {/* Top Categories */}
        <ChartCard title="Top Categories" icon={<Shield className="w-5 h-5" />}>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={categoryData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis dataKey="name" stroke="#94a3b8" angle={-45} textAnchor="end" height={100} />
              <YAxis stroke="#94a3b8" />
              <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155' }} />
              <Bar dataKey="count" fill="#3b82f6" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      {/* Quick Access Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gradient-to-br from-blue-500/20 to-blue-600/10 border border-blue-500/30 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <MessageSquare className="w-12 h-12 text-blue-400" />
            <span className="text-xs text-blue-400 font-semibold px-2 py-1 bg-blue-500/20 rounded">NEW</span>
          </div>
          <h3 className="text-xl font-semibold text-white mb-2">Darkweb Forums</h3>
          <p className="text-slate-400 text-sm mb-4">
            Monitor discussions, threats, and data leaks from major darkweb forums
          </p>
          <div className="text-2xl font-bold text-blue-400 mb-1">
            {stats.totalForumPosts?.toLocaleString() || '0'}
          </div>
          <p className="text-slate-400 text-xs">Total forum posts indexed</p>
        </div>

        <div className="bg-gradient-to-br from-purple-500/20 to-purple-600/10 border border-purple-500/30 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <Send className="w-12 h-12 text-purple-400" />
            <span className="text-xs text-purple-400 font-semibold px-2 py-1 bg-purple-500/20 rounded">NEW</span>
          </div>
          <h3 className="text-xl font-semibold text-white mb-2">Telegram Channels</h3>
          <p className="text-slate-400 text-sm mb-4">
            Track threat actors, leaked data, and criminal activities on Telegram
          </p>
          <div className="text-2xl font-bold text-purple-400 mb-1">
            {stats.totalTelegramChannels?.toLocaleString() || '0'}
          </div>
          <p className="text-slate-400 text-xs">Active channels monitored</p>
        </div>
      </div>
    </div>
  );
};

export default DarkwebStats;