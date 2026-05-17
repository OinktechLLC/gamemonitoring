import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import BottomNav from './components/BottomNav';
import HomePage from './components/HomePage';
import FAQPage from './pages/FAQPage';
import DocsPage from './pages/DocsPage';
import TermsPage from './pages/TermsPage';
import PrivacyPage from './pages/PrivacyPage';

function App() {
  const [selectedServer, setSelectedServer] = useState(null);

  const handleServerClick = (server) => {
    setSelectedServer(server);
    // In a full implementation, this could open a modal or navigate to a server detail page
    console.log('Server selected:', server);
  };

  return (
    <Router>
      <div className="app-container">
        <Header />
        
        <Routes>
          <Route 
            path="/" 
            element={<HomePage onServerClick={handleServerClick} />} 
          />
          <Route path="/faq" element={<FAQPage />} />
          <Route path="/docs" element={<DocsPage />} />
          <Route path="/terms" element={<TermsPage />} />
          <Route path="/privacy" element={<PrivacyPage />} />
        </Routes>

        <BottomNav />
      </div>
    </Router>
  );
}

export default App;
