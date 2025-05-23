// Blend multiple artist styles together
export const blendStyles = (styleProfiles, weights = null) => {
    if (!styleProfiles || styleProfiles.length === 0) {
      throw new Error('No style profiles provided for blending');
    }
  
    if (styleProfiles.length === 1) {
      return styleProfiles[0];
    }
  
    // If no weights provided, use equal weights
    if (!weights) {
      weights = styleProfiles.map(() => 1 / styleProfiles.length);
    }
  
    const blendedStyle = {
      vocabulary: blendVocabulary(styleProfiles, weights),
      themes: blendThemes(styleProfiles, weights),
      structure: blendStructure(styleProfiles, weights),
      rhymePatterns: blendRhymePatterns(styleProfiles, weights),
      sentiment: blendSentiment(styleProfiles, weights),
      stylistics: blendStylistics(styleProfiles, weights)
    };
  
    return blendedStyle;
  };
  
  // Blend vocabulary across artists
  const blendVocabulary = (profiles, weights) => {
    const allWords = new Map();
    
    profiles.forEach((profile, index) => {
      const weight = weights[index];
      profile.vocabulary.commonWords.forEach(word => {
        const currentScore = allWords.get(word) || 0;
        allWords.set(word, currentScore + weight);
      });
    });
  
    // Sort by weighted frequency and take top words
    const blendedWords = Array.from(allWords.entries())
      .sort(([, a], [, b]) => b - a)
      .slice(0, 100)
      .map(([word]) => word);
  
    // Calculate weighted averages
    const avgUniqueWords = profiles.reduce((sum, profile, index) => 
      sum + profile.vocabulary.uniqueWordCount * weights[index], 0
    );
  
    const avgRichness = profiles.reduce((sum, profile, index) => 
      sum + profile.vocabulary.vocabularyRichness * weights[index], 0
    );
  
    return {
      uniqueWordCount: Math.round(avgUniqueWords),
      commonWords: blendedWords,
      vocabularyRichness: avgRichness
    };
  };
  
  // Blend themes with weighted averaging
  const blendThemes = (profiles, weights) => {
    const themes = {};
    const allThemes = new Set();
  
    // Collect all themes
    profiles.forEach(profile => {
      Object.keys(profile.themes).forEach(theme => allThemes.add(theme));
    });
  
    // Calculate weighted average for each theme
    allThemes.forEach(theme => {
      themes[theme] = profiles.reduce((sum, profile, index) => {
        const themeScore = profile.themes[theme] || 0;
        return sum + themeScore * weights[index];
      }, 0);
    });
  
    return themes;
  };
  
  // Blend song structures
  const blendStructure = (profiles, weights) => {
    const structureScores = new Map();
    
    profiles.forEach((profile, index) => {
      const weight = weights[index];
      profile.structure.commonStructures.forEach((structure, rank) => {
        const score = weight * (5 - rank); // Higher rank = higher score
        const currentScore = structureScores.get(structure) || 0;
        structureScores.set(structure, currentScore + score);
      });
    });
  
    // Sort by score and take top structures
    const blendedStructures = Array.from(structureScores.entries())
      .sort(([, a], [, b]) => b - a)
      .slice(0, 5)
      .map(([structure]) => structure);
  
    // Calculate weighted average section count
    const avgSectionCount = profiles.reduce((sum, profile, index) => 
      sum + profile.structure.averageSectionCount * weights[index], 0
    );
  
    return {
      commonStructures: blendedStructures,
      averageSectionCount: avgSectionCount
    };
  };
  
  // Blend rhyme patterns
  const blendRhymePatterns = (profiles, weights) => {
    const patternScores = new Map();
    
    profiles.forEach((profile, index) => {
      const weight = weights[index];
      profile.rhymePatterns.commonPatterns.forEach((pattern, rank) => {
        const score = weight * (5 - rank);
        const currentScore = patternScores.get(pattern) || 0;
        patternScores.set(pattern, currentScore + score);
      });
    });
  
    const blendedPatterns = Array.from(patternScores.entries())
      .sort(([, a], [, b]) => b - a)
      .slice(0, 5)
      .map(([pattern]) => pattern);
  
    const avgDiversity = profiles.reduce((sum, profile, index) => 
      sum + profile.rhymePatterns.patternDiversity * weights[index], 0
    );
  
    return {
      commonPatterns: blendedPatterns,
      patternDiversity: Math.round(avgDiversity)
    };
  };
  
  // Blend sentiment analysis
  const blendSentiment = (profiles, weights) => {
    const sentiment = {
      positive: 0,
      negative: 0,
      neutral: 0
    };
  
    profiles.forEach((profile, index) => {
      const weight = weights[index];
      sentiment.positive += profile.sentiment.positive * weight;
      sentiment.negative += profile.sentiment.negative * weight;
      sentiment.neutral += profile.sentiment.neutral * weight;
    });
  
    // Normalize to percentages
    const total = sentiment.positive + sentiment.negative + sentiment.neutral;
    if (total > 0) {
      sentiment.positive = (sentiment.positive / total) * 100;
      sentiment.negative = (sentiment.negative / total) * 100;
      sentiment.neutral = (sentiment.neutral / total) * 100;
    }
  
    return sentiment;
  };
  
  // Blend stylistic elements
  const blendStylistics = (profiles, weights) => {
    const stylistics = {
      averageLineLength: 0,
      repetitionRate: 0,
      averageSongLength: 0
    };
  
    profiles.forEach((profile, index) => {
      const weight = weights[index];
      stylistics.averageLineLength += profile.stylistics.averageLineLength * weight;
      stylistics.repetitionRate += profile.stylistics.repetitionRate * weight;
      stylistics.averageSongLength += profile.stylistics.averageSongLength * weight;
    });
  
    return stylistics;
  };
  
  // Calculate optimal blending weights based on style compatibility
  export const calculateOptimalWeights = (styleProfiles) => {
    // Simple equal weighting for now
    // In a real implementation, this could analyze style compatibility
    return styleProfiles.map(() => 1 / styleProfiles.length);
  };
  
  // Check if styles are compatible for blending
  export const checkStyleCompatibility = (profile1, profile2) => {
    // Compare key metrics to determine compatibility
    const vocabularyDiff = Math.abs(
      profile1.vocabulary.vocabularyRichness - profile2.vocabulary.vocabularyRichness
    );
    
    const sentimentDiff = Math.abs(
      (profile1.sentiment.positive - profile1.sentiment.negative) -
      (profile2.sentiment.positive - profile2.sentiment.negative)
    );
  
    const structureSimilarity = profile1.structure.commonStructures.filter(
      s => profile2.structure.commonStructures.includes(s)
    ).length;
  
    // Simple compatibility score (0-1)
    const compatibility = (
      (1 - vocabularyDiff / 100) * 0.3 +
      (1 - sentimentDiff / 100) * 0.3 +
      (structureSimilarity / 5) * 0.4
    );
  
    return {
      score: compatibility,
      compatible: compatibility > 0.5,
      details: {
        vocabularyMatch: 1 - vocabularyDiff / 100,
        sentimentMatch: 1 - sentimentDiff / 100,
        structureMatch: structureSimilarity / 5
      }
    };
  };