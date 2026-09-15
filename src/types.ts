export interface MenuItem {
  id: string;
  name: string;
  category: 'combos' | 'hot' | 'temaki' | 'sashimi' | 'entradas' | 'bebidas';
  description: string;
  price: number;
  highlightTag?: string;
  pieces?: number;
  image?: string;
  popular?: boolean;
}

export interface QuizQuestion {
  id: number;
  question: string;
  subtitle?: string;
  videoUrl?: string;
  options: {
    letter: 'A' | 'B' | 'C' | 'D';
    text: string;
    icon?: string;
    scoreType: 'iniciante_hot' | 'classico_salmao' | 'expert_sashimi' | 'familia_banquete';
  }[];
}

export interface QuizResultProfile {
  id: string;
  title: string;
  slogan: string;
  recommendedDish: string;
  dishDescription: string;
  piecesCount?: string;
  priceEstimate: string;
  tags: string[];
  imageUrl: string;
  whatsappMessage: string;
}

export interface ReviewItem {
  id: string;
  author: string;
  location: string;
  rating: number;
  date: string;
  comment: string;
  avatarColor: string;
}

export interface InstagramReel {
  id: string;
  title: string;
  caption: string;
  imageUrl: string;
  videoUrl?: string;
  views: string;
  likes: string;
  commentsCount: string;
  duration: string;
  audioTrack: string;
  tag: string;
  isPopular?: boolean;
}

