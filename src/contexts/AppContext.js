import React, { createContext, useContext, useState, useCallback } from 'react';

// Create the context
const AppContext = createContext();

// Custom hook to use the App context
export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
};

// App Provider component
export const AppProvider = ({ children }) => {
  // Global state
  const [selectedGenre, setSelectedGenre] = useState('');
  const [selectedArtists, setSelectedArtists] = useState([]);
  const [stylePrompt, setStylePrompt] = useState('');
  const [editRequest, setEditRequest] = useState('');
  const [exclusions, setExclusions] = useState([]);
  const [exclusionsEnabled, setExclusionsEnabled] = useState(false);
  const [generatedLyrics, setGeneratedLyrics] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [artistsData, setArtistsData] = useState({});

  // Clear all selections
  const clearSelections = useCallback(() => {
    setSelectedGenre('');
    setSelectedArtists([]);
    setStylePrompt('');
    setEditRequest('');
    setExclusions([]);
    setExclusionsEnabled(false);
    setGeneratedLyrics('');
    setError(null);
  }, []);

  // Toggle artist selection
  const toggleArtist = useCallback((artistId) => {
    setSelectedArtists(prev => {
      if (prev.includes(artistId)) {
        return prev.filter(id => id !== artistId);
      }
      return [...prev, artistId];
    });
  }, []);

  // Add exclusion
  const addExclusion = useCallback((exclusion) => {
    if (exclusion && !exclusions.includes(exclusion)) {
      setExclusions(prev => [...prev, exclusion]);
    }
  }, [exclusions]);

  // Remove exclusion
  const removeExclusion = useCallback((exclusion) => {
    setExclusions(prev => prev.filter(e => e !== exclusion));
  }, []);

  const value = {
    // State
    selectedGenre,
    selectedArtists,
    stylePrompt,
    editRequest,
    exclusions,
    exclusionsEnabled,
    generatedLyrics,
    isLoading,
    error,
    artistsData,
    
    // Actions
    setSelectedGenre,
    setSelectedArtists,
    setStylePrompt,
    setEditRequest,
    setExclusions,
    setExclusionsEnabled,
    setGeneratedLyrics,
    setIsLoading,
    setError,
    setArtistsData,
    clearSelections,
    toggleArtist,
    addExclusion,
    removeExclusion
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};