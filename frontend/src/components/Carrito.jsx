import React, { useEffect, useState } from "react";
import { Button, Spinner } from "flowbite-react";
import { Trash2, Plus, Minus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import axios from 'axios'
import CantidadInput from "./CantidadInput";
import ModalLock from './Modal';
import CompraForm from "./CompraForm";
import Toast from "./Toast";


export default function Carrito() {
  const navigate = useNavigate();
  const [breakStocks, setBreakStocks] = useState([]);
  const [compraForm, setCompraForm] =  useState(false);
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const [type, setType] = useState('');  

  const [productos, setProductos] = useState(() => {
    const saved = localStorage.getItem("carrito");
    return saved ? JSON.parse(saved): [];
  });

  useEffect(() => {
    localStorage.setItem("carrito", JSON.stringify(productos));
  }, [productos]);


  const total = productos.reduce((acc, p) => acc + p.precio * p.cantidad, 0);

  const actualizarCantidad = (id, nuevaCantidad) => {
    setProductos((prev) =>
      prev.map((p) =>
        p.id_producto === id ? { ...p, cantidad: nuevaCantidad } : p
      )
    );
  };

  const handleSubmit = (form) => {
    setLoading(true);
    axios.post("http://localhost:3001/mail/send", {
      to: form.email,
      subject: "Confirmación de compra",
      text: "Gracias por tu compra! Te contactaremos pronto."
    })
    .then(response => {
      setMsg('Compra realizada con exito, revisa tu correo.');
      setType('success')
    })
    .catch(error => {
      setMsg("Error al enviar correo:", error.response?.data || error);
      setType('error')
    })
    .finally(() => setLoading(false));

    setCompraForm(false);
    localStorage.removeItem("carrito");
    setProductos([]);
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

  };

// arriba del componente: import { Spinner } from 'flowbite-react';

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#F9FAFB]">
        <div className="flex flex-col items-center gap-3">
          <Spinner aria-label="Loading" size="xl" />
          <span className="text-gray-600 text-sm">Cargando, por favor espera...</span>
        </div>
      </div>
    );
  }




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



                    <CantidadInput maxCantidad={p.stock} cantidad={p.cantidad} onCantidad={actualizarCantidad} id={p.id_producto}/>


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
                <Button color="gray" onClick={() => navigate("/")}>
                    Seguir comprando
                </Button>

                <Button color="blue" onClick={() => setCompraForm(true)}>
                    Comprar ahora
                </Button>

                <ModalLock isOpen={compraForm}>
                  <CompraForm onCancel={setCompraForm} onSubmit={handleSubmit}/>
                </ModalLock>

                </div>
            </div>
            )}
        </div>
        </div>
                {msg && (
                    <Toast message={msg} type="success" />
                )}
        <Footer/>
        </div>
  );
}
