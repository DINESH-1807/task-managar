import React from 'react';
import { useTodo } from '@/contexts/TodoContext';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { FilterType } from '@/types/todo';
import { cn } from '@/lib/utils';

const filters: { key: FilterType; label: string }[] = [
  { key: 'all', label: 'All' },
  { key: 'open', label: 'Open' },
  { key: 'complete', label: 'Complete' },
];

export function FilterTabs() {
  const { state, setFilter } = useTodo();

  const getTaskCount = (filter: FilterType) => {
    if (filter === 'all') return state.todos.length;
    return state.todos.filter(todo => todo.status === filter).length;
  };

  return (
    <div className="flex gap-2 p-4 bg-background-secondary/50">
      {filters.map(filter => (
        <Button
          key={filter.key}
          variant={state.filter === filter.key ? 'default' : 'outline'}
          size="sm"
          onClick={() => setFilter(filter.key)}
          className={cn(
            'flex items-center gap-2 transition-all',
            state.filter === filter.key && 'bg-gradient-primary text-primary-foreground'
          )}
        >
          <span>{filter.label}</span>
          <Badge
            variant="secondary"
            className={cn(
              'text-xs',
              state.filter === filter.key && 'bg-white/20 text-current'
            )}
          >
            {getTaskCount(filter.key)}
          </Badge>
        </Button>
      ))}
    </div>
  );
}