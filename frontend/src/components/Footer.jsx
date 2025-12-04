// src/components/Footer.jsx
import React from "react";

export default function Footer() {
  return (
    <footer className="bg-[#1E1E1E] text-gray-300 py-10 mt-auto shadow-inner border-t border-gray-700">
      <div className="max-w-6xl mx-auto flex flex-col gap-10 px-4">

        {/* Parte superior */}
        <div className="flex flex-col md:flex-row justify-between gap-8">

          {/* Información empresa */}
          <div>
            <h3 className="text-2xl font-bold text-white mb-3 tracking-wide">
              UCNcositas
            </h3>
            <p className="text-gray-400 mb-1">
              Tienda online de productos únicos y creativos.
            </p>
            <p className="text-gray-500 text-sm">
              © 2025 UCNcositas. Todos los derechos reservados.
            </p>
          </div>

          {/* Contacto */}
          <div>
            <h3 className="text-2xl font-bold text-white mb-3 tracking-wide">
              Contacto
            </h3>
            <p className="text-gray-400">Correo: ucncositas@gmail.com</p>
            <p className="text-gray-400">Tel: +56 9 1234 5678</p>
          </div>
        </div>

        {/* Línea divisoria suave */}
        <div className="w-full h-px bg-gray-700"></div>

        {/* Desarrollado por */}
        <div className="text-center">
          <p className="text-gray-400 text-sm">
            Desarrollado por{" "}
            <span className="text-white font-semibold tracking-wide">
              soInge
            </span>
          </p>
        </div>

      </div>
    </footer>
  );
}
