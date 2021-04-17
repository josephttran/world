import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';
import { BrowserRouter } from 'react-router-dom';

test('renders World App', () => {
  render(<BrowserRouter><App /></BrowserRouter>);
  const worldAppElement = screen.getByText(/World App/i);
  expect(worldAppElement).toBeInTheDocument();
});
