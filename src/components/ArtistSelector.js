import React, { useMemo } from 'react';
import { useApp } from '../contexts/AppContext';
import { GENRES, ARTIST_DISPLAY_NAMES, LIMITS } from '../utils/constants';
import './ArtistSelector.css';

const ArtistSelector = () => {
  const { selectedGenre, selectedArtists, toggleArtist } = useApp();

  // Get available artists based on selected genre
  const availableArtists = useMemo(() => {
    if (!selectedGenre) return [];
    
    const genre = GENRES[selectedGenre];
    let artists = [];
    
    if (genre.subgenres) {
      // For Country genre with subgenres
      Object.values(genre.subgenres).forEach(subgenre => {
        artists = [...artists, ...subgenre.artists];
      });
    } else {
      artists = genre.artists || [];
    }
    
    return artists;
  }, [selectedGenre]);

  const handleArtistToggle = (artistId) => {
    if (selectedArtists.includes(artistId)) {
      toggleArtist(artistId);
    } else if (selectedArtists.length < LIMITS.MAX_SELECTED_ARTISTS) {
      toggleArtist(artistId);
    }
  };

  if (!selectedGenre) {
    return (
      <div className="artist-selector">
        <p className="no-genre-message">Please select a genre first</p>
      </div>
    );
  }

  return (
    <div className="artist-selector">
      <div className="artist-info">
        <p>
          Select up to {LIMITS.MAX_SELECTED_ARTISTS} artists. 
          {selectedArtists.length > 0 && ` (${selectedArtists.length} selected)`}
        </p>
      </div>
      
      <div className="artist-grid">
        {availableArtists.map(artistId => (
          <label key={artistId} className="artist-checkbox-label">
            <input
              type="checkbox"
              checked={selectedArtists.includes(artistId)}
              onChange={() => handleArtistToggle(artistId)}
              disabled={!selectedArtists.includes(artistId) && selectedArtists.length >= LIMITS.MAX_SELECTED_ARTISTS}
            />
            <span className="artist-name">
              {ARTIST_DISPLAY_NAMES[artistId] || artistId}
            </span>
          </label>
        ))}
      </div>
      
      {selectedArtists.length > 1 && (
        <div className="blend-info">
          <p>🎨 Multiple artists selected - styles will be blended!</p>
        </div>
      )}
    </div>
  );
};

export default ArtistSelector;