import React, { useState } from "react";
import { Button } from "flowbite-react";
import { Menu, X } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function MenuHamburguesa() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <>
      {/* Botón hamburguesa */}
      <Button
        color="blue"
        pill
        onClick={() => setOpen(!open)}
        className="flex items-center justify-center w-14 h-14 p-0 transition-all z-50 bg-blue-600 hover:bg-blue-700 text-white"
      >
        {open ? <X size={26} /> : <Menu size={26} />}
      </Button>

      {/* Overlay */}
      <div
        className={`fixed top-0 left-0 w-screen h-screen backdrop-blur-md bg-black/30 z-50 transition-opacity duration-500 ${
          open ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setOpen(false)}
      >
        {/* Menú lateral */}
        <div
          className={`absolute top-0 left-0 h-full w-72 bg-white/90 backdrop-blur-xl p-6 pt-24 flex flex-col gap-6 transform transition-transform duration-500 ${
            open ? "translate-x-0" : "-translate-x-full"
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Botón de cierre */}
          <button
            onClick={() => setOpen(false)}
            className="absolute top-6  p-2 rounded-full hover:bg-blue-100 transition-colors"
          >
            <X size={28} className="text-blue-700" />
          </button>

          <h2 className="text-3xl font-extrabold text-blue-700 mb-4 tracking-widest">
            Menú
          </h2>

          <Button
            color="blue"
            size="lg"
            fullSized
            className="justify-start hover:bg-blue-700"
            onClick={() => { navigate("/"); setOpen(false); }}
          >
            Inicio
          </Button>

          <Button
            color="blue"
            size="lg"
            fullSized
            className="justify-start hover:bg-blue-700"
            onClick={() => { navigate("/catalogo"); setOpen(false); }}
          >
            Catálogo
          </Button>

          <Button
            color="blue"
            size="lg"
            fullSized
            className="justify-start hover:bg-blue-700"
            onClick={() => { navigate("/carrito"); setOpen(false); }}
          >
            Carrito
          </Button>

          <Button
            color="blue"
            size="lg"
            fullSized
            className="justify-start hover:bg-blue-700"
            onClick={() => { navigate("/perfil"); setOpen(false); }}
          >
            Perfil
          </Button>
        </div>
      </div>
    </>
  );
}
