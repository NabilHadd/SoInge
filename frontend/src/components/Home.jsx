// src/Home.js
import React, { useEffect, useState } from "react";
import { Spinner } from "flowbite-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import Header from "./Header";
import Footer from "./Footer";
import ProductCard from "./ProductCard";
import Producto from "./Producto";
import SpinnerModern from "./SpinnerModern";

function Home() {
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Redirigir al admin
  const handleAdminRedirect = () => navigate("/Login");

  // Mostrar producto individual
  const handleMostrarProducto = (product) => setSelectedProduct(product);

  // Refrescar datos de un producto
  const refreshProduct = async (id) => {
    try {
      const { data } = await axios.get(`http://localhost:3001/product/byId/${id}`);
      setSelectedProduct(data);
    } catch (err) {
      console.error("Error al refrescar producto:", err);
    }
  };

  // Cargar todos los productos
  useEffect(() => {
    axios
      .get("http://localhost:3001/product/all")
      .then((res) => setProducts(res.data))
      .catch((err) => console.error("Error al obtener productos:", err))
      .finally(() => setLoading(false));
  }, []);

  // Loading
  if (loading) return <SpinnerModern fullScreen size={80} />

  // Vista de producto individual
  if (selectedProduct) {
    return (
      <Producto
        producto={selectedProduct}
        onMostrarProducto={handleMostrarProducto}
        refreshProduct={refreshProduct}
      />
    );
  }

  // Vista catálogo
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />

      <main className="flex-1 max-w-7xl mx-auto px-6 py-10">
        <h2 className="text-4xl font-extrabold text-center text-gray-900 mb-10 tracking-tight">
          Productos
        </h2>


        {products.length === 0 ? (
          <p className="text-center text-gray-500 mt-10">No hay productos disponibles.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {products.map((p) => (
              <ProductCard
                key={p.id_producto}
                product={p}
                onMostrarProducto={() => handleMostrarProducto(p)}
              />
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}

export default Home;
