//Initial structure of the code generated with ChatGPT, then fixed and debugged 
import React, { useState, useEffect } from 'react';
import { auth } from './firebase';
import { GoogleAuthProvider } from 'firebase/auth';
import ChatBox from "./component/ChatBox";

const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Listen for changes in user authentication state
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        // User is signed in.
        setUser(user);
      } else {
        // User is signed out.
        setUser(null);
      }
    });

    // Cleanup the listener when the component unmounts
    return () => unsubscribe();
  }, []);

  const handleSignOut = async () => {
    try {
      await auth.signOut();
      setUser(null);
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <div>
      <h1>Mood Chat App</h1>
      {user ? (
        <div>
          <p>Welcome, {user.displayName}!</p>
          <button onClick={handleSignOut}>Sign Out</button>
          {/* Add your search and messaging components here */}
        </div>
      ) : (
        <button onClick={() => auth.signInWithPopup(new GoogleAuthProvider())}>
          Sign In with Google
        </button>
      )}

      <ChatBox />
    </div>
  );
};

export default App;
