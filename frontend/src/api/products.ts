import axios from 'axios';

export const getProductCount = async (): Promise<number> => {
  const response = await axios.get('http://localhost:3001/product/count');
  return response.data.count;
};
export const getAllProducts = async () => {
  const response = await axios.get('http://localhost:3001/product/all');
  return response.data;
};
