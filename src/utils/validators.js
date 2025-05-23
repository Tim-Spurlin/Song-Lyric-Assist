import { LIMITS, GENRES } from './constants';

// Validate generation parameters
export const validateGenerationParams = (params) => {
  const errors = [];

  // Validate genre
  if (!params.genre) {
    errors.push('Genre is required');
  } else if (!GENRES[params.genre]) {
    errors.push('Invalid genre selected');
  }

  // Validate artists
  if (!params.artists || params.artists.length === 0) {
    errors.push('At least one artist must be selected');
  } else if (params.artists.length > LIMITS.MAX_SELECTED_ARTISTS) {
    errors.push(`Maximum ${LIMITS.MAX_SELECTED_ARTISTS} artists can be selected`);
  }

  // Validate style prompt
  if (!params.stylePrompt || params.stylePrompt.trim().length === 0) {
    errors.push('Style prompt is required');
  } else if (params.stylePrompt.length > LIMITS.MAX_PROMPT_LENGTH) {
    errors.push(`Style prompt must be less than ${LIMITS.MAX_PROMPT_LENGTH} characters`);
  }

  // Validate edit request if provided
  if (params.editRequest && params.editRequest.length > LIMITS.MAX_EDIT_REQUEST_LENGTH) {
    errors.push(`Edit request must be less than ${LIMITS.MAX_EDIT_REQUEST_LENGTH} characters`);
  }

  // Validate exclusions
  if (params.exclusions && params.exclusions.length > LIMITS.MAX_EXCLUSIONS) {
    errors.push(`Maximum ${LIMITS.MAX_EXCLUSIONS} exclusions allowed`);
  }

  return {
    isValid: errors.length === 0,
    errors
  };
};

// Validate lyrics content
export const validateLyrics = (lyrics) => {
  if (!lyrics || typeof lyrics !== 'string') {
    return {
      isValid: false,
      errors: ['Invalid lyrics format']
    };
  }

  const errors = [];

  // Check length
  if (lyrics.length === 0) {
    errors.push('Lyrics cannot be empty');
  } else if (lyrics.length > LIMITS.MAX_GENERATION_LENGTH) {
    errors.push(`Lyrics exceed maximum length of ${LIMITS.MAX_GENERATION_LENGTH} characters`);
  }

  // Check for basic structure
  const sections = lyrics.match(/\[[^\]]+\]/g);
  if (!sections || sections.length === 0) {
    errors.push('Lyrics should contain section markers (e.g., [Verse], [Chorus])');
  }

  return {
    isValid: errors.length === 0,
    errors
  };
};

// Validate artist selection
export const validateArtistSelection = (selectedArtists, genre) => {
  const errors = [];

  if (!Array.isArray(selectedArtists)) {
    return {
      isValid: false,
      errors: ['Invalid artist selection format']
    };
  }

  // Get all valid artists for the genre
  const validArtists = getValidArtistsForGenre(genre);

  // Check each selected artist
  selectedArtists.forEach(artistId => {
    if (!validArtists.includes(artistId)) {
      errors.push(`Invalid artist: ${artistId}`);
    }
  });

  // Check for duplicates
  const uniqueArtists = new Set(selectedArtists);
  if (uniqueArtists.size !== selectedArtists.length) {
    errors.push('Duplicate artists selected');
  }

  return {
    isValid: errors.length === 0,
    errors
  };
};

// Get valid artists for a genre
const getValidArtistsForGenre = (genre) => {
  const genreData = GENRES[genre];
  if (!genreData) return [];

  let artists = [];

  if (genreData.subgenres) {
    Object.values(genreData.subgenres).forEach(subgenre => {
      artists = [...artists, ...subgenre.artists];
    });
  } else {
    artists = genreData.artists || [];
  }

  return artists;
};

