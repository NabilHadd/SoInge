// src/components/Footer.jsx
import React from "react";

export default function Footer() {
  return (
    <footer className="bg-[#CED3DC] p-6 mt-auto shadow-inner">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between gap-6">
        
        {/* Información empresa */}
        <div>
          <h3 className="text-xl font-bold text-[#275DAD] mb-2">UCNcositas</h3>
          <p className="text-[#5B616A] mb-2">
            Tienda online de productos únicos y creativos.
          </p>
          <p className="text-[#5B616A] text-sm">
            © 2025 UCNcositas. Todos los derechos reservados.
          </p>
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
  );
}
