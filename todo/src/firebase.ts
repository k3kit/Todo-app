import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
  apiKey: "AIzaSyAJPh68CPggsgBxYVn4Ezof9ArE8fjQh7Q",
  authDomain: "todo-9682e.firebaseapp.com",
  projectId: "todo-9682e",
  storageBucket: "todo-9682e.appspot.com",
  messagingSenderId: "513404494738",
  appId: "1:513404494738:web:604b422b8e9a765975974b",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);
