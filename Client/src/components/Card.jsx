import React, { useState } from 'react';
import '../css/Card.css';
import Pesquisar from '../assets/icon/procurar.png';
import { getClima } from '../api_clima/Conection';

function Card({ onCitySelect }) {
  const [cidade, setCidade] = useState('');
  const [clima, setClima] = useState(null);
  const [error, setError] = useState('');

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
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="card">
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
          <button type="submit">
            <img src={Pesquisar} alt="Pesquisar" />
          </button>
        </div>
      </form>

      {error && <p className="error">{error}</p>}

      {clima && (
        <>
          <div id="weather-data" className="show">
            <h2>
              <i className="fa-solid fa-location-dot"></i>
              <span id="City">{clima.location.name}</span>
              <img
                src={`https://flagsapi.com/${clima.location.country}/flat/64.png`}
                alt="Bandeira do País"
                id="country"
              />
            </h2>

            <div id="description-details">
              <p id="description">
                <span>{clima.current.condition.text}</span>
              </p>
              <p id="temperature">
                <span>{clima.current.temp_c}&deg;C</span>
              </p>
            </div>
          </div>

          <div id="details-container">
            <p id="umidity">
              <i className="fa-solid fa-droplet"></i>
              <span>{clima.current.humidity}%</span>
            </p>
            <p id="wind">
              <i className="fa-solid fa-wind"></i>
              <span>{clima.current.wind_kph} km/h</span>
            </p>
          </div>
        </>
      )}
    </div>
  );
}

export default Card;
