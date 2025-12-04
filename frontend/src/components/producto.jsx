// src/Home.js
import React, {useEffect, useState} from 'react';
import { Button } from "flowbite-react";
import CantidadInput from './CantidadInput';
import RatingBox from './RatingBox';
import ModalLock from './Modal';
import ReviewForm from './ReviewForm';
import Footer from './Footer';
import Header from './Header';
import Toast from './Toast';
import axios from 'axios';

function Producto({ producto, onMostrarProducto, refreshProduct}) {

  const [openForm, setOpenForm] = useState(false);
  const [cantidad, setCantidad] = useState(1);
  const [mensaje, setMensaje] = useState("");

  
  const handleAgregarAlCarrito = () => {
    const carrito = JSON.parse(localStorage.getItem("carrito")) || [];

    // Buscar si el producto ya está en el carrito
    const existente = carrito.find((p) => p.id_producto === producto.id_producto);

    if (existente) {
      existente.cantidad += cantidad;
    } else {
      carrito.push({
        id_producto: producto.id_producto,
        stock: producto.stock,
        nombre: producto.nombre,
        precio: producto.precio,
        imagen: `data:image/jpg;base64,${producto.imagen}`,
        cantidad,
      });
    }

    localStorage.setItem("carrito", JSON.stringify(carrito));
    setMensaje(""); // limpia primero
    setTimeout(() => setMensaje(`Se han agregado ${cantidad} ${producto.nombre} `), 0);
  };

  
  const handleSubmit = async (review) => {
    setOpenForm(false)

    await axios.post('http://localhost:3001/product/review', {
        id_producto: producto.id_producto,
        valoracion: review.valoracion,
        descripcion: review.descripcion
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });

      refreshProduct(producto.id_producto)

  }


  return (
    <div>
      <Header/>
    <div className="bg-[#F9FAFB] min-h-screen py-10">
      <div className="max-w-5xl mx-auto p-6 flex flex-col gap-10">

        <Button
          onClick={() => onMostrarProducto(null)}
          color="light"
          className="font-medium text-[#275DAD] border border-[#275DAD] hover:bg-[#275DAD] hover:text-white transition-colors"
        >
          ← Volver al catálogo
        </Button>

        <div className="flex flex-col md:flex-row gap-10 bg-white p-6 rounded-2xl shadow-md border border-gray-100">
          
          {/* Imagen */}
          <div className="flex-1 flex justify-center items-center">
            <img
              src={`data:image/jpg;base64,${producto.imagen}`}
              alt="Producto"
              className="rounded-xl max-h-96 object-contain drop-shadow-sm"
            />
          </div>

          {/* Detalles */}
          <div className="flex-1 flex flex-col gap-6">
            <h1 className="text-4xl font-bold text-gray-800">
              {producto.nombre}
            </h1>

            <p className="text-2xl font-semibold text-[#275DAD]">
              {producto.precio}
            </p>

            <p className="text-gray-600 leading-relaxed">
              {producto.descripcion}
            </p>

            <CantidadInput maxCantidad={producto.stock} onCantidad={setCantidad} cantidad={1}/>


            {/* Botón */}
            <Button
              onClick={() => handleAgregarAlCarrito()}
              color="blue"
              size="lg"
              className="w-fit font-semibold shadow-md transition-transform hover:scale-105"
            >
              🛒 Agregar al carrito
            </Button>

          </div>
        </div>
        {/* Reseñas */}
        <RatingBox 
          reviewsNum={producto.reviews.length}
          stars={(producto.reviews.map(r=>r.valoracion).reduce((x, y) => x + y, 0))/producto.reviews.length}
          reviews={producto.reviews.map(r => r.descripcion)}
        />

        <Button
        onClick={() => setOpenForm(true)}
          color="blue"
          size="lg"
          className="w-fit font-semibold shadow-md transition-transform hover:scale-105"
        >
          Agregar Reseña
        </Button>

        <ModalLock isOpen={openForm}>
          <ReviewForm onCancel={setOpenForm} onSubmit={handleSubmit} onClose={setOpenForm}/>
        </ModalLock>

      </div>
        {mensaje && (
          <Toast message={mensaje} type="success" />
        )}
    </div>
      <Footer/>
    </div>

  );
}

export default Producto;
