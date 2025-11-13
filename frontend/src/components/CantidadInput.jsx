import React from "react";
import { TextInput } from "flowbite-react";

export default function CantidadInput({ cantidad, onCantidad }) {
  const handleChange = (e) => {
    const value = Number(e.target.value);
    if (value >= 1 && value <= cantidad) {
      onCantidad?.(value); // Llama a la función si existe
    }
  };

  return (
    <div className="flex items-center gap-3">
      <span className="font-medium text-gray-700">Cantidad:</span>
      <TextInput
        type="number"
        min={1}
        max={cantidad}
        defaultValue={1}
        sizing="md"
        className="w-24"
        onChange={handleChange}
      />
    </div>
  );
}
