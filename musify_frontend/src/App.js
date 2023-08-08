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
import AlbumDetails from './search-results/album-details';
import SearchComponent from './search-results';

const store = configureStore(
  {reducer: {editProfile: editProfileReducer, profile: profileReducer}});

function App() {
  const [cookie] = useCookies(["token"]);
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
            <Route path="/" element={<Home />} />
            <Route path="/search" element={<SearchComponent />} />
            <Route path="/album/:albumID" element={<AlbumDetailsPage />} />
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

function AlbumDetailsPage() {
  const { albumID } = useParams();
  return <AlbumDetails albumID={albumID} />;
}

export default App;
