// src/Home.js
import React, {useEffect, useState} from 'react';
import { Spinner, Button} from 'flowbite-react';
import { useNavigate} from 'react-router-dom';
import axios from 'axios';
import logoUCN from '../assets/logo.webp';
import ProductCard from "./ProductCard";
import Producto from './Producto';
import Footer from './Footer';
import Header from './Header';

function Home() {
  const navigate = useNavigate(); // hook para navegación
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [producto, setProducto] = useState(null)
  



  const handleAdminRedirect = () => {
    navigate('/Login'); // ruta a la que quieres ir
  };
  
  const refreshProduct = async (id) => {
    console.log('hola')
    const { data } = await axios.get(`http://localhost:3001/product/byId/${id}`);
    setProducto(data)
    console.log(data)
    console.log(producto)
  };

  const handleMostrarProducto = (p) => {
    setProducto(p)
  }

  useEffect(() => {
    axios
      .get("http://localhost:3001/product/all")
      .then((res) => setProducts(res.data))
      .catch((err) => console.error("Error al obtener productos:", err))
      .finally(() => setLoading(false));
  }, []);


  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        <Spinner size="xl" />
      </div>
    );


  if (producto){
    return <Producto producto={producto} onMostrarProducto={handleMostrarProducto} refreshProduct ={refreshProduct}/>
  }

  return (
  

     <div className="bg-[#FCF7F8] flex flex-col min-h-screen">
      <Header></Header>
      {/* Contenedor de catálogo */}
      <main className="flex-1 max-w-6xl mx-auto p-6">

        <h2 className="text-3xl font-extrabold bg-gradient-to-r from-[#275DAD] via-[#ABA9C3] to-[#5B616A] bg-clip-text text-transparent drop-shadow-md mb-6">
          Productos Destacados
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((p) => (
            <ProductCard
              product={p}
              onMostrarProducto={() => handleMostrarProducto(p)}
            />
          ))}
        </div>
      </main>

      <Footer/>

    </div>
  );
}


export default Home;
