import React, { useEffect, useState } from 'react';
import { collection, getDocs, Timestamp, addDoc } from 'firebase/firestore';
import { db } from '../../firebase';
import { Todos } from '../../components/todos/Todos';

export type Todo = {
  id?: string;
  title: string;
  description: string;
  done: boolean;
  deadline: Timestamp;
  createdAt: Timestamp;
  file: string;
};
export const MainPage = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
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

  useEffect(() => {
    async function fetchData() {
      const response = await getAllTask();
      setTodos(response);
    }
    fetchData();
  }, []);
  return (
    <div className="todo__list">
      <Todos todos={todos} />
    </div>
  );
};
