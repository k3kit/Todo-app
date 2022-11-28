import { async } from '@firebase/util';
import { Timestamp } from 'firebase/firestore';
import React, { ChangeEvent, FC, useRef, useState } from 'react';
import { useModal } from '../../hooks/UseModal';
import { FileType, Todo } from '../../pages/main-page/MainPage';
import { addTask, uploadFile } from '../../todos.service';
import { Button } from '../Button/Button';
import './style.scss';
interface FormProps {
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
export const Form: FC<FormProps> = ({ setFormData = initValue, toggle }) => {
  const [task, setTask] = useState(setFormData);
  const [fileStorage, setFileStorage] = useState<File[]>([]);
  const fileRef = useRef<HTMLInputElement>(null);
  const onSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    const ddd = await uploadFile(fileStorage);
    addTask({ ...task, file: ddd[0].url });
    console.log(ddd);

    toggle();
    setTask(initValue);
  };
  const handleFileUpload = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFileStorage(Array.from(e.target.files));
      console.log(Array.from(e.target.files));
    }
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
            ref={fileRef}
            type="file"
            onChange={handleFileUpload}
          />
        </label>
      </div>
      <Button type={'submit'}>add</Button>
    </form>
  );
};
