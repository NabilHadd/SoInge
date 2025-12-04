import React, {useEffect, useState} from 'react';
import { Button } from 'flowbite-react';
import { useNavigate } from 'react-router-dom';


export default function ProductCard({ product, onMostrarProducto}) {
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState("")
  const [p] = useState(product)

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
    if (p) {
      setName(p.nombre);
      setPrice(p.precio);
      setImage(p.imagen);
    }
  }, [p]);

  return (<div
              key={p.id_producto}
              className="bg-white rounded-xl shadow-lg p-4 flex flex-col items-center transform hover:scale-105 transition-transform"
            >
              <img
                src={`data:image/jpg;base64,${image}`}
                alt={formatText(name)}
                className="rounded-lg mb-4 h-48 object-contain"
              />
              <h3 className="font-semibold text-[#275DAD] mb-2 text-center">
                  {formatText(name)}
              </h3>
              <p className="text-[#5B616A] font-bold mb-4">
                {formatPrice(price)}
              </p>
              <Button
                onClick={() => onMostrarProducto(p)}
                color="blue"
                className="w-full text-center rounded-lg"
              >
                Ver Producto
              </Button>
            </div>)
}