import { GoogleGenerativeAI } from '@google/generative-ai';
import { analyzeArtistStyle } from './lyricAnalysis';
import { blendStyles } from './styleBlender';
import { loadArtistData } from './dataLoader';
import { SONG_STRUCTURES } from '../utils/constants';
import { generateWithGemma } from './gemmaService';

// Google AI API configuration
const API_KEY = process.env.REACT_APP_GOOGLE_AI_API_KEY;
const AI_MODEL = process.env.REACT_APP_AI_MODEL || 'gemini-pro';

// Initialize Google AI
const genAI = new GoogleGenerativeAI(API_KEY);

// Main generation function
export const generateLyrics = async (parameters) => {
  const { genre, artists, stylePrompt, editRequest, exclusions } = parameters;

  try {
    // Step 1: Load artist data
    const artistsData = await Promise.all(
      artists.map(artistId => loadArtistData(genre, artistId))
    );

    // Step 2: Analyze each artist's style
    const styleProfiles = artistsData.map(data => analyzeArtistStyle(data));

    // Step 3: Blend styles if multiple artists
    const combinedStyle = artists.length > 1 
      ? blendStyles(styleProfiles)
      : styleProfiles[0];

    // Step 4: Generate lyrics based on combined style and prompt
    const lyrics = await generateContent({
      styleProfile: combinedStyle,
      userPrompt: stylePrompt,
      editRequest,
      exclusions,
      genre,
      artists
    });

    return lyrics;
  } catch (error) {
    console.error('Generation error:', error);
    throw new Error('Failed to generate lyrics. Please try again.');
  }
};

// Content generation using Gemma
const generateContent = async ({ styleProfile, userPrompt, editRequest, exclusions, genre, artists }) => {
  try {
    // Build the prompt
    const prompt = `
You are an expert songwriter. Generate only the song lyrics, without mentioning any artist names or including any other commentary.

Genre: ${genre}
Style characteristics: ${JSON.stringify(styleProfile, null, 2)}
User's creative direction: ${userPrompt || 'Create something authentic to the style'}
${editRequest ? `Special request: ${editRequest}` : ''}
${exclusions.length > 0 ? `Avoid these themes/words: ${exclusions.join(', ')}` : ''}

Generate complete song lyrics with verses, chorus, and bridge. Only output the lyrics—do not reference artists, your role, or any instructions.`;

    // Generate content with Gemma
    const text = await generateWithGemma(prompt);

    // Validate the generated content
    if (validateContent(text, exclusions)) {
      return text;
    } else {
      // Regenerate if excluded content found
      return generateContent({ styleProfile, userPrompt, editRequest, exclusions, genre, artists });
    }
  } catch (error) {
    console.error('Gemma Generation error:', error);
    return generateFallbackContent(genre, artists, userPrompt);
  }
};

// Fallback content if API fails
const generateFallbackContent = (genre, artists, userPrompt) => {
  return `[Verse 1]
Unable to connect to AI service
Please check your API key
And try again in a moment
Your creativity is on the way

[Chorus]
Connection error, but don't worry
We'll get your lyrics in a hurry
Just refresh and try once more
Your song is worth waiting for

[Note]
If this persists, please check:
1. Your API key is correct in the .env file
2. You have internet connection
3. The Google AI API is accessible`;
};

// Apply edits to existing lyrics
export const applyEdits = async (originalLyrics, editRequest) => {
  try {
    const model = genAI.getGenerativeModel({ model: AI_MODEL });
    
    const prompt = `
Here are existing song lyrics:

${originalLyrics}

Please apply this edit request: ${editRequest}

Return the complete edited lyrics, maintaining the original structure and style.`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error('Edit error:', error);
    return originalLyrics;
  }
};

// Validate generated content
export const validateContent = (lyrics, exclusions) => {
  const lowerLyrics = lyrics.toLowerCase();
  for (const exclusion of exclusions) {
    if (lowerLyrics.includes(exclusion.toLowerCase())) {
      return false;
    }
  }
  return true;
};