import React from 'react';
import Sidebar from './Sidebar';

const MainLayout = ({ activeSection, setActiveSection, children }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      <Sidebar activeSection={activeSection} setActiveSection={setActiveSection} />
      <div className="ml-64 p-6">
        {children}
      </div>
    </div>
  );
};

export default MainLayout;