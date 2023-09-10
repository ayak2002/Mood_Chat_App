import React, { useState, useEffect } from 'react';
import { auth } from './firebase';
import { GoogleAuthProvider } from 'firebase/auth';
import MessageUsers from './component/MessageUsers';
import AddUser from './component/AddUser';

const App = () => {
  const [user, setUser] = useState(null);
  const [conversationStarted, setConversationStarted] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        setUser(authUser);

        // Call the AddUser function to add the user to Firestore
        AddUser(authUser); // Pass the entire user object

      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleSignIn = async () => {
    try {
      const result = await auth.signInWithPopup(new GoogleAuthProvider());
      const authUser = result.user;

      // Call the AddUser function to add the user to Firestore
      AddUser(authUser); // Pass the entire user object

      // The rest of your sign-in logic here

      // Set conversationStarted to true when initiating a conversation
      setConversationStarted(true);
    } catch (error) {
      console.error('Error signing in with Google:', error);
    }
  };

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
      <div>
        {user ? (
          <div>
            <p>Welcome, {user.displayName}!</p>
            <button onClick={handleSignOut}>Sign Out</button> {/* Sign-out button */}
          </div>
        ) : (
          <div>
            <p>Please sign in to use the chat</p>
            <button onClick={handleSignIn}>Sign In with Google</button>
          </div>
        )}
      </div>
      {user && <MessageUsers />} {/* Render MessageUsers only if conversationStarted is true and user is signed in*/}
    </div>
  );
};

export default App;
