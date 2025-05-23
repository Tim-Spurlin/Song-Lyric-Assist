import { extractPatterns } from '../utils/patternRecognition';
import { processText } from '../utils/textProcessing';

// Analyze an artist's lyrical style
export const analyzeArtistStyle = (artistData) => {
  if (!artistData || !artistData.songs) {
    return getDefaultStyleProfile();
  }

  const styleProfile = {
    vocabulary: analyzeVocabulary(artistData.songs),
    themes: extractThemes(artistData.songs),
    structure: analyzeStructure(artistData.songs),
    rhymePatterns: analyzeRhymePatterns(artistData.songs),
    sentiment: analyzeSentiment(artistData.songs),
    stylistics: analyzeStylistics(artistData.songs)
  };

  return styleProfile;
};

// Analyze vocabulary usage
const analyzeVocabulary = (songs) => {
  const wordFrequency = {};
  const uniqueWords = new Set();
  
  songs.forEach(song => {
    const words = processText(song.lyrics || '').split(/\s+/);
    words.forEach(word => {
      if (word.length > 2) { // Ignore very short words
        uniqueWords.add(word);
        wordFrequency[word] = (wordFrequency[word] || 0) + 1;
      }
    });
  });

  // Get most common words
  const commonWords = Object.entries(wordFrequency)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 100)
    .map(([word]) => word);

  return {
    uniqueWordCount: uniqueWords.size,
    commonWords,
    vocabularyRichness: uniqueWords.size / songs.length
  };
};

// Extract common themes
const extractThemes = (songs) => {
  const themeKeywords = {
    love: ['love', 'heart', 'kiss', 'romance', 'together', 'forever'],
    pain: ['hurt', 'pain', 'cry', 'tears', 'broken', 'lost'],
    celebration: ['party', 'dance', 'celebrate', 'fun', 'night', 'good time'],
    growth: ['change', 'grow', 'learn', 'stronger', 'better', 'rise'],
    nostalgia: ['remember', 'yesterday', 'memories', 'used to', 'back when'],
    ambition: ['dream', 'goal', 'success', 'hustle', 'grind', 'make it']
  };

  const themeScores = {};
  
  Object.entries(themeKeywords).forEach(([theme, keywords]) => {
    themeScores[theme] = 0;
    songs.forEach(song => {
      const lyrics = (song.lyrics || '').toLowerCase();
      keywords.forEach(keyword => {
        if (lyrics.includes(keyword)) {
          themeScores[theme]++;
        }
      });
    });
  });

  // Normalize scores
  const maxScore = Math.max(...Object.values(themeScores));
  Object.keys(themeScores).forEach(theme => {
    themeScores[theme] = themeScores[theme] / maxScore;
  });

  return themeScores;
};

// Analyze song structures
const analyzeStructure = (songs) => {
  const structures = songs.map(song => {
    const sections = extractSections(song.lyrics || '');
    return sections.map(s => s.type).join('-');
  });

  const structureCounts = {};
  structures.forEach(structure => {
    structureCounts[structure] = (structureCounts[structure] || 0) + 1;
  });

  return {
    commonStructures: Object.entries(structureCounts)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 5)
      .map(([structure]) => structure),
    averageSectionCount: structures.reduce((sum, s) => sum + s.split('-').length, 0) / structures.length
  };
};

// Extract song sections
const extractSections = (lyrics) => {
  const sections = [];
  const lines = lyrics.split('\n');
  let currentSection = null;
  let currentLines = [];

  lines.forEach(line => {
    if (line.match(/^\[(.*)\]$/) || line.match(/^(Verse|Chorus|Bridge|Outro|Pre-Chorus|Intro)/i)) {
      if (currentSection) {
        sections.push({
          type: currentSection,
          lines: currentLines
        });
      }
      currentSection = line.replace(/[\[\]]/g, '');
      currentLines = [];
    } else if (line.trim()) {
      currentLines.push(line);
    }
  });

  if (currentSection) {
    sections.push({
      type: currentSection,
      lines: currentLines
    });
  }

  return sections;
};

// Analyze rhyme patterns
const analyzeRhymePatterns = (songs) => {
  const patterns = [];
  
  songs.forEach(song => {
    const sections = extractSections(song.lyrics || '');
    sections.forEach(section => {
      const pattern = extractPatterns(section.lines);
      if (pattern) {
        patterns.push(pattern);
      }
    });
  });

  // Count pattern frequencies
  const patternCounts = {};
  patterns.forEach(pattern => {
    patternCounts[pattern] = (patternCounts[pattern] || 0) + 1;
  });

  return {
    commonPatterns: Object.entries(patternCounts)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 5)
      .map(([pattern]) => pattern),
    patternDiversity: Object.keys(patternCounts).length
  };
};

// Analyze sentiment
const analyzeSentiment = (songs) => {
  const sentiments = {
    positive: 0,
    negative: 0,
    neutral: 0
  };

  const positiveWords = ['love', 'happy', 'joy', 'beautiful', 'amazing', 'wonderful', 'great', 'best'];
  const negativeWords = ['hate', 'sad', 'pain', 'hurt', 'bad', 'worst', 'terrible', 'awful'];

  songs.forEach(song => {
    const lyrics = (song.lyrics || '').toLowerCase();
    let positiveCount = 0;
    let negativeCount = 0;

    positiveWords.forEach(word => {
      positiveCount += (lyrics.match(new RegExp(word, 'g')) || []).length;
    });

    negativeWords.forEach(word => {
      negativeCount += (lyrics.match(new RegExp(word, 'g')) || []).length;
    });

    if (positiveCount > negativeCount * 1.5) {
      sentiments.positive++;
    } else if (negativeCount > positiveCount * 1.5) {
      sentiments.negative++;
    } else {
      sentiments.neutral++;
    }
  });

  return sentiments;
};

// Analyze stylistic elements
const analyzeStylistics = (songs) => {
  let totalLines = 0;
  let totalWords = 0;
  let repetitionCount = 0;

  songs.forEach(song => {
    const lines = (song.lyrics || '').split('\n').filter(line => line.trim());
    const words = (song.lyrics || '').split(/\s+/).filter(word => word);
    
    totalLines += lines.length;
    totalWords += words.length;

    // Check for repetition
    const lineSet = new Set();
    lines.forEach(line => {
      if (lineSet.has(line)) {
        repetitionCount++;
      }
      lineSet.add(line);
    });
  });

  return {
    averageLineLength: totalWords / totalLines,
    repetitionRate: repetitionCount / totalLines,
    averageSongLength: totalLines / songs.length
  };
};

// Default style profile
const getDefaultStyleProfile = () => {
  return {
    vocabulary: {
      uniqueWordCount: 0,
      commonWords: [],
      vocabularyRichness: 0
    },
    themes: {
      love: 0.5,
      pain: 0.3,
      celebration: 0.4,
      growth: 0.4,
      nostalgia: 0.3,
      ambition: 0.5
    },
    structure: {
      commonStructures: ['verse-chorus-verse-chorus-bridge-chorus'],
      averageSectionCount: 6
    },
    rhymePatterns: {
      commonPatterns: ['ABAB', 'AABB'],
      patternDiversity: 2
    },
    sentiment: {
      positive: 50,
      negative: 30,
      neutral: 20
    },
    stylistics: {
      averageLineLength: 8,
      repetitionRate: 0.2,
      averageSongLength: 40
    }
  };
};