import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import { getFirestore } from "firebase/firestore";



// Got the Firebase project configurations from our Firebase Project Settings page
const firebaseConfig = {
  apiKey: "AIzaSyCimpJrYBsY8wBAxhp0yZNg5DdH-JkqtgI",
  authDomain: "mood-chat-app.firebaseapp.com",
  projectId: "mood-chat-app",
  storageBucket: "mood-chat-app.appspot.com",
  messagingSenderId: "106590272770",
  appId: "1:106590272770:web:3f77d029994c7e4b56d61b",
  measurementId: "G-M6H13RZJEJ"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

export const auth = firebaseApp.auth();
export const db = getFirestore(firebaseApp);

export default firebaseApp;
