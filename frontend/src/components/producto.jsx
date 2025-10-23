// src/Home.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import ucenin from '../assets/ucenin.png'; // Asegúrate de tener esta imagen en la carpeta assets
import { Link } from 'react-router-dom';
function Producto() {
  

  return (
  

    <div className="bg-[#FCF7F8]">

      <div className="max-w-6xl mx-auto p-6 flex flex-col gap-8">

    <Link
        to="/"
        className="inline-block text-[#275DAD] font-semibold hover:text-[#5B616A] transition-colors mb-4"
        >
         ← Volver al catálogo
    </Link>

        <div className="flex flex-col lg:flex-row gap-8">

          <div className="flex-1 bg-white rounded-xl shadow-lg p-4 flex items-center justify-center">
            <img
              src={ucenin}
              alt="Producto"
              className="rounded-xl max-h-96 object-contain"
            />
          </div>

          <div className="flex-1 flex flex-col gap-6">
            <h1 className="text-4xl font-extrabold bg-gradient-to-r from-[#275DAD] via-[#ABA9C3] to-[#5B616A] bg-clip-text text-transparent drop-shadow-lg">
              Nombre del Producto
            </h1>

            <p className="text-2xl font-bold text-[#275DAD]">$49.99</p>

            <p className="text-[#5B616A] text-lg">
              Breve descripción del producto, destacando sus características principales y beneficios. Ideal para atraer al cliente y explicar por qué debe comprarlo.
            </p>

            <div className="flex items-center gap-4">
              <span className="font-semibold text-[#5B616A]">Cantidad:</span>
              <input
                type="number"
                min="1"
                defaultValue={1}
                className="w-20 p-2 border border-[#ABA9C3] rounded focus:outline-none focus:ring-2 focus:ring-[#275DAD]"
              />
            </div>

            <button className="bg-[#275DAD] text-white p-4 rounded-xl font-bold text-lg hover:bg-[#5B616A] transition-colors transform hover:scale-105">
              Comprar Ahora
            </button>

            <div className="flex items-center gap-2 text-[#ABA9C3]">
              ⭐⭐⭐⭐☆ (24 reseñas)
            </div>

            <div className="flex gap-4 mt-4">
              <button className="bg-[#ABA9C3] text-white p-2 rounded hover:bg-[#275DAD] transition-colors">❤ Favorito</button>
              <button className="bg-[#CED3DC] text-[#5B616A] p-2 rounded hover:bg-[#ABA9C3] transition-colors">🔗 Compartir</button>
            </div>

          </div>
        </div>

        <div className="mt-12">
          <h2 className="text-3xl font-extrabold bg-gradient-to-r from-[#275DAD] via-[#ABA9C3] to-[#5B616A] bg-clip-text text-transparent drop-shadow-md mb-6">
            Productos Recomendados
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">

            {[1, 2, 3].map((num) => (
              <div
                key={num}
                className="bg-white rounded-xl shadow-lg p-4 flex flex-col items-center transform hover:scale-105 transition-transform"
              >
                <img
                  src={ucenin}
                  alt={`Producto ${num}`}
                  className="rounded-lg mb-4 h-40 object-contain"
                />
                <h3 className="font-semibold text-[#275DAD] mb-2">Producto {num}</h3>
                <p className="text-[#5B616A] font-bold">${19.99 * num}</p>
                <button className="mt-4 bg-[#275DAD] text-white p-2 rounded hover:bg-[#5B616A] transition-colors">
                  Comprar
                </button>
              </div>
            ))}

            <div className="bg-white rounded-xl shadow-lg p-4 flex flex-col items-center transform hover:scale-105 transition-transform">
              <img
                src={ucenin}
                alt="Producto 4"
                className="rounded-lg mb-4 h-40 object-contain"
              />
              <h3 className="font-semibold text-[#275DAD] mb-2">Producto 4</h3>
              <p className="text-[#5B616A] font-bold">$24.99</p>
              <button className="mt-4 bg-[#275DAD] text-white p-2 rounded hover:bg-[#5B616A] transition-colors">
                Comprar
              </button>
            </div>

          </div>
        </div>

      </div>

    </div>
  );
}

export default Producto;
