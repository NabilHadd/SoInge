import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import AdminHome from './components/AdminHome';
import Carrito from './components/Carrito';
import Login from './components/Login';  // otro componente de ejemplo
import './App.css';
//import logo from './logo.svg';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Login" element={<Login />} /> 
        <Route path="/AdminHome" element={<AdminHome />} />
        <Route path="/Carrito" element={<Carrito />} />
      </Routes>
    </Router>
  );
}

export default App;