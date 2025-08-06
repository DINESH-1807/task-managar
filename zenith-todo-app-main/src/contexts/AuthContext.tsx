import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '@/types/todo';

interface AuthState {
  user: User | null;
  isLoading: boolean;
  error: string | null;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  error: string | null;
  login: () => Promise<void>;
  logout: () => void;
  clearError: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<AuthState>({
    user: null,
    isLoading: false,
    error: null,
  });

  // Check for saved user on mount
  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      const user = JSON.parse(savedUser);
      // Update saved user data to match new profile
      const updatedUser = {
        ...user,
        name: 'Dinesh',
        email: 'dinesh48king@gmail.com'
      };
      localStorage.setItem('user', JSON.stringify(updatedUser));
      setState(prev => ({ ...prev, user: updatedUser }));
    }
  }, []);

  const login = async (): Promise<void> => {
    setState(prev => ({ ...prev, isLoading: true, error: null }));

    try {
      // Simulate Google OAuth login
      // In a real app, you'd use Google OAuth SDK
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Simulate random login failure for demo purposes
      if (Math.random() < 0.2) {
        throw new Error('Authentication failed. Please try again.');
      }

      const mockUser: User = {
        id: crypto.randomUUID(),
        email: 'dinesh48king@gmail.com',
        name: 'Dinesh',
        picture: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
      };

      localStorage.setItem('user', JSON.stringify(mockUser));
      setState(prev => ({ ...prev, user: mockUser, isLoading: false }));
    } catch (error) {
      setState(prev => ({
        ...prev,
        error: error instanceof Error ? error.message : 'Login failed',
        isLoading: false,
      }));
    }
  };

  const logout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('todos');
    setState({ user: null, isLoading: false, error: null });
  };

  const clearError = () => {
    setState(prev => ({ ...prev, error: null }));
  };

  const value: AuthContextType = {
    user: state.user,
    isLoading: state.isLoading,
    error: state.error,
    login,
    logout,
    clearError,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}