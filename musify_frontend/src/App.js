// src/App.js
import React, { useEffect, useState } from 'react';
import { getTokenFromUrl, initializeSpotifyApi, loginUrl } from './spotify-hook/spotifyApi';
import { searchTracks, playTrack } from '././spotify-hook/spotifyApi';
import SearchTracks from '././search-tracks/search-tracks';
import TrackList from './search-tracks/track-list';
import './App.css';

function App() {
  const [token, setToken] = useState(null);
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    const hash = getTokenFromUrl();
    window.location.hash = '';
    const accessToken = hash.access_token;

    if (accessToken) {
      setToken(accessToken);
      initializeSpotifyApi(accessToken);
    }
  }, []);

  const handleLogin = () => {
    window.location = loginUrl;
  };

  const handleSearchResults = (results) => {
    setSearchResults(results);
  };

  return (
    <div className="App">
      {token ? (
        <div>
          <h1>Welcome to Spotify API Service</h1>
          <SearchTracks onSearchResults={handleSearchResults} />
          <TrackList tracks={searchResults} />
        </div>
      ) : (
        <button onClick={handleLogin}>Login with Spotify</button>
      )}
    </div>
  );
}

export default App;
