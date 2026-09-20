export type EmotionType = 
  | 'vulnerable' 
  | 'celebratory' 
  | 'solitary' 
  | 'searching' 
  | 'mundane' 
  | 'escapist' 
  | 'tender';

export type CategoryType = 
  | 'sustenance' 
  | 'midnight' 
  | 'transit' 
  | 'escape' 
  | 'health' 
  | 'culture' 
  | 'subscriptions' 
  | 'rituals';

export interface ReceiptItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
}

export interface Receipt {
  id: string;
  merchant: string;
  subtitle?: string;
  category: CategoryType;
  date: string; // YYYY-MM-DD
  time: string; // HH:MM AM/PM
  hour24: number;
  total: number;
  items: ReceiptItem[];
  paymentMethod: string;
  location: {
    city: string;
    neighborhood?: string;
    address?: string;
  };
  emotion: EmotionType;
  memoryNote: string;
  marginalia?: string;
  tags: string[];
  connectedReceiptIds: string[];
  polaroidUrl?: string;
  chapterId: string;
}

export interface Chapter {
  id: string;
  numeral: string;
  title: string;
  subtitle: string;
  timeframe: string;
  summary: string;
  narrativeText: string[];
  receiptIds: string[];
  receiptsCount?: number;
  theme: string;
  coverImage: string;
  pullQuote: string;
}

export interface Persona {
  id: string;
  name: string;
  subtitle: string;
  tagline: string;
  avatar: string;
  period: string;
  totalSpent: number;
  receiptsCount: number;
  defaultChapterId: string;
}

export type ViewScreen = 'book' | 'raw-data' | 'insights' | 'connections' | 'story';

export const CATEGORY_INFO: Record<string, { label: string; color: string; bg: string; icon: string }> = {
  sustenance: { label: 'Sustenance & Bread', color: '#b45309', bg: '#fef3c7', icon: 'Utensils' },
  midnight: { label: 'Midnight Fuel', color: '#6d28d9', bg: '#ede9fe', icon: 'Moon' },
  transit: { label: 'Transit & Passages', color: '#0369a1', bg: '#e0f2fe', icon: 'Compass' },
  escape: { label: 'Escapes & Leaps', color: '#be123c', bg: '#ffe4e6', icon: 'Plane' },
  health: { label: 'Body & Repair', color: '#047857', bg: '#d1fae5', icon: 'HeartPulse' },
  culture: { label: 'Culture & Printed Word', color: '#92400e', bg: '#fef3c7', icon: 'BookOpen' },
  subscriptions: { label: 'Ghost Subscriptions', color: '#475569', bg: '#f1f5f9', icon: 'Clock' },
  rituals: { label: 'Rituals & Grounding', color: '#15803d', bg: '#dcfce7', icon: 'Sparkles' },
};

export const EMOTION_INFO: Record<string, { label: string; tone: string; dotColor: string }> = {
  vulnerable: { label: 'Vulnerable', tone: 'Moments of strain, doubt, or physical exhaustion', dotColor: '#f43f5e' },
  celebratory: { label: 'Celebratory', tone: 'Milestones, breakthroughs, and earned treats', dotColor: '#10b981' },
  solitary: { label: 'Solitary Quiet', tone: 'Alone with thoughts in a crowded world', dotColor: '#6366f1' },
  searching: { label: 'Searching & Tools', tone: 'In pursuit of solutions and craft', dotColor: '#f59e0b' },
  mundane: { label: 'Mundane Sustenance', tone: 'The quiet glue of daily survival', dotColor: '#64748b' },
  escapist: { label: 'Escapist Leaps', tone: 'Breaking free from the predictable track', dotColor: '#ec4899' },
  tender: { label: 'Tender Memory', tone: 'Purchases wrapped around human affection', dotColor: '#8b5cf6' },
};
