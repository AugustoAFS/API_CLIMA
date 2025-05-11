import axios from 'axios';

const PEXELS_API_KEY = 'XDQjtWxBBwTMR0YQW8tuPbxobrtGqb2q1d2HDP6F26zhpKyZgtnPmFk0';
const PEXELS_BASE_URL = 'https://api.pexels.com/v1/search';

export const getIMG = async (cidade) => {
  try {
    const response = await axios.get(PEXELS_BASE_URL, {
      headers: {
        Authorization: PEXELS_API_KEY,
      },
      params: {
        query: cidade,
        per_page: 5,
      },
    });

    if (response.data.photos && response.data.photos.length > 0) {
      const photoUrls = response.data.photos.map(photo => photo.src.original);
      console.log('URLs das fotos:', photoUrls);
      return { urls: photoUrls };
    } else {
      console.warn('Nenhuma imagem encontrada para a cidade:', cidade);
      return { urls: ['/default-image.jpg'] };
    }
  } catch (error) {
    console.error('Erro ao buscar as imagens da cidade:', error.message);
    return { urls: ['/default-image.jpg'] };
  }
};
