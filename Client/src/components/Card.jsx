import React, { useState } from 'react';
import '../css/Card.css';
import Pesquisar from '../assets/icon/procurar.png';
import { getClima } from '../api_clima/Conection';

function Card({ onCitySelect }) {
  const [cidade, setCidade] = useState('');
  const [clima, setClima] = useState(null);
  const [error, setError] = useState('');
  const [countryCode, setCountryCode] = useState('');

  const handleInputChange = (event) => {
    setCidade(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setClima(null);

    try {
      const data = await getClima(cidade);
      setClima(data);
      onCitySelect({
        name: data.location.name,
        lat: data.location.lat,
        lon: data.location.lon,
      });
      fetchCountryCode(data.location.country);
    } catch (error) {
      setError(error.message || 'Erro ao buscar informações do clima.');
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

  return (
    <div className="card">
      <h2>Informações do Clima</h2>

      {/* Formulário de Pesquisa */}
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
          <button type="submit">
            <img src={Pesquisar} alt="Pesquisar" />
          </button>
        </div>
      </form>

      {/* Mensagem de Erro */}
      {error && <p className="error">{error}</p>}

      {/* Dados do Clima */}
      {clima && (
        <div className="weather-container">

          {/* Localização */}
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

          {/* Condição Atual */}
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

          {/* Detalhes do Clima */}
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
  );
}

export default Card;
