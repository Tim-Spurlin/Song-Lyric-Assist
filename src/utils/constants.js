// Genre definitions with their subgenres
export const GENRES = {
    'HipHop-Rap': {
      name: 'Hip-Hop/Rap',
      artists: ['Drake', 'Jay-Z', 'Kendrick-Lamar', 'Kid-Leroi', 'Lil-Uzi-Vert', 'Post-Malone', 'Travis-Scott', '21-savage']
    },
    'Pop': {
      name: 'Pop',
      artists: ['Taylor-Swift', 'Ariana-Grande', 'Ed-Sheeran']
    },
    'Country': {
      name: 'Country',
      subgenres: {
        '90s-Country': {
          name: '90s Country',
          artists: ['Garth-Brooks', 'Shania-Twain', 'Alan-Jackson']
        },
        'Modern-Country': {
          name: 'Modern Country',
          artists: ['Luke-Bryan', 'Carrie-Underwood', 'Blake-Shelton']
        },
        'Pop-Country': {
          name: 'Pop Country',
          artists: ['Keith-Urban', 'Lady-A', 'Florida-Georgia-Line']
        },
        'Bluegrass': {
          name: 'Bluegrass',
          artists: ['Alison-Krauss', 'Chris-Stapleton', 'Ricky-Skaggs']
        }
      }
    },
    'Rock': {
      name: 'Rock',
      artists: ['Imagine-Dragons', 'OneRepublic', 'Maroon-5', 'coldplay']
    },
    'RnB': {
      name: 'R&B',
      artists: ['The-Weeknd', 'Bruno-Mars', 'John-Legend']
    },
    'Electronic-EDM': {
      name: 'Electronic/EDM',
      artists: ['Calvin-Harris', 'Chainsmokers', 'Marshmello']
    },
    'Alternative-Indie': {
      name: 'Alternative/Indie',
      artists: ['Twenty-One-Pilots', 'Billie-Eilish', 'Lorde']
    },
    'Folk-Acoustic': {
      name: 'Folk/Acoustic',
      artists: ['Mumford-And-Sons', 'Of-Monsters-And-Men', 'Fleet-Foxes']
    }
  };
  
  // Artist display names mapping
  export const ARTIST_DISPLAY_NAMES = {
    'Drake': 'Drake',
    'Jay-Z': 'Jay-Z',
    'Kendrick-Lamar': 'Kendrick Lamar',
    'Kid-Leroi': 'The Kid LAROI',
    'Lil-Uzi-Vert': 'Lil Uzi Vert',
    'Post-Malone': 'Post Malone',
    'Travis-Scott': 'Travis Scott',
    '21-savage': '21 Savage',
    'Taylor-Swift': 'Taylor Swift',
    'Ariana-Grande': 'Ariana Grande',
    'Ed-Sheeran': 'Ed Sheeran',
    'Garth-Brooks': 'Garth Brooks',
    'Shania-Twain': 'Shania Twain',
    'Alan-Jackson': 'Alan Jackson',
    'Luke-Bryan': 'Luke Bryan',
    'Carrie-Underwood': 'Carrie Underwood',
    'Blake-Shelton': 'Blake Shelton',
    'Keith-Urban': 'Keith Urban',
    'Lady-A': 'Lady A',
    'Florida-Georgia-Line': 'Florida Georgia Line',
    'Alison-Krauss': 'Alison Krauss',
    'Chris-Stapleton': 'Chris Stapleton',
    'Ricky-Skaggs': 'Ricky Skaggs',
    'Imagine-Dragons': 'Imagine Dragons',
    'OneRepublic': 'OneRepublic',
    'Maroon-5': 'Maroon 5',
    'coldplay': 'Coldplay',
    'The-Weeknd': 'The Weeknd',
    'Bruno-Mars': 'Bruno Mars',
    'John-Legend': 'John Legend',
    'Calvin-Harris': 'Calvin Harris',
    'Chainsmokers': 'The Chainsmokers',
    'Marshmello': 'Marshmello',
    'Twenty-One-Pilots': 'Twenty One Pilots',
    'Billie-Eilish': 'Billie Eilish',
    'Lorde': 'Lorde',
    'Mumford-And-Sons': 'Mumford & Sons',
    'Of-Monsters-And-Men': 'Of Monsters and Men',
    'Fleet-Foxes': 'Fleet Foxes'
  };
  
  // Song structure templates
  export const SONG_STRUCTURES = {
    'verse-chorus-verse': ['Verse 1', 'Chorus', 'Verse 2', 'Chorus', 'Bridge', 'Chorus'],
    'verse-prechorus-chorus': ['Verse 1', 'Pre-Chorus', 'Chorus', 'Verse 2', 'Pre-Chorus', 'Chorus', 'Bridge', 'Chorus'],
    'aaba': ['Verse 1', 'Verse 2', 'Bridge', 'Verse 3'],
    'simple': ['Verse 1', 'Chorus', 'Verse 2', 'Chorus'],
    'extended': ['Intro', 'Verse 1', 'Pre-Chorus', 'Chorus', 'Verse 2', 'Pre-Chorus', 'Chorus', 'Bridge', 'Chorus', 'Outro']
  };
  
  // Rhyme schemes
  export const RHYME_SCHEMES = {
    'ABAB': 'Alternating rhyme',
    'AABB': 'Couplet rhyme',
    'ABCB': 'Simple 4-line',
    'AAAA': 'Monorhyme',
    'ABCC': 'Closing couplet',
    'auto': 'Automatic (based on artist style)'
  };
  
  // Common exclusion suggestions
  export const EXCLUSION_SUGGESTIONS = [
    'profanity',
    'violence',
    'explicit content',
    'drug references',
    'dark themes',
    'religious themes',
    'political content',
    'brand names',
    'specific places',
    'dated references'
  ];
  
  // Mood options
  export const MOOD_OPTIONS = [
    'uplifting',
    'melancholic',
    'energetic',
    'romantic',
    'nostalgic',
    'aggressive',
    'contemplative',
    'celebratory',
    'introspective',
    'neutral'
  ];
  
  // API endpoints (for future backend integration)
  export const API_ENDPOINTS = {
    GENERATE: '/api/generate',
    ANALYZE: '/api/analyze',
    ARTISTS: '/api/artists',
    SAVE: '/api/save'
  };
  
  // Local storage keys
  export const STORAGE_KEYS = {
    GENERATION_HISTORY: 'lyric_assist_history',
    USER_PREFERENCES: 'lyric_assist_preferences',
    SAVED_LYRICS: 'lyric_assist_saved'
  };
  
  // Maximum values
  export const LIMITS = {
    MAX_PROMPT_LENGTH: 1000,
    MAX_EDIT_REQUEST_LENGTH: 500,
    MAX_EXCLUSIONS: 20,
    MAX_SELECTED_ARTISTS: 5,
    MAX_GENERATION_LENGTH: 2000,
    MAX_HISTORY_ITEMS: 50
  };