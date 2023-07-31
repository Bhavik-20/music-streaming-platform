import logo from './logo.svg';
import './App.css';
import Login from './spotify-auth/login';
import SearchComponent from './search-results';
import { useState, useEffect } from 'react';
import SpotifyWebApi from 'spotify-web-api-js';
const CLIENT_ID = 'c4cdfc316afc45aebeffea58959ac714';
const CLIENT_SECRET = '5f290d251a5648e5bea5050a200f5114'

//var code = new URLSearchParams(window.location.search).get("code")

// //v1
// function App() {
//   const [accessToken, setAccessToken] = useState("");
//   const spotifyApi = new SpotifyWebApi();

//   useEffect(() => {
//     spotifyApi.setAccessToken(accessToken);
//   },[])
//   return code ? <>
//   <SearchComponent spotifyApi={spotifyApi}/>
//   </> : <Login/>
// }

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
    }
    fetch('https://accounts.spotify.com/api/token', authParameters)
.then(result => result.json())
.then(data => setAccessToken(data.access_token))
  },[])
    return (<>
      <SearchComponent accessToken={accessToken}/>
      </>)
     
}

export default App;
