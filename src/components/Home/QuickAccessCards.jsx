import React from 'react';
import { Shield, Database, List, ChevronRight } from 'lucide-react';

const QuickAccessCards = ({ setActiveSection }) => {
  const cards = [
    {
      id: 'darkweb',
      icon: Shield,
      title: 'Darkweb Data',
      description: 'Access darkweb marketplace data and breach databases',
      color: 'blue'
    },
    {
      id: 'stealerlogs',
      icon: Database,
      title: 'Stealer Logs',
      description: 'Analyze malware-extracted credentials and system info',
      color: 'purple'
    },
    {
      id: 'combolist',
      icon: List,
      title: 'Combolist',
      description: 'Search and filter credential combination databases',
      color: 'green'
    }
  ];

  const hoverColors = {
    blue: 'hover:border-blue-500/50 group-hover:text-blue-400',
    purple: 'hover:border-purple-500/50 group-hover:text-purple-400',
    green: 'hover:border-green-500/50 group-hover:text-green-400'
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      {cards.map(card => {
        const Icon = card.icon;
        return (
          <button
            key={card.id}
            onClick={() => setActiveSection(card.id)}
            className={`bg-slate-800/50 backdrop-blur border border-slate-700 rounded-xl p-6 text-left ${hoverColors[card.color]} transition-all group`}
          >
            <div className="flex items-center justify-between mb-4">
              <Icon className={`w-8 h-8 text-${card.color}-400`} />
              <ChevronRight className="w-5 h-5 text-slate-600 group-hover:text-current transition-colors" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">{card.title}</h3>
            <p className="text-slate-400 text-sm">{card.description}</p>
          </button>
        );
      })}
    </div>
  );
};

export default QuickAccessCards;