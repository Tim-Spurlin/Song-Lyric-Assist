import React from 'react';
import { useApp } from '../contexts/AppContext';
import { GENRES } from '../utils/constants';
import './GenreSelector.css';

const GenreSelector = () => {
  const { selectedGenre, setSelectedGenre, setSelectedArtists } = useApp();

  const handleGenreChange = (e) => {
    const newGenre = e.target.value;
    setSelectedGenre(newGenre);
    // Clear artist selection when genre changes
    setSelectedArtists([]);
  };

  return (
    <div className="genre-selector">
      <select 
        value={selectedGenre} 
        onChange={handleGenreChange}
        className="genre-dropdown"
      >
        <option value="">Select a genre...</option>
        {Object.entries(GENRES).map(([key, genre]) => (
          <option key={key} value={key}>
            {genre.name}
          </option>
        ))}
      </select>
      
      {selectedGenre && (
        <p className="genre-description">
          {GENRES[selectedGenre].subgenres 
            ? `Includes subgenres: ${Object.values(GENRES[selectedGenre].subgenres).map(s => s.name).join(', ')}`
            : `Choose from ${GENRES[selectedGenre].artists.length} artists in this genre`
          }
        </p>
      )}
    </div>
  );
};

export default GenreSelector;