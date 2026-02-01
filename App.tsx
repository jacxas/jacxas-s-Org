import React from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './contexts/AuthContext';

// Pages
import Home from './pages/Home';
import Marketplace from './pages/Marketplace';
import Generator from './pages/Generator';
import Dashboard from './pages/Dashboard';
import Docs from './pages/Docs';

// Components
import Navbar from './components/Navbar';

const App: React.FC = () => {
  return (
    <AuthProvider>
      <HashRouter>
        <div className="min-h-screen bg-slate-950 text-slate-200 font-sans selection:bg-brand-500 selection:text-white flex flex-col">
          <Navbar />
          <div className="flex-grow pt-16">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/marketplace" element={<Marketplace />} />
              <Route path="/generate" element={<Generator />} />
              <Route path="/dashboard/*" element={<Dashboard />} />
              <Route path="/docs" element={<Docs />} />
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </div>
          <Toaster 
            position="bottom-right"
            toastOptions={{
              style: {
                background: '#1e293b',
                color: '#fff',
                border: '1px solid #334155',
              },
            }}
          />
        </div>
      </HashRouter>
    </AuthProvider>
  );
};

export default App;