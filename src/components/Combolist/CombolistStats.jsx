import React, { useMemo } from 'react';
import { Database, Key, Globe, Users, Lock } from 'lucide-react';
import MetricCard from '../Common/MetricCard';

const CombolistStats = ({ credentialData }) => {
  const stats = useMemo(() => {
    const totalCredentials = credentialData.totalEntries || 0;
    const displayedCredentials = credentialData.data?.length || 0;
    const uniqueHosts = [...new Set(credentialData.data?.map(c => c.host) || [])].length;
    const uniqueUsers = [...new Set(credentialData.data?.map(c => c.username) || [])].length;
    
    return {
      totalCredentials,
      displayedCredentials,
      uniqueHosts,
      uniqueUsers,
      encryptionType: credentialData.passwordType || 'Unknown'
    };
  }, [credentialData]);

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
        <MetricCard
          icon={<Database className="w-6 h-6" />}
          title="Total Entries"
          value={stats.totalCredentials.toLocaleString()}
          color="blue"
        />
        <MetricCard
          icon={<Key className="w-6 h-6" />}
          title="Displayed"
          value={stats.displayedCredentials}
          color="purple"
        />
        <MetricCard
          icon={<Globe className="w-6 h-6" />}
          title="Unique Hosts"
          value={stats.uniqueHosts}
          color="green"
        />
        <MetricCard
          icon={<Users className="w-6 h-6" />}
          title="Unique Users"
          value={stats.uniqueUsers}
          color="orange"
        />
        <MetricCard
          icon={<Lock className="w-6 h-6" />}
          title="Encryption"
          value={stats.encryptionType}
          color="red"
          subtitle="Password Type"
        />
      </div>

      {credentialData.message && (
        <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-4 mb-6">
          <p className="text-blue-300 text-sm">{credentialData.message}</p>
        </div>
      )}
    </>
  );
};

export default CombolistStats;