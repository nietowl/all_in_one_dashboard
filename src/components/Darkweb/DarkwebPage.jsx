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

  useEffect(() => {
    const loadStats = async () => {
      try {
        const data = await fetchDarkwebStats();
        setStats(data);
      } catch (error) {
        console.error('Error loading stats:', error);
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