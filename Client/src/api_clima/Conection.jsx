import axios from 'axios';

const API_KEY = '3b12c79e747046b0a6b134830240512';
const BASE_URL = 'https://api.weatherapi.com/v1';

// Função para validar o nome da cidade
const validateCity = (city) => {
  if (!city || typeof city !== 'string') {
    throw new Error('Nome da cidade inválido');
  }
  if (city.length > 100) {
    throw new Error('Nome da cidade muito longo');
  }
  return city.trim();
};

// Função para buscar dados do clima
export const getClima = async (city) => {
  try {
    const validatedCity = validateCity(city);
    const response = await axios.get(`${BASE_URL}/current.json`, {
      params: {
        key: API_KEY,
        q: validatedCity,
        aqi: 'yes',
        lang: 'pt'
      },
      timeout: 5000
    });

    if (!response.data) {
      throw new Error('Resposta inválida da API');
    }

    return response.data;
  } catch (error) {
    if (error.response) {
      throw new Error(`Erro na API: ${error.response.data.error?.message || 'Erro desconhecido'}`);
    } else if (error.request) {
      throw new Error('Erro de conexão com a API');
    } else {
      throw new Error(`Erro: ${error.message}`);
    }
  }
};