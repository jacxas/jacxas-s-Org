
import { GoogleGenAI } from "@google/genai";
import { AIConfig } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const generateLandingPage = async (config: AIConfig): Promise<string> => {
  const prompt = `
    You are a world-class conversion rate optimization (CRO) expert and frontend engineer.
    Task: Generate a HIGH-CONVERTING, SINGLE-FILE HTML landing page or dashboard.
    
    Current 2026 Trends & "Pro" Widget Implementation:
    1. Bento Grid Layout: Use clean, rounded rectangular zones (Bento pockets) for structured information.
    2. Frosted Glass (Glassmorphism): Add backdrop-blur-md effects to cards and navigation.
    3. Story-driven Hero Section: Headlines must tell a 3-second transformation story.
    4. Mandatory "Pro" Widgets:
       - Bento KPI Cards: Include a main metric, a micro-sparkline, and a % change badge.
       - Actionable Tables: Use status badges (Rounded/Colored), quick action icons (Edit/Download), and progress bars.
       - Smart Time Selectors: Feature quick range buttons (Today, 7D, 30D, 12M) with glassmorphism popups.
       - Smooth Area Charts: Use Bezier curves with desaturing gradient fills and simulated tooltips.
       - Real-time Activity Logs: Vertical timeline with icons showing "live" updates.
    5. Mobile-First Precision: Ensure layouts are seamless and touch-optimized.
    6. Dark Mode Preference: Default to sophisticated Dark Mode unless strictly specified as Corporate/Minimal light.

    Specifications:
    - Niche/Topic: ${config.niche}
    - Visual Style: ${config.style}
    - Color Palette: ${config.colorDetails}
    - Layout: ${config.structure}
    
    Requirements:
    - Use Tailwind CSS via CDN.
    - Include psychological triggers (scarcity, social proof, authority).
    - Use Lucide icons (SVG or via CDN if preferred, but prefer embedded clean SVGs or standard Tailwind patterns).
    - Engaging copywriting that feels premium and results-oriented.
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
