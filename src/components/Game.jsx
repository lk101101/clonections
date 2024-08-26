import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Tile from './Tile';
import './styles/Game.css';

function Game({ tilesData }) {
  const [selectedTiles, setSelectedTiles] = useState([]);
  const [lives, setLives] = useState(5);
  const [status, setStatus] = useState('playing');
  const [matchedTiles, setMatchedTiles] = useState([]);

  // select or deselect tile if not matched
  const handleTileSelect = (tile) => {
    if (selectedTiles.includes(tile)) {
      setSelectedTiles(selectedTiles.filter((t) => t !== tile));
    } else if (!matchedTiles.includes(tile)) {
      if (selectedTiles.length < 4) {
        setSelectedTiles([...selectedTiles, tile]);
      }
    }
  };

  const isCorrectMatch = (tiles) => {
    if (tiles.length !== 4) return false;
    const { theme } = tiles[0];

    for (let index = 1; index < tiles.length; index += 1) {
      if (tiles[index].theme !== theme) return false;
    }
    return true;
  };

  const checkSelection = () => {
    if (selectedTiles.length === 4) {
      if (isCorrectMatch(selectedTiles)) {
        setMatchedTiles([...matchedTiles, ...selectedTiles]);
        setSelectedTiles([]);
        if (matchedTiles.length + 4 === tilesData.length) {
          setStatus('won');
        }
      } else {
        setLives((prevLives) => {
          const newLives = prevLives - 1;
          if (newLives === 0) {
            setStatus('lost');
          }
          return newLives;
        });
        setSelectedTiles([]);
      }
    }
  };

  const getTileColor = (tile) => {
    if (matchedTiles.includes(tile)) {
      return tile.color;
    }
    if (selectedTiles.includes(tile)) {
      return 'gray';
    }
    return '#efefe6';
  };

  useEffect(() => {
    checkSelection();
  }, [selectedTiles]);

  return (
    <div className="container">
      <h1 className="game_title">Clonenections</h1>
      <div className="grid">
        {tilesData.map((tile) => (
          <Tile
            key={tile.word}
            word={tile.word}
            color={getTileColor(tile)}
            onSelect={() => handleTileSelect(tile)}
            disabled={matchedTiles.includes(tile)}
          />
        ))}
      </div>
      <div>
        current status:&nbsp;
        {status}
      </div>
      <div>
        {lives}
        &nbsp;lives
      </div>
    </div>
  );
}

Game.propTypes = {
  tilesData: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      word: PropTypes.string.isRequired,
      theme: PropTypes.string.isRequired,
      color: PropTypes.string.isRequired,
    }),
  ).isRequired,
};

export default Game;
