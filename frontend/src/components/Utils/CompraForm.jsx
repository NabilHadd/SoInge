import React, { useState } from "react";
import { Button, Label, TextInput} from "flowbite-react";

export default function CompraForm({ onSubmit, onCancel }) {

  const defaul =  {
    nombre: "",
    rut: "",
    email: "",
    direccion: "",
    mensaje: "Se coordinará la entrega por mail",
  };

  const [form, setForm] = useState(defaul);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.nombre || !form.rut || !form.email || !form.direccion) {
      alert("Por favor completa todos los campos.");
      return;
    }

    onSubmit?.(form); // envía los datos al componente padre
    setForm(defaul);
  };

  const handleCancel = () => {
    // Limpia los campos
    setForm(defaul);
    // Llama al callback externo si existe (por ejemplo, para cerrar el modal)
    onCancel?.(false);
  };

return (
  <form className="flex flex-col gap-4" onSubmit={handleSubmit}>

  {/* TÍTULO */}
  <div className="flex flex-col items-center mb-4">
    <h2 className="text-2xl font-bold text-gray-900 tracking-wide">
      Datos personales
    </h2>
    <div className="w-12 h-1 bg-blue-600 rounded-full mt-1"></div>
  </div>

    {/* Nombre */}
    <div>
      <Label htmlFor="nombre" value="Nombre completo" />
      <TextInput
        id="nombre"
        name="nombre"
        type="text"
        placeholder="Ej: Juan Pérez"
        onChange={handleChange}
        value={form.nombre}
        required
      />
    </div>

    {/* RUT */}
    <div>
      <Label htmlFor="rut" value="RUT" />
      <TextInput
        id="rut"
        name="rut"
        type="text"
        placeholder="11.111.111-1"
        onChange={handleChange}
        value={form.rut}
        required
      />
    </div>

    {/* Email */}
    <div>
      <Label htmlFor="email" value="Email" />
      <TextInput
        id="email"
        name="email"
        type="email"
        placeholder="correo@ejemplo.com"
        onChange={handleChange}
        value={form.email}
        required
      />
    </div>

    {/* Dirección */}
    <div>
      <Label htmlFor="direccion" value="Dirección" />
      <TextInput
        id="direccion"
        name="direccion"
        type="text"
        placeholder="Calle 123, Antofagasta"
        onChange={handleChange}
        value={form.direccion}
        required
      />
    </div>

    {/* Mensaje fijo */}
    <div>
      <div className="bg-blue-100 text-blue-700 border border-blue-300 rounded-lg p-3 mt-2 text-sm">
        <strong>Se coordinará la entrega por email.</strong>
      </div>
    </div>

    {/* BOTONES */}
    <div className="flex justify-end gap-4 mt-4">
      {/* Botón Cancelar */}
      <Button
        onClick={handleCancel}
        color="dark"
        className="!bg-black !text-white !border !border-gray-700 hover:!bg-gray-900 hover:scale-[1.03] transition-transform"
      >
        Cancelar
      </Button>

      {/* Botón Confirmar */}
      <Button
        type="submit"
        color="blue"
        className="!bg-blue-600 !border !border-blue-800 hover:!bg-blue-700 hover:scale-[1.03] transition-transform shadow-md"
      >
        Confirmar compra
      </Button>
    </div>

  </form>
);
}
