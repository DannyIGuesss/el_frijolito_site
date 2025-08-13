/**
 * Core TypeScript interfaces for El Frijolito restaurant data
 * These types ensure type safety throughout the application
 */

// Base interface for all entities with common fields
interface BaseEntity {
  id: string;
  createdAt: Date;
  updatedAt: Date;
}

// Menu item categories with Spanish/English support
export type MenuCategory = 
  | 'appetizers' 
  | 'tacos' 
  | 'burritos' 
  | 'quesadillas'
  | 'enchiladas'
  | 'fajitas'
  | 'platillos-principales' // Main dishes
  | 'sides'
  | 'desserts'
  | 'beverages'
  | 'kids-menu';

// Dietary restrictions and allergen information
export type DietaryTag = 
  | 'vegetarian'
  | 'vegan'
  | 'gluten-free'
  | 'dairy-free'
  | 'spicy'
  | 'contains-nuts'
  | 'contains-shellfish';

// Spice level indicator
export type SpiceLevel = 'mild' | 'medium' | 'hot' | 'extra-hot';

// Image data structure for menu items and restaurant photos
export interface ImageData {
  url: string;
  alt: string;
  width?: number;
  height?: number;
  caption?: string;
  // For future Cloudinary integration
  publicId?: string;
  cloudinaryUrl?: string;
}

// Individual menu item structure
export interface MenuItem extends BaseEntity {
  name: string;
  nameSpanish?: string; // For bilingual support
  description: string;
  descriptionSpanish?: string;
  price: number;
  category: MenuCategory;
  image?: ImageData;
  images?: ImageData[]; // Multiple photos for popular items
  isAvailable: boolean;
  isPopular: boolean; // Featured items
  dietaryTags: DietaryTag[];
  spiceLevel?: SpiceLevel;
  ingredients: string[];
  ingredientsSpanish?: string[];
  nutritionInfo?: {
    calories?: number;
    protein?: number;
    carbs?: number;
    fat?: number;
  };
  // For future ordering system
  customizations?: string[];
  preparationTime?: number; // in minutes
}

// Menu section grouping
export interface MenuSection {
  category: MenuCategory;
  title: string;
  titleSpanish?: string;
  description?: string;
  descriptionSpanish?: string;
  items: MenuItem[];
  displayOrder: number;
}

// Complete menu structure
export interface RestaurantMenu {
  sections: MenuSection[];
  lastUpdated: Date;
  isActive: boolean;
}

// Restaurant basic information
export interface RestaurantInfo {
  name: string;
  tagline: string;
  taglineSpanish?: string;
  description: string;
  descriptionSpanish?: string;
  phone: string;
  email: string;
  address: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  coordinates?: {
    latitude: number;
    longitude: number;
  };
  hours: {
    monday: string;
    tuesday: string;
    wednesday: string;
    thursday: string;
    friday: string;
    saturday: string;
    sunday: string;
  };
  socialMedia: {
    facebook?: string;
    instagram?: string;
    twitter?: string;
    yelp?: string;
    google?: string;
  };
  images: {
    logo: ImageData;
    hero: ImageData;
    gallery: ImageData[];
  };
}

// SEO-related types for better search visibility
export interface SEOData {
  title: string;
  description: string;
  keywords: string[];
  ogImage?: string;
  structuredData?: Record<string, any>;
}

// Page-specific SEO configuration
export interface PageSEO {
  home: SEOData;
  menu: SEOData;
  about: SEOData;
  contact: SEOData;
}

// Application-wide constants
export const BRAND_COLORS = {
  forestGreen: '#228B22',
  warmOrange: '#FF8C00', 
  goldenYellow: '#FFD700',
  chiliRed: '#DC143C',
  cream: '#FFF8DC',
} as const;

export const MENU_CATEGORIES: Record<MenuCategory, { en: string; es: string }> = {
  'appetizers': { en: 'Appetizers', es: 'Aperitivos' },
  'tacos': { en: 'Tacos', es: 'Tacos' },
  'burritos': { en: 'Burritos', es: 'Burritos' },
  'quesadillas': { en: 'Quesadillas', es: 'Quesadillas' },
  'enchiladas': { en: 'Enchiladas', es: 'Enchiladas' },
  'fajitas': { en: 'Fajitas', es: 'Fajitas' },
  'platillos-principales': { en: 'Main Dishes', es: 'Platillos Principales' },
  'sides': { en: 'Sides', es: 'Acompañamientos' },
  'desserts': { en: 'Desserts', es: 'Postres' },
  'beverages': { en: 'Beverages', es: 'Bebidas' },
  'kids-menu': { en: 'Kids Menu', es: 'Menú Infantil' },
} as const;