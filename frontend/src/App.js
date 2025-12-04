import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';

//componentes del admin
import AdminHome from './components/AdminHome/AdminHome';
import Inventario from "./components/AdminHome/Inventario";
import Ventas from "./components/AdminHome/Ventas";
import Usuarios from "./components/AdminHome/Usuarios";
import Configuracion from "./components/AdminHome/Configuracion";


import Carrito from './components/Carrito';
import Login from './components/Login';  // otro componente de ejemplo
import Register from './components/Register';
import './App.css';
//import logo from './logo.svg';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Login" element={<Login />} /> 
        
        <Route path="/AdminHome" element={<AdminHome />} />
        <Route path="/inventario" element={<Inventario />} />
        <Route path="/ventas" element={<Ventas />} />
        <Route path="/usuarios" element={<Usuarios />} />
        <Route path="/configuracion" element={<Configuracion />} />

        <Route path="/Carrito" element={<Carrito />} />
         <Route path="/Register" element={<Register />} />

      </Routes>
    </Router>
  );
}

export default App;