# Song Lyric Assist API Documentation

## Overview

This document outlines the API structure and integration points for the Song Lyric Assist application. While the current implementation runs entirely in the browser, this API design allows for future backend integration.

## API Endpoints (Future Implementation)

### Generation Endpoints

#### POST /api/generate
Generate new song lyrics based on provided parameters.

**Request Body:**
```json
{
  "genre": "HipHop-Rap",
  "artists": ["Drake", "Kendrick-Lamar"],
  "stylePrompt": "Create an uplifting song about overcoming challenges",
  "exclusions": ["profanity", "violence"],
  "parameters": {
    "temperature": 0.8,
    "maxLength": 500,
    "rhymeScheme": "ABAB",
    "songStructure": "verse-chorus-verse"
  }
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "lyrics": "[Generated lyrics text]",
    "generationId": "gen_123456",
    "metadata": {
      "wordCount": 250,
      "sections": ["Verse 1", "Chorus", "Verse 2", "Chorus", "Bridge", "Chorus"],
      "estimatedDuration": "3:30"
    }
  }
}
```

#### POST /api/generate/edit
Apply edits to previously generated lyrics.

**Request Body:**
```json
{
  "generationId": "gen_123456",
  "editRequest": "Make the chorus more upbeat and add more metaphors"
}
```

### Analysis Endpoints

#### POST /api/analyze
Analyze the style of provided lyrics or artist.

**Request Body:**
```json
{
  "type": "artist",
  "artistId": "Drake",
  "genre": "HipHop-Rap"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "styleProfile": {
      "vocabulary": {
        "uniqueWordCount": 5420,
        "vocabularyRichness": 0.73
      },
      "themes": {
        "success": 0.8,
        "relationships": 0.6,
        "nostalgia": 0.4
      },
      "sentiment": {
        "positive": 60,
        "negative": 25,
        "neutral": 15
      }
    }
  }
}
```

### Artist Data Endpoints

#### GET /api/artists
Get list of all available artists.

**Query Parameters:**
- `genre` (optional): Filter by genre
- `limit` (optional): Number of results to return
- `offset` (optional): Pagination offset

**Response:**
```json
{
  "success": true,
  "data": {
    "artists": [
      {
        "id": "Drake",
        "name": "Drake",
        "genre": "HipHop-Rap",
        "songCount": 150
      }
    ],
    "total": 45,
    "hasMore": true
  }
}
```

#### GET /api/artists/:artistId
Get detailed information about a specific artist.

**Response:**
```json
{
  "success": true,
  "data": {
    "artist": {
      "id": "Drake",
      "name": "Drake",
      "genres": ["HipHop-Rap", "RnB"],
      "activeYears": "2006-present",
      "totalSongs": 150
    },
    "styleProfile": {},
    "popularThemes": ["success", "relationships", "hometown"]
  }
}
```

### History Endpoints

#### GET /api/history
Get user's generation history.

**Headers:**
```
Authorization: Bearer [user_token]
```

**Response:**
```json
{
  "success": true,
  "data": {
    "history": [
      {
        "id": "gen_123456",
        "timestamp": "2025-05-22T10:30:00Z",
        "parameters": {},
        "lyrics": "[Generated lyrics]"
      }
    ]
  }
}
```

## Data Formats

### Artist Data Format
```json
{
  "artist": {
    "name": "Artist Name",
    "genres": ["Primary Genre", "Secondary Genre"],
    "activeYears": "1990-present",
    "totalSongs": 150
  },
  "metadata": {
    "lastUpdated": "2025-05-22",
    "sourceVerification": "Official releases and verified lyric databases",
    "analysisReady": true
  },
  "songs": [
    {
      "id": "unique_song_identifier",
      "title": "Song Title",
      "album": "Album Name",
      "year": 2024,
      "structure": {
        "verse1": "First verse content...",
        "chorus": "Chorus content...",
        "verse2": "Second verse content...",
        "bridge": "Bridge content...",
        "outro": "Outro content..."
      },
      "analysis": {
        "rhymeScheme": "ABAB",
        "syllableCount": [8, 8, 8, 8],
        "keyThemes": ["love", "resilience", "growth"],
        "vocabulary": ["unique", "words", "list"],
        "sentiment": "positive"
      }
    }
  ],
  "styleProfile": {
    "commonThemes": ["theme1", "theme2", "theme3"],
    "vocabularySignature": ["signature", "words"],
    "structuralPatterns": ["verse-chorus-verse", "bridge-usage"],
    "rhymingStyle": "complex internal rhymes",
    "meterPreferences": "varied, predominantly 4/4"
  }
}
```

## Error Handling

All endpoints return errors in a consistent format:

```json
{
  "success": false,
  "error": {
    "code": "INVALID_PARAMETERS",
    "message": "Genre is required",
    "details": {
      "field": "genre",
      "requirement": "Must be a valid genre identifier"
    }
  }
}
```

### Common Error Codes
- `INVALID_PARAMETERS`: Request parameters are invalid
- `NOT_FOUND`: Requested resource not found
- `RATE_LIMITED`: Too many requests
- `GENERATION_FAILED`: Lyric generation failed
- `UNAUTHORIZED`: Authentication required
- `SERVER_ERROR`: Internal server error

## Rate Limiting

API requests are rate limited to ensure fair usage:
- **Anonymous users**: 10 requests per hour
- **Authenticated users**: 100 requests per hour
- **Premium users**: 1000 requests per hour

Rate limit information is included in response headers:
```
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 95
X-RateLimit-Reset: 1621843200
```

## Authentication (Future)

Authentication will use JWT tokens:

```bash
curl -H "Authorization: Bearer YOUR_JWT_TOKEN" \
     https://api.songlyricassist.com/api/generate
```

## Webhooks (Future)

Webhooks can be configured for async generation events:

```json
{
  "event": "generation.completed",
  "data": {
    "generationId": "gen_123456",
    "status": "success",
    "lyrics": "[Generated lyrics]"
  }
}
```

## SDK Examples

### JavaScript
```javascript
import SongLyricAssist from 'song-lyric-assist-sdk';

const client = new SongLyricAssist({
  apiKey: 'YOUR_API_KEY'
});

const lyrics = await client.generate({
  genre: 'Pop',
  artists: ['Taylor-Swift'],
  stylePrompt: 'Write a song about summer love'
});
```

### Python
```python
from song_lyric_assist import Client

client = Client(api_key='YOUR_API_KEY')

lyrics = client.generate(
    genre='Pop',
    artists=['Taylor-Swift'],
    style_prompt='Write a song about summer love'
)
```

## Best Practices

1. **Batch Requests**: When analyzing multiple artists, use batch endpoints
2. **Caching**: Cache artist data locally to reduce API calls
3. **Error Handling**: Always implement proper error handling for network failures
4. **Rate Limiting**: Implement exponential backoff when rate limited
5. **Webhooks**: Use webhooks for long-running generation tasks