import { useState } from 'react';
import { Utensils, MessageCircle, Instagram, Star, Sparkles, MapPin, Clock, Phone, Menu, X, Check, Volume2, VolumeX, ExternalLink } from 'lucide-react';
import { RESTAURANT_INFO } from '../data/restaurantData';
import { getWhatsAppLink, checkIsOpenNow } from '../utils/helpers';
import { isSoundEnabled, toggleSound, playClickSound, playHoverTick, playWhatsappTone, playCardapioChime } from '../utils/soundEffects';

interface HeaderProps {
  onOpenMenu: () => void;
  onScrollToQuiz: () => void;
  onScrollToAbout: () => void;
  onScrollToReviews: () => void;
  onScrollToLocation: () => void;
}

export function Header({
  onOpenMenu,
  onScrollToQuiz,
  onScrollToAbout,
  onScrollToReviews,
  onScrollToLocation
}: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);
  const [soundActive, setSoundActive] = useState(isSoundEnabled());
  const openStatus = checkIsOpenNow();

  const handleCopyPhone = () => {
    playClickSound();
    navigator.clipboard.writeText(RESTAURANT_INFO.phoneFormatted);
    setCopiedPhone(true);
    setTimeout(() => setCopiedPhone(false), 2000);
  };

  const handleToggleSound = () => {
    const newState = toggleSound();
    setSoundActive(newState);
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-zinc-950/95 backdrop-blur-md border-b border-zinc-800/80 shadow-2xl transition-all">
      {/* Top micro-bar with quick contact, opening status, and sound toggle */}
      <div className="hidden sm:flex items-center justify-between px-4 lg:px-8 py-1.5 text-xs text-zinc-400 bg-zinc-900/60 border-b border-zinc-800/40">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1 text-zinc-300 font-medium">
            <MapPin className="w-3.5 h-3.5 text-rose-500" />
            {RESTAURANT_INFO.city}
          </span>
          <span className="hidden md:inline-block text-zinc-600">•</span>
          <span className="flex items-center gap-1.5">
            <span className={`inline-block w-2 h-2 rounded-full ${openStatus.isOpen ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500'}`} />
            <span className={openStatus.isOpen ? 'text-emerald-400 font-semibold' : 'text-amber-400 font-medium'}>
              {openStatus.statusText}
            </span>
            <span className="text-zinc-500">({RESTAURANT_INFO.hours})</span>
          </span>
        </div>

        <div className="flex items-center gap-4">
          {/* Sound Toggle Button */}
          <button
            onClick={handleToggleSound}
            onMouseEnter={() => playHoverTick()}
            id="header-toggle-sound-btn"
            className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-zinc-800/70 hover:bg-zinc-700 text-zinc-300 hover:text-white transition-colors cursor-pointer border border-zinc-700/50"
            title={soundActive ? "Desativar efeitos sonoros" : "Ativar efeitos sonoros"}
          >
            {soundActive ? <Volume2 className="w-3.5 h-3.5 text-amber-400 animate-pulse" /> : <VolumeX className="w-3.5 h-3.5 text-zinc-500" />}
            <span className="text-[11px] font-semibold">{soundActive ? "Sons: Ativados 🔊" : "Sons: Mudo 🔇"}</span>
          </button>

          <span className="text-zinc-600">•</span>

          <button
            onClick={handleCopyPhone}
            onMouseEnter={() => playHoverTick()}
            id="header-copy-phone-btn"
            className="flex items-center gap-1 hover:text-zinc-200 transition-colors cursor-pointer"
            title="Clique para copiar o telefone"
          >
            {copiedPhone ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Phone className="w-3.5 h-3.5 text-rose-500" />}
            <span>{copiedPhone ? "Telefone Copiado!" : RESTAURANT_INFO.phoneFormatted}</span>
          </button>
          
          <span className="text-zinc-600">•</span>
          
          <span className="text-zinc-400">
            Pedido mínimo: <strong className="text-zinc-200">{RESTAURANT_INFO.minimumOrder}</strong>
          </span>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-22 sm:h-26 flex items-center justify-between gap-4">
        {/* Logo & Brand Identity */}
        <a 
          href="#" 
          onClick={() => playClickSound()}
          className="flex items-center gap-3.5 group focus:outline-none py-2"
        >
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full p-1 bg-gradient-to-tr from-rose-500 via-amber-400 to-pink-600 shadow-2xl shadow-rose-950/80 group-hover:scale-105 transition-all duration-300 animate-pulse shrink-0">
            <div className="w-full h-full rounded-full overflow-hidden border-2 border-zinc-950 bg-zinc-900 flex items-center justify-center">
              <img
                src="https://res.cloudinary.com/mbpsuaz1/image/upload/v1789323882/WhatsApp_Image_2026-09-13_at_2.21.39_PM_1.jpg"
                alt="Sushi Paulista Logo"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xl sm:text-2xl font-extrabold tracking-tight text-white font-['Cinzel',serif]">
                SUSHI PAULISTA
              </span>
              <span className="text-[10px] sm:text-xs font-bold px-2 py-0.5 rounded bg-rose-500/20 text-rose-400 border border-rose-500/30 uppercase tracking-widest hidden sm:inline-block">
                Chef SP
              </span>
            </div>
            <p className="text-xs sm:text-sm text-zinc-400 flex items-center gap-1.5 mt-0.5">
              <span>Culinária Asiática</span>
              <span className="text-rose-500 font-semibold">•</span>
              <span className="text-amber-400 font-medium">Águas Belas - PE</span>
            </p>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-zinc-300">
          <a
            href={RESTAURANT_INFO.instaDeliveryUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => playCardapioChime()}
            onMouseEnter={() => playHoverTick()}
            id="nav-link-cardapio"
            className="text-white hover:text-rose-300 font-bold transition-colors cursor-pointer py-1 flex items-center gap-1"
          >
            <span>📖 Cardápio InstaDelivery</span>
            <ExternalLink className="w-3 h-3 text-rose-400" />
          </a>
          <button
            onClick={() => { playClickSound(); onScrollToAbout(); }}
            onMouseEnter={() => playHoverTick()}
            id="nav-link-sobre"
            className="hover:text-white transition-colors cursor-pointer py-1"
          >
            Sobre o Chef
          </button>
          <button
            onClick={() => { playClickSound(); onScrollToQuiz(); }}
            onMouseEnter={() => playHoverTick()}
            id="nav-link-quiz"
            className="flex items-center gap-1.5 text-rose-400 hover:text-rose-300 transition-colors cursor-pointer py-1 font-semibold"
          >
            <Sparkles className="w-4 h-4 text-rose-400 animate-pulse" />
            Quiz do Sushi
          </button>
          <button
            onClick={() => { playClickSound(); onScrollToReviews(); }}
            onMouseEnter={() => playHoverTick()}
            id="nav-link-avaliacoes"
            className="hover:text-white transition-colors cursor-pointer py-1 flex items-center gap-1"
          >
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            Instagram Reels & Avaliações
          </button>
          <button
            onClick={() => { playClickSound(); onScrollToLocation(); }}
            onMouseEnter={() => playHoverTick()}
            id="nav-link-localizacao"
            className="hover:text-white transition-colors cursor-pointer py-1"
          >
            Endereço
          </button>
        </nav>

        {/* Header Action Buttons (with colorful shining cardapio button) */}
        <div className="hidden sm:flex items-center gap-3">
          {/* Red Glowing Cardápio Button */}
          <a
            href={RESTAURANT_INFO.instaDeliveryUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => playCardapioChime()}
            onMouseEnter={() => playHoverTick()}
            id="header-cta-cardapio-btn"
            className="relative overflow-hidden inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-white font-extrabold text-xs transition-all shadow-xl active:scale-95 cursor-pointer bg-gradient-to-r from-red-600 via-rose-600 via-red-500 to-red-700 animate-red-gradient animate-glow-red border-2 border-red-300/50 hover:scale-105"
          >
            <span className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/50 to-transparent pointer-events-none animate-sheen" />
            <Utensils className="w-4 h-4 drop-shadow" />
            <span className="relative z-10 font-black">📖 Cardápio Digital</span>
          </a>

          <a
            href={getWhatsAppLink()}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => playWhatsappTone()}
            onMouseEnter={() => playHoverTick()}
            id="header-cta-whatsapp-btn"
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition-all shadow-lg shadow-emerald-950/50 hover:shadow-emerald-600/30 active:scale-95"
          >
            <MessageCircle className="w-4 h-4 fill-white text-emerald-600" />
            <span>Fazer Pedido</span>
          </a>
        </div>

        {/* Mobile menu trigger */}
        <div className="flex items-center gap-2 sm:hidden">
          <button
            onClick={handleToggleSound}
            className="p-2 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-300"
            title="Alternar Som"
          >
            {soundActive ? <Volume2 className="w-4 h-4 text-amber-400" /> : <VolumeX className="w-4 h-4 text-zinc-500" />}
          </button>

          <a
            href={RESTAURANT_INFO.instaDeliveryUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => playCardapioChime()}
            id="header-mobile-quick-menu"
            className="p-2 rounded-lg bg-rose-600 text-white text-xs font-bold flex items-center justify-center shadow-md animate-pulse"
            aria-label="Cardápio Digital"
          >
            <Utensils className="w-4 h-4" />
          </a>

          <a
            href={getWhatsAppLink()}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => playWhatsappTone()}
            id="header-mobile-quick-wpp"
            className="p-2 rounded-lg bg-emerald-600 text-white text-xs font-bold flex items-center justify-center shadow-md"
            aria-label="Pedir no WhatsApp"
          >
            <MessageCircle className="w-4 h-4 fill-white text-emerald-600" />
          </a>
          
          <button
            onClick={() => {
              playClickSound();
              setMobileMenuOpen(!mobileMenuOpen);
            }}
            id="header-mobile-menu-toggle"
            className="p-2 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-white"
            aria-label="Abrir menu de navegação"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-zinc-950/98 border-b border-zinc-800 px-4 pt-3 pb-6 space-y-3 animate-in fade-in slide-in-from-top-4 duration-200">
          <div className="p-3 rounded-xl bg-zinc-900/90 border border-zinc-800 text-xs flex items-center justify-between text-zinc-300 mb-2">
            <span className="flex items-center gap-1.5">
              <span className={`w-2 h-2 rounded-full ${openStatus.isOpen ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500'}`} />
              <strong className={openStatus.isOpen ? 'text-emerald-400' : 'text-amber-400'}>{openStatus.statusText}</strong>
            </span>
            <span className="text-zinc-400">{openStatus.nextOpenInfo}</span>
          </div>

          <div className="grid grid-cols-2 gap-2 pt-1">
            <a
              href={RESTAURANT_INFO.instaDeliveryUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => {
                playCardapioChime();
                setMobileMenuOpen(false);
              }}
              id="mobile-drawer-cardapio"
              className="w-full relative overflow-hidden flex items-center justify-center gap-2 py-3 px-3 rounded-xl text-white font-extrabold text-xs shadow-md bg-gradient-to-r from-red-600 via-rose-600 via-red-500 to-red-700 animate-red-gradient animate-glow-red border-2 border-red-300/50"
            >
              <Utensils className="w-4 h-4" />
              <span>📖 Ver Cardápio</span>
            </a>
            
            <a
              href={getWhatsAppLink()}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => {
                playWhatsappTone();
                setMobileMenuOpen(false);
              }}
              id="mobile-drawer-whatsapp"
              className="w-full flex items-center justify-center gap-2 py-3 px-3 rounded-xl bg-emerald-600 text-white font-bold text-xs shadow-md"
            >
              <MessageCircle className="w-4 h-4 fill-white text-emerald-600" />
              <span>💬 WhatsApp</span>
            </a>
          </div>

          <div className="space-y-1 pt-2 border-t border-zinc-800/80">
            <button
              onClick={() => {
                playClickSound();
                setMobileMenuOpen(false);
                onScrollToQuiz();
              }}
              id="mobile-nav-quiz"
              className="w-full text-left py-2.5 px-3 rounded-lg text-rose-400 font-semibold hover:bg-zinc-900 flex items-center justify-between"
            >
              <span className="flex items-center gap-2">
                <Sparkles className="w-4 h-4" />
                Minigame: Qual Sushi Combina Com Você?
              </span>
              <span className="text-xs bg-rose-500/20 px-2 py-0.5 rounded text-rose-300">Quiz</span>
            </button>
            <button
              onClick={() => {
                playClickSound();
                setMobileMenuOpen(false);
                onScrollToAbout();
              }}
              id="mobile-nav-sobre"
              className="w-full text-left py-2.5 px-3 rounded-lg text-zinc-300 hover:bg-zinc-900"
            >
              Sobre Nós (História do Chef de SP)
            </button>
            <button
              onClick={() => {
                playClickSound();
                setMobileMenuOpen(false);
                onScrollToReviews();
              }}
              id="mobile-nav-reviews"
              className="w-full text-left py-2.5 px-3 rounded-lg text-zinc-300 hover:bg-zinc-900 flex items-center gap-2"
            >
              <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
              Instagram Reels & Avaliações 5.0
            </button>
            <button
              onClick={() => {
                playClickSound();
                setMobileMenuOpen(false);
                onScrollToLocation();
              }}
              id="mobile-nav-location"
              className="w-full text-left py-2.5 px-3 rounded-lg text-zinc-300 hover:bg-zinc-900 flex items-center gap-2"
            >
              <MapPin className="w-4 h-4 text-zinc-400" />
              Endereço & Horário
            </button>
          </div>

          <div className="pt-2 flex items-center justify-between text-xs text-zinc-400 border-t border-zinc-800/60">
            <a
              href={RESTAURANT_INFO.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => playClickSound()}
              className="flex items-center gap-1.5 text-pink-400 hover:underline"
            >
              <Instagram className="w-4 h-4" />
              {RESTAURANT_INFO.instagramHandle}
            </a>
            <button onClick={handleCopyPhone} className="hover:text-zinc-200">
              {copiedPhone ? "✓ Copiado!" : RESTAURANT_INFO.phoneFormatted}
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
