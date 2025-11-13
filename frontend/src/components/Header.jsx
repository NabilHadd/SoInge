import React from "react";
import { Button } from "flowbite-react";
import { ShoppingCart } from "lucide-react";
import { useNavigate } from "react-router-dom";
import MenuHamburguesa from "./MenuHamburguesa";

export default function Header() {
  const navigate = useNavigate();

  return (
    <header className="bg-[#CED3DC] p-4 shadow-lg flex justify-between items-center">
      {/* Menú hamburguesa */}
      <div className="flex items-center gap-4">
        <MenuHamburguesa />
        <h1
          className="text-2xl font-bold text-[#1C1C1C] cursor-pointer"
          onClick={() => navigate("/")}
        >
          UCNcositas
        </h1>
      </div>

      {/* Botón al carrito */}
      <Button
        color="blue"
        className="flex items-center gap-2"
        onClick={() => navigate("/carrito")}
      >
        <ShoppingCart size={18} />
        Carrito
      </Button>
    </header>
  );
}
