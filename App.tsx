import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { ContentProvider } from './context/ContentContext';
import { Layout } from './components/Layout';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Portfolio } from './components/Portfolio';
import { Achievements } from './components/Achievements';
import { AdminDashboard } from './components/admin/AdminDashboard';

// Login Component
const Login = ({ onLogin }: { onLogin: () => void }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'admin123') { // Simple demo auth
      onLogin();
    } else {
      setError(true);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 p-4">
      <div className="max-w-md w-full bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg border dark:border-gray-700">
        <h2 className="text-2xl font-bold mb-6 text-center dark:text-white">Admin Access</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Password</label>
            <input 
              type="password" 
              className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:ring-2 focus:ring-primary-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password (admin123)"
            />
          </div>
          {error && <p className="text-red-500 text-sm">Incorrect password.</p>}
          <button type="submit" className="w-full bg-primary-600 text-white py-2 rounded-lg font-medium hover:bg-primary-700 transition">
            Login
          </button>
          <p className="text-xs text-center text-gray-500 mt-4">Demo Password: admin123</p>
        </form>
      </div>
    </div>
  );
};

const PublicSite = () => (
  <Layout>
    <Hero />
    <About />
    <Achievements />
    <Portfolio />
    <section id="contact" className="py-20 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <h2 className="text-3xl font-serif font-bold text-gray-900 dark:text-white mb-8">Get In Touch</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-8">
          Interested in working together? I'm always open to discussing new projects, creative ideas or opportunities to be part of your visions.
        </p>
        <a 
          href="mailto:hello@example.com" 
          className="inline-block bg-primary-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-primary-700 transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-1"
        >
          Say Hello
        </a>
      </div>
    </section>
  </Layout>
);

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem('auth') === 'true';
  });

  const handleLogin = () => {
    localStorage.setItem('auth', 'true');
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('auth');
    setIsAuthenticated(false);
  };

  return (
    <ThemeProvider>
      <ContentProvider>
        <HashRouter>
          <Routes>
            <Route path="/" element={<PublicSite />} />
            <Route 
              path="/admin" 
              element={
                isAuthenticated ? 
                <AdminDashboard onLogout={handleLogout} /> : 
                <Login onLogin={handleLogin} />
              } 
            />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </HashRouter>
      </ContentProvider>
    </ThemeProvider>
  );
};

export default App;
