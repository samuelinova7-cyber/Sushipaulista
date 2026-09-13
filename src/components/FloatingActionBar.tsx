import { useState, useEffect } from 'react';
import { Utensils, MessageCircle, Sparkles, ChevronUp } from 'lucide-react';
import { RESTAURANT_INFO } from '../data/restaurantData';
import { getWhatsAppLink } from '../utils/helpers';
import { playClickSound, playHoverTick, playWhatsappTone, playCardapioChime } from '../utils/soundEffects';

interface FloatingActionBarProps {
  onOpenMenu?: () => void;
  onScrollToQuiz: () => void;
}

export function FloatingActionBar({ onOpenMenu, onScrollToQuiz }: FloatingActionBarProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show floating bar after scrolling 150px
      if (window.scrollY > 150) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-3 sm:bottom-5 left-0 right-0 z-40 px-3 sm:px-6 pointer-events-none animate-in slide-in-from-bottom-6 duration-300">
      <div className="max-w-xl mx-auto bg-zinc-950/95 backdrop-blur-xl border border-zinc-800/90 rounded-2xl sm:rounded-full p-2 sm:p-2.5 shadow-2xl shadow-black/90 pointer-events-auto flex items-center justify-between gap-2 ring-1 ring-white/10">
        
        {/* Quiz Button (Quick access) */}
        <button
          onClick={() => {
            playClickSound();
            onScrollToQuiz();
          }}
          onMouseEnter={() => playHoverTick()}
          id="floating-quiz-btn"
          className="hidden sm:flex items-center gap-1.5 px-3.5 py-2.5 rounded-full bg-zinc-900 hover:bg-zinc-800 text-rose-300 font-bold text-xs border border-rose-500/30 transition-all cursor-pointer hover:border-rose-400"
          title="Minigame: Qual Sushi Combina Com Você?"
        >
          <Sparkles className="w-3.5 h-3.5 text-rose-400 animate-spin" style={{ animationDuration: '4s' }} />
          <span>Quiz</span>
        </button>

        {/* 🔴 [ VER CARDÁPIO DIGITAL - Animated Red & Shining ] */}
        <a
          href={RESTAURANT_INFO.instaDeliveryUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => playCardapioChime()}
          onMouseEnter={() => playHoverTick()}
          id="floating-menu-btn"
          className="relative overflow-hidden flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl sm:rounded-full text-white font-black text-xs sm:text-sm shadow-xl transition-all active:scale-95 cursor-pointer border-2 border-red-300/50 whitespace-nowrap bg-gradient-to-r from-red-600 via-rose-600 via-red-500 to-red-700 animate-red-gradient animate-glow-red"
        >
          <span className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/40 to-transparent pointer-events-none animate-sheen" />
          <Utensils className="w-4 h-4 drop-shadow" />
          <span className="relative z-10 font-extrabold uppercase tracking-wide">📖 Cardápio InstaDelivery</span>
        </a>

        {/* 🟢 [ FAZER PEDIDO NO WHATSAPP ] */}
        <a
          href={getWhatsAppLink()}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => playWhatsappTone()}
          onMouseEnter={() => playHoverTick()}
          id="floating-whatsapp-btn"
          className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl sm:rounded-full bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-500 hover:to-green-500 text-white font-black text-xs sm:text-sm shadow-lg shadow-emerald-950/60 transition-all active:scale-95 border border-emerald-400/30 whitespace-nowrap"
        >
          <MessageCircle className="w-4 h-4 fill-white text-emerald-600" />
          <span>💬 Pedir WhatsApp</span>
        </a>

      </div>
    </div>
  );
}
