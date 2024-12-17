import React from 'react';
import PropTypes from 'prop-types';
import ImgDay from '../assets/icon/lua-crescente.png';
import ImgNight from '../assets/icon/brilho-do-sol.png';

function ToggleButton({ isDay, onToggle }) {
  return (
    <>
    
    </>
    <button 
      onClick={onToggle} 
      className={`buttonDayNight ${isDay ? 'day' : 'night'}`} 
      aria-label={`Alternar para ${isDay ? 'Modo Noite' : 'Modo Dia'}`}
    >
      Alternar para {isDay ? 'Noite' : 'Dia'}
      <img
        src={isDay ? ImgDay : ImgNight}
        alt={isDay ? 'Modo Claro' : 'Modo Escuro'}
        className="buttonIcon"
      />
    </button>
  );
}

ToggleButton.propTypes = {
  isDay: PropTypes.bool.isRequired,
  onToggle: PropTypes.func.isRequired,
};

export default ToggleButton;
