// src/Home.js
import React, {useState} from 'react';
import { Button } from "flowbite-react";
import CantidadInput from './CantidadInput';
import RatingBox from './RatingBox';
import ModalLock from './Modal';
import ReviewForm from './ReviewForm';
import axios from 'axios';

function Producto({ producto, onMostrarProducto}) {

  const [open, setOpen] = useState(false);
  
  const handleSubmit = async () => {
    setOpen(false)
    try {

      const res = await axios.post("http://localhost:3001/auth/login", {
        //debe enviar la review al endpoint correspondiente
      });

      if (res.data.success) {} //lo que sea que tenga que suceder si es success}
    } catch (err) {
      //lo que sea que tenga que suceder si sale bien
      //setMensaje(
      //  " Error: " + (err.response?.data?.message || err.message)
      //);
    }
  }


  return (
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

            <CantidadInput cantidad={producto.stock} />


            {/* Botón */}
            <Button
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
        onClick={() => setOpen(true)}
          color="blue"
          size="lg"
          className="w-fit font-semibold shadow-md transition-transform hover:scale-105"
        >
          Agregar Reseña
        </Button>

        <ModalLock isOpen={open}>
          <ReviewForm onCancel={setOpen} onSubmit={handleSubmit} onClose={setOpen}/>
        </ModalLock>

      </div>
    </div>
  );
}

export default Producto;
