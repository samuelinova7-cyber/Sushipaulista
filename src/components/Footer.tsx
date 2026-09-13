import { MessageCircle, Instagram, Star, Utensils, MapPin, Clock, Phone, Sparkles, Heart, ExternalLink } from 'lucide-react';
import { RESTAURANT_INFO } from '../data/restaurantData';
import { getWhatsAppLink } from '../utils/helpers';
import { playClickSound, playHoverTick, playWhatsappTone, playCardapioChime } from '../utils/soundEffects';

interface FooterProps {
  onOpenMenu: () => void;
  onScrollToQuiz: () => void;
  onScrollToAbout: () => void;
  onScrollToReviews: () => void;
  onScrollToLocation: () => void;
}

export function Footer({
  onOpenMenu,
  onScrollToQuiz,
  onScrollToAbout,
  onScrollToReviews,
  onScrollToLocation
}: FooterProps) {
  return (
    <footer className="bg-zinc-950 text-zinc-400 text-xs border-t border-zinc-800/80 pt-16 pb-24 sm:pb-16 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Main 4-Column Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-10">
          
          {/* Column 1: Brand & Slogan (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-3.5">
              <div className="w-14 h-14 rounded-full p-0.5 bg-gradient-to-tr from-rose-500 via-amber-400 to-pink-600 shadow-xl shadow-rose-950/60 shrink-0">
                <div className="w-full h-full rounded-full overflow-hidden border-2 border-zinc-950 bg-zinc-900 flex items-center justify-center">
                  <img
                    src="https://res.cloudinary.com/mbpsuaz1/image/upload/v1789323882/WhatsApp_Image_2026-09-13_at_2.21.39_PM_1.jpg"
                    alt="Sushi Paulista Logo"
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </div>
              <div>
                <h3 className="text-base font-extrabold text-white tracking-tight font-['Cinzel',serif]">
                  {RESTAURANT_INFO.name}
                </h3>
                <p className="text-xs text-rose-400 font-semibold">{RESTAURANT_INFO.sloganSecondary}</p>
              </div>
            </div>

            <p className="text-zinc-400 leading-relaxed text-xs sm:text-sm">
              Tradição e excelência gastronômica inspiradas nos anos de atuação do nosso Chef na Avenida Paulista (São Paulo). 
              O melhor sushi de Águas Belas - PE com padrão incomparável de recheio farto e peixe fresco.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-1">
              <a
                href={RESTAURANT_INFO.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => playClickSound()}
                onMouseEnter={() => playHoverTick()}
                className="p-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-pink-400 border border-zinc-800 transition-colors flex items-center gap-2 font-bold text-xs"
              >
                <Instagram className="w-4 h-4" />
                <span>{RESTAURANT_INFO.instagramHandle}</span>
              </a>

              <a
                href={RESTAURANT_INFO.googleReviewUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => playClickSound()}
                onMouseEnter={() => playHoverTick()}
                className="p-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-amber-400 border border-zinc-800 transition-colors flex items-center gap-1.5 font-bold text-xs"
              >
                <Star className="w-4 h-4 fill-amber-400" />
                <span>Google 5.0 ⭐</span>
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">Links Rápidos</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a 
                  href={RESTAURANT_INFO.instaDeliveryUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => playCardapioChime()}
                  onMouseEnter={() => playHoverTick()}
                  className="text-white hover:text-rose-400 font-bold transition-colors cursor-pointer flex items-center gap-1.5"
                >
                  <Utensils className="w-3.5 h-3.5 text-rose-500" />
                  <span>Cardápio Digital InstaDelivery</span>
                  <ExternalLink className="w-3 h-3 text-rose-400" />
                </a>
              </li>
              <li>
                <button 
                  onClick={() => { playClickSound(); onScrollToQuiz(); }} 
                  onMouseEnter={() => playHoverTick()}
                  className="hover:text-rose-400 transition-colors cursor-pointer flex items-center gap-1.5 text-rose-300 font-semibold"
                >
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  <span>Quiz: Qual Sushi Combina Com Você?</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={() => { playClickSound(); onScrollToAbout(); }} 
                  onMouseEnter={() => playHoverTick()}
                  className="hover:text-rose-400 transition-colors cursor-pointer"
                >
                  História do Chef (Shopping Cidade SP)
                </button>
              </li>
              <li>
                <button 
                  onClick={() => { playClickSound(); onScrollToReviews(); }} 
                  onMouseEnter={() => playHoverTick()}
                  className="hover:text-rose-400 transition-colors cursor-pointer"
                >
                  Instagram Reels & Avaliações 5.0
                </button>
              </li>
              <li>
                <button 
                  onClick={() => { playClickSound(); onScrollToLocation(); }} 
                  onMouseEnter={() => playHoverTick()}
                  className="hover:text-rose-400 transition-colors cursor-pointer"
                >
                  Localização & Delivery em Águas Belas
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact & Hours (4 cols) */}
          <div className="lg:col-span-4 space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">Atendimento & Pedidos</h4>
            
            <div className="space-y-2.5 text-xs">
              <div className="flex items-start gap-2 text-zinc-300">
                <MapPin className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                <span>{RESTAURANT_INFO.addressFull}</span>
              </div>

              <div className="flex items-center gap-2 text-zinc-300">
                <Clock className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{RESTAURANT_INFO.hours} (Segunda fechado)</span>
              </div>

              <div className="flex items-center gap-2 text-zinc-300">
                <Phone className="w-4 h-4 text-amber-400 shrink-0" />
                <span>WhatsApp / Pedidos: <strong>{RESTAURANT_INFO.phoneFormatted}</strong></span>
              </div>
            </div>

            <div className="pt-2">
              <a
                href={getWhatsAppLink()}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => playWhatsappTone()}
                onMouseEnter={() => playHoverTick()}
                className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition-colors shadow-md"
              >
                <MessageCircle className="w-4 h-4 fill-white text-emerald-600" />
                <span>Fazer Pedido via WhatsApp</span>
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Copyright & Credits */}
        <div className="pt-8 border-t border-zinc-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-zinc-500">
          <p>© {new Date().getFullYear()} {RESTAURANT_INFO.name}. Todos os direitos reservados.</p>
          <p className="flex items-center gap-1 text-zinc-400">
            <span>Feito com</span>
            <Heart className="w-3.5 h-3.5 fill-rose-500 text-rose-500" />
            <span>para a melhor gastronomia de Águas Belas - PE</span>
          </p>
        </div>

      </div>
    </footer>
  );
}
