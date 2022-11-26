import { Timestamp } from 'firebase/firestore';
import React, { FC, useState } from 'react';
import { useModal } from '../../hooks/UseModal';
import { Todo } from '../../pages/main-page/MainPage';
import { Button } from '../Button/Button';
import './style.scss';
interface FormProps {
  addTask: (task: Todo) => void;
  setFormData?: Todo;
  toggle: () => void;
}

const initValue = {
  title: '',
  description: '',
  file: '',
  deadline: '',
  done: false,
  id: '',
};
export const Form: FC<FormProps> = ({ addTask, setFormData = initValue, toggle }) => {
  const [task, setTask] = useState(setFormData);
  const onSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    addTask(task);
    toggle();
    setTask(initValue);
  };
  return (
    <form onSubmit={onSubmit} className="form">
      <div>
        <input
          placeholder="Add title"
          required
          value={task.title}
          onChange={(e) => setTask({ ...task, title: e.target.value })}
        />
      </div>
      <div>
        <input
          placeholder="Add description"
          required
          value={task.description}
          onChange={(e) => setTask({ ...task, description: e.target.value })}
        />
      </div>
      <div>
        <input
          placeholder="Add date"
          type="date"
          required
          value={task.deadline}
          onChange={(e) => setTask({ ...task, deadline: e.target.value })}
        />
      </div>
      <div className="form__file_wrapper">
        <label className="form__file">
          <input
            placeholder="Add file"
            required
            name={task.file}
            type="file"
            value={task.file}
            onChange={(e) => setTask({ ...task, file: e.target.value })}
          />
          <span className="form__file_span"> add file</span>
        </label>
      </div>
      <Button type={'submit'}>add</Button>
    </form>
  );
};
