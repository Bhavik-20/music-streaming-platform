import React, { useEffect, useState } from 'react';
import { getTokenFromUrl, initializeSpotifyApi, loginUrl } from './spotify-hook/spotifyApi';
import { searchTracks, playTrack } from '././spotify-hook/spotifyApi';
import SearchTracks from '././search-tracks/search-tracks';
import TrackList from './search-tracks/track-list';
import './App.css';
import AlbumDetails from './search-results/album-details';
import { BrowserRouter as Router, Routes, Route, Link, useParams } from 'react-router-dom'; // Import the required components from react-router-dom

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

  // Conditional rendering while token is being fetched
  if (token === null) {
    return (
      <div className="App">
        <button onClick={handleLogin}>Login with Spotify</button>
      </div>
    );
  }

  return (
    <Router>
      <div className="App">
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/search">Search Tracks</Link>
            </li>
            <li>
              <Link to="/album/4aawyAB9vmqN3uQ7FjRGTy">Pitbull album</Link>
            </li>
          </ul>
        </nav>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<SearchResultsPage onSearchResults={handleSearchResults} searchResults={searchResults} />} />
          <Route path="/album/:albumID" element={<AlbumDetailsPage />} />
        </Routes>
      </div>
    </Router>
  );
}

// Separate components for each page
function Home() {
  return <h2>Home page</h2>;
}

function SearchResultsPage({ onSearchResults, searchResults }) {
  return (
    <>
      <h2>Search Tracks</h2>
      <SearchTracks onSearchResults={onSearchResults} />
      <TrackList tracks={searchResults} />
    </>
  );
}

function AlbumDetailsPage() {
  const { albumID } = useParams();
  return <AlbumDetails albumID={albumID} />;
}

export default App;
