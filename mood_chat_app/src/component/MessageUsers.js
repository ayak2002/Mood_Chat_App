import React, { useState } from 'react';
import SearchUsers from './SearchUsers';
import ChatBox from './ChatBox';

const MessageUsers = () => {
  const [selectedUser, setSelectedUser] = useState(null);

  const handleStartConversation = (user) => {
    // Logic to initiate a conversation with the selected user
    console.log(`Initiate a message with ${user.name}`);
    setSelectedUser(user);
  };

  return (
    <div>
      {/* Render the SearchUsers component and pass the 'handleStartConversation' function as a prop */}
      <SearchUsers onStartConversation={handleStartConversation} setSelectedUser={setSelectedUser} />
      {/* Render the ChatBox component */}
      <ChatBox selectedUser={selectedUser} />
    </div>
  );
};

export default MessageUsers;
