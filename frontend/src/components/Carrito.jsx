import React, { useEffect, useState } from "react";
import { Button } from "flowbite-react";
import { Trash2} from "lucide-react";
import { useNavigate } from "react-router-dom";
import Header from "./Utils/Header";
import Footer from "./Utils/Footer";
import axios from 'axios'
import CantidadInput from "./Utils/CantidadInput";
import ModalLock from './Utils/Modal';
import CompraForm from "./Utils/CompraForm";
import Toast from "./Utils/Toast";
import SpinnerModern from "./Utils/SpinnerModern";
import { useApi } from "../hooks/useApi";


export default function Carrito() {
  const navigate = useNavigate();
  const [compraForm, setCompraForm] =  useState(false);
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const [type, setType] = useState('');  
  const {getBaseUrl} = useApi();

  const [productos, setProductos] = useState(() => {
    const saved = localStorage.getItem("carrito");
    return saved ? JSON.parse(saved): [];
  });

  const formatText = (text)=> {
    if (!text) return "";

    // Reemplaza guiones bajos por espacios
    const withSpaces = text.replace(/_/g, " ");

    // Convierte cada palabra a mayúscula inicial
    const formatted = withSpaces.replace(/\b\w/g, (char) => char.toUpperCase());

    return formatted;
  };

  const formatPrice = (price) => {
    if (price == null) return "$0";
    return `$${price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}`;
  };


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

  const generarCuerpo = (name) => {
    const lista = productos
      .map(
        (p) =>
          `• ${p.nombre}\n\t\tCantidad: ${p.cantidad}\n\t\tSubtotal: ${formatPrice(p.precio * p.cantidad)}`
      )
      .join("\n\n\t");

    const cantidad_total = productos.reduce((acc, p) => acc + p.cantidad, 0);
    const total_compra = productos.reduce((acc, p) => acc + p.precio * p.cantidad, 0);

    const texto = `
        Hola ${name},

        ¡Gracias por tu compra en UCN Cositas!

        Aquí tienes el resumen de tu pedido:

        ----------------------------------------
        Productos adquiridos:
        ${lista}
        ----------------------------------------

        Detalle del pedido:
        - Cantidad total de ítems: ${cantidad_total}
        - Total a pagar: ${formatPrice(total_compra)}

        Si tienes cualquier duda o consulta, no dudes en contactarnos.

        ¡Gracias por preferir UCN Cositas!
        `;

    return texto;
  };


  const handleSubmit = async (form) => {
    setLoading(true);

    const body = {
      to: form.email,
      subject: 'Gracias por tu compra a UCNcositas!!',
      text: generarCuerpo(form.nombre),
    }

    try {
      await Promise.all(
        productos.map(p =>
          axios.post(`${getBaseUrl()}/product/stock-reduce`, {
            id_producto: p.id_producto,
            stock_redux: p.cantidad,
          })
        )
      );
    } catch (error) {
        const msg =
          error.response?.data?.message ||
          error.response?.data ||
          error.message ||
          "Error inesperado";

        setMsg(msg);
        setType('error');
        setLoading(false)
        return 
    }

    
    await axios.post(`${getBaseUrl()}/mail/send`, body)
    .then(response => {
      setMsg('Compra realizada con exito, revisa tu correo.');
      setType('success')
    })
    .catch(error => {
      setMsg("Error al enviar correo:", error.response?.data || error);
      setType('error')
    });

    setLoading(false);
    setCompraForm(false);
    localStorage.removeItem("carrito");
    setProductos([]);
  };




  const eliminarProducto = (id) => {
    setProductos((prev) => prev.filter((p) => p.id !== id));
  };



  if (loading) return <SpinnerModern fullScreen size={80} />



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
                        alt={formatText(p.nombre)}
                        className="w-20 h-20 rounded-lg object-cover"
                    />
                    <div>
                        <h3 className="font-medium text-gray-800">{formatText(p.nombre)}</h3>
                        <p className="text-gray-600">
                        {formatPrice(p.precio)}
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
                    <Toast message={msg} type={type} />
                )}
        <Footer/>
        </div>
  );
}
