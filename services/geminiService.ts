import { GoogleGenAI } from "@google/genai";

// Initialize the Gemini API client
// Ideally this should be server-side or proxied, but for this demo app it runs client-side.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const generateContent = async (prompt: string, context: string): Promise<string> => {
  if (!process.env.API_KEY) {
    return "API Key is missing. Please configure the environment.";
  }

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Context: ${context}\n\nTask: ${prompt}\n\nKeep it professional, concise, and engaging for a portfolio website.`,
    });

    return response.text || "Could not generate content.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Error generating content. Please try again.";
  }
};
