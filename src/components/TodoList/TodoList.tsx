import React, { useState, useEffect } from 'react';
import classNames from 'classnames';
import { TableHeader } from '../TableHeader';
import { TodoItem } from '../TodoItem';
import { getAll, updateOne, addOne } from '../../load/todos';
import { Todo } from '../types/Todo';

export const TodoList: React.FC = () => {
  const tableHeaderValues: string[] = ['ID', 'TITLE', 'DESCRIPTION', 'STATUS'];
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isSelected, setIsSelected] = useState<Todo | null>(null);
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [noTitle, setNoTitle] = useState<boolean>(false);
  const [noDescription, setNoDescription] = useState<boolean>(false);
  const hasTitle = title.trim() !== '';
  const hasDescription = description.trim() !== '';

  const loadTodos = () => {
    setTodos(getAll());
  };

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    setNoTitle(false);
  };

  const handleDescriptionChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(event.target.value);
    setNoDescription(false);
  };

  const resetForm = () => {
    setTitle('');
    setDescription('');
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!hasTitle) {
      setNoTitle(true);

      return;
    }

    if (!hasDescription) {
      setNoDescription(true);

      return;
    }

    const maxID = Math.max(...todos.map(todo => todo.id));

    const newTodo: Todo = {
      id: maxID > 0 ? (maxID + 1) : 1,
      title,
      description,
      completed: false,
    };

    addOne(newTodo);
    resetForm();
    loadTodos();
  };

  const handleUpdate = (todo: Todo | null) => {
    if (todo === null) {
      return;
    }

    const { id, completed } = todo;

    updateOne(id, {
      completed: !completed,
    });

    loadTodos();
  };

  useEffect(() => {
    loadTodos();
  }, []);

  return (
    <div className="container">
      <div className="container mt-6 mb-6">
        <form onSubmit={handleSubmit}>
          <label htmlFor="title" className="label">
            Title:
            <input
              id="title"
              type="text"
              placeholder="Todo title"
              className={classNames('input title-text mt-2', {
                'is-danger': noTitle,
              })}
              value={title}
              onChange={handleTitleChange}
            />
          </label>
          {noTitle && (
            <p className="help is-danger">This field is empty</p>
          )}

          <label htmlFor="description" className="label mt-3">
            Description:
            <textarea
              id="description"
              placeholder="Todo description"
              rows={5}
              className={classNames('textarea description-text mt-2', {
                'is-danger': noDescription,
              })}
              value={description}
              onChange={handleDescriptionChange}
            />
          </label>
          {noDescription && (
            <p className="help is-danger">This field is empty</p>
          )}

          <button
            type="submit"
            className="button is-success is-outlined button__create mt-3"
          >
            Create
          </button>
        </form>
      </div>

      <div className="container">
        <table className="table is-hoverable is-narrow is-fullwidth">
          <TableHeader values={tableHeaderValues} />

          <TodoItem
            todos={todos}
            onSelected={setIsSelected}
            onUpdate={handleUpdate}
          />
        </table>

        <div className={classNames('modal', {
          'is-active': isSelected !== null,
        })}
        >
          <div className="modal-background"></div>
          <div className="modal-card">
            <header className="modal-card-head">
              <p className="modal-card-head title is-3">
                {isSelected?.title}
              </p>
            </header>
            <section className="modal-card-body has-text-justified">
              <h5 className="title is-5 mb-3">Description:</h5>
              <p className="mb-5">{isSelected?.description}</p>
              <label htmlFor="modal-status" className="checkbox title is-6">
                Status:
                <br></br>
                <input
                  id="modal-status"
                  type="checkbox"
                  checked={isSelected?.completed}
                />
              </label>
            </section>
            <button
              type="button"
              className="button is-warning"
              aria-label="close"
              onClick={() => setIsSelected(null)}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
