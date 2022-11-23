import React, { FC } from 'react';
import { Todo } from '../../pages/main-page/MainPage';
import './todoItem.scss';
interface ItemTodoProps {
  it: Todo;
}
export const TodoItem: FC<ItemTodoProps> = ({ it }) => {
  return (
    <div className="card">
      <div className="card__tilte">{it.title}</div>
      <div className="card__description">{it.description}</div>
      <div className="card__done">{it.done}</div>
    </div>
  );
};
