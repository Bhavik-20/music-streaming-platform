
import './App.css';
import SearchComponent from './search-results';
import { useState, useEffect } from 'react';
import SpotifyWebApi from 'spotify-web-api-js';
import { initializeSpotifyApi } from './spotify-hook/spotifyApi';
import AlbumDetails from './search-results/album-details';
import PlaylistDetails from './search-results/playlist-details';
import TrackDetails from './search-results/song-details';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LoginComponent from './routes/Login';
import SignupComponent from './routes/Signup';
import HomeComponent from './routes/Home';
import {useCookies} from "react-cookie";
import EditProfileComponent from './routes/user/edit-profile/index.js';
import ListenerProfileComponent from './routes/user/profile/index.js';
import ArtistProfileComponent from './routes/artist/ArtistProfile';
import {configureStore} from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import profileReducer from './reducers/profile-reducer';
import Admin from './routes/admin';
import adminReducer from './reducers/admin-reducer';
import SearchUsers from './routes/SearchUsers';
import SearchUsersReducer from './reducers/user-search-reducer';
import MyProfileComponent from './routes/MyProfile';
import myProfileReducer from './reducers/my-profile-reducer';
import songReducer from './reducers/song-reducer';
import albumsPlaylistReducer from './reducers/albums-playlist-reducer';
import HomeScreen from './routes/home-screen/HomeScreen';

function App() {
  const store = configureStore(
  {reducer: {myProfile: myProfileReducer, profile: profileReducer, admin: adminReducer, 
    userSearch: SearchUsersReducer, songs: songReducer, albumsPlaylist: albumsPlaylistReducer}});
  
  const CLIENT_ID = 'c4cdfc316afc45aebeffea58959ac714';
  const CLIENT_SECRET = '5f290d251a5648e5bea5050a200f5114'
  const [accessToken, setAccessToken] = useState("");
  const [cookie] = useCookies(["token"]);

  const spotifyApiSetup = async () => {
    var authParameters = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: 'grant_type=client_credentials&client_id=' + CLIENT_ID + '&client_secret=' + CLIENT_SECRET
    };

    await fetch('https://accounts.spotify.com/api/token', authParameters)
      .then(result => result.json())
      .then(data => {
        console.log("-x-x-x-x-x-x-x-x-x-x-x-x");
        setAccessToken(data.access_token);
        initializeSpotifyApi(data.access_token); 
      });
  }

  useEffect(() => {
    spotifyApiSetup();    
  }, []);  
     
  return (
    <Provider store={store}>
      <div className="w-screen h-screen font-poppins">
        <BrowserRouter>
          {cookie.token ? (
          <Routes>
            <Route path="/new-home" element={<HomeScreen/>} />
            <Route path="/home" element={<HomeComponent />} />
            <Route path="/edit-profile" element={<EditProfileComponent/>} />
            <Route path="/my-profile" element={<MyProfileComponent/>} />
            <Route path="/admin/*" element={<Admin/>} />
            <Route path="/search" element={<SearchComponent />} />
            <Route path="/search-users" element={<SearchUsers/>} />
            
            <Route path="/profile/:pid" element={<ListenerProfileComponent/>} />
            <Route path="/artist-profile" element={<ArtistProfileComponent/>} />
            <Route path="/albums/:albumID" element={<AlbumDetails/>} />
            <Route path="/tracks/:trackID" element={<TrackDetails/>} />
            <Route path="/playlists/:playlistID" element={<PlaylistDetails/>} />

            <Route path="*" element={<Navigate to="/home" />} />
            
          </Routes>
          ) : (
          <Routes>
            <Route path="/admin/*" element={<Admin/>} />
            <Route path="/login" element={<LoginComponent />} />
            <Route path="/signup" element={<SignupComponent />} />
            <Route path="*" element={<Navigate to="/login" />} />
          </Routes>
          )}
        </BrowserRouter>
      </div>
    </Provider>
  );
}

export default App;
