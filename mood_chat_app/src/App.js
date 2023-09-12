import React, { useState, useEffect } from 'react';
import { auth } from './firebase';
import { GoogleAuthProvider } from 'firebase/auth';
import MessageUsers from './component/MessageUsers';
import AddUser from './component/AddUser';
import GoogleSignin from "./img/btn_google_signin_dark_pressed_web.png";

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
      <div id="user-in">
        {user ? (
          <div>
            <p id="user-name">{user.displayName}
            <button onClick={handleSignOut} id="sign-out">Sign Out</button> {/* Sign-out button */}
            </p>
          </div>
        ) : (
          <div id="await-user">
            <p>Please sign in to use the chat</p>
            <button onClick={handleSignIn} id="await-but">
            <img src={GoogleSignin} alt='Signin' />
            </button>
          </div>
        )}
      </div>
      
      {user && <MessageUsers />} {/* Render MessageUsers only if conversationStarted is true and user is signed in*/}
    </div>
  );
};

export default App;
