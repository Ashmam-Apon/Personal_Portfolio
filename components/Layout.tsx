import React, { useState, useEffect } from 'react';
import { useContent } from '../context/ContentContext';
import { useTheme } from '../context/ThemeContext';
import { Menu, X, Moon, Sun, Lock } from 'lucide-react';
import { Link } from 'react-router-dom';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { data, notifications, removeNotification } = useContent();
  const { theme, toggleTheme } = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Projects', href: '#projects' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      {/* Toast Notifications */}
      <div className="fixed top-20 right-4 z-[60] flex flex-col gap-2 pointer-events-none">
        {notifications.map(n => (
          <div 
            key={n.id} 
            className={`
              pointer-events-auto px-4 py-3 rounded-lg shadow-lg text-sm font-medium animate-fade-in-right flex items-center gap-3 min-w-[300px]
              ${n.type === 'success' ? 'bg-green-500 text-white' : ''}
              ${n.type === 'error' ? 'bg-red-500 text-white' : ''}
              ${n.type === 'info' ? 'bg-blue-500 text-white' : ''}
            `}
          >
            <span>{n.message}</span>
            <button onClick={() => removeNotification(n.id)} className="ml-auto opacity-70 hover:opacity-100" title="Dismiss notification"><X size={16} /></button>
          </div>
        ))}
      </div>

      <nav 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled 
            ? 'bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shadow-sm py-4' 
            : 'bg-transparent py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <a href="#" onClick={(e) => handleNavClick(e, '#home')} className={`text-2xl font-serif font-bold ${isScrolled || theme === 'dark' ? 'text-gray-900 dark:text-white' : 'text-white'}`}>
              {data.profile.name.split(' ')[0]}<span className="text-primary-600">.</span>
            </a>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center space-x-8">
              {navLinks.map((link) => (
                <a 
                  key={link.name} 
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className={`font-medium hover:text-primary-600 transition-colors ${
                    isScrolled || theme === 'dark' ? 'text-gray-700 dark:text-gray-300' : 'text-white/90'
                  }`}
                >
                  {link.name}
                </a>
              ))}
              <button onClick={toggleTheme} className={`p-2 rounded-full transition-colors ${isScrolled || theme === 'dark' ? 'text-gray-700 dark:text-gray-300' : 'text-white'}`}>
                {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
              </button>
              <Link to="/admin" className={`p-2 rounded-full transition-colors ${isScrolled || theme === 'dark' ? 'text-gray-700 dark:text-gray-300' : 'text-white'}`}>
                <Lock size={20} />
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center gap-4">
              <button onClick={toggleTheme} className={`${isScrolled || theme === 'dark' ? 'text-gray-900 dark:text-white' : 'text-white'}`}>
                {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
              </button>
              <button 
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className={`${isScrolled || theme === 'dark' ? 'text-gray-900 dark:text-white' : 'text-white'}`}
              >
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white dark:bg-gray-900 border-t dark:border-gray-800">
            <div className="px-4 pt-2 pb-6 space-y-2">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="block px-3 py-4 text-base font-medium text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-800 rounded-md"
                >
                  {link.name}
                </a>
              ))}
              <Link 
                to="/admin" 
                onClick={() => setIsMobileMenuOpen(false)}
                className="block px-3 py-4 text-base font-medium text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-800 rounded-md"
              >
                Admin Dashboard
              </Link>
            </div>
          </div>
        )}
      </nav>

      <main>{children}</main>

      <footer className="bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800 py-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
           <p className="text-gray-500 dark:text-gray-400">© {new Date().getFullYear()} {data.profile.name}. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};