import React, { useState, useEffect } from 'react';
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
      setSelectedTiles(selectedTiles.filter(t => t !== tile));
    } 
    else if (!matchedTiles.includes(tile)) {
      if (selectedTiles.length < 4) {
        setSelectedTiles([...selectedTiles, tile]);
      }
    }
  };

  const isCorrectMatch = (tiles) => {
    if (tiles.length !== 4) return false;
    const theme = tiles[0].theme;
    for (let i = 1; i < tiles.length; i++) {
      if (tiles[i].theme !== theme) return false;
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
        setLives(lives - 1);
        setSelectedTiles([]);
        if (lives - 1 === 0) {
          setStatus('lost');
        }
      }
    }
  };

  useEffect(() => {
    checkSelection();
  }, [selectedTiles]);

  return (
    <div className="container">
      <h1 className="game_title">Clonenections</h1>
      <div className="grid">
        {tilesData.map((tile, index) => (
          <Tile 
            key={index}
            word={tile.word}
            // change to original color when matched or gray when selected
            color={matchedTiles.includes(tile) ? tile.color : (selectedTiles.includes(tile) ? 'gray' : '#efefe6')}
            onSelect={() => handleTileSelect(tile)}
            disabled={matchedTiles.includes(tile)}
          />
        ))}
      </div>
      <div>{status}</div>
    </div>
  );
}

export default Game;