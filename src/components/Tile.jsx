import React from 'react';
import './styles/Tile.css';

function Tile({ word, color, onSelect, disabled }) {
  return (
    <div 
      onClick={onSelect} 
      className={`tile ${disabled ? 'disabled' : ''}`} 
      style={{ backgroundColor: color }}>
      {word}
    </div>
  );
}

export default Tile;
