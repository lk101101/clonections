import React from 'react';
import { render, screen } from '@testing-library/react';
import mockTilesData from '../data/mockTileData';
import Game from '../Game';

test('Game renders tiles correctly', async () => {
  render(<Game tilesData={mockTilesData} />);

  // Using findByText to handle asynchronous elements automatically
  const tile = await screen.findByText('Apple');
  expect(tile).toBeInTheDocument();
});