import axios from 'axios';
export const getDailyIncome = async (): Promise<number> => {
  const response = await axios.get('http://localhost:3001/compras/ingresos-dia');
  return response.data.ingresos_dia;
}