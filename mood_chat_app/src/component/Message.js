import React, { useEffect, useState } from 'react';
import { auth } from '../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import axios from 'axios';

const Message = ({ message }) => {
  const [user] = useAuthState(auth);
  const [mood, setMood] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (message.text) {
      // Analyze sentiment only if there is message text
      analyzeSentiment(message.text);
    }
  }, [message.text]);

  const analyzeSentiment = async (text) => {
    setIsLoading(true);
    try {
      const response = await axios.post('http://localhost:3001/analyze-text', { text });

      if (response.status === 200) {
        const { mood } = response.data;
        setMood(mood); // Set the mood interpretation received from the server
      }
    } catch (error) {
      console.error('Error analyzing sentiment:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className={`chat-bubble ${message.uid && message.uid === user?.uid ? 'right' : ''}`}
    >
      <img className="chat-bubble__left" src={message.avatar} alt="user avatar" />
      <div className="chat-bubble__right">
        <p className="user-name">{message.name}</p>
        <p className="user-message">{message.text}</p>
        {isLoading && <p>Loading mood analysis...</p>}
        {mood && (
          <div className="mood-analysis">
            <p>Mood: {mood}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Message;
