import React, { useMemo } from 'react';
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Globe, Shield, TrendingUp } from 'lucide-react';
import ChartCard from '../Common/ChartCard';

const CombolistCharts = ({ credentialData, showDetailed = false }) => {
  const COLORS = ['#3b82f6', '#8b5cf6', '#ec4899', '#f59e0b', '#10b981', '#06b6d4', '#ef4444', '#84cc16'];

  const hostData = useMemo(() => {
    const counts = {};
    credentialData.data?.forEach(item => {
      const host = item.host || 'Unknown';
      counts[host] = (counts[host] || 0) + 1;
    });
    return Object.entries(counts)
      .map(([name, value]) => ({ name, value }))
      .sort((a, b) => b.value - a.value)
      .slice(0, 10);
  }, [credentialData]);

  const domainData = useMemo(() => {
    const domains = {};
    credentialData.data?.forEach(item => {
      const domain = item.host?.split('.').slice(-2).join('.') || 'Unknown';
      domains[domain] = (domains[domain] || 0) + 1;
    });
    return Object.entries(domains)
      .map(([name, value]) => ({ name, value }))
      .sort((a, b) => b.value - a.value)
      .slice(0, 8);
  }, [credentialData]);

  const stats = useMemo(() => {
    const uniqueHosts = [...new Set(credentialData.data?.map(c => c.host) || [])].length;
    const uniqueUsers = [...new Set(credentialData.data?.map(c => c.username) || [])].length;
    const totalCredentials = credentialData.totalEntries || 0;
    
    return { uniqueHosts, uniqueUsers, totalCredentials };
  }, [credentialData]);

  if (showDetailed) {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <ChartCard title="Top 10 Targeted Hosts" icon={<TrendingUp className="w-5 h-5" />}>
            {hostData.length > 0 ? (
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={hostData} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                  <XAxis type="number" stroke="#94a3b8" />
                  <YAxis dataKey="name" type="category" stroke="#94a3b8" width={150} />
                  <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155' }} />
                  <Bar dataKey="value" fill="#3b82f6" radius={[0, 8, 8, 0]} />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-[400px] flex items-center justify-center text-slate-400">No data available</div>
            )}
          </ChartCard>
        </div>

        <div className="space-y-4">
          <div className="bg-gradient-to-br from-red-500/20 to-red-600/10 border border-red-500/30 rounded-xl p-6">
            <h3 className="text-red-400 font-semibold mb-2">High Risk</h3>
            <p className="text-slate-300 text-sm mb-4">Encrypted credentials detected</p>
            <div className="text-3xl font-bold text-red-400">{stats.totalCredentials.toLocaleString()}</div>
            <p className="text-slate-400 text-sm mt-2">Total entries in database</p>
          </div>

          <div className="bg-gradient-to-br from-blue-500/20 to-blue-600/10 border border-blue-500/30 rounded-xl p-6">
            <h3 className="text-blue-400 font-semibold mb-2">Active Monitoring</h3>
            <p className="text-slate-300 text-sm mb-4">Unique hosts compromised</p>
            <div className="text-3xl font-bold text-blue-400">{stats.uniqueHosts}</div>
            <p className="text-slate-400 text-sm mt-2">Across multiple domains</p>
          </div>

          <div className="bg-gradient-to-br from-purple-500/20 to-purple-600/10 border border-purple-500/30 rounded-xl p-6">
            <h3 className="text-purple-400 font-semibold mb-2">User Accounts</h3>
            <p className="text-slate-300 text-sm mb-4">Unique usernames found</p>
            <div className="text-3xl font-bold text-purple-400">{stats.uniqueUsers}</div>
            <p className="text-slate-400 text-sm mt-2">Identity exposure level</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
      <ChartCard title="Top 10 Compromised Hosts" icon={<Globe className="w-5 h-5" />}>
        {hostData.length > 0 ? (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={hostData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis dataKey="name" stroke="#94a3b8" angle={-45} textAnchor="end" height={100} />
              <YAxis stroke="#94a3b8" />
              <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155' }} />
              <Bar dataKey="value" fill="#3b82f6" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <div className="h-[300px] flex items-center justify-center text-slate-400">No data available</div>
        )}
      </ChartCard>

      <ChartCard title="Domain Distribution" icon={<Shield className="w-5 h-5" />}>
        {domainData.length > 0 ? (
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={domainData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {domainData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        ) : (
          <div className="h-[300px] flex items-center justify-center text-slate-400">No data available</div>
        )}
      </ChartCard>
    </div>
  );
};

export default CombolistCharts;