import { useState, useCallback, useEffect } from 'react';
import { useApp } from '../contexts/AppContext';
import { useGeneration } from '../contexts/GenerationContext';
import { analyzeArtistStyle } from '../services/lyricAnalysis';
import { blendStyles, checkStyleCompatibility } from '../services/styleBlender';

// Hook to manage style analysis
export const useStyleAnalysis = () => {
  const { selectedArtists, artistsData } = useApp();
  const { styleAnalysis, setStyleAnalysis } = useGeneration();
  
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisError, setAnalysisError] = useState(null);
  const [compatibilityScores, setCompatibilityScores] = useState({});

  // Analyze selected artists' styles
  const analyzeStyles = useCallback(async () => {
    if (selectedArtists.length === 0 || Object.keys(artistsData).length === 0) {
      setStyleAnalysis({});
      return;
    }

    setIsAnalyzing(true);
    setAnalysisError(null);

    try {
      const analyses = {};
      
      // Analyze each artist
      for (const artistId of selectedArtists) {
        if (artistsData[artistId]) {
          analyses[artistId] = analyzeArtistStyle(artistsData[artistId]);
        }
      }

      // If multiple artists, calculate compatibility
      if (selectedArtists.length > 1) {
        const scores = {};
        const artistIds = Object.keys(analyses);
        
        for (let i = 0; i < artistIds.length; i++) {
          for (let j = i + 1; j < artistIds.length; j++) {
            const key = `${artistIds[i]}-${artistIds[j]}`;
            scores[key] = checkStyleCompatibility(
              analyses[artistIds[i]], 
              analyses[artistIds[j]]
            );
          }
        }
        
        setCompatibilityScores(scores);
      }

      // Blend styles if multiple artists
      const finalAnalysis = selectedArtists.length > 1
        ? blendStyles(Object.values(analyses))
        : analyses[selectedArtists[0]];

      setStyleAnalysis(finalAnalysis);
    } catch (error) {
      setAnalysisError(error.message || 'Failed to analyze styles');
      console.error('Style analysis error:', error);
    } finally {
      setIsAnalyzing(false);
    }
  }, [selectedArtists, artistsData, setStyleAnalysis]);

  // Get style summary
  const getStyleSummary = useCallback(() => {
    if (!styleAnalysis || Object.keys(styleAnalysis).length === 0) {
      return null;
    }

    const summary = {
      dominantThemes: [],
      vocabularyRichness: 0,
      commonStructure: '',
      overallSentiment: '',
      rhymeComplexity: ''
    };

    // Extract dominant themes
    if (styleAnalysis.themes) {
      summary.dominantThemes = Object.entries(styleAnalysis.themes)
        .sort(([, a], [, b]) => b - a)
        .slice(0, 3)
        .map(([theme]) => theme);
    }

    // Vocabulary richness
    if (styleAnalysis.vocabulary) {
      summary.vocabularyRichness = styleAnalysis.vocabulary.vocabularyRichness || 0;
    }

    // Common structure
    if (styleAnalysis.structure && styleAnalysis.structure.commonStructures) {
      summary.commonStructure = styleAnalysis.structure.commonStructures[0] || '';
    }

    // Overall sentiment
    if (styleAnalysis.sentiment) {
      const { positive, negative, neutral } = styleAnalysis.sentiment;
      if (positive > negative && positive > neutral) {
        summary.overallSentiment = 'positive';
      } else if (negative > positive && negative > neutral) {
        summary.overallSentiment = 'negative';
      } else {
        summary.overallSentiment = 'neutral';
      }
    }

    // Rhyme complexity
    if (styleAnalysis.rhymePatterns) {
      const diversity = styleAnalysis.rhymePatterns.patternDiversity || 0;
      if (diversity > 5) {
        summary.rhymeComplexity = 'complex';
      } else if (diversity > 2) {
        summary.rhymeComplexity = 'moderate';
      } else {
        summary.rhymeComplexity = 'simple';
      }
    }

    return summary;
  }, [styleAnalysis]);

  // Get compatibility summary
  const getCompatibilitySummary = useCallback(() => {
    if (Object.keys(compatibilityScores).length === 0) {
      return null;
    }

    const scores = Object.values(compatibilityScores).map(c => c.score);
    const averageScore = scores.reduce((a, b) => a + b, 0) / scores.length;

    return {
      overallCompatibility: averageScore,
      rating: averageScore > 0.7 ? 'high' : averageScore > 0.4 ? 'moderate' : 'low',
      details: compatibilityScores
    };
  }, [compatibilityScores]);

  // Analyze on artist selection change
  useEffect(() => {
    if (selectedArtists.length > 0 && Object.keys(artistsData).length > 0) {
      analyzeStyles();
    }
  }, [selectedArtists, artistsData, analyzeStyles]);

  return {
    isAnalyzing,
    analysisError,
    styleAnalysis,
    compatibilityScores,
    analyzeStyles,
    getStyleSummary,
    getCompatibilitySummary
  };
};