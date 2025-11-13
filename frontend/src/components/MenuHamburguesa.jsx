import React, { useState } from "react";
import { Button } from "flowbite-react";
import { Menu, X } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function MenuHamburguesa() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <>
      {/* Botón de menú */}
      <Button
        color="gray"
        pill
        onClick={() => setOpen(!open)}
        className="flex items-center justify-center w-10 h-10 p-0 z-50"
      >
        {open ? <X size={22} /> : <Menu size={22} />}
      </Button>

      {/* Menú lateral */}
      {open && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm z-40"
          onClick={() => setOpen(false)}
        >
          <div
            className="absolute top-0 left-0 h-full w-64 bg-white shadow-xl p-6 pt-16 flex flex-col gap-4" 
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-2xl font-bold text-[#275DAD] mb-4">Menú</h2>

            <button
              onClick={() => {
                navigate("/");
                setOpen(false);
              }}
              className="text-lg text-gray-700 hover:text-blue-600 transition-colors"
            >
              Inicio
            </button>

            <button
              onClick={() => {
                navigate("/catalogo");
                setOpen(false);
              }}
              className="text-lg text-gray-700 hover:text-blue-600 transition-colors"
            >
              Catálogo
            </button>

            <button
              onClick={() => {
                navigate("/carrito");
                setOpen(false);
              }}
              className="text-lg text-gray-700 hover:text-blue-600 transition-colors"
            >
              Carrito
            </button>

            <button
              onClick={() => {
                navigate("/perfil");
                setOpen(false);
              }}
              className="text-lg text-gray-700 hover:text-blue-600 transition-colors"
            >
              Perfil
            </button>
          </div>
        </div>
      )}
    </>
  );
}
