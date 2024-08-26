import React from 'react';
import PropTypes from 'prop-types';
import './styles/Tile.css';

function Tile({
  word, color, onSelect, disabled,
}) {
  const handleKeyDown = (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      onSelect();
    }
  };

  return (
    <div
      role="button"
      tabIndex={disabled ? -1 : 0}
      onClick={onSelect}
      onKeyDown={handleKeyDown}
      className={`tile ${disabled ? 'disabled' : ''}`}
      style={{ backgroundColor: color }}
    >
      {word}
    </div>
  );
}

Tile.propTypes = {
  word: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  onSelect: PropTypes.func.isRequired,
  disabled: PropTypes.bool.isRequired,
};

export default Tile;
