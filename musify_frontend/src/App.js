
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

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LoginComponent from './routes/Login';
import SignupComponent from './routes/Signup';
import HomeComponent from './routes/Home';
import {useCookies} from "react-cookie";
import EditProfileComponent from './routes/user/edit-profile/index.js';
import ListenerProfileComponent from './routes/user/profile/index.js';
import ArtistProfileComponent from './routes/artist/ArtistProfile';
import {configureStore} from '@reduxjs/toolkit';
import editProfileReducer from './reducers/edit-profile-reducer';
import { Provider } from 'react-redux';
import profileReducer from './reducers/profile-reducer';
import Admin from './routes/admin';
import adminReducer from './reducers/admin-reducer';
import SearchUsers from './routes/SearchUsers';
import SearchUsersReducer from './reducers/user-search-reducer';

const store = configureStore(
  {reducer: {editProfile: editProfileReducer, profile: profileReducer, admin: adminReducer, userSearch: SearchUsersReducer}});


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
     
  const [cookie] = useCookies(["token"]);
  return (
    <Provider store={store}>
      <div className="w-screen h-screen font-poppins">
        <BrowserRouter>
          {cookie.token ? (
          <Routes>
            <Route path="/admin/*" element={<Admin/>} />
            <Route path="/" element={<HomeComponent />} />
            <Route path="/home" element={<HomeComponent />} />
            <Route path="/edit-profile" element={<EditProfileComponent/>} />
            <Route path="/profile" element={<ListenerProfileComponent/>} />
            <Route path="/artist-profile" element={<ArtistProfileComponent/>} />
            <Route path="/search-users" element={<SearchUsers/>} />
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
