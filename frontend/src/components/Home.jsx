// src/Home.js
import React from 'react';

function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-5xl font-bold text-blue-600 mb-4">
        Bienvenido a Home
      </h1>
      <p className="text-lg text-gray-700">
        Esta es la página principal
      </p>
      <button className="mt-6 px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition">
        Botón de prueba
      </button>
    </div>
  );
}

export default Home;