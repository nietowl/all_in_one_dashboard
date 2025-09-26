import React, { useState } from 'react';
import MainLayout from './components/Layout/MainLayout';
import HomePage from './components/Home/HomePage';
import DarkwebPage from './components/Darkweb/DarkwebPage';
import StealerLogsPage from './components/StealerLogs/StealerLogsPage';
import CombolistPage from './components/Combolist/CombolistPage';

function App() {
  const [activeSection, setActiveSection] = useState('home');

  const renderSection = () => {
    switch (activeSection) {
      case 'home':
        return <HomePage setActiveSection={setActiveSection} />;
      case 'darkweb':
        return <DarkwebPage />;
      case 'stealerlogs':
        return <StealerLogsPage />;
      case 'combolist':
        return <CombolistPage />;
      default:
        return <HomePage setActiveSection={setActiveSection} />;
    }
  };

  return (
    <MainLayout activeSection={activeSection} setActiveSection={setActiveSection}>
      {renderSection()}
    </MainLayout>
  );
}

export default App;