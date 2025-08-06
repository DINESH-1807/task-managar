import React, { useState } from 'react';
import { useTodo } from '@/contexts/TodoContext';
import { Todo } from '@/types/todo';
import { TodoCard } from './TodoCard';
import { TodoForm } from './TodoForm';
import { EmptyState } from './SearchBar';
import { PullToRefresh } from './PullToRefresh';

export function TodoList() {
  const { filteredTodos, state, refreshTodos } = useTodo();
  const [editingTodo, setEditingTodo] = useState<Todo | null>(null);

  const handleEdit = (todo: Todo) => {
    setEditingTodo(todo);
  };

  const handleCloseForm = () => {
    setEditingTodo(null);
  };

  return (
    <>
      <PullToRefresh onRefresh={refreshTodos} isRefreshing={state.isLoading}>
        <div className="flex-1 overflow-y-auto custom-scrollbar">
          {filteredTodos.length === 0 ? (
            <EmptyState />
          ) : (
            <div className="p-4 space-y-3">
              {filteredTodos.map((todo, index) => (
                <div
                  key={todo.id}
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <TodoCard todo={todo} onEdit={handleEdit} />
                </div>
              ))}
            </div>
          )}
        </div>
      </PullToRefresh>

      {editingTodo && (
        <TodoForm todo={editingTodo} onClose={handleCloseForm} />
      )}
    </>
  );
}