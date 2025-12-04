// src/components/FormularioReseña.jsx
import React, {useState } from "react";
import { Button, Textarea } from "flowbite-react";
import { Star } from "lucide-react";
import Toast from './Toast'

export default function FormularioReseña({ onSubmit, onCancel}) {
  const [valoracion, setValoracion] = useState(0);
  const [descripcion, setDescripcion] = useState("");
  const [mensaje, setMensaje] = useState("");


  //agregar el boton de cancelar para la reseña.
  const handleSubmit = (e) => {
    e.preventDefault();
    if (valoracion === 0) {
        setMensaje(""); // limpia primero
        setTimeout(() => setMensaje("Debe poner al menos una estrella"), 0);
        return;
    }
    onSubmit?.({ valoracion, descripcion });
    setValoracion(0);
    setDescripcion("");
  };

  const handleCancel = () => {
    // Limpia los campos
    setValoracion(0);
    setDescripcion("");
    setMensaje("");
    // Llama al callback externo si existe (por ejemplo, para cerrar el modal)
    onCancel?.(false);
  };

  return (
    <div>
    <form
      onSubmit={handleSubmit}
      className="bg-white flex flex-col gap-5"
    >
      <h2 className="text-xl font-semibold text-gray-800">Deja tu reseña</h2>

      {/* Estrellas */}
      <div className="flex gap-2 items-center">
        {[1, 2, 3, 4, 5].map((n) => (
          <Star
            key={n}
            size={28}
            onClick={() => setValoracion(n)}
            className={`cursor-pointer transition-all ${
              n <= valoracion
                ? "fill-yellow-400 text-yellow-400 scale-110"
                : "text-gray-300 hover:text-yellow-400"
            }`}
          />
        ))}
      </div>

      {/* Descripción */}
      <Textarea
        placeholder="Escribe tu opinión (opcional)"
        rows={4}
        value={descripcion}
        onChange={(e) => setDescripcion(e.target.value)}
      />

        <div className="flex justify-end gap-3 mt-4">
            <Button onClick={handleCancel} color="gray" className="w-fit">
                Cancelar
            </Button>

            <Button type="submit" color="blue" className="w-fit">
                Enviar reseña
            </Button>
        </div>
    

    </form>

        {mensaje && (
            <Toast message={mensaje} type="error" />
        )}
    </div>
    

  );
}
