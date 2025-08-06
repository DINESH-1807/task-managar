import React, { useState } from 'react';
import { Todo } from '@/types/todo';
import { useTodo } from '@/contexts/TodoContext';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Calendar, Edit, Trash2, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';
import { format, isToday, isTomorrow, isPast } from 'date-fns';

interface TodoCardProps {
  todo: Todo;
  onEdit: (todo: Todo) => void;
}

export function TodoCard({ todo, onEdit }: TodoCardProps) {
  const { toggleTodo, deleteTodo } = useTodo();
  const [isSwipeActive, setIsSwipeActive] = useState(false);
  const [dragX, setDragX] = useState(0);

  const handleCheckboxChange = () => {
    toggleTodo(todo.id);
  };

  const handleDelete = () => {
    deleteTodo(todo.id);
  };

  const formatDueDate = (dateString: string) => {
    const date = new Date(dateString);
    if (isToday(date)) return 'Today';
    if (isTomorrow(date)) return 'Tomorrow';
    return format(date, 'MMM d');
  };

  const getDueDateColor = (dateString: string) => {
    const date = new Date(dateString);
    if (isPast(date) && todo.status === 'open') return 'text-destructive';
    if (isToday(date)) return 'text-warning';
    return 'text-muted-foreground';
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    const touch = e.touches[0];
    setDragX(touch.clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    const touch = e.touches[0];
    const deltaX = dragX - touch.clientX;
    if (deltaX > 50) {
      setIsSwipeActive(true);
    } else if (deltaX < -50) {
      setIsSwipeActive(false);
    }
  };

  const handleTouchEnd = () => {
    setDragX(0);
  };

  return (
    <div
      className={cn(
        'task-card swipe-container slide-up',
        todo.status === 'complete' && 'completed',
        isSwipeActive && 'swipe-active'
      )}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <div className="flex items-start gap-3">
        <Checkbox
          checked={todo.status === 'complete'}
          onCheckedChange={handleCheckboxChange}
          className="mt-1 mobile-touch-target"
        />
        
        <div className="flex-1 min-w-0">
          <h3
            className={cn(
              'font-medium text-base leading-snug',
              todo.status === 'complete' && 'line-through text-muted-foreground'
            )}
          >
            {todo.title}
          </h3>
          
          {todo.description && (
            <p
              className={cn(
                'text-sm text-muted-foreground mt-1',
                todo.status === 'complete' && 'line-through'
              )}
            >
              {todo.description}
            </p>
          )}
          
          <div className="flex items-center gap-4 mt-3">
            <div className={cn('flex items-center gap-1 text-xs', getDueDateColor(todo.dueDate))}>
              <Calendar className="h-3 w-3" />
              <span>{formatDueDate(todo.dueDate)}</span>
            </div>
            
            <Badge
              variant={todo.status === 'complete' ? 'secondary' : 'default'}
              className="text-xs px-2 py-1"
            >
              {todo.status === 'complete' ? 'Complete' : 'Open'}
            </Badge>
          </div>
        </div>
        
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onEdit(todo)}
            className="mobile-touch-target p-2"
          >
            <Edit className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      {/* Swipe Actions */}
      <div className="swipe-actions bg-destructive px-4">
        <Button
          variant="ghost"
          size="sm"
          onClick={handleDelete}
          className="text-destructive-foreground hover:bg-destructive/80"
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}