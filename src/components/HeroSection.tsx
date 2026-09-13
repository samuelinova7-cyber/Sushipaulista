import { useState } from 'react';
import { MessageCircle, MapPin, Clock, ChevronRight, Check, Copy, Flame, Trophy, Sparkles } from 'lucide-react';
import { RESTAURANT_INFO } from '../data/restaurantData';
import { getWhatsAppLink, checkIsOpenNow } from '../utils/helpers';
import { CardapioButton } from './CardapioButton';
import { playClickSound, playHoverTick, playWhatsappTone } from '../utils/soundEffects';

interface HeroSectionProps {
  onOpenMenu?: () => void;
  onScrollToQuiz: () => void;
  onScrollToLocation: () => void;
}

export function HeroSection({ onOpenMenu, onScrollToQuiz, onScrollToLocation }: HeroSectionProps) {
  const [copiedAddress, setCopiedAddress] = useState(false);
  const openStatus = checkIsOpenNow();

  const handleCopyAddress = () => {
    playClickSound();
    navigator.clipboard.writeText(RESTAURANT_INFO.addressFull);
    setCopiedAddress(true);
    setTimeout(() => setCopiedAddress(false), 2000);
  };

  return (
    <section className="relative overflow-hidden pt-6 pb-16 md:py-20 lg:py-24 border-b border-zinc-800/80 bg-radial-[at_top_center] from-rose-950/20 via-zinc-950 to-zinc-950">
      {/* Subtle Japanese Aesthetic Background Elements */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-rose-600/10 blur-[120px] pointer-events-none rounded-full" />
      <div className="absolute -top-10 right-5 text-zinc-900/60 font-['Yuji_Boku',serif] text-8xl md:text-9xl select-none pointer-events-none opacity-40">
        寿司
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* Left Column: Core Value Proposition & CTAs */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            
            {/* Top Quality Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs sm:text-sm font-semibold shadow-inner">
              <Trophy className="w-4 h-4 text-amber-400" />
              <span>{RESTAURANT_INFO.sloganMain}</span>
            </div>

            {/* Establishment Title */}
            <div className="space-y-3">
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight font-['Cinzel',serif]">
                {RESTAURANT_INFO.name}
              </h1>
              
              {/* Secondary Slogan Highlight */}
              <div className="inline-flex items-center gap-2 text-lg sm:text-2xl font-black px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500/15 via-rose-500/15 to-amber-500/15 border border-amber-500/30 text-amber-300">
                <Flame className="w-5 h-5 text-rose-500 fill-rose-500 animate-bounce" />
                <span>{RESTAURANT_INFO.sloganSecondary}</span>
              </div>
            </div>

            {/* Subtitle / Promise */}
            <p className="text-base sm:text-lg text-zinc-300 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              O sabor autêntico da tradição paulista no coração de Águas Belas! Peixes frescos selecionados, 
              cortes impecáveis pelo Chef e a fartura que você merece.
            </p>

            {/* Primary Action Buttons (CTAs Principais com Botão Colorido e Brilhante) */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center justify-center lg:justify-start gap-4">
              {/* 🔴 [ VER CARDÁPIO DIGITAL ] -> Colorful glowing animated CTA */}
              <CardapioButton
                id="hero-cta-ver-cardapio"
                text="📖 VER CARDÁPIO DIGITAL"
                size="lg"
                showSparkles={true}
              />

              {/* 🟢 [ FAZER PEDIDO NO WHATSAPP ] */}
              <a
                href={getWhatsAppLink()}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => playWhatsappTone()}
                onMouseEnter={() => playHoverTick()}
                id="hero-cta-whatsapp"
                className="group relative inline-flex items-center justify-center gap-3 px-6 py-4 rounded-2xl bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-500 hover:to-green-500 text-white font-extrabold text-base sm:text-lg shadow-xl shadow-emerald-950/80 hover:shadow-emerald-600/40 transition-all transform active:scale-98 border border-emerald-400/40 cursor-pointer"
              >
                <MessageCircle className="w-5 h-5 fill-white text-emerald-600" />
                <span>💬 FAZER PEDIDO NO WHATSAPP</span>
              </a>
            </div>

            {/* Quick Quiz Invitation Pill */}
            <div className="pt-1">
              <button
                onClick={() => {
                  playClickSound();
                  onScrollToQuiz();
                }}
                onMouseEnter={() => playHoverTick()}
                id="hero-cta-quiz-teaser"
                className="inline-flex items-center gap-2 text-xs sm:text-sm text-zinc-300 hover:text-rose-300 bg-zinc-900/80 hover:bg-zinc-800/90 border border-zinc-700/60 px-4 py-2.5 rounded-xl transition-all cursor-pointer shadow-md active:scale-95"
              >
                <Sparkles className="w-4 h-4 text-rose-400 animate-spin" style={{ animationDuration: '4s' }} />
                <span>Em dúvida do que pedir hoje? <strong>Faça nosso Quiz em 30 segundos!</strong> 🎯</span>
                <ChevronRight className="w-3.5 h-3.5 text-zinc-400" />
              </button>
            </div>

            {/* Informações Rápidas (Pills & Info Grid) */}
            <div className="pt-4 grid grid-cols-1 sm:grid-cols-2 gap-3 text-left">
              {/* Endereço */}
              <div 
                onClick={() => {
                  playClickSound();
                  onScrollToLocation();
                }} 
                onMouseEnter={() => playHoverTick()}
                className="p-3.5 rounded-xl bg-zinc-900/70 border border-zinc-800 hover:border-zinc-700 transition-all cursor-pointer group"
              >
                <div className="flex items-start gap-2.5">
                  <div className="p-2 rounded-lg bg-rose-500/10 text-rose-400 border border-rose-500/20 group-hover:bg-rose-500/20">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-zinc-400">Endereço Físico</span>
                      <button 
                        onClick={(e) => { e.stopPropagation(); handleCopyAddress(); }}
                        className="text-[11px] text-zinc-400 hover:text-white flex items-center gap-1"
                        title="Copiar endereço"
                      >
                        {copiedAddress ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                        <span>{copiedAddress ? "Copiado!" : "Copiar"}</span>
                      </button>
                    </div>
                    <p className="text-xs font-medium text-zinc-200 mt-0.5 leading-snug line-clamp-2">
                      {RESTAURANT_INFO.address}
                    </p>
                    <span className="text-[10px] text-amber-400 font-semibold">{RESTAURANT_INFO.city}</span>
                  </div>
                </div>
              </div>

              {/* Horário & Atendimento */}
              <div className="p-3.5 rounded-xl bg-zinc-900/70 border border-zinc-800">
                <div className="flex items-start gap-2.5">
                  <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs font-semibold text-zinc-400">Horário & Atendimento</span>
                      <span className={`text-[10px] font-bold px-1.5 py-0.2 rounded ${openStatus.isOpen ? 'bg-emerald-500/20 text-emerald-300' : 'bg-amber-500/20 text-amber-300'}`}>
                        {openStatus.statusText}
                      </span>
                    </div>
                    <p className="text-xs font-medium text-zinc-200 mt-0.5">
                      {RESTAURANT_INFO.hours}
                    </p>
                    <p className="text-[11px] text-zinc-400 mt-0.5">
                      {RESTAURANT_INFO.serviceTypes} • <strong className="text-zinc-200">Mínimo: {RESTAURANT_INFO.minimumOrder}</strong>
                    </p>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Visual Showcase & Highlight Combos */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-3xl overflow-hidden border border-zinc-800/90 shadow-2xl bg-gradient-to-b from-zinc-900 to-zinc-950 p-2">
              
              {/* Featured Image */}
              <div className="relative h-72 sm:h-96 w-full rounded-2xl overflow-hidden group">
                <img
                  src="https://res.cloudinary.com/mbpsuaz1/image/upload/v1789323883/WhatsApp_Image_2026-09-13_at_2.21.07_PM.jpg"
                  alt="Sushi Paulista Destaque Hero"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent" />
                
                {/* Floating Highlight Badges */}
                <div className="absolute top-3 left-3 bg-zinc-950/85 backdrop-blur-md px-3 py-1.5 rounded-xl border border-rose-500/40 flex items-center gap-2 shadow-lg">
                  <span className="text-base">🥢</span>
                  <div>
                    <p className="text-[10px] text-zinc-400 uppercase tracking-wider font-bold">Padrão Chef SP</p>
                    <p className="text-xs font-extrabold text-white">Menos Arroz + Recheio</p>
                  </div>
                </div>

                <div className="absolute top-3 right-3 bg-zinc-950/85 backdrop-blur-md px-3 py-1.5 rounded-xl border border-amber-500/40 flex items-center gap-1.5 shadow-lg">
                  <span className="text-amber-400 font-bold text-xs">⭐ 5.0</span>
                  <span className="text-[10px] text-zinc-300">Google Review</span>
                </div>

                {/* Compact Bottom Overlay Card */}
                <div className="absolute bottom-2.5 left-2.5 right-2.5 bg-zinc-950/90 backdrop-blur-md p-2 sm:p-2.5 rounded-xl border border-zinc-800/90 flex items-center justify-between gap-2 shadow-xl">
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse shrink-0" />
                      <span className="text-[10px] sm:text-xs font-bold text-white truncate">
                        Combo 50 & 20 Peças
                      </span>
                    </div>
                    <span className="text-[9px] sm:text-[10px] text-amber-300 font-semibold block truncate">
                      Mais Pedidos • Menos Arroz 🍣
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-1.5 shrink-0">
                    <CardapioButton
                      id="hero-card-cardapio-btn"
                      size="sm"
                      text="Cardápio"
                    />
                    <a
                      href={getWhatsAppLink("Olá! Gostaria de saber mais sobre os Combos de 20 e 50 peças!")}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => playWhatsappTone()}
                      onMouseEnter={() => playHoverTick()}
                      className="p-1.5 sm:p-2 rounded-lg sm:rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white transition-colors cursor-pointer"
                      title="Pedir combo no WhatsApp"
                    >
                      <MessageCircle className="w-3.5 h-3.5 fill-white text-emerald-600" />
                    </a>
                  </div>
                </div>

              </div>

              {/* Mini Quick Bar under image */}
              <div className="p-3 grid grid-cols-3 gap-2 text-center text-[11px] text-zinc-400">
                <div className="p-2 rounded-lg bg-zinc-900/60 border border-zinc-800/60">
                  <span className="block text-zinc-100 font-bold">Salmão Fresco</span>
                  <span>Corte do Dia</span>
                </div>
                <div className="p-2 rounded-lg bg-zinc-900/60 border border-zinc-800/60">
                  <span className="block text-zinc-100 font-bold">Farinha Panko</span>
                  <span>Hot Crocante</span>
                </div>
                <div className="p-2 rounded-lg bg-zinc-900/60 border border-zinc-800/60">
                  <span className="block text-zinc-100 font-bold">Tarê da Casa</span>
                  <span>Receita Própria</span>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
