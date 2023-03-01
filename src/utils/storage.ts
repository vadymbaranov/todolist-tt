import { Todo } from '../components/types/Todo';

export const client = {
  get: () => JSON.parse(localStorage.getItem('todos') || '[]'),
  post: (data: Todo) => {
    const todos: Todo[] = client.get();

    localStorage.setItem('todos', JSON.stringify([...todos, data]));
  },
  patch: (id: number, newData: Omit<Todo, 'id' | 'title' | 'description'>) => {
    const todos: Todo[] | [] = client.get();

    const newTodos: Todo[] = todos.map((todo: Todo) => {
      if (todo.id === id) {
        const changedTodo: Todo = {
          ...todo,
          completed: newData.completed,
        };

        return changedTodo;
      }

      return todo;
    });

    localStorage.setItem('todos', JSON.stringify(newTodos));
  },
};
