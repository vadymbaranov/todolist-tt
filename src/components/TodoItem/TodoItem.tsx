/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React from 'react';
import { Todo } from '../types/Todo';

type Props = {
  todos: Todo[];
  onSelected: (todo: Todo) => void | null;
  onUpdate: (todo: Todo) => void;
};

export const TodoItem: React.FC<Props> = ({
  todos,
  onSelected,
  onUpdate,
}) => {
  return (
    <tbody>
      {todos.map((todo: Todo) => (
        <tr key={todo.id}>
          <td
            onClick={() => onSelected(todo)}
            onKeyDown={() => onSelected(todo)}
          >
            {todo.id}
          </td>
          <td
            onClick={() => onSelected(todo)}
            onKeyDown={() => onSelected(todo)}
          >
            {todo.title}
          </td>
          <td
            onClick={() => onSelected(todo)}
            onKeyDown={() => onSelected(todo)}
          >
            {todo.description}
          </td>
          <td>
            <label htmlFor="status" className="checkbox">
              <input
                id="status"
                type="checkbox"
                checked={todo.completed}
                onChange={() => onUpdate(todo)}
              />
            </label>
          </td>
        </tr>
      ))}
    </tbody>
  );
};
