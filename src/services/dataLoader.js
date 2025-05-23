import { GENRES } from '../utils/constants';

// Cache for loaded artist data
const dataCache = new Map();

// Load artist data from the repository
export const loadArtistData = async (genre, artistId) => {
  const cacheKey = `${genre}/${artistId}`;
  
  // Check cache first
  if (dataCache.has(cacheKey)) {
    return dataCache.get(cacheKey);
  }

  try {
    // Determine the correct path based on genre structure
    const path = getArtistDataPath(genre, artistId);
    
    // In a real implementation, this would fetch from your GitHub repo or API
    // For now, we'll simulate with mock data
    const artistData = await fetchArtistData(path);
    
    // Cache the result
    dataCache.set(cacheKey, artistData);
    
    return artistData;
  } catch (error) {
    console.error(`Failed to load data for ${artistId}:`, error);
    return getMockArtistData(artistId);
  }
};

// Get the correct file path for an artist
const getArtistDataPath = (genre, artistId) => {
  const genreData = GENRES[genre];
  
  if (genreData.subgenres) {
    // For genres with subgenres (like Country), find which subgenre contains the artist
    for (const [subgenreKey, subgenre] of Object.entries(genreData.subgenres)) {
      if (subgenre.artists.includes(artistId)) {
        return `Genres/${genre}/${subgenreKey}/${artistId}/lyric-dataset.json`;
      }
    }
  }
  
  // For genres without subgenres
  return `Genres/${genre}/${artistId}/lyric-dataset.json`;
};

// Fetch artist data (mock implementation)
const fetchArtistData = async (path) => {
  // In production, this would fetch from:
  // - GitHub API
  // - Your backend API
  // - Or directly from the public GitHub pages URL
  
  console.log(`Fetching artist data from: ${path}`);
  
  // Simulate async fetch
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(getMockArtistData(path.split('/').pop().replace('.json', '')));
    }, 100);
  });
};

// Load all artists for a genre
export const loadGenreArtists = async (genre) => {
  const genreData = GENRES[genre];
  if (!genreData) return [];

  let allArtists = [];

  if (genreData.subgenres) {
    // Handle genres with subgenres
    for (const subgenre of Object.values(genreData.subgenres)) {
      const subgenreArtists = await Promise.all(
        subgenre.artists.map(artistId => loadArtistData(genre, artistId))
      );
      allArtists = [...allArtists, ...subgenreArtists];
    }
  } else {
    // Handle genres without subgenres
    allArtists = await Promise.all(
      genreData.artists.map(artistId => loadArtistData(genre, artistId))
    );
  }

  return allArtists;
};

// Clear cache
export const clearDataCache = () => {
  dataCache.clear();
};

// Get cache size
export const getCacheSize = () => {
  return dataCache.size;
};

// Mock data generator for development
const getMockArtistData = (artistId) => {
  const artistName = artistId.replace(/-/g, ' ');
  
  return {
    artist: {
      name: artistName,
      genres: ['Mock Genre'],
      activeYears: '2020-present',
      totalSongs: 50
    },
    metadata: {
      lastUpdated: new Date().toISOString(),
      sourceVerification: 'Mock data for development',
      analysisReady: true
    },
    songs: generateMockSongs(artistName, 10),
    styleProfile: {
      commonThemes: ['love', 'life', 'dreams'],
      vocabularySignature: ['heart', 'soul', 'night', 'light'],
      structuralPatterns: ['verse-chorus-verse', 'bridge-usage'],
      rhymingStyle: 'ABAB patterns with internal rhymes',
      meterPreferences: '4/4 time signature'
    }
  };
};

// Generate mock songs for development
const generateMockSongs = (artistName, count) => {
  const songs = [];
  
  for (let i = 1; i <= count; i++) {
    songs.push({
      id: `song_${i}`,
      title: `Song ${i}`,
      album: `Album ${Math.ceil(i / 3)}`,
      year: 2020 + Math.floor(Math.random() * 5),
      lyrics: generateMockLyrics(),
      structure: {
        verse1: 'First verse content...',
        chorus: 'Chorus content...',
        verse2: 'Second verse content...',
        bridge: 'Bridge content...',
        outro: 'Outro content...'
      },
      analysis: {
        rhymeScheme: 'ABAB',
        syllableCount: [8, 8, 8, 8],
        keyThemes: ['love', 'dreams', 'journey'],
        vocabulary: ['heart', 'soul', 'time'],
        sentiment: 'positive'
      }
    });
  }
  
  return songs;
};

// Generate mock lyrics
const generateMockLyrics = () => {
  return `[Verse 1]
Walking down this empty street tonight
Searching for the answers in the starlight
Every step I take feels right
In this moment everything's alright

[Chorus]
We're gonna fly, we're gonna soar
Higher than we've been before
Open up your heart and see
This is where we're meant to be

[Verse 2]
Looking back at all we've overcome
Every battle fought and every victory won
The journey's only just begun
Together we shine brighter than the sun

[Bridge]
When the world gets heavy
And the path's unsteady
We'll find our way
To a brighter day

[Chorus]
We're gonna fly, we're gonna soar
Higher than we've been before
Open up your heart and see
This is where we're meant to be`;
};