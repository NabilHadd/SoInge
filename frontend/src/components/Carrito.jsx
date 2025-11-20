import React, { useEffect, useState } from "react";
import { Button } from "flowbite-react";
import { Trash2, Plus, Minus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import axios from 'axios'


export default function Carrito() {
  const navigate = useNavigate();
  const [breakStocks, setBreakStocks] = useState([])

  const [productos, setProductos] = useState(() => {
    const saved = localStorage.getItem("carrito");
    return JSON.parse(saved)
  });

  useEffect(() => {
    localStorage.setItem("carrito", JSON.stringify(productos));
  }, [productos]);


  const total = productos.reduce((acc, p) => acc + p.precio * p.cantidad, 0);

  const actualizarCantidad = (id, delta) => {
    setProductos((prev) =>
      prev.map((p) =>
        p.id === id ? { ...p, cantidad: Math.max(1, p.cantidad + delta) } : p
      )
    );
  };



  const eliminarProducto = (id) => {
    setProductos((prev) => prev.filter((p) => p.id !== id));
  };

  //ARREGLAR EL BOTON DE SUMAR EN EL CARRITO O QUITARLOS NOMAS, ESTA SUMANDO TODOS A LA VEZ.
  //AGREGAR UN POP UP QUE SE LANCE SI ESQUE BREAKSTOCKS NO ES NULL CON EL (&&)
  const comprarAhora = () => {
    //disminuir de la base de datos los productos.
    productos.forEach(p => {
      axios.get(`http://localhost:3001/product/validate-stock?id_producto=${p.id_producto}&push_stock=${p.cantidad}`)
      .then(function (res){
        if(!res.data.success) breakStocks.push(res.data.product);
      })
      .catch(function(error){
        console.log(error)
      })
    });
    
    alert("Compra realizada con éxito");
    localStorage.removeItem("carrito");
    setProductos([]);
  };

  return (

    <div>
        <Header/>
        <div className="min-h-screen bg-[#F9FAFB] py-10 px-6 flex flex-col items-center">
        <div className="w-full max-w-3xl bg-white rounded-2xl shadow-md p-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
            🛒 Tu carrito
            </h2>

            {productos.length === 0 ? (
            <div className="flex justify-center items-center py-10 text-gray-500">
                <p>Tu carrito está vacío.</p>
            </div>
            ) : (
            <div className="flex flex-col gap-4">
                {productos.map((p) => (
                <div
                    key={p.id}
                    className="flex items-center justify-between border rounded-xl p-3 shadow-sm hover:shadow-md transition"
                >
                    <div className="flex items-center gap-4">
                    <img
                        src={p.imagen}
                        alt={p.nombre}
                        className="w-20 h-20 rounded-lg object-cover"
                    />
                    <div>
                        <h3 className="font-medium text-gray-800">{p.nombre}</h3>
                        <p className="text-gray-600">
                        ${p.precio.toLocaleString()}
                        </p>
                    </div>
                    </div>

                    <div className="flex items-center gap-4">
                    {/* Botones de cantidad */}
                    <div className="flex items-center border rounded-lg">
                        <Button
                        color="gray"
                        size="xs"
                        onClick={() => actualizarCantidad(p.id, -1)}
                        >
                        <Minus size={16} />
                        </Button>
                        <span className="px-3">{p.cantidad}</span>
                        <Button
                        color="gray"
                        size="xs"
                        onClick={() => actualizarCantidad(p.id, 1)}
                        >
                        <Plus size={16} />
                        </Button>
                    </div>

                    {/* Eliminar */}
                    <Button
                        color="failure"
                        size="xs"
                        onClick={() => eliminarProducto(p.id)}
                    >
                        <Trash2 size={16} />
                    </Button>
                    </div>
                </div>
                ))}
            </div>
            )}

            {/* Resumen */}
            {productos.length > 0 && (
            <div className="mt-6 border-t pt-4 flex flex-col items-end">
                <h3 className="text-lg font-semibold text-gray-800">
                Total: ${total.toLocaleString()}
                </h3>

                <div className="flex gap-3 mt-4">
                <Button color="gray" onClick={() => navigate("/catalogo")}>
                    Seguir comprando
                </Button>

                <Button color="blue" onClick={comprarAhora}>
                    Comprar ahora
                </Button>
                </div>
            </div>
            )}
        </div>
        </div>
        <Footer/>
        </div>
  );
}
