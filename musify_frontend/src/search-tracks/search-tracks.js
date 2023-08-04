// src/SearchTracks.js
import React, { useState } from 'react';
import { searchTracks } from '../spotify-hook/spotifyApi';

const SearchTracks = ({ onSearchResults }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = async () => {
    if (!searchQuery) return;

    const results = await searchTracks(searchQuery);
    onSearchResults(results);
  };

  return (
    <div>
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Search for tracks..."
      />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
};

export default SearchTracks;
