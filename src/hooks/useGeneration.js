import { useState, useCallback, useEffect } from 'react';
import { useApp } from '../contexts/AppContext';
import { useGeneration as useGenerationContext } from '../contexts/GenerationContext';
import { generateLyrics, applyEdits } from '../services/contentGeneration';
import { validateGenerationParams } from '../utils/validators';
import { STORAGE_KEYS } from '../utils/constants';

// Hook to manage lyric generation
export const useGeneration = () => {
  const {
    selectedGenre,
    selectedArtists,
    stylePrompt,
    editRequest,
    exclusions,
    exclusionsEnabled,
    generatedLyrics,
    setGeneratedLyrics,
    setError,
    setIsLoading
  } = useApp();

  const {
    addToHistory,
    generationHistory,
    generationParameters,
    updateParameters
  } = useGenerationContext();

  const [isGenerating, setIsGenerating] = useState(false);
  const [generationProgress, setGenerationProgress] = useState(0);

  // Generate new lyrics
  const generate = useCallback(async () => {
    const params = {
      genre: selectedGenre,
      artists: selectedArtists,
      stylePrompt,
      editRequest,
      exclusions: exclusionsEnabled ? exclusions : []
    };

    // Validate parameters
    const validation = validateGenerationParams(params);
    if (!validation.isValid) {
      setError(validation.errors.join(', '));
      return;
    }

    setIsGenerating(true);
    setGenerationProgress(0);
    setError(null);

    try {
      // Simulate progress updates
      const progressInterval = setInterval(() => {
        setGenerationProgress(prev => Math.min(prev + 10, 90));
      }, 200);

      const lyrics = await generateLyrics(params);
      
      clearInterval(progressInterval);
      setGenerationProgress(100);

      setGeneratedLyrics(lyrics);
      
      // Add to history
      const historyEntry = addToHistory({
        parameters: params,
        lyrics,
        timestamp: new Date().toISOString()
      });

      // Save to local storage
      saveToLocalStorage(historyEntry);

      // Update generation parameters
      updateParameters({
        lastGenre: selectedGenre,
        lastArtists: selectedArtists
      });

    } catch (error) {
      setError(error.message || 'Failed to generate lyrics');
    } finally {
      setIsGenerating(false);
      setGenerationProgress(0);
    }
  }, [
    selectedGenre,
    selectedArtists,
    stylePrompt,
    editRequest,
    exclusions,
    exclusionsEnabled,
    setGeneratedLyrics,
    setError,
    addToHistory,
    updateParameters
  ]);

  // Apply edits to existing lyrics
  const applyEdit = useCallback(async () => {
    if (!generatedLyrics || !editRequest) return;

    setIsGenerating(true);
    setError(null);

    try {
      const editedLyrics = await applyEdits(generatedLyrics, editRequest);
      setGeneratedLyrics(editedLyrics);

      // Add edited version to history
      addToHistory({
        parameters: {
          genre: selectedGenre,
          artists: selectedArtists,
          stylePrompt,
          editRequest,
          exclusions: exclusionsEnabled ? exclusions : []
        },
        lyrics: editedLyrics,
        isEdit: true,
        timestamp: new Date().toISOString()
      });

    } catch (error) {
      setError(error.message || 'Failed to apply edits');
    } finally {
      setIsGenerating(false);
    }
  }, [
    generatedLyrics,
    editRequest,
    selectedGenre,
    selectedArtists,
    stylePrompt,
    exclusions,
    exclusionsEnabled,
    setGeneratedLyrics,
    setError,
    addToHistory
  ]);

  // Regenerate with same parameters
  const regenerate = useCallback(async () => {
    if (!selectedGenre || selectedArtists.length === 0 || !stylePrompt) {
      setError('Missing required parameters for regeneration');
      return;
    }

    await generate();
  }, [generate, selectedGenre, selectedArtists, stylePrompt, setError]);

  // Load from history
  const loadFromHistory = useCallback((historyId) => {
    const entry = generationHistory.find(h => h.id === historyId);
    if (entry) {
      setGeneratedLyrics(entry.lyrics);
      // Optionally restore parameters
      // This could be expanded to restore all generation parameters
    }
  }, [generationHistory, setGeneratedLyrics]);

  // Save to local storage
  const saveToLocalStorage = useCallback((entry) => {
    try {
      const existing = localStorage.getItem(STORAGE_KEYS.GENERATION_HISTORY);
      const history = existing ? JSON.parse(existing) : [];
      history.unshift(entry);
      // Keep only last 50 entries
      const trimmed = history.slice(0, 50);
      localStorage.setItem(STORAGE_KEYS.GENERATION_HISTORY, JSON.stringify(trimmed));
    } catch (error) {
      console.error('Failed to save to local storage:', error);
    }
  }, []);

  // Load history from local storage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.GENERATION_HISTORY);
      if (stored) {
        const history = JSON.parse(stored);
        // You could dispatch these to the context if needed
        console.log('Loaded history from local storage:', history.length, 'entries');
      }
    } catch (error) {
      console.error('Failed to load history from local storage:', error);
    }
  }, []);

  return {
    generate,
    applyEdit,
    regenerate,
    loadFromHistory,
    isGenerating,
    generationProgress,
    canGenerate: selectedGenre && selectedArtists.length > 0 && stylePrompt.trim()
  };
};