import React, {useEffect, useState} from 'react';
import { Button } from 'flowbite-react';
import { useNavigate } from 'react-router-dom';


export default function ProductCard({ product }) {
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState("")
  const [p] = useState(product)
  const navigate = useNavigate();

  useEffect(() => {
    if (p) {
      setName(p.nombre);
      setPrice(p.precio);
      setImage(p.imagen);
    }
  }, [p]);

  
  const handleClick = (path) => {
    navigate(path);
  };

  return (<div
              key={p.id_producto}
              className="bg-white rounded-xl shadow-lg p-4 flex flex-col items-center transform hover:scale-105 transition-transform"
            >
              <img
                src={`data:image/jpg;base64,${image}`}
                alt={name}
                className="rounded-lg mb-4 h-48 object-contain"
              />
              <h3 className="font-semibold text-[#275DAD] mb-2 text-center">
                  {name}
              </h3>
              <p className="text-[#5B616A] font-bold mb-4">
                {price}
              </p>
              <Button
                onClick={() => handleClick('/Producto')}
                color="blue"
                className="w-full text-center rounded-lg"
              >
                Ver Producto
              </Button>
            </div>)
}