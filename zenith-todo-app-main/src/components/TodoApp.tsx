import React, { useState } from 'react';
import { Header } from './Header';
import { SearchBar } from './SearchBar';
import { FilterTabs } from './FilterTabs';
import { TodoList } from './TodoList';
import { TodoForm } from './TodoForm';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

export function TodoApp() {
  const [isAddingTodo, setIsAddingTodo] = useState(false);

  const handleAddTodo = () => {
    setIsAddingTodo(true);
  };

  const handleCloseForm = () => {
    setIsAddingTodo(false);
  };

  return (
    <div className="h-screen flex flex-col bg-background">
      <Header />
      <SearchBar />
      <FilterTabs />
      <TodoList />
      
      {/* Floating Action Button */}
      <Button
        onClick={handleAddTodo}
        className="fab"
        aria-label="Add new task"
      >
        <Plus className="h-6 w-6" />
      </Button>

      {isAddingTodo && <TodoForm onClose={handleCloseForm} />}
    </div>
  );
}