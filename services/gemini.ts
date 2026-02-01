import { GoogleGenAI } from "@google/genai";
import { AIConfig } from "../types";

const apiKey = process.env.API_KEY || ''; 
// In a real app, we would handle the missing key more gracefully or via a proxy. 
// For this demo, we assume it's injected.

const ai = new GoogleGenAI({ apiKey });

export const generateLandingPage = async (config: AIConfig): Promise<string> => {
  if (!apiKey) {
    throw new Error("API Key is missing. Please check your environment variables.");
  }

  const prompt = `
    You are a world-class frontend engineer and UI/UX designer.
    Task: Generate a COMPLETE, SINGLE-FILE HTML landing page.
    
    Specifications:
    - Niche/Topic: ${config.niche}
    - Visual Style: ${config.style}
    - Color Palette Preference: ${config.colorDetails}
    - Structure/Layout: ${config.structure}
    
    Technical Requirements:
    - Use Tailwind CSS via CDN (<script src="https://cdn.tailwindcss.com"></script>).
    - Use Google Fonts (Inter or appropriate for style).
    - Include sections: Navbar, Hero (with strong Headline), Features/Benefits Grid, Social Proof/Testimonials, Pricing (if applicable), and a strong Sticky CTA.
    - Ensure the design is fully responsive (mobile-first).
    - Use placeholder images from https://picsum.photos where necessary.
    - The code must be valid HTML5.
    - Do NOT use markdown backticks. Return ONLY the raw HTML string.
    - Add engaging copy relevant to the Niche.
    
    Make it look "Viral" and high-quality.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-preview', // Using the powerful model for coding
      contents: prompt,
    });

    const text = response.text || '';
    
    // Cleanup if model returns markdown blocks despite instructions
    let cleanText = text.replace(/```html/g, '').replace(/```/g, '');
    return cleanText;

  } catch (error) {
    console.error("AI Generation Failed:", error);
    throw error;
  }
};
