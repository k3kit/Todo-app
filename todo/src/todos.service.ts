import {
  collection,
  addDoc,
  deleteDoc,
  doc,
  updateDoc,
  onSnapshot,
  Unsubscribe,
} from 'firebase/firestore';
import { db, storage } from './firebase';
import { FileType, Todo } from './pages/main-page/MainPage';
import { v4 } from 'uuid';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';

export const toggleTodo = async (id: string, value: boolean) => {
  const todoRef = doc(db, 'todos', id);
  await updateDoc(todoRef, { done: value });
};

export const getAllTask = (update: (todos: Todo[]) => void): (() => Unsubscribe) => {
  const unsubscribe = () =>
    onSnapshot(collection(db, 'todos'), (querySnapshot) => {
      const todos: Todo[] = querySnapshot.docs.map((doc) => ({
        ...(doc.data() as Todo),
        id: doc.id,
      }));
      update(todos);
    });
  return unsubscribe;
};

export const addTask = async (task: Todo) => {
  try {
    const docRef = await addDoc(collection(db, 'todos'), { ...task, done: false });
  } catch (e) {
    console.error('Error adding task: ', e);
  }
};

export const deleteTask = async (id: string) => {
  try {
    const docRef = await deleteDoc(doc(db, 'todos', id));
  } catch (e) {
    console.error('Error delete task: ', e);
  }
};

export const editTask = async (todo: Todo) => {
  try {
    await updateDoc(doc(db, 'todos', todo.id), { ...todo });
  } catch (e) {
    console.error('Error edit task: ', e);
  }
};

export const completeTask = async (id: string, complete: boolean) => {
  try {
    await updateDoc(doc(db, 'todos', id), { done: complete });
  } catch (e) {
    console.error('Error complete task: ', e);
  }
};

export const uploadFile = async (files: FileType[]): Promise<FileType[]> => {
  const data: FileType[] = [];
  try {
    for (const file of files) {
      const storageRef = ref(storage, 'files/' + v4() + '_' + file.name);
      const upload = await uploadBytes(storageRef, file as Blob);
      const url = await getDownloadURL(upload.ref);
      data.push({
        url,
        name: file.name,
      });
    }
  } catch (e) {
    console.error('Error upload file: ', e);
  }
  return data;
};
