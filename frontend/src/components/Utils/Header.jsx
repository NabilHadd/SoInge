import React from "react";
import { Button } from "flowbite-react";
import { ShoppingCart, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import MenuHamburguesa from "./MenuHamburguesa";

export default function Header() {
  const navigate = useNavigate();

  const limpiarLocalStorage = () => {
    localStorage.clear();
    alert("LocalStorage limpiado correctamente");
  };

  return (
    <header className="backdrop-blur-md bg-white/70 border-b border-blue-200 shadow-sm px-6 py-4 flex justify-between items-center sticky top-0 z-50">

      {/* Marca + Menú */}
      <div className="flex items-center gap-4">
        <MenuHamburguesa />

        <h1
          className="text-3xl font-black tracking-tight text-blue-700 hover:text-blue-900 transition-colors cursor-pointer"
          onClick={() => navigate("/")}
        >
          UCN<span className="text-black">cositas</span>
        </h1>
      </div>

      {/* Botones */}
      <div className="flex items-center gap-3">

        {/* Limpiar
        <Button
          color="light"
          className="flex items-center gap-2 text-red-600 border-red-300 hover:bg-red-100 transition-all"
          onClick={limpiarLocalStorage}
        >
          <Trash2 size={18} />
          Limpiar Datos
        </Button>
        */}
        {/* Carrito */}
        <Button
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white shadow-md hover:shadow-lg transition-all"
          onClick={() => navigate("/carrito")}
        >
          <ShoppingCart size={18} />
          Carrito
        </Button>
      </div>
    </header>
  );
}
