import React, { useEffect, useRef, useState } from 'react';
import { query, collection, orderBy, onSnapshot, limit, where } from 'firebase/firestore';
import { db }  from '../firebase';
import { createDMRef, names } from "./MessageUsers";
import Message from './Message';
import SendMessage from './SendMess';
import MoodFilter from './MoodFilter'; // Import the MoodFilter component

const ChatBox = () => {
  const [messages, setMessages] = useState([]);
  const scroll = useRef();
  const [firstName, secondName] = names;
  const DMRef = createDMRef(db, firstName, secondName);
  const [selectedMoodFilter, setSelectedMoodFilter] = useState(''); // Maintain selected mood filter state

  useEffect(() => {
    const q = query(
      DMRef,
      orderBy('createdAt', 'desc'),
      limit(50)
    );

    const unsubscribe = onSnapshot(q, (QuerySnapshot) => {
      const fetchedMessages = [];
      QuerySnapshot.forEach((doc) => {
        fetchedMessages.push({ ...doc.data(), id: doc.id });
      });
      const sortedMessages = fetchedMessages.sort(
        (a, b) => a.createdAt - b.createdAt
      );

      // Apply mood filter to the sorted messages
      const filteredMessages = selectedMoodFilter
        ? sortedMessages.filter((message) => message.mood === selectedMoodFilter)
        : sortedMessages;

      setMessages(filteredMessages);
    });

    return () => unsubscribe;
  }, [DMRef, selectedMoodFilter]);

  // Function to handle mood filter change
  const handleMoodFilterChange = (mood) => {
    setSelectedMoodFilter(mood);
  };

  return (
    <main className="chat-box">
      <MoodFilter onFilterChange={handleMoodFilterChange} /> {/* Render MoodFilter component */}
      <div className="messages-wrapper">
        {messages?.map((message) => (
          <Message key={message.id} message={message} />
        ))}
      </div>
      {/* when a new message enters the chat, the screen scrolls down to the scroll div */}
      <span ref={scroll}></span>
      <SendMessage scroll={scroll} />
    </main>
  );
};

export default ChatBox;
