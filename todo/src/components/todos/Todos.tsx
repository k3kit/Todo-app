import React, { FC } from 'react';
import { Todo } from '../../pages/main-page/MainPage';
import { TodoItem } from './TodoItem';
interface TodosProps {
  todos: Todo[];
  onDelete: (id: string) => void;
  onEdit: (todo: Todo) => void;
}
export const Todos: FC<TodosProps> = ({ todos, onDelete, onEdit }) => {
  return (
    <div className="todo__wrapper">
      <div className="todo__list">
        {todos.map((it) => (
          <TodoItem it={it} key={it.id} onDelete={onDelete} onEdit={onEdit} />
        ))}
      </div>
    </div>
  );
};
