import React, { createContext, useContext, useState, useCallback } from 'react';

// Create the context
const GenerationContext = createContext();

// Custom hook to use the Generation context
export const useGeneration = () => {
  const context = useContext(GenerationContext);
  if (!context) {
    throw new Error('useGeneration must be used within GenerationProvider');
  }
  return context;
};

// Generation Provider component
export const GenerationProvider = ({ children }) => {
  // Generation-specific state
  const [generationHistory, setGenerationHistory] = useState([]);
  const [currentGenerationId, setCurrentGenerationId] = useState(null);
  const [generationParameters, setGenerationParameters] = useState({
    temperature: 0.8,
    maxLength: 500,
    rhymeScheme: 'auto',
    songStructure: 'verse-chorus-verse',
    mood: 'neutral'
  });
  const [styleAnalysis, setStyleAnalysis] = useState({});
  const [blendingWeights, setBlendingWeights] = useState({});

  // Add to generation history
  const addToHistory = useCallback((generation) => {
    const newGeneration = {
      id: Date.now(),
      timestamp: new Date().toISOString(),
      ...generation
    };
    setGenerationHistory(prev => [newGeneration, ...prev].slice(0, 50)); // Keep last 50
    setCurrentGenerationId(newGeneration.id);
    return newGeneration;
  }, []);

  // Get generation from history
  const getGenerationById = useCallback((id) => {
    return generationHistory.find(gen => gen.id === id);
  }, [generationHistory]);

  // Clear generation history
  const clearHistory = useCallback(() => {
    setGenerationHistory([]);
    setCurrentGenerationId(null);
  }, []);

  // Update generation parameters
  const updateParameters = useCallback((updates) => {
    setGenerationParameters(prev => ({
      ...prev,
      ...updates
    }));
  }, []);

  // Update blending weights for multi-artist selection
  const updateBlendingWeights = useCallback((artistId, weight) => {
    setBlendingWeights(prev => ({
      ...prev,
      [artistId]: weight
    }));
  }, []);

  // Reset blending weights
  const resetBlendingWeights = useCallback(() => {
    setBlendingWeights({});
  }, []);

  const value = {
    // State
    generationHistory,
    currentGenerationId,
    generationParameters,
    styleAnalysis,
    blendingWeights,
    
    // Actions
    addToHistory,
    getGenerationById,
    clearHistory,
    updateParameters,
    setStyleAnalysis,
    updateBlendingWeights,
    resetBlendingWeights
  };

  return (
    <GenerationContext.Provider value={value}>
      {children}
    </GenerationContext.Provider>
  );
};