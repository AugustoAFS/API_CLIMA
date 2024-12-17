import React, { useState, useEffect } from 'react';
import '../css/Card.css';
import Pesquisar from '../assets/icon/procurar.png';
import { getClima } from '../api_clima/Conection';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faSun,
  faCloudRain,
  faCloudSun,
  faSnowflake,
  faWind,
  faDroplet,
} from '@fortawesome/free-solid-svg-icons';

function Card({ onCitySelect }) {
  const [cidade, setCidade] = useState('');
  const [clima, setClima] = useState(null);
  const [erro, setErro] = useState('');
  const [paises, setPaises] = useState(new Map());
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const buscarPaises = async () => {
      try {
        const resposta = await fetch('https://restcountries.com/v3.1/all');
        if (!resposta.ok) throw new Error('Falha ao carregar a lista de países.');
        const dados = await resposta.json();
        const mapaPaises = new Map(
          dados.map((pais) => [pais.name.common.toLowerCase(), pais.cca2])
        );
        setPaises(mapaPaises);
      } catch (erro) {
        setErro('Erro ao carregar a lista de países.');
      }
    };

    buscarPaises();
  }, []);

  const obterIconeClima = (descricao) => {
    const texto = descricao.toLowerCase();
    const icones = {
      rain: faCloudRain,
      cloud: faCloudSun,
      snow: faSnowflake,
      clear: faSun,
      storm: faCloudRain,
    };
    return icones[Object.keys(icones).find((key) => texto.includes(key))] || faCloudSun;
  };

  const obterCodigoBandeira = (nomePais) => {
    return paises.get(nomePais.toLowerCase()) || null;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!cidade.trim()) {
      setErro('Por favor, insira uma cidade válida.');
      return;
    }

    setErro('');
    setClima(null);
    setIsLoading(true);

    try {
      const dados = await getClima(cidade, 7);
      console.log('Resposta da API:', dados); 
      if (dados && dados.location) {
        setClima(dados);
        onCitySelect({
          nome: dados.location.name,
          lat: dados.location.lat,
          lng: dados.location.lon,
        });
      } else {
        setErro('Dados de localização não encontrados.');
      }
    } catch (erro) {
      console.error('Erro ao obter dados do clima:', erro);
      setErro('Erro ao obter dados do clima.');
    } finally {
      setIsLoading(false);
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
            onChange={(e) => setCidade(e.target.value)}
            placeholder=""
            required
          />
          <label htmlFor="cidade">Cidade</label>
          <button type="submit" aria-label="Pesquisar">
            <img src={Pesquisar} alt="Pesquisar" />
          </button>
        </div>
      </form>

      {erro && <p className="erro">{erro}</p>}
      {isLoading && <p>Carregando dados...</p>}

      {clima && (
        <>
          <div id="weather-data">
            <h2>
              {clima.location.name}, {clima.location.country}
              {obterCodigoBandeira(clima.location.country) && (
                <img
                  src={`https://flagsapi.com/${obterCodigoBandeira(
                    clima.location.country
                  )}/flat/64.png`}
                  alt={`Bandeira de ${clima.location.country}`}
                />
              )}
            </h2>
            <p>
              <img
                src={`https:${clima.current.condition.icon}`}
                alt={clima.current.condition.text}
                className="weather-icon"
              />
              {clima.current.condition.text}
            </p>
            <p>Temperatura: {clima.current.temp_c}°C</p>
            <p>Sensação Térmica: {clima.current.feelslike_c}°C</p>
            <p>Humidade: {clima.current.humidity}%</p>
            <p>Vento: {clima.current.wind_kph} km/h</p>
            <p>Pressão: {clima.current.pressure_mb} mb</p>
            <p>Índice UV: {clima.current.uv}</p>
            <p>Hora Local: {clima.location.localtime}</p>
          </div>

          {/* Previsão da Semana */}
          {clima?.forecast?.forecastday ? (
            <div id="forecast">
              <h3>Previsão da Semana:</h3>
              <ul>
                {clima.forecast.forecastday.map((dia) => (
                  <li key={dia.date} className="forecast-item">
                    <p>
                      <strong>
                        {new Date(dia.date).toLocaleDateString('pt-BR', { weekday: 'long' })}
                      </strong>
                    </p>
                    <img
                      src={`https:${dia.day.condition.icon}`}
                      alt={dia.day.condition.text}
                      className="forecast-icon"
                    />
                    <p>
                      {dia.day.condition.text}
                      <br />
                      Máx: {dia.day.maxtemp_c}°C / Mín: {dia.day.mintemp_c}°C
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <p>Previsão do tempo indisponível.</p>
          )}
        </>
      )}
    </div>
  );
}

export default Card;
