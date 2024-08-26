import React from 'react';
import Game from './components/Game';
import mockTilesData from './components/data/mockTileData';

function App() {
  return (
    <div className="App">
      <Game tilesData={mockTilesData} />
    </div>
  );
}

export default App;
