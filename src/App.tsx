import React from 'react';
import './App.scss';
import { TodoList } from './components/TodoList';

export const App: React.FC = () => {
  return (
    <main className="container is-clipped">
      <TodoList />
    </main>
  );
};
