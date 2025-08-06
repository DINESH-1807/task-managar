export interface Todo {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  status: 'open' | 'complete';
  createdAt: string;
  updatedAt: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  picture?: string;
}

export type FilterType = 'all' | 'open' | 'complete';
export type SortType = 'dueDate' | 'createdAt' | 'title';