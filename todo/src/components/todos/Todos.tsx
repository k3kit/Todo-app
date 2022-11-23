import React, { FC } from 'react';
import { Todo } from '../../pages/main-page/MainPage';
import { TodoItem } from './TodoItem';
interface TodosProps {
  todos: Todo[];
}
export const Todos: FC<TodosProps> = ({ todos }) => {
  return (
    <div>
      {todos.map((it) => (
        <TodoItem it={it} key={it.id} />
      ))}
    </div>
  );
};
