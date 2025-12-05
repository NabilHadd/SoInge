import React, { useEffect, useState } from "react";
import logo1 from "../../assets/logo.webp";
import { Link } from "react-router-dom";
import { getPurchasesWithDetails } from "../../api/compras.ts"; // tu endpoint para traer compras

export default function Ventas() {
  const [compras, setCompras] = useState([]);

  useEffect(() => {
    const fetchCompras = async () => {
      try {
        const data = await getPurchasesWithDetails();
        setCompras(data);
      } catch (error) {
        console.error("Error al obtener compras:", error);
      }
    };

    fetchCompras();
  }, []);

  return (
    <div className="bg-[#FCF7F8] flex h-screen">
      <aside className="w-64 bg-[#CED3DC] p-6 flex flex-col">
        <img src={logo1} alt="logo" className="w-[100px] h-[104px] mb-6 mx-auto" />
        <nav className="flex flex-col gap-4 mt-4">
          <Link to="/AdminHome" className="text-[#5B616A] hover:text-[#275DAD]">Dashboard</Link>
          <Link to="/Inventario" className="text-[#5B616A] hover:text-[#275DAD]">Inventario</Link>
          <Link to="/Ventas" className="text-[#275DAD] font-semibold">Ventas</Link>
        </nav>
      </aside>

      <div className="flex-1 p-6 overflow-auto">
        <header className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-extrabold bg-gradient-to-r from-[#275DAD] via-[#ABA9C3] to-[#5B616A] bg-clip-text text-transparent">
            Ventas
          </h1>
          <div className="text-[#5B616A] font-medium">Admin</div>
        </header>

        <div className="bg-[#CED3DC] p-4 rounded-xl shadow-lg overflow-auto">
          <h2 className="text-2xl font-extrabold bg-gradient-to-r from-[#275DAD] via-[#ABA9C3] to-[#5B616A] bg-clip-text text-transparent mb-4">
            Historial de Compras
          </h2>

          <table className="min-w-full bg-white rounded-xl overflow-hidden">
            <thead className="bg-[#ABA9C3] text-white">
              <tr>
                <th className="py-2 px-4">ID Compra</th>
                <th className="py-2 px-4">Rut Comprador</th>
                <th className="py-2 px-4">Rut Admin</th>
                <th className="py-2 px-4">Total</th>
                <th className="py-2 px-4">Fecha</th>
                <th className="py-2 px-4">Detalles</th>
              </tr>
            </thead>

            <tbody>
              {compras.map((c, i) => (
                <tr key={c.id_compra} className={i % 2 === 0 ? "" : "bg-gray-50"}>
                  <td className="py-2 px-4">{c.id_compra}</td>
                  <td className="py-2 px-4">{c.rut_comprador}</td>
                  <td className="py-2 px-4">{c.rut_admin}</td>
                  <td className="py-2 px-4">${c.total}</td>
                  <td className="py-2 px-4">{new Date(c.fecha).toLocaleString()}</td>
                  <td className="py-2 px-4">
                    <details className="cursor-pointer">
                      <summary className="text-[#275DAD] font-semibold">Ver detalles</summary>
                      <ul className="pl-4 mt-2 list-disc">
                        {c.detalles.map((d) => (
                          <li key={d.id_detalle}>
                            Producto {d.id_producto} — Cantidad {d.cantidad} — Subtotal ${d.subtotal}
                          </li>
                        ))}
                      </ul>
                    </details>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

        </div>
      </div>
    </div>
  );
}
