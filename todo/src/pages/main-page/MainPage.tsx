import React, { useEffect, useState } from 'react';
import {
  collection,
  getDocs,
  Timestamp,
  addDoc,
  deleteDoc,
  doc,
  updateDoc,
} from 'firebase/firestore';
import { db } from '../../firebase';
import { Todos } from '../../components/todos/Todos';
import { Form } from '../../components/form/Form';
import { Modal } from '../../components/modal/Modal';
import { useModal } from '../../hooks/UseModal';
import './style.scss';
import { Button } from '../../components/Button/Button';

export type Todo = {
  id: string;
  title: string;
  description: string;
  done: boolean;
  deadline: string;
  file: string;
};
export const MainPage = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const { isOpen, toggle } = useModal();

  const getAllTask = async () => {
    const data: Array<Todo> = [];
    const querySnapshot = await getDocs(collection(db, 'todos'));
    querySnapshot.forEach((doc) => {
      data.push({ ...(doc.data() as Todo), id: doc.id });
    });
    return data;
  };

  const addTask = async (task: Todo) => {
    try {
      const docRef = await addDoc(collection(db, 'todos'), task);
      task = { ...task, id: docRef.id };
      setTodos([...todos, task]);
    } catch (e) {
      console.error('Error adding task: ', e);
    }
  };
  const deleteTask = async (id: string) => {
    try {
      const docRef = await deleteDoc(doc(db, 'todos', id));
      setTodos(todos.filter((todo) => todo.id !== id));
    } catch (e) {
      console.error('Error delete task: ', e);
    }
  };

  const editTask = async (todo: Todo) => {
    try {
      await updateDoc(doc(db, 'todos', todo.id), { ...todo });
      setTodos(
        todos.map((taskCurrent) => (taskCurrent.id === todo.id ? { ...todo } : taskCurrent))
      );
    } catch (e) {
      console.error('Error edit task: ', e);
    }
  };

  useEffect(() => {
    async function fetchData() {
      const response = await getAllTask();
      setTodos(response);
    }
    fetchData();
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
          <Form addTask={addTask} toggle={toggle} />
        </Modal>
      </div>
      <Todos todos={todos} onDelete={deleteTask} onEdit={editTask} />
    </div>
  );
};
