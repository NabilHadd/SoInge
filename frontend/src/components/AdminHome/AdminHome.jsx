import React from "react";
import logo1 from '../../assets/logo.webp';  
import { useEffect, useState } from 'react';
import { getProductCount, getAllProducts } from '../../api/products.ts';
import { Link } from "react-router-dom";



export function ProductCounter() {
  const [count, setCount] = useState(null);


  useEffect(() => {
    getProductCount().then(c => setCount(c));
  }, []);

  if (count === null) return <p>Cargando...</p>;

  return count;
}

export default function AdminHome() {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getAllProducts();
        setProductos(data);
      } catch (error) {
        console.error("Error al obtener productos:", error);
      }
    };

    fetchProducts();
  }, []);
  return(
    <div class="bg-[#FCF7F8] flex h-screen">
  
  
    <aside class="w-64 bg-[#CED3DC] p-6 flex flex-col">
      <img src={logo1} alt="logo" className="w-[100px] h-[104px] mb-6 mx-auto" />
      <nav class="flex flex-col gap-4 mt-4">
        <Link to="./" class="text-[#275DAD] font-semibold hover:text-[#5B616A] transition-colors">Dashboard</Link>
        <Link to="./Inventario" class="text-[#5B616A] hover:text-[#275DAD] transition-colors">Inventario</Link>
        <Link to="./Ventas" class="text-[#5B616A] hover:text-[#275DAD] transition-colors">Ventas</Link>
        <Link to="./Usuarios" class="text-[#5B616A] hover:text-[#275DAD] transition-colors">Usuarios</Link>
        <Link to="./Configuracion" class="text-[#5B616A] hover:text-[#275DAD] transition-colors">Configuración</Link>
      </nav>
    </aside>
  
    <div class="flex-1 p-6 overflow-auto">
     
      <header class="flex justify-between items-center mb-6">
        <h1 class="text-3xl font-extrabold bg-gradient-to-r from-[#275DAD] via-[#ABA9C3] to-[#5B616A] bg-clip-text text-transparent drop-shadow-lg">
          Dashboard
        </h1>
        <div class="text-[#5B616A] font-medium">Admin</div>
      </header>
  
   
      <div class="grid grid-cols-3 gap-6 mb-6">
        <div class="bg-gradient-to-r from-[#ABA9C3] to-[#CED3DC] p-4 rounded-xl shadow-lg text-white font-semibold transform hover:scale-105 transition-transform">
          Total Productos: <ProductCounter />
        </div>
        <div class="bg-gradient-to-r from-[#275DAD] to-[#5B616A] p-4 rounded-xl shadow-lg text-white font-semibold transform hover:scale-105 transition-transform">
          Ingresos Hoy: $2,500
        </div>
        <div class="bg-gradient-to-r from-[#5B616A] to-[#ABA9C3] p-4 rounded-xl shadow-lg text-white font-semibold transform hover:scale-105 transition-transform">
          Usuarios Activos: 45
        </div>
      </div>
  
  
    <div className="bg-[#CED3DC] p-4 rounded-xl shadow-lg mb-6 overflow-auto">
      <h2 className="text-2xl font-extrabold bg-gradient-to-r from-[#275DAD] via-[#ABA9C3] to-[#5B616A] bg-clip-text text-transparent drop-shadow-md mb-4">
        Inventario
      </h2>
      <table className="min-w-full bg-white rounded-xl overflow-hidden">
        <thead className="bg-[#ABA9C3] text-white">
          <tr>
            <th className="py-2 px-4 text-left">Producto</th>
            <th className="py-2 px-4 text-left">Stock</th>
            <th className="py-2 px-4 text-left">Precio</th>
            <th className="py-2 px-4 text-left">Descripcion</th>
          </tr>
        </thead>
        <tbody>
          {productos.map((producto, index) => (
            <tr
              key={producto.id}
              className={`border-b ${index % 2 === 0 ? "" : "bg-gray-50"} hover:bg-[#FCF7F8] transition-colors`}
            >
              <td className="py-2 px-4">{producto.nombre}</td>
              <td className="py-2 px-4">{producto.stock}</td>
              <td className="py-2 px-4">${producto.precio}</td>
              <td className="py-2 px-4">{producto.descripcion}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

  
    
      <div class="bg-[#CED3DC] p-4 rounded-xl shadow-lg">
        <h2 class="text-2xl font-extrabold bg-gradient-to-r from-[#275DAD] via-[#ABA9C3] to-[#5B616A] bg-clip-text text-transparent drop-shadow-md mb-4">
          Ingresos Mensuales
        </h2>
        <div class="w-full h-64 bg-white flex items-center justify-center text-[#5B616A] font-medium rounded-lg shadow-inner">
          [Gráfico de ingresos aquí]
        </div>
      </div>
  
    </div>
  
  </div>
  );
}
     