import React, { useState, useEffect } from 'react';
import '../css/Card.css';
import Pesquisar from '../assets/icon/procurar.png';
import { getClima } from '../api_clima/Conection';
import { getIMG } from '../api_img/IMG_Conection';

function Card({ onCitySelect }) {
  const [cidade, setCidade] = useState('');
  const [clima, setClima] = useState(null);
  const [error, setError] = useState('');
  const [countryCode, setCountryCode] = useState('');
  const [backgroundImages, setBackgroundImages] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const [imageLoading, setImageLoading] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [fade, setFade] = useState(false);

  const handleInputChange = (event) => {
    setCidade(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setClima(null);
    setLoading(true);
    setFade(true);

    if (!cidade.trim()) {
      setError('Por favor, insira o nome de uma cidade.');
      setLoading(false);
      setFade(false);
      return;
    }

    try {
      const data = await getClima(cidade);
      setClima(data);
      onCitySelect({
        name: data.location.name,
        lat: data.location.lat,
        lon: data.location.lon,
      });
      fetchCountryCode(data.location.country);
      fetchBackgroundImages(data.location.name);
      setFade(false);
    } catch (error) {
      setError(error.message || 'Erro ao buscar informações do clima.');
      setFade(false);
    } finally {
      setLoading(false);
    }
  };

  const fetchCountryCode = async (countryName) => {
    try {
      const response = await fetch(`https://restcountries.com/v3.1/name/${countryName}?fullText=true`);
      const data = await response.json();
      if (data && data[0] && data[0].cca2) {
        setCountryCode(data[0].cca2.toLowerCase());
      } else {
        setCountryCode('');
      }
    } catch (err) {
      console.error('Erro ao buscar código do país:', err);
      setCountryCode('');
    }
  };

  const fetchBackgroundImages = async (cidade) => {
    try {
      setImageLoading(true);
      setImageError(false);
      const imageData = await getIMG(cidade);
      if (imageData && imageData.urls && imageData.urls.length > 0) {
        setBackgroundImages(imageData.urls);
      } else {
        setBackgroundImages(['/default-image.jpg']);
      }
    } catch (err) {
      console.error('Erro ao buscar as imagens de fundo:', err);
      setBackgroundImages(['/default-image.jpg']);
      setImageError(true);
    } finally {
      setImageLoading(false);
    }
  };

  useEffect(() => {
    if (backgroundImages.length > 0) {
      const intervalId = setInterval(() => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 2) % backgroundImages.length);
      }, 2000);

      return () => clearInterval(intervalId);
    }
  }, [backgroundImages]);

  return (
    <div className="card-container">
      <div className={`card ${fade ? 'fade-out' : 'fade-in'}`}>
        {backgroundImages.length > 0 && (
          <img
            src={backgroundImages[currentImageIndex]}
            alt="Background"
            className={`background-image ${imageLoading ? 'loading' : ''} ${imageError ? 'error' : ''}`}
            onLoad={() => setImageLoading(false)}
            onError={() => {
              setImageError(true);
              setImageLoading(false);
            }}
          />
        )}

        <h2>Informações do Clima</h2>

        <form onSubmit={handleSubmit}>
          <div className="input-container">
            <input
              className="grupo-cidade"
              type="text"
              id="cidade"
              value={cidade}
              onChange={handleInputChange}
              placeholder=" "
              required
            />
            <label htmlFor="cidade">Cidade</label>
            <button type="submit" disabled={loading}>
              <img src={Pesquisar} alt="Pesquisar" />
            </button>
          </div>
        </form>

        {error && <p className="error">{error}</p>}

        {loading && <p>Carregando...</p>}

        {clima && (
          <div className="weather-container">
            <div className="location">
              <h3>
                {clima.location.name}, {clima.location.region}
              </h3>
              {countryCode && (
                <img
                  src={`https://flagcdn.com/64x48/${countryCode}.png`}
                  alt={`Bandeira de ${clima.location.country}`}
                  className="flag"
                />
              )}
            </div>

            <div className="current-weather">
              <img
                src={`https:${clima.current.condition.icon}`}
                alt={clima.current.condition.text}
                className="weather-icon"
              />
              <div>
                <h4>{clima.current.condition.text}</h4>
                <p>{clima.current.temp_c}°C</p>
                <p>Sensação térmica: {clima.current.feelslike_c}°C</p>
              </div>
            </div>

            <div className="weather-details">
              <p><i className="fa-solid fa-droplet"></i> Umidade: {clima.current.humidity}%</p>
              <p><i className="fa-solid fa-wind"></i> Vento: {clima.current.wind_kph} km/h</p>
              <p><i className="fa-solid fa-eye"></i> Visibilidade: {clima.current.vis_km} km</p>
              <p><i className="fa-solid fa-weight"></i> Pressão: {clima.current.pressure_mb} hPa</p>
              <p><i className="fa-solid fa-sun"></i> Índice UV: {clima.current.uv}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );






















}

export default Card;
