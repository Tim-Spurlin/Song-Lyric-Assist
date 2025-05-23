import { useState, useEffect, useCallback } from 'react';
import { loadArtistData, loadGenreArtists } from '../services/dataLoader';
import { useApp } from '../contexts/AppContext';

// Hook to manage artist data loading
export const useArtistData = () => {
  const { selectedGenre, selectedArtists, setArtistsData } = useApp();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Load data for selected artists
  const loadSelectedArtistsData = useCallback(async () => {
    if (!selectedGenre || selectedArtists.length === 0) {
      setArtistsData({});
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const artistsData = {};
      
      await Promise.all(
        selectedArtists.map(async (artistId) => {
          const data = await loadArtistData(selectedGenre, artistId);
          artistsData[artistId] = data;
        })
      );

      setArtistsData(artistsData);
    } catch (err) {
      setError(err.message || 'Failed to load artist data');
      console.error('Error loading artist data:', err);
    } finally {
      setIsLoading(false);
    }
  }, [selectedGenre, selectedArtists, setArtistsData]);

  // Load all artists for a genre
  const loadAllGenreArtists = useCallback(async (genre) => {
    if (!genre) return [];

    setIsLoading(true);
    setError(null);

    try {
      const artists = await loadGenreArtists(genre);
      return artists;
    } catch (err) {
      setError(err.message || 'Failed to load genre artists');
      console.error('Error loading genre artists:', err);
      return [];
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Effect to load data when selection changes
  useEffect(() => {
    loadSelectedArtistsData();
  }, [loadSelectedArtistsData]);

  return {
    isLoading,
    error,
    loadSelectedArtistsData,
    loadAllGenreArtists
  };
};