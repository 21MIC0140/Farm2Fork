import React, { useState } from 'react';
import { Navigation } from './components/Navigation';
import { Home } from './pages/Home';
import { ConsumerProfile } from './pages/ConsumerProfile';
import { FarmerPortal } from './pages/FarmerPortal';
import { FarmerProfile } from './pages/FarmerProfile';
import { ScanQR } from './pages/ScanQR';
import { Store } from './pages/Store';

function App() {
  const [currentPage, setCurrentPage] = useState('home');

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <Home onNavigate={setCurrentPage} />;
      case 'consumer-profile':
        return <ConsumerProfile />;
      case 'farmer-portal':
        return <FarmerPortal />;
      case 'farmer-profile':
        return <FarmerProfile />;
      case 'scan-qr':
        return <ScanQR onNavigateToConsumer={() => setCurrentPage('consumer-profile')} />;
      case 'store':
        return <Store />;
      default:
        return <Home onNavigate={setCurrentPage} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation currentPage={currentPage} onPageChange={setCurrentPage} />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {renderPage()}
      </main>
    </div>
  );
}

export default App;