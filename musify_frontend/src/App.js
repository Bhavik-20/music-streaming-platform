import './App.css';
import SearchComponent from './search-results';
import { useState, useEffect } from 'react';
import SpotifyWebApi from 'spotify-web-api-js';
import { initializeSpotifyApi } from './spotify-hook/spotifyApi';
import AlbumDetails from './search-results/album-details';
import PlaylistDetails from './search-results/playlist-details';
import TrackDetails from './search-results/song-details';
const CLIENT_ID = 'c4cdfc316afc45aebeffea58959ac714';
const CLIENT_SECRET = '5f290d251a5648e5bea5050a200f5114'

//v2 -- no backend use for API
function App() {
  const [accessToken, setAccessToken] = useState("");
  useEffect(() => {
    var authParameters = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: 'grant_type=client_credentials&client_id=' + CLIENT_ID + '&client_secret=' + CLIENT_SECRET
    };
  
    fetch('https://accounts.spotify.com/api/token', authParameters)
      .then(result => result.json())
      .then(data => {
        setAccessToken(data.access_token);
        initializeSpotifyApi(data.access_token); // Use the updated token here
      });
  }, []);  
    return (<>
      {/* <SearchComponent/> */}
      {/* <AlbumDetails albumID={"4aawyAB9vmqN3uQ7FjRGTy"}/> */}
      {/* <PlaylistDetails playlistID={"3cEYpjA9oz9GiPac4AsH4n"}/> */}
      <TrackDetails trackID={"11dFghVXANMlKmJXsNCbNl"}/>
      </>)
     
}

export default App;
