// src/Home.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";
import ucenin from '../assets/ucenin.png'; // Asegúrate de tener esta imagen en la carpeta assets
import logoUCN from '../assets/logo.webp'; // Logo de la UCN

function Home() {
  const navigate = useNavigate(); // hook para navegación

  const handleAdminRedirect = () => {
    navigate('/Login'); // ruta a la que quieres ir
  };

  return (
  

     <div className="bg-[#FCF7F8] flex flex-col min-h-screen">

      {/* Header */}
      <header className="bg-[#CED3DC] p-4 shadow-lg flex justify-between items-center">
        <div className="flex items-center gap-4">
          <img src={logoUCN} alt="UCNcositas Logo" className="w-12 h-13" />
          <h1 className="text-2xl font-extrabold bg-gradient-to-r from-[#275DAD] via-[#ABA9C3] to-[#5B616A] bg-clip-text text-transparent drop-shadow-lg">
            UCNcositas
          </h1>
        </div>
        <div className="flex items-center gap-4">
          <input
            type="text"
            placeholder="Buscar productos..."
            className="p-2 rounded border border-[#ABA9C3] focus:outline-none focus:ring-2 focus:ring-[#275DAD]"
          />
          <a
            href="carrito.html"
            className="bg-[#275DAD] text-white p-2 rounded hover:bg-[#5B616A] transition-colors"
          >
            🛒 Carrito
          </a>
        </div>
      </header>

      {/* Contenedor de catálogo */}
      <main className="flex-1 max-w-6xl mx-auto p-6">

        <h2 className="text-3xl font-extrabold bg-gradient-to-r from-[#275DAD] via-[#ABA9C3] to-[#5B616A] bg-clip-text text-transparent drop-shadow-md mb-6">
          Productos Destacados
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
            <div
              key={num}
              className="bg-white rounded-xl shadow-lg p-4 flex flex-col items-center transform hover:scale-105 transition-transform"
            >
              <img
                src={ucenin}
                alt={`Producto ${num}`}
                className="rounded-lg mb-4 h-48 object-contain"
              />
              <h3 className="font-semibold text-[#275DAD] mb-2 text-center">
                Producto {num}
              </h3>
              <p className="text-[#5B616A] font-bold mb-4">
                ${[19.99,29.99,39.99,24.99,34.99,44.99,27.99,31.99][num-1]}
              </p>
              <Link
                 to="./producto"
                className="bg-[#275DAD] text-white p-2 rounded hover:bg-[#5B616A] w-full text-center"
                  >
                  Ver Producto
                </Link>
            </div>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-[#CED3DC] p-6 mt-auto shadow-inner">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between gap-6">
          {/* Información empresa */}
          <div>
            <h3 className="text-xl font-bold text-[#275DAD] mb-2">UCNcositas</h3>
            <p className="text-[#5B616A] mb-2">Tienda online de productos únicos y creativos.</p>
            <p className="text-[#5B616A] text-sm">© 2025 UCNcositas. Todos los derechos reservados.</p>
          </div>

          {/* Contacto */}
          <div>
            <h3 className="text-xl font-bold text-[#275DAD] mb-2">Contacto</h3>
            <p className="text-[#5B616A]">Correo: contacto@ucncositas.cl</p>
            <p className="text-[#5B616A]">Tel: +56 9 1234 5678</p>
          </div>

          {/* Redes sociales */}
          <div>
            <h3 className="text-xl font-bold text-[#275DAD] mb-2">Síguenos</h3>
            <div className="flex gap-4">
              <a
                href="#"
                className="bg-[#275DAD] text-white p-2 rounded hover:bg-[#5B616A] transition-colors"
              >
                Facebook
              </a>
              <a
                href="#"
                className="bg-[#ABA9C3] text-white p-2 rounded hover:bg-[#275DAD] transition-colors"
              >
                Instagram
              </a>
              <a
                href="#"
                className="bg-[#5B616A] text-white p-2 rounded hover:bg-[#ABA9C3] transition-colors"
              >
                Twitter
              </a>
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
}


export default Home;
