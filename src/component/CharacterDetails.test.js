// CharacterDetails.test.js

import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom'; // Import MemoryRouter for testing with Router

import CharacterDetails from './CharacterDetails';

test('renders character details', () => {
  // Mock character data
  const character = {
    id: 1,
    name: 'Rick Sanchez',
    status: 'Alive',
    gender: 'Male',
    image: 'rick.png'
  };

  // Render the component
  render(
    <MemoryRouter>
      <CharacterDetails character={character} />
    </MemoryRouter>
  );

  // Assert that character details are rendered
  expect(screen.getByText('Rick Sanchez')).toBeInTheDocument();
  expect(screen.getByText('Status: Alive')).toBeInTheDocument();
  expect(screen.getByText('Gender: Male')).toBeInTheDocument();
});
