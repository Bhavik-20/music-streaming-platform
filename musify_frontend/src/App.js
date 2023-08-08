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


const store = configureStore(
  {reducer: {editProfile: editProfileReducer, profile: profileReducer}});

function App() {
  const [cookie] = useCookies(["token"]);
  return (
    <Provider store={store}>
      <div className="w-screen h-screen font-poppins">
        <BrowserRouter>
          {cookie.token ? (
          <Routes>
            <Route path="/" element={<HomeComponent />} />
            <Route path="/home" element={<HomeComponent />} />
            <Route path="*" element={<Navigate to="/home" />} />
            <Route path="/edit-profile" element={<EditProfileComponent/>} />
            <Route path="/profile/pid" element={<ListenerProfileComponent/>} />
            <Route path="/artist-profile/pid" element={<ArtistProfileComponent/>} />
          </Routes>
          ) : (
          <Routes>
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
