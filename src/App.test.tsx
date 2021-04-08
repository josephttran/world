import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders World App', () => {
  render(<App />);
  const worldAppElement = screen.getByText(/World App/i);
  expect(worldAppElement).toBeInTheDocument();
});
