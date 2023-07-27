import logo from './logo.svg';
import './App.css';
import Login from './spotify-auth/login';
const code = new URLSearchParams(window.location.search).get("code")

function App() {
  return code ? <>hello</> : <Login/>
}

export default App;
