import React, { FC, useState } from 'react';
import { Todo } from '../../pages/main-page/MainPage';
import './todoItem.scss';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { Form } from '../form/Form';
import { FormEdit } from '../form/FormEdit';
import { Button } from '../Button/Button';
dayjs.extend(relativeTime);
interface ItemTodoProps {
  it: Todo;
  onDelete: (id: string) => void;
  onEdit: (it: Todo) => void;
}
export const TodoItem: FC<ItemTodoProps> = ({ it, onDelete, onEdit }) => {
  const [showEdit, setShowEdit] = useState(false);

  const EditTask = (it: Todo) => {
    setShowEdit(!showEdit);
    onEdit({ ...it });
  };

  return (
    <>
      {showEdit ? (
        <FormEdit setFormData={it} onEdit={EditTask} it={it} />
      ) : (
        <>
          <div className="card">
            <h3 className="card__tilte"> {it.title}</h3>
            <p className="card__description"> {it.description}</p>
            <p className="card__done">{it.done ? 'done' : 'not done'}</p>
            <p className="card__date">{it.deadline}</p>
          </div>
          <div>
            <Button onClick={() => onDelete(it.id)} type={'button'}>
              delete
            </Button>
            <Button onClick={() => setShowEdit(!showEdit)} type={'button'}>
              edit
            </Button>
          </div>
        </>
      )}
    </>
  );
};
