// src/services/dataLoader.js
import { GENRES } from '../utils/constants';

const GITHUB_RAW_BASE = 'https://raw.githubusercontent.com/tim-spurlin/song-lyric-assist/main';
const dataCache = new Map();

export const loadArtistData = async (genre, artistId) => {
  const cacheKey = `${genre}/${artistId}`;
  
  if (dataCache.has(cacheKey)) {
    return dataCache.get(cacheKey);
  }

  try {
    const path = getArtistDataPath(genre, artistId);
    const jsonPath = `${GITHUB_RAW_BASE}/${path}`;
    
    // Fetch the actual JSON data from GitHub
    const response = await fetch(jsonPath);
    if (!response.ok) {
      throw new Error(`Failed to fetch data for ${artistId}`);
    }
    
    const artistData = await response.json();
    
    // Validate the data structure
    if (!artistData.songs || artistData.songs.length === 0) {
      console.warn(`No songs found for ${artistId}`);
      return getMockArtistData(artistId);
    }
    
    // Cache the result
    dataCache.set(cacheKey, artistData);
    
    return artistData;
  } catch (error) {
    console.error(`Failed to load data for ${artistId}:`, error);
    
    // Try alternative formats (CSV, TXT)
    return await loadAlternativeFormats(genre, artistId);
  }
};

// Load data from CSV or TXT files if JSON fails
const loadAlternativeFormats = async (genre, artistId) => {
  try {
    // Check for CSV files
    const csvPaths = [
      `Genres/${genre}/${artistId}/${artistId.toLowerCase()}_data.csv`,
      `Genres/${genre}/${artistId}/lyric-dataset.csv`,
      `Genres/${genre}/${artistId}/discog_data.csv`
    ];
    
    for (const csvPath of csvPaths) {
      try {
        const response = await fetch(`${GITHUB_RAW_BASE}/${csvPath}`);
        if (response.ok) {
          const csvText = await response.text();
          return parseCSVToArtistData(csvText, artistId);
        }
      } catch (e) {
        continue;
      }
    }
    
    // Try TXT format
    const txtPath = `Genres/${genre}/${artistId}/lyric-dataset.txt`;
    const response = await fetch(`${GITHUB_RAW_BASE}/${txtPath}`);
    if (response.ok) {
      const txtContent = await response.text();
      return parseTXTToArtistData(txtContent, artistId);
    }
  } catch (error) {
    console.error(`All format attempts failed for ${artistId}:`, error);
  }
  
  return getMockArtistData(artistId);
};

// Parse CSV data into our standard format
const parseCSVToArtistData = (csvText, artistId) => {
  const lines = csvText.split('\n');
  const headers = lines[0].split(',').map(h => h.trim());
  const songs = [];
  
  for (let i = 1; i < lines.length; i++) {
    const values = lines[i].split(',');
    if (values.length < 2) continue;
    
    const song = {
      id: `song_${i}`,
      title: values[headers.indexOf('title')] || values[0],
      lyrics: values[headers.indexOf('lyrics')] || values[1],
      album: values[headers.indexOf('album')] || 'Unknown',
      year: parseInt(values[headers.indexOf('year')]) || 2020
    };
    
    if (song.lyrics && song.lyrics.length > 10) {
      songs.push(song);
    }
  }
  
  return {
    artist: {
      name: artistId.replace(/-/g, ' '),
      genres: ['Loaded from CSV'],
      totalSongs: songs.length
    },
    songs: songs,
    metadata: {
      sourceType: 'csv',
      lastUpdated: new Date().toISOString()
    }
  };
};

// Parse TXT data into our standard format
const parseTXTToArtistData = (txtContent, artistId) => {
  const songSections = txtContent.split(/\n\[/);
  const songs = [];
  
  songSections.forEach((section, index) => {
    const lines = section.split('\n');
    const titleMatch = lines[0].match(/\[(.*?)\]/) || section.match(/^(.*?)\n/);
    
    if (titleMatch) {
      const title = titleMatch[1] || `Song ${index + 1}`;
      const lyrics = lines.slice(1).join('\n').trim();
      
      if (lyrics.length > 10) {
        songs.push({
          id: `song_${index}`,
          title: title,
          lyrics: lyrics,
          structure: extractSongStructure(lyrics)
        });
      }
    }
  });
  
  return {
    artist: {
      name: artistId.replace(/-/g, ' '),
      genres: ['Loaded from TXT'],
      totalSongs: songs.length
    },
    songs: songs,
    metadata: {
      sourceType: 'txt',
      lastUpdated: new Date().toISOString()
    }
  };
};

// Extract song structure from lyrics
const extractSongStructure = (lyrics) => {
  const structure = {};
  const sections = lyrics.split(/\n\n/);
  
  sections.forEach(section => {
    const lines = section.split('\n');
    const sectionMatch = lines[0].match(/^\[(Verse|Chorus|Bridge|Outro|Pre-Chorus|Intro).*?\]/i);
    
    if (sectionMatch) {
      const sectionType = sectionMatch[1].toLowerCase();
      structure[sectionType] = lines.slice(1).join('\n');
    }
  });
  
  return structure;
};

// Get the correct file path for an artist
const getArtistDataPath = (genre, artistId) => {
  // Define exact paths based on your repository structure
  const pathMap = {
    'Alternative-Indie': {
      'Twenty-One-Pilots': 'Genres/Alternative-Indie/Twenty-One-Pilots/lyric-dataset.json',
      'Lorde': 'Genres/Alternative-Indie/Lorde/lyric-dataset.json',
      'Billie-Eilish': 'Genres/Alternative-Indie/Billie-Eilish/lyric-dataset.json'
    },
    'HipHop-Rap': {
      'Lil-Uzi-Vert': 'Genres/HipHop-Rap/Lil-Uzi-Vert/lyric-dataset.json',
      '21-savage': 'Genres/HipHop-Rap/21-savage/21_savage.json',
      'Travis-Scott': 'Genres/HipHop-Rap/Travis-Scott/lyric-dataset.json',
      'Post-Malone': 'Genres/HipHop-Rap/Post-Malone/lyric-dataset.json'
    },
    'Rock': {
      'coldplay': 'Genres/Rock/coldplay/coldplay.json',
      'Maroon-5': 'Genres/Rock/Maroon-5/lyric-dataset.json'
    },
    'RnB': {
      'The-Weeknd': 'Genres/RnB/The-Weeknd/lyric-dataset.json'
    },
    'Pop': {
      'Ariana-Grande': 'Genres/Pop/Ariana-Grande/lyric-dataset.json'
    }
  };

  const artistPath = pathMap[genre]?.[artistId];
  if (artistPath) {
    return artistPath;
  }

  // Default path pattern
  return `Genres/${genre}/${artistId}/lyric-dataset.json`;
};

// Mock data fallback when no real data is available
const getMockArtistData = (artistId) => {
  console.warn(`Using mock data for ${artistId}`);
  return {
    artist: {
      name: artistId.replace(/-/g, ' '),
      genres: ['Unknown'],
      totalSongs: 0
    },
    songs: [],
    metadata: {
      sourceType: 'mock',
      lastUpdated: new Date().toISOString()
    }
  };
};