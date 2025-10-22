import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';   // otro componente de ejemplo
import './App.css';
//import logo from './logo.svg';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />        {/* página principal */}
        <Route path="/Login" element={<Login />} /> {/* otra página */}
      </Routes>
    </Router>
  );
}

export default App;