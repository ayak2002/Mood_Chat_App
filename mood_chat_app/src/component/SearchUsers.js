import React, { useState } from 'react';
import { db } from '../firebase';
import {
  collection,
  query,
  where,
  getDocs
} from 'firebase/firestore';

const SearchUsers = ({ onStartConversation, setSelectedUser }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = async () => {
    if (searchQuery.trim() === '') {
      setSearchResults([]);
      return;
    }
  
    try {
      const usersRef = collection(db, 'users');
      const normalizedQuery = searchQuery.toLowerCase();
      const keywords = normalizedQuery.split(' ');
  
      // Create an array to store the queries for each keyword
      const queries = [];
  
      // Loop through the keywords and add a query for each
      keywords.forEach((keyword) => {
        queries.push(
          query(
            usersRef,
            where('name', '>=', keyword),
            where('name', '<=', keyword + '\uf8ff')
          ),
          query(
            usersRef,
            where('email', '>=', keyword),
            where('email', '<=', keyword + '\uf8ff')
          )
        );
  
        // Add a query for searching the last name directly
        if (!keyword.includes(' ')) {
          queries.push(
            query(
              usersRef,
              where('name', '>=', keyword),
              where('name', '<=', keyword + '\uf8ff')
            )
          );
        }
      });
  
      // Execute the queries concurrently
      const queryResults = await Promise.all(queries.map((q) => getDocs(q)));
  
      // Use a Set to track unique user IDs
      const uniqueUserIds = new Set();
  
      // Merge and deduplicate the results
      const results = [];
      queryResults.forEach((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          const userId = doc.id;
          if (!uniqueUserIds.has(userId)) {
            // Add the user to the results if it hasn't been added yet
            uniqueUserIds.add(userId);
            results.push({ ...doc.data(), uid: userId });
          }
        });
      });
  
      setSearchResults(results);
    } catch (error) {
      console.error('Error searching for users:', error);
    }
  };
  
  
  
  const handleMessageClick = (user) => {
    // Set the selected user in the parent component
    setSelectedUser(user);

    // Call the prop function to initiate a conversation with the selected user
    onStartConversation(user);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search by name or email"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>

      <div>
        {searchResults.length > 0 ? (
          <ul>
            {searchResults.map((user) => (
              <li key={user.uid}>
                {user.name} ({user.email})
                <button onClick={() => handleMessageClick(user)}>Message</button>
              </li>
            ))}
          </ul>
        ) : (
          <p>No users found.</p>
        )}
      </div>
    </div>
  );
};

export default SearchUsers;
