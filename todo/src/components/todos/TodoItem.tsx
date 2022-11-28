import React, { FC, useCallback, useState } from 'react';
import { Todo } from '../../pages/main-page/MainPage';
import './todoItem.scss';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { Form } from '../form/Form';
import { FormEdit } from '../form/FormEdit';
import { Button } from '../Button/Button';
import { MdDone } from 'react-icons/md';
import { TiDelete } from 'react-icons/ti';
import { completeTask, deleteTask, editTask } from '../../todos.service';
dayjs.extend(relativeTime);
interface ItemTodoProps {
  it: Todo;
}
export const TodoItem: FC<ItemTodoProps> = ({ it }) => {
  const [showEdit, setShowEdit] = useState(false);
  const [done, setDone] = useState(it.done);
  const EditTask = (it: Todo) => {
    setShowEdit(!showEdit);
    editTask({ ...it });
  };

  const handleDelete = useCallback(async () => {
    await deleteTask(it.id);
    console.log(it.id);
  }, [it.id]);

  const handleComplete = useCallback(async () => {
    console.log(done);

    setDone((prevState) => !prevState);
    await completeTask(it.id, done);
    console.log(done);
  }, [it.id, done]);
  return (
    <>
      {showEdit ? (
        <div className="form-wrapper">
          <div className="button-form">
            <Button type={'button'} onClick={() => setShowEdit(!showEdit)}>
              close
            </Button>
          </div>
          <FormEdit setFormData={it} onEdit={EditTask} it={it} />
        </div>
      ) : (
        <>
          <div className={it.done ? 'card_done' : 'card'}>
            <div className="card__info">
              <h3 className="card__tilte"> {it.title}</h3>
              <p className="card__description"> {it.description}</p>
              <p className="card__done">{it.done ? 'Сompleted' : 'Not completed'}</p>
              <p className="card__date">{it.deadline}</p>
            </div>
            <div className="card__complete">
              <button className="card__button" onClick={handleComplete}>
                {it.done ? <MdDone /> : <TiDelete />}
              </button>
            </div>
          </div>
          <div className="button-wrapper">
            <Button type={'button'} onClick={handleDelete}>
              delete
            </Button>
            <Button onClick={() => setShowEdit(!showEdit)} type={'button'}>
              edit
            </Button>
            <a href={it.file} target="_blank" rel="noreferrer">
              <Button type={'button'}>File</Button>
            </a>
          </div>
        </>
      )}
    </>
  );
};
