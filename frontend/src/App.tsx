import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';

import LoginPage from './pages/LoginPage';
import CardPage from './pages/CardPage';
import Home from './pages/Home';
import Color from './pages/Color'
import SignUp from './pages/SignUp'
import Typing from './pages/Typing'
import Reaction from './pages/Reaction'

function App() {
  return (
    <Router >
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/cards" element={<CardPage />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/Color" element={<Color />} />
        <Route path="/SignUp" element={<SignUp />} />
        <Route path="/Typing" element={<Typing />} />
        <Route path="/Reaction" element={<Reaction  />} />
      </Routes>
    </Router>
  );
}

export default App;