// Validate exclusion terms
export const validateExclusions = (exclusions) => {
  if (!Array.isArray(exclusions)) {
    return {
      isValid: false,
      errors: ['Invalid exclusions format']
    };
  }

  const errors = [];

  exclusions.forEach((exclusion, index) => {
    if (typeof exclusion !== 'string') {
      errors.push(`Exclusion at index ${index} must be a string`);
    } else if (exclusion.trim().length === 0) {
      errors.push(`Exclusion at index ${index} cannot be empty`);
    } else if (exclusion.length > 50) {
      errors.push(`Exclusion at index ${index} is too long (max 50 characters)`);
    }
  });

  // Check for duplicates
  const uniqueExclusions = new Set(exclusions.map(e => e.toLowerCase().trim()));
  if (uniqueExclusions.size !== exclusions.length) {
    errors.push('Duplicate exclusions found');
  }

  return {
    isValid: errors.length === 0,
    errors
  };
};

// Validate style prompt content
export const validateStylePrompt = (prompt) => {
  const errors = [];

  // Check for minimum content
  const wordCount = prompt.trim().split(/\s+/).length;
  if (wordCount < 5) {
    errors.push('Style prompt should contain at least 5 words');
  }

  // Check for spammy content
  const repeatedChars = /(.)\1{4,}/;
  if (repeatedChars.test(prompt)) {
    errors.push('Style prompt contains repeated characters');
  }

  // Check for valid characters
  const validChars = /^[a-zA-Z0-9\s.,!?'"()-]+$/;
  if (!validChars.test(prompt)) {
    errors.push('Style prompt contains invalid characters');
  }

  return {
    isValid: errors.length === 0,
    errors
  };
};

// Validate edit request
export const validateEditRequest = (editRequest, hasGeneratedLyrics) => {
  const errors = [];

  if (!hasGeneratedLyrics && editRequest.trim().length > 0) {
    errors.push('Cannot request edits before generating lyrics');
  }

  if (editRequest.trim().length > 0) {
    // Check for minimum content
    const wordCount = editRequest.trim().split(/\s+/).length;
    if (wordCount < 3) {
      errors.push('Edit request should contain at least 3 words');
    }
  }

  return {
    isValid: errors.length === 0,
    errors
  };
};

// Validate file format
export const validateFileFormat = (filename, allowedFormats = ['txt', 'json']) => {
  const extension = filename.split('.').pop().toLowerCase();
  
  return {
    isValid: allowedFormats.includes(extension),
    format: extension,
    error: allowedFormats.includes(extension) 
      ? null 
      : `Invalid file format. Allowed formats: ${allowedFormats.join(', ')}`
  };
};

// Validate JSON structure for artist data
export const validateArtistDataStructure = (data) => {
  const errors = [];

  // Check required fields
  if (!data.artist || typeof data.artist !== 'object') {
    errors.push('Missing or invalid artist information');
  } else {
    if (!data.artist.name) errors.push('Missing artist name');
    if (!Array.isArray(data.artist.genres)) errors.push('Missing or invalid genres');
  }

  if (!data.metadata || typeof data.metadata !== 'object') {
    errors.push('Missing or invalid metadata');
  }

  if (!Array.isArray(data.songs)) {
    errors.push('Missing or invalid songs array');
  } else {
    // Validate song structure
    data.songs.forEach((song, index) => {
      if (!song.id) errors.push(`Song at index ${index} missing ID`);
      if (!song.title) errors.push(`Song at index ${index} missing title`);
      if (!song.lyrics && !song.structure) {
        errors.push(`Song at index ${index} missing lyrics or structure`);
      }
    });
  }

  return {
    isValid: errors.length === 0,
    errors
  };
};

// Sanitize user input
export const sanitizeInput = (input) => {
  if (typeof input !== 'string') return '';
  
  return input
    .trim()
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '') // Remove scripts
    .replace(/<[^>]+>/g, '') // Remove HTML tags
    .replace(/[<>]/g, ''); // Remove remaining angle brackets
};

// Validate API response
export const validateAPIResponse = (response) => {
  if (!response) {
    return {
      isValid: false,
      error: 'No response received'
    };
  }

  if (response.error) {
    return {
      isValid: false,
      error: response.error.message || 'Unknown error occurred'
    };
  }

  if (!response.data) {
    return {
      isValid: false,
      error: 'No data in response'
    };
  }

  return {
    isValid: true,
    data: response.data
  };
};