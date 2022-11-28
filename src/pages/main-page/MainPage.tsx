import React, { useEffect, useState } from 'react';

import { Todos } from '../../components/todos/Todos';
import { Form } from '../../components/form/Form';
import { Modal } from '../../components/modal/Modal';
import { useModal } from '../../hooks/UseModal';
import './style.scss';
import { Button } from '../../components/Button/Button';
import { getAllTask } from '../../todos.service';

export type Todo = {
  id: string;
  title: string;
  description: string;
  done: boolean;
  deadline: string;
  file?: string;
};
export interface FileType {
  name?: string;
  url?: string;
}
export const MainPage = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const { isOpen, toggle } = useModal();
  useEffect(() => {
    const subscribeToTodos = getAllTask(setTodos);
    const unsubscribe = subscribeToTodos();
    return unsubscribe;
  }, []);

  return (
    <div className="main__page">
      <header className="header">
        <Button onClick={toggle} type={'button'}>
          Add task
        </Button>
      </header>
      <div>
        <Modal isOpen={isOpen} toggle={toggle}>
          <Form toggle={toggle} />
        </Modal>
      </div>
      <Todos todos={todos} />
    </div>
  );
};
