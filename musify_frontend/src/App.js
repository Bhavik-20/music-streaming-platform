import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<h1>Hello</h1>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
