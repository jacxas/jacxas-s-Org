export enum TemplateCategory {
  ECOM_DASHBOARD = 'E-Commerce Dashboard',
  CRYPTO_DASHBOARD = 'Crypto & Investment',
  ADMIN_SAAS = 'SaaS Admin',
  MARKETING_DASHBOARD = 'Marketing & Ads',
  MULTIPURPOSE = 'Multipurpose Admin',
  AGENCY = 'Agency Landing',
  PORTFOLIO = 'Portfolio',
  MOBILE_APP = 'Mobile App'
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
  createdAt?: string;
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
  style: 'Minimal' | 'Bold' | 'Corporate' | 'Playful' | 'Dark Mode' | 'Futuristic';
  colorDetails: string;
  structure: 'Standard' | 'Long Form' | 'Video Centric' | 'Bento Dashboard';
}
