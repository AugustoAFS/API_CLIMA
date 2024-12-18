import axios from 'axios';

export const API_KEY = '3b12c79e747046b0a6b134830240512';
const BASE_URL = 'https://api.weatherapi.com/v1';

export const getClima = async (cidade) => {
  try {
    const response = await axios.get(`${BASE_URL}/current.json`, {
      params: {
        key: API_KEY,
        q: cidade,
        lang: 'pt',
      },
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar o clima:', error.message);
    throw new Error('Não foi possível encontrar a cidade. Verifique o nome e tente novamente.');
  }
};