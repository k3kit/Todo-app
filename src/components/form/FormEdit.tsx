import React, { FC, useState } from 'react';
import { Todo } from '../../pages/main-page/MainPage';
import { Button } from '../Button/Button';
import './style.scss';
interface FormProps {
  onEdit: (task: Todo) => void;
  setFormData: Todo;
  it: Todo;
}
export const FormEdit: FC<FormProps> = ({ setFormData, onEdit, it }) => {
  const [task, setTask] = useState(setFormData);
  const onSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    onEdit(task);
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
          placeholder="update description"
          required
          value={task.description}
          onChange={(e) => setTask({ ...task, description: e.target.value })}
        />
      </div>
      <div>
        <input
          placeholder="update date"
          type="date"
          required
          value={task.deadline}
          onChange={(e) => setTask({ ...task, deadline: e.target.value })}
        />
      </div>
      <div>
        <input
          placeholder="update file"
          required
          type="file"
          // onChange={(e) => setTask({ ...task, file: e.target.value })}
        />
      </div>
      <Button type="submit">update</Button>
    </form>
  );
};
