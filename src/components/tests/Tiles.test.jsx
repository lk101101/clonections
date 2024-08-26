import React from 'react';
import {
  render, screen, test, expect,
} from '@testing-library/react';
import Tile from '../Tile';

test('Tile renders correctly', () => {
  render(<Tile word="Test" color="blue" disabled={false} />);
  const tile = screen.getByText('Test');
  expect(tile).toBeInTheDocument();
  expect(tile).toHaveStyle('background-color: blue');
});
