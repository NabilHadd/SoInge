import axios from 'axios';

export const getProductCount = async (): Promise<number> => {
  const response = await axios.get('http://localhost:3001/product/count');
  return response.data.count;
};
export const getAllProducts = async () => {
  const response = await axios.get('http://localhost:3001/product/all');
  return response.data;
};
export const createProduct = async (productData: { nombre: string; descripcion: string; precio: number; stock: number; imagen: string; }) => {
  const response = await axios.post('http://localhost:3001/product/create', productData);
  return response.data;
}
export const updateProduct = async (productData: { id_producto: number; nombre?: string; descripcion?: string; precio?: number; stock?: number; imagen?: string; }) => {
  const response = await axios.put('http://localhost:3001/product/update', productData);
  return response.data;
}
export const deleteProduct = async (id_producto: number) => {
  const response = await axios.delete(`http://localhost:3001/product/delete/${id_producto}`);
  return response.data;
}
