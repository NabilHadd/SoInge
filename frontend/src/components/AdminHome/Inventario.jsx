import React, { useEffect, useState } from "react";
import logo1 from "../../assets/logo.webp";
import { deleteProduct,updateProduct, getAllProducts, createProduct } from "../../api/products.ts";
import { Link } from "react-router-dom";

export default function AdminHome() {
  const [productos, setProductos] = useState([]);

  const [imagen, setImagen] = useState(null);
  const [nombre, setNombre] = useState("");
  const [stock, setStock] = useState(0);
  const [precio, setPrecio] = useState(0);
  const [descripcion, setDescripcion] = useState("");

  const [selected, setSelected] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getAllProducts();

    
        const normalizados = data.map((p) => ({
          ...p,
          id: p.id_producto, 
        }));

        setProductos(normalizados);
      } catch (error) {
        console.error("Error al obtener productos:", error);
      }
    };

    fetchProducts();
  }, []);

    const handleEdit = (prod) => {
      setSelected(prod.id);
      setNombre(prod.nombre);
      setStock(prod.stock);
      setPrecio(prod.precio);
      setDescripcion(prod.descripcion);
    };

    const handleDelete = async (id) => {
    const confirmar = window.confirm("¿Seguro que deseas eliminar este producto?");
    if (!confirmar) return;

    try {
      await deleteProduct(id);  

      setProductos((prev) => prev.filter((p) => p.id !== id));

      alert("Producto eliminado correctamente");
    } catch (error) {
      console.error("Error eliminando producto:", error);
      alert("No se pudo eliminar el producto");
    }
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
     
      if (selected) {
        const payload = {
          id_producto: selected,
          nombre,
          stock: Number(stock),
          precio: Number(precio),
          descripcion,
        };

        
        await updateProduct(payload);

       
        setProductos((prev) =>
          prev.map((p) =>
            p.id === selected
              ? { ...p, nombre, stock, precio, descripcion }
              : p
          )
        );

        alert("Producto actualizado correctamente");
      } else {
      
        let response;

        if (imagen) {
          const formData = new FormData();
          formData.append("nombre", nombre);
          formData.append("stock", Number(stock));
          formData.append("precio", Number(precio));
          formData.append("descripcion", descripcion);
          formData.append("imagen", imagen);

          response = await createProduct(formData);
        } else {
          response = await createProduct({
            nombre,
            stock,
            precio,
            descripcion,
          });
        }

        const nuevo = response.data;

     
        nuevo.id = nuevo.id_producto;

        setProductos((prev) => [nuevo, ...prev]);

        alert("Producto agregado correctamente");
      }

  
      setSelected(null);
      setNombre("");
      setStock(0);
      setPrecio(0);
      setDescripcion("");
      setImagen(null);

    } catch (error) {
      console.error("Error en handleSubmit:", error);
      alert("Hubo un error.");
    }
  };

  return (
    <div className="bg-[#FCF7F8] flex h-screen">
      <aside className="w-64 bg-[#CED3DC] p-6 flex flex-col">
        <img src={logo1} alt="logo" className="w-[100px] h-[104px] mb-6 mx-auto" />
        <nav className="flex flex-col gap-4 mt-4">
          <Link to="/AdminHome" className="text-[#5B616A] hover:text-[#275DAD] transition-colors">Dashboard</Link>
          <Link to="/Inventario" className="text-[#275DAD] font-semibold hover:text-[#5B616A] transition-colors">Inventario</Link>
          <Link to="/Ventas" className="text-[#5B616A] hover:text-[#275DAD] transition-colors">Ventas</Link>

        </nav>
      </aside>

      <div className="flex-1 p-6 overflow-auto">
        <header className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-extrabold bg-gradient-to-r from-[#275DAD] via-[#ABA9C3] to-[#5B616A] bg-clip-text text-transparent drop-shadow-lg">
            Inventario
          </h1>
          <div className="text-[#5B616A] font-medium">Admin</div>
        </header>


        <div className="bg-[#CED3DC] p-4 rounded-xl shadow-lg mb-6 overflow-auto">
          <h2 className="text-2xl font-extrabold bg-gradient-to-r from-[#275DAD] via-[#ABA9C3] to-[#5B616A] bg-clip-text text-transparent drop-shadow-md mb-4">
            Lista de Productos
          </h2>

          <table className="min-w-full bg-white rounded-xl overflow-hidden shadow-md">
            <thead className="bg-[#ABA9C3] text-white">
              <tr>
                <th className="py-3 px-4 text-left">Producto</th>
                <th className="py-3 px-4 text-left">Stock</th>
                <th className="py-3 px-4 text-left">Precio</th>
                <th className="py-3 px-4 text-left">Descripción</th>
                <th className="py-3 px-4 text-center">Acciones</th>
              </tr>
            </thead>

            <tbody>
              {productos.map((producto, index) => (
                <tr
                  key={producto.id}
                  onClick={(e) => {
                    if (e.target.tagName === "BUTTON" || e.target.closest("button")) return;
                    setSelected(producto.id);
                  }}
                  className={`border-b transition-all cursor-pointer 
                    ${
                      selected === producto.id
                        ? "bg-white shadow-inner"
                        : index % 2 === 0
                        ? "bg-white"
                        : "bg-gray-50"
                    }
                    hover:bg-[#FCF7F8]`}
                >
                  <td className="py-3 px-4">{producto.nombre}</td>
                  <td className="py-3 px-4">{producto.stock}</td>
                  <td className="py-3 px-4">${producto.precio}</td>
                  <td className="py-3 px-4">{producto.descripcion}</td>

                  <td
                    className="py-3 px-4 flex justify-center gap-3"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <button
                      onClick={() => handleEdit(producto)}
                      className="px-3 py-1 rounded-lg text-sm font-semibold bg-blue-500 text-white hover:bg-blue-600 transition-all shadow"
                    >
                      Editar
                    </button>

                    <button
                      onClick={() => handleDelete(producto.id)}
                      className="px-3 py-1 rounded-lg text-sm font-semibold bg-red-500 text-white hover:bg-red-600 transition-all shadow"
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

 
        <div className="bg-[#CED3DC] p-6 rounded-xl shadow-lg w-full">
          <h2 className="text-2xl font-extrabold bg-gradient-to-r from-[#275DAD] via-[#ABA9C3] to-[#5B616A] bg-clip-text text-transparent drop-shadow-md mb-4">
            {selected ? "Editar producto" : "Añadir producto"}
          </h2>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4" encType="multipart/form-data">
            <input
              type="text"
              placeholder="Nombre"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              className="p-2 rounded-lg"
              required
            />

            <input
              type="number"
              placeholder="Stock"
              value={stock}
              onChange={(e) => setStock(e.target.value)}
              className="p-2 rounded-lg"
              required
            />

            <input
              type="number"
              placeholder="Precio"
              value={precio}
              onChange={(e) => setPrecio(e.target.value)}
              className="p-2 rounded-lg"
              required
            />

            <textarea
              placeholder="Descripción"
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
              className="p-2 rounded-lg"
              required
            />

            <input
              type="file"
              accept="image/*"
              className="p-2 rounded-lg bg-white"
              onChange={(e) => setImagen(e.target.files[0])}
            />

            <button type="submit" className="bg-[#275DAD] text-white py-2 rounded-lg hover:opacity-90">
              {selected ? "Guardar cambios" : "Guardar producto"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
