// Gemma API integration for Google AI Studio
const API_KEY = process.env.REACT_APP_GOOGLE_AI_API_KEY;
const GEMMA_MODEL = process.env.REACT_APP_AI_MODEL;

export const generateWithGemma = async (prompt) => {
  try {
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${GEMMA_MODEL}:generateContent?key=${API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: prompt
          }]
        }],
        generationConfig: {
          temperature: 0.9,
          topK: 1,
          topP: 1,
          maxOutputTokens: 2048,
        }
      })
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const data = await response.json();
    return data.candidates[0].content.parts[0].text;
  } catch (error) {
    console.error('Gemma API error:', error);
    throw error;
  }
};