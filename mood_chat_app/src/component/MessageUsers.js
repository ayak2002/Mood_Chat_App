import React, { useState } from 'react';
import SearchUsers from './SearchUsers';
import ChatBox from './ChatBox';
import { auth, db } from "../firebase";
import { addDoc, collection, serverTimestamp, getDocs } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import ChatRoom from "../img/icons8-group-24.png";
let names = [];



//create new chat
const newChat = async (names, db) => {
  const [firstName, secondName] = names;
  console.log(`I ${firstName} initiated a message with ${secondName}`);
  
  // Create the DMRef using the createDMRef function
  const DMRef = createDMRef(db, firstName, secondName);
  if (DMRef) {
    const isEmpty = await isCollectionEmpty(DMRef);
    if(!isEmpty){
      await addDoc(DMRef,{data: "Collection Made"});
    }
  } else {
    console.error('DMRef is not defined');
  }
};


//check if collection is empty or not
async function isCollectionEmpty(collectionPath) {
  const querySnapshot = await getDocs(collectionPath);
   const result=querySnapshot.size === 0 ? 0 : 1;
  return result;
  } 


//create DB refrence
export const createDMRef = (db, firstName, secondName) => {
  const DMRef = collection(db, 'chat', 'usIDs', `${firstName}+${secondName}`);
  return DMRef;
};




//get users and start convo
const MessageUsers = () => {
  const [selectedUser, setSelectedUser] = useState(null);
  const [me_user] = useAuthState(auth);

  
  const handleStartConversation = (user) => {
    // Logic to initiate a conversation with the selected user
    console.log(`I ${me_user.displayName} initiated a message with ${user.name}`);
    
     names = [me_user.displayName, user.name];
    // Sort the array in alphabetical order
    names.sort();
    // Access the sorted names
    newChat(names,db);
    setSelectedUser(user);
    };


    //handle the chatroom1 button press and create the new chat
    const handleChat1Click = () => {
      names=["Chat1", "All"];
      newChat(names,db);
    };

  
  
  return (
    <div>
      {/* Render the SearchUsers component and pass the 'handleStartConversation' function as a prop */}
      <SearchUsers onStartConversation={handleStartConversation} setSelectedUser={setSelectedUser} />
      <button onClick={handleChat1Click} id="chat1">
      <img src={ChatRoom} alt='Chatroom1' />
      </button>
      
      {/* Render the ChatBox component */}
      <ChatBox selectedUser={selectedUser}/>
    </div>
  );
};

export {names};
export default MessageUsers;
