import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './CharacterDetails.css';

const CharacterDetailsWrapper = () => {
  const { id } = useParams();
  const [character, setCharacter] = useState(null);
  const [loading, setLoading] = useState(true); // State to track loading status
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch character details when component mounts or id changes
    fetch(`https://rickandmortyapi.com/api/character/${id}`)
      .then(response => response.json())
      .then(data => {
        // Update character state and set loading to false when data is fetched successfully
        setCharacter(data);
        setLoading(false);
      })
      .catch(error => console.error('Error fetching character details:', error));
  }, [id]); // Run effect whenever id changes

  const handleGoBack = () => {
    // Go back to the previous page when "Go Back" button is clicked
    window.history.back();
  };

  return (
    <div className="character-details-container">
      {loading ? (
        <div className="loader"></div>
      ) : (
        error ? ( // Display error message if API request fails
          <p>Error: {error}</p>
        ) : (
          character ? (
            <div className="character-details">
              <div className="character-details-header">
                <h2 className="character-name">{character.name}</h2>
                <img src={character.image} alt={character.name} className="character-image" />
              </div>
              <div className="character-details-body">
                <p><strong>Status:</strong> {character.status}</p>
                <p><strong>Species:</strong> {character.species}</p>
                <p><strong>Gender:</strong> {character.gender}</p>
                <p><strong>Location:</strong> {character.location ? character.location.name : 'Unknown'}</p>
                <p><strong>Origin:</strong> {character.origin ? character.origin.name : 'Unknown'}</p>
              </div>
              <button className="button-go-back" onClick={handleGoBack}>Go Back</button>
            </div>
          ) : (
            <p>Character not found</p>
          )
        )
      )}
    </div>
  );
};

export default CharacterDetailsWrapper;
