import React from "react";
import logo1 from '../assets/logo.webp';  

export default function AdminHome() {

  return(
    <div class="bg-[#FCF7F8] flex h-screen">
  
  
    <aside class="w-64 bg-[#CED3DC] p-6 flex flex-col">
      <img src={logo1} alt="logo" className="w-[100px] h-[104px] mb-6 mx-auto" />
      <nav class="flex flex-col gap-4 mt-4">
        <a href="#" class="text-[#275DAD] font-semibold hover:text-[#5B616A] transition-colors">Dashboard</a>
        <a href="#" class="text-[#5B616A] hover:text-[#275DAD] transition-colors">Inventario</a>
        <a href="#" class="text-[#5B616A] hover:text-[#275DAD] transition-colors">Ventas</a>
        <a href="#" class="text-[#5B616A] hover:text-[#275DAD] transition-colors">Usuarios</a>
        <a href="#" class="text-[#5B616A] hover:text-[#275DAD] transition-colors">Configuración</a>
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
          Total Productos: 120
        </div>
        <div class="bg-gradient-to-r from-[#275DAD] to-[#5B616A] p-4 rounded-xl shadow-lg text-white font-semibold transform hover:scale-105 transition-transform">
          Ingresos Hoy: $2,500
        </div>
        <div class="bg-gradient-to-r from-[#5B616A] to-[#ABA9C3] p-4 rounded-xl shadow-lg text-white font-semibold transform hover:scale-105 transition-transform">
          Usuarios Activos: 45
        </div>
      </div>
  
  
      <div class="bg-[#CED3DC] p-4 rounded-xl shadow-lg mb-6 overflow-auto">
        <h2 class="text-2xl font-extrabold bg-gradient-to-r from-[#275DAD] via-[#ABA9C3] to-[#5B616A] bg-clip-text text-transparent drop-shadow-md mb-4">
          Inventario
        </h2>
        <table class="min-w-full bg-white rounded-xl overflow-hidden">
          <thead class="bg-[#ABA9C3] text-white">
            <tr>
              <th class="py-2 px-4 text-left">Producto</th>
              <th class="py-2 px-4 text-left">Stock</th>
              <th class="py-2 px-4 text-left">Precio</th>
              <th class="py-2 px-4 text-left">Categoría</th>
            </tr>
          </thead>
          <tbody>
            <tr class="border-b hover:bg-[#FCF7F8] transition-colors">
              <td class="py-2 px-4">Producto A</td>
              <td class="py-2 px-4">50</td>
              <td class="py-2 px-4">$15</td>
              <td class="py-2 px-4">Categoría 1</td>
            </tr>
            <tr class="border-b bg-gray-50 hover:bg-[#FCF7F8] transition-colors">
              <td class="py-2 px-4">Producto B</td>
              <td class="py-2 px-4">30</td>
              <td class="py-2 px-4">$25</td>
              <td class="py-2 px-4">Categoría 2</td>
            </tr>
            <tr class="border-b hover:bg-[#FCF7F8] transition-colors">
              <td class="py-2 px-4">Producto C</td>
              <td class="py-2 px-4">40</td>
              <td class="py-2 px-4">$10</td>
              <td class="py-2 px-4">Categoría 1</td>
            </tr>
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
  )
}
     