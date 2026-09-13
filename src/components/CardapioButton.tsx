import React from 'react';
import { Utensils, Sparkles, ChevronRight, ExternalLink } from 'lucide-react';
import { RESTAURANT_INFO } from '../data/restaurantData';
import { playCardapioChime, playHoverTick } from '../utils/soundEffects';

interface CardapioButtonProps {
  id?: string;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  text?: string;
  showIcon?: boolean;
  showSparkles?: boolean;
  onClick?: () => void;
  openExternalDirectly?: boolean;
}

export function CardapioButton({
  id = 'cardapio-cta-btn',
  className = '',
  size = 'lg',
  text = '📖 VER CARDÁPIO DIGITAL',
  showIcon = true,
  showSparkles = true,
  onClick,
  openExternalDirectly = true
}: CardapioButtonProps) {

  const handleClick = (e: React.MouseEvent) => {
    playCardapioChime();
    if (onClick) {
      onClick();
    }
  };

  const handleMouseEnter = () => {
    playHoverTick();
  };

  const sizeClasses = {
    sm: 'px-4 py-2.5 text-xs rounded-xl gap-2',
    md: 'px-6 py-3.5 text-sm sm:text-base rounded-2xl gap-2.5',
    lg: 'px-7 py-4 text-base sm:text-lg rounded-2xl gap-3'
  };

  const iconSizes = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-5 h-5'
  };

  return (
    <a
      href={RESTAURANT_INFO.instaDeliveryUrl}
      target="_blank"
      rel="noopener noreferrer"
      id={id}
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      className={`group relative inline-flex items-center justify-center font-extrabold text-white tracking-wide overflow-hidden cursor-pointer transition-all duration-300 transform active:scale-95 border-2 border-red-300/60 shadow-2xl hover:scale-[1.03] ${sizeClasses[size]} ${className} animate-glow-red bg-gradient-to-r from-red-600 via-rose-600 via-red-500 to-red-700 animate-red-gradient`}
      style={{
        textShadow: '0 2px 4px rgba(0,0,0,0.6)',
      }}
      title="Acessar Cardápio Digital Oficial no InstaDelivery para Pedidos"
    >
      {/* Radiant sweeping sheen effect */}
      <span className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/50 to-transparent pointer-events-none animate-sheen" />

      {/* Sparkle particle in corner */}
      {showSparkles && (
        <span className="absolute -top-1 -right-1 flex h-4 w-4">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-4 w-4 bg-amber-400 items-center justify-center text-[10px]">✨</span>
        </span>
      )}

      {/* Main Utensils Icon */}
      {showIcon && (
        <Utensils className={`${iconSizes[size]} transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110 drop-shadow`} />
      )}

      {/* Label Text */}
      <span className="relative z-10 flex items-center gap-1.5 font-black uppercase tracking-wider">
        {text}
      </span>

      {/* Subtle chevron / external link indicator */}
      <ChevronRight className="w-4 h-4 opacity-80 transition-transform duration-300 group-hover:translate-x-1" />
    </a>
  );
}
