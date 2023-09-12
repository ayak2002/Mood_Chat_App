import React from 'react';

const MoodFilter = ({ onFilterChange }) => {
  const moods = [
    'Extremely bad 😡',
    'Very bad 😠',
    'Bad 😤',
    'Not great 😒',
    'Neutral 😐',
    'Not bad 😊',
    'Good 😀',
    'Very good 😄',
    'Extremely good 🌟',
    'Unknown 🤔',
  ];

  return (
    <div>
      <h3>Filter by Mood:</h3>
      <select onChange={(e) => onFilterChange(e.target.value)}>
        <option value="">All Moods</option>
        {moods.map((mood, index) => (
          <option key={index} value={mood}>
            {mood}
          </option>
        ))}
      </select>
    </div>
  );
};

export default MoodFilter;
