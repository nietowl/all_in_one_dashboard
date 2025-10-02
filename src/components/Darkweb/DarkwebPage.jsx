import React, { useState, useEffect } from 'react';
import { Shield, MessageSquare, Send } from 'lucide-react';
import { fetchDarkwebStats } from '../../services/darkwebAPI';
import DarkwebStats from './DarkwebStats';
import ForumsPage from './Forums/ForumsPage';
import TelegramPage from './Telegram/TelegramPage';

const DarkwebPage = () => {
  const [activeSection, setActiveSection] = useState('overview');
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadStats = async () => {
      try {
        const data = await fetchDarkwebStats();
        setStats(data);
        setError(null);
      } catch (error) {
        console.error('Error loading stats:', error);
        setError('Unable to load statistics. Showing cached data.');
        // Set default mock stats to prevent crashes
        setStats({
          totalForumPosts: 0,
          totalTelegramChannels: 0,
          activeSources: 0,
          recentBreaches: 0
        });
      } finally {
        setLoading(false);
      }
    };

    loadStats();
  }, []);

  const sections = [
    { id: 'overview', name: 'Overview', icon: Shield },
    { id: 'forums', name: 'Darkweb Forums', icon: MessageSquare },
    { id: 'telegram', name: 'Telegram Channels', icon: Send }
  ];

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-4xl font-bold text-white mb-2">Darkweb Data</h2>
        <p className="text-slate-400">Monitor darkweb forums, marketplaces and Telegram channels</p>
      </div>

      {/* Sub-navigation */}
      <div className="flex space-x-2 border-b border-slate-700 mb-8">
        {sections.map(section => {
          const Icon = section.icon;
          return (
            <button
              key={section.id}
              onClick={() => setActiveSection(section.id)}
              className={`px-6 py-3 font-medium flex items-center space-x-2 transition-all ${
                activeSection === section.id
                  ? 'text-blue-400 border-b-2 border-blue-400'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{section.name}</span>
            </button>
          );
        })}
      </div>

      {/* Error Message */}
      {error && (
        <div className="mb-4 bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4 flex items-center space-x-3">
          <Shield className="w-5 h-5 text-yellow-400" />
          <p className="text-yellow-300 text-sm">{error}</p>
        </div>
      )}

      {/* Content */}
      {activeSection === 'overview' && (
        <DarkwebStats stats={stats} loading={loading} />
      )}

      {activeSection === 'forums' && <ForumsPage />}

      {activeSection === 'telegram' && <TelegramPage />}
    </div>
  );
};

export default DarkwebPage;