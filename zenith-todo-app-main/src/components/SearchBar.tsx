import React from 'react';
import { useTodo } from '@/contexts/TodoContext';
import { Input } from '@/components/ui/input';
import { Search, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function SearchBar() {
  const { state, setSearch } = useTodo();

  const handleClear = () => {
    setSearch('');
  };

  return (
    <div className="relative p-4">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search tasks..."
          value={state.searchQuery}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-10 pr-10 h-12 bg-background border-border/50"
        />
        {state.searchQuery && (
          <Button
            variant="ghost"
            size="sm"
            onClick={handleClear}
            className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0"
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
  );
}

export function EmptyState() {
  const { state } = useTodo();

  if (state.searchQuery) {
    return (
      <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
        <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
          <Search className="h-8 w-8 text-muted-foreground" />
        </div>
        <h3 className="text-lg font-semibold mb-2">No tasks found</h3>
        <p className="text-muted-foreground">
          Try adjusting your search terms or create a new task
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
      <div className="w-16 h-16 rounded-full bg-gradient-primary flex items-center justify-center mb-4">
        <span className="text-2xl text-primary-foreground">✓</span>
      </div>
      <h3 className="text-lg font-semibold mb-2">No tasks yet</h3>
      <p className="text-muted-foreground mb-4">
        Get started by creating your first task
      </p>
    </div>
  );
}