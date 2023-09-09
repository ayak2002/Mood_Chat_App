import firebase from 'firebase/compat/app';
import { getAnalytics } from "firebase/analytics";
import 'firebase/compat/auth';

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
const analytics = getAnalytics(firebaseApp);

export const auth = firebaseApp.auth();
export default firebaseApp;
