import React from 'react';
import { useApp } from '../contexts/AppContext';
import { useGeneration } from '../contexts/GenerationContext';
import { generateLyrics } from '../services/contentGeneration';
import './GenerateButton.css';

const GenerateButton = () => {
  const { 
    selectedGenre, 
    selectedArtists, 
    stylePrompt, 
    editRequest,
    exclusions,
    exclusionsEnabled,
    isLoading, 
    setIsLoading,
    setGeneratedLyrics,
    setError
  } = useApp();
  
  const { addToHistory } = useGeneration();

  const canGenerate = selectedGenre && selectedArtists.length > 0 && stylePrompt.trim();

  const handleGenerate = async () => {
    if (!canGenerate || isLoading) return;

    setIsLoading(true);
    setError(null);

    try {
      const parameters = {
        genre: selectedGenre,
        artists: selectedArtists,
        stylePrompt,
        editRequest,
        exclusions: exclusionsEnabled ? exclusions : [],
        timestamp: new Date().toISOString()
      };

      const lyrics = await generateLyrics(parameters);
      
      setGeneratedLyrics(lyrics);
      
      // Add to history
      addToHistory({
        parameters,
        lyrics
      });
    } catch (error) {
      setError(error.message || 'Failed to generate lyrics. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="generate-button-container">
      <button
        onClick={handleGenerate}
        disabled={!canGenerate || isLoading}
        className={`generate-button ${isLoading ? 'loading' : ''}`}
      >
        {isLoading ? (
          <>
            <span className="loading-spinner"></span>
            Generating...
          </>
        ) : (
          <>
            <span className="generate-icon">✨</span>
            Generate Lyrics
          </>
        )}
      </button>
      
      {!canGenerate && !isLoading && (
        <p className="generate-hint">
          Please complete all required fields above
        </p>
      )}
    </div>
  );
};

export default GenerateButton;