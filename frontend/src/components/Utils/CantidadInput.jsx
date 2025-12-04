import React from "react";
import { TextInput } from "flowbite-react";

export default function CantidadInput({ maxCantidad, onCantidad, cantidad, id}) {

  const handleChange = (e) => {
    const value = Number(e.target.value);
    if (value >= 1 && value <= maxCantidad) {
      id? onCantidad(id, value) : onCantidad(value)
    }
  };

  return (
    <div className="flex items-center gap-3">
      <span className="font-medium text-gray-700">Cantidad:</span>
      <TextInput
        type="number"
        min={1}
        max={maxCantidad}
        defaultValue={cantidad}
        sizing="md"
        className="w-24"
        onChange={handleChange}
      />
    </div>
  );
}
