import { db } from '../firebase';
import {
  collection,
  query,
  where,
  getDocs,
  addDoc,
  serverTimestamp,
} from 'firebase/firestore';

const AddUser = async (authUser) => {
  const { uid, displayName, photoURL, email } = authUser;

  try {
    // Create a reference to the user's document in the 'users' collection
    const usersRef = collection(db, 'users');

    // Check if a user with the same name and email already exists
    const existingUserQuery = query(
      usersRef,
      where('name', '==', displayName),
      where('email', '==', email)
    );

    const existingUserSnapshot = await getDocs(existingUserQuery);

    if (existingUserSnapshot.size === 0) {
      // If no matching user exists, add the new user
      await addDoc(usersRef, {
        name: displayName,
        email: email,
        avatar: photoURL,
        createdOn: serverTimestamp(),
        uid,
      });
      console.log('User added to Firestore');
    } else {
      console.log('User with the same name and email already exists.');
    }
  } catch (error) {
    console.error('Error adding user to Firestore:', error);
  }
};

export default AddUser;
