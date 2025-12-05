import axios from 'axios';
export const getDailyIncome = async (): Promise<number> => {
  const response = await axios.get('http://localhost:3001/compra/ingresos-dia');
  return response.data.ingresos_dia;
}
export const getPurchasesWithDetails = async () => {
  const response = await axios.get('http://localhost:3001/compra/detalles');
  return response.data;
}