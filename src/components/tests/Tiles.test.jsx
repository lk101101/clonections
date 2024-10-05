import React from 'react';
import { render, screen } from '@testing-library/react';
import Tile from '../Tile';

test('Tile renders correctly', () => {
  render(<Tile word="Test" colors={['blue', '#000']} disabled={false} />);
  const tile = screen.getByText('Test');
  expect(tile).toBeInTheDocument();
  expect(tile).toHaveStyle('background-color: blue');
  expect(tile).toHaveStyle('color: #000');
});
