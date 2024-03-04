import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './CharacterList.css';

const CharacterList = () => {
  const [characters, setCharacters] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch character data when the component mounts
    fetch('https://rickandmortyapi.com/api/character')
      .then(response => response.json())
      .then(data => setCharacters(data.results))
      .catch(error => setError(error));
  }, []); // Run effect only once on component mount

  const getStatusColor = status => {
    switch (status) {
      case 'Alive':
        return 'green';
      case 'Dead':
        return 'red';
      default:
        return 'grey';
    }
  };

  return (
    <div className="character-list-container">
      <h1 className="character-list-title">Character List</h1>
      {error ? ( // Display error message if API request fails
        <p>Error: {error}</p>
      ) : (
        <div className="character-grid">
          {/* Map through characters array and render character cards */}
          {characters.map(character => (
            <Link
              to={`/characters/${character.id}`}
              key={character.id}
              className="character-card"
            >
              <img
                src={character.image}
                alt={character.name}
                className="character-thumbnail"
              />
              <div className="character-info">
                <h2 className="character-name">{character.name}</h2>
                <p
                  className="character-status"
                  style={{ color: getStatusColor(character.status) }}
                >
                  {character.status}
                </p>
                <p className="character-species">{character.species}</p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default CharacterList;
