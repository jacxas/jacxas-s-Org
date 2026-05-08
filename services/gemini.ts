
import { GoogleGenAI } from "@google/genai";
import { AIConfig } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const generateLandingPage = async (config: AIConfig): Promise<string> => {
  const prompt = `
    You are a world-class conversion rate optimization (CRO) expert and frontend engineer.
    Task: Generate a HIGH-CONVERTING, SINGLE-FILE HTML landing page.
    
    Specifications:
    - Niche/Topic: ${config.niche}
    - Visual Style: ${config.style}
    - Color Palette: ${config.colorDetails}
    - Layout: ${config.structure}
    
    Requirements:
    - Use Tailwind CSS via CDN.
    - Include psychological triggers (scarcity, social proof, authority).
    - Fully responsive, mobile-first design.
    - Engaging copywriting that feels "viral".
    - Valid HTML5 code only. No markdown.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-preview',
      contents: prompt,
    });
    return response.text.replace(/```html/g, '').replace(/```/g, '').trim();
  } catch (error) {
    console.error("Generation Failed:", error);
    throw error;
  }
};

export const refineLandingPage = async (previousCode: string, instruction: string): Promise<string> => {
  const prompt = `
    You are a expert UI developer. I have this HTML code:
    ---
    ${previousCode}
    ---
    Please update the code based on this instruction: "${instruction}"
    
    Requirements:
    - Maintain the same Tailwind CSS structure.
    - Return ONLY the full updated HTML code.
    - No markdown backticks.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-preview',
      contents: prompt,
    });
    return response.text.replace(/```html/g, '').replace(/```/g, '').trim();
  } catch (error) {
    console.error("Refinement Failed:", error);
    throw error;
  }
};
