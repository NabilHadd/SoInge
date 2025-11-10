import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import AdminHome from './components/AdminHome';
import Login from './components/Login';  // otro componente de ejemplo
import Producto from './components/Producto';
import './App.css';
//import logo from './logo.svg';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Login" element={<Login />} /> 
        <Route path="/AdminHome" element={<AdminHome />} />
        <Route path="/producto" element={<Producto />} />
      </Routes>
    </Router>
  );
}

export default App;