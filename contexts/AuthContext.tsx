import React, { createContext, useContext, useState, ReactNode } from 'react';
import { User } from '../types';
import toast from 'react-hot-toast';

interface AuthContextType {
  user: User | null;
  login: (role: 'buyer' | 'seller' | 'admin') => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Default to a seller for the demo experience
  const [user, setUser] = useState<User | null>({
    id: '1',
    name: 'Alex Creator',
    role: 'seller',
    balance: 12450.00,
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex'
  });

  const login = (role: 'buyer' | 'seller' | 'admin') => {
    let mockUser: User;

    switch (role) {
      case 'admin':
        mockUser = {
          id: 'admin-1',
          name: 'System Admin',
          role: 'admin',
          balance: 0,
          avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=Admin'
        };
        break;
      case 'buyer':
        mockUser = {
          id: 'buyer-1',
          name: 'Jordan Buyer',
          role: 'buyer',
          balance: 250.00,
          avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Jordan'
        };
        break;
      case 'seller':
      default:
        mockUser = {
          id: 'seller-1',
          name: 'Alex Creator',
          role: 'seller',
          balance: 12450.00,
          avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex'
        };
        break;
    }

    setUser(mockUser);
    toast.success(`Switched to ${role.toUpperCase()} view`);
  };

  const logout = () => {
    setUser(null);
    toast('Logged out', { icon: '👋' });
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};