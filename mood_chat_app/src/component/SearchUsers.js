import React, { useState } from 'react';
import { db } from '../firebase';
import {
  collection,
  query,
  where,
  getDocs,
} from 'firebase/firestore';

const SearchUsers = ({ onStartConversation, setSelectedUser }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  // Function to perform a case-insensitive search
  const caseInsensitiveSearch = (str, query) => {
    return str.toLowerCase().includes(query.toLowerCase());
  };

  const handleSearch = async () => {
    if (searchQuery.trim() === '') {
      setSearchResults([]);
      return;
    }

    try {
      const usersRef = collection(db, 'users');
      const normalizedQuery = searchQuery.trim();

      const nameQuerySnapshot = await getDocs(
        query(usersRef, (userQuery) => {
          return where('name', '>=', normalizedQuery)
            .where('name', '<=', normalizedQuery + '\uf8ff');
        })
      );

      const emailQuerySnapshot = await getDocs(
        query(usersRef, (userQuery) => {
          return where('email', '>=', normalizedQuery)
            .where('email', '<=', normalizedQuery + '\uf8ff');
        })
      );

      const nameResults = [];
      nameQuerySnapshot.forEach((doc) => {
        const user = doc.data();
        if (caseInsensitiveSearch(user.name, normalizedQuery)) {
          nameResults.push({ ...user, uid: doc.id });
        }
      });

      const emailResults = [];
      emailQuerySnapshot.forEach((doc) => {
        const user = doc.data();
        if (caseInsensitiveSearch(user.email, normalizedQuery)) {
          emailResults.push({ ...user, uid: doc.id });
        }
      });

      // Merge and deduplicate the results
      const mergedResults = [...nameResults, ...emailResults];
      const uniqueUserIds = new Set();
      const results = mergedResults.filter((user) => {
        if (uniqueUserIds.has(user.uid)) {
          return false; // Skip duplicates
        }
        uniqueUserIds.add(user.uid);
        return true;
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
