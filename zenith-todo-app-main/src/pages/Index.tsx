import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { LoginScreen } from '@/components/LoginScreen';
import { TodoApp } from '@/components/TodoApp';

const Index = () => {
  const { user } = useAuth();

  if (!user) {
    return <LoginScreen />;
  }

  return <TodoApp />;
};

export default Index;
