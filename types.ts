export enum TemplateCategory {
  SAAS = 'SaaS',
  AGENCY = 'Agency',
  PORTFOLIO = 'Portfolio',
  ECOM = 'E-Commerce',
  VIRAL = 'Viral',
  BLOGGER = 'Blogger',
  APP = 'Mobile App'
}

export interface Template {
  id: string;
  title: string;
  author: string;
  price: number;
  rating: number;
  sales: number;
  category: TemplateCategory;
  image: string;
  tags: string[];
  description: string;
  previewUrl?: string;
}

export interface User {
  id: string;
  name: string;
  role: 'buyer' | 'seller' | 'admin';
  balance: number;
  avatar: string;
}

export interface ChartData {
  name: string;
  value: number;
}

export interface AIConfig {
  niche: string;
  style: 'Minimal' | 'Bold' | 'Corporate' | 'Playful' | 'Dark Mode';
  colorDetails: string;
  structure: 'Standard' | 'Long Form' | 'Video Centric';
}
