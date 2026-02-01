import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Zap, ShoppingCart, Menu, X, LayoutGrid, FileText, Users, Shield, LayoutDashboard } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const Navbar: React.FC = () => {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, login } = useAuth();

  const getRoleIcon = () => {
    switch (user?.role) {
      case 'admin': return Shield;
      case 'seller': return LayoutDashboard;
      default: return ShoppingCart;
    }
  };

  const getRoleLabel = () => {
    switch (user?.role) {
      case 'admin': return 'Admin Panel';
      case 'seller': return 'Seller Studio';
      default: return 'My Orders';
    }
  };

  const RoleIcon = getRoleIcon();

  const navLinks = [
    { name: 'Marketplace', path: '/marketplace', icon: LayoutGrid },
    { name: 'AI Generator', path: '/generate', icon: Zap },
    { name: getRoleLabel(), path: '/dashboard', icon: RoleIcon },
    { name: 'Docs', path: '/docs', icon: FileText },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-950/80 backdrop-blur-md border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="bg-brand-600 p-1.5 rounded-lg group-hover:bg-brand-500 transition-colors">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
              ViralLaunch
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-6">
            {navLinks.map((link) => {
              const isActive = location.pathname.startsWith(link.path);
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`text-sm font-medium transition-colors flex items-center space-x-1.5 ${
                    isActive ? 'text-brand-400' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <link.icon className="w-4 h-4" />
                  <span>{link.name}</span>
                </Link>
              );
            })}
          </div>

          {/* User Actions & Role Switcher */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Role Switcher for Demo */}
            <div className="flex bg-slate-900 rounded-lg border border-slate-800 p-1">
              {(['buyer', 'seller', 'admin'] as const).map((role) => (
                <button
                  key={role}
                  onClick={() => login(role)}
                  className={`px-3 py-1 text-xs font-medium rounded-md transition-colors ${
                    user?.role === role 
                      ? 'bg-brand-600 text-white' 
                      : 'text-slate-400 hover:text-white hover:bg-slate-800'
                  }`}
                >
                  {role.charAt(0).toUpperCase() + role.slice(1)}
                </button>
              ))}
            </div>

            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-brand-500 to-purple-500 flex items-center justify-center border border-slate-700 overflow-hidden">
              {user?.avatar ? (
                <img src={user.avatar} alt="Avatar" className="w-full h-full" />
              ) : (
                <span className="text-xs font-bold text-white">U</span>
              )}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-slate-400 hover:text-white p-2"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-slate-900 border-b border-slate-800">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className="block px-3 py-2 rounded-md text-base font-medium text-slate-300 hover:text-white hover:bg-slate-800"
              >
                <div className="flex items-center space-x-2">
                  <link.icon className="w-4 h-4" />
                  <span>{link.name}</span>
                </div>
              </Link>
            ))}
            <div className="px-3 py-2 mt-2 border-t border-slate-800">
              <p className="text-xs text-slate-500 mb-2 uppercase">Switch Role</p>
              <div className="flex space-x-2">
                {(['buyer', 'seller', 'admin'] as const).map((role) => (
                  <button
                    key={role}
                    onClick={() => {
                      login(role);
                      setIsMobileMenuOpen(false);
                    }}
                    className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors flex-1 ${
                      user?.role === role 
                        ? 'bg-brand-600 text-white' 
                        : 'bg-slate-800 text-slate-400'
                    }`}
                  >
                    {role.charAt(0).toUpperCase() + role.slice(1)}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;