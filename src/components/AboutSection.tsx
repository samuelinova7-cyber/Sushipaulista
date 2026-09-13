import { Award, Sparkles, Fish, Truck, Heart, CheckCircle } from 'lucide-react';
import { CHEF_STORY } from '../data/restaurantData';
import { CardapioButton } from './CardapioButton';

interface AboutSectionProps {
  onOpenMenu?: () => void;
}

export function AboutSection({ onOpenMenu }: AboutSectionProps) {
  return (
    <section id="sobre-nos" className="py-16 md:py-20 bg-zinc-950 relative overflow-hidden border-b border-zinc-800/80">
      {/* Background Japanese kanji watermark */}
      <div className="absolute right-10 top-1/2 -translate-y-1/2 text-zinc-900/40 font-['Yuji_Boku',serif] text-9xl select-none pointer-events-none">
        匠心
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-rose-400" />
            <span>Tradição & Excelência Gastronômica</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white font-['Cinzel',serif] tracking-tight">
            Sobre Nós: A História do Chef Paulista
          </h2>
          <p className="text-sm sm:text-base text-zinc-400">
            A bagagem de anos nos principais centros da gastronomia japonesa de São Paulo, agora disponível para você em Águas Belas.
          </p>
        </div>

        {/* Main Chef Quote Card */}
        <div className="relative max-w-5xl mx-auto rounded-3xl bg-gradient-to-b from-zinc-900/95 to-zinc-950 p-6 sm:p-10 border border-rose-500/30 shadow-2xl shadow-rose-950/30 mb-12">
          
          <div className="flex flex-col lg:flex-row items-center lg:items-start gap-8 sm:gap-10">
            
            {/* Chef Avatar / Prominent Photo Showcase */}
            <div className="flex-shrink-0 relative">
              <div className="w-56 h-56 sm:w-64 sm:h-64 md:w-72 md:h-72 rounded-3xl bg-gradient-to-tr from-rose-500 via-amber-400 to-pink-600 p-1.5 shadow-2xl shadow-rose-950/80 group">
                <div className="w-full h-full rounded-[20px] overflow-hidden border-2 border-zinc-950 bg-zinc-900 flex items-center justify-center">
                  <img
                    src="https://res.cloudinary.com/mbpsuaz1/image/upload/v1789323883/WhatsApp_Image_2026-09-13_at_2.21.08_PM.jpg"
                    alt="Chef SP Sushi Paulista"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </div>
              <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-amber-500 to-rose-600 text-white px-4 py-1.5 rounded-full shadow-xl border-2 border-zinc-950 text-xs sm:text-sm font-black uppercase tracking-wider flex items-center gap-1.5 whitespace-nowrap">
                <span>Chef SP</span>
                <span>👨‍🍳</span>
                <span className="text-amber-200">★ ★ ★ ★ ★</span>
              </div>
            </div>

            {/* Chef Quote Statement */}
            <div className="space-y-4 text-center lg:text-left flex-1 pt-2">
              <p className="text-lg sm:text-xl text-rose-300 font-bold italic">
                "{CHEF_STORY.welcomeQuote}"
              </p>
              
              <blockquote className="text-sm sm:text-base md:text-lg text-zinc-200 leading-relaxed font-normal">
                "{CHEF_STORY.historyParagraph}"
              </blockquote>

              <p className="text-sm sm:text-base md:text-lg text-amber-300 font-medium italic">
                "{CHEF_STORY.closingQuote}"
              </p>

              <div className="pt-2 flex flex-wrap items-center justify-center lg:justify-start gap-4 text-xs sm:text-sm text-zinc-400 font-medium">
                <span className="flex items-center gap-1.5 text-zinc-300">
                  <Award className="w-4 h-4 text-rose-400" />
                  Ex-Super Grill Express (Shopping Cidade SP / Av. Paulista)
                </span>
                <span className="flex items-center gap-1.5 text-amber-300">
                  <Heart className="w-4 h-4 fill-amber-400/20 text-amber-400" />
                  Cuidado & Carinho em cada peça
                </span>
              </div>
            </div>

          </div>

          {/* Prompt Requested CTA Button: Colorful Glowing Cardapio Button */}
          <div className="mt-8 pt-6 border-t border-zinc-800/80 flex flex-col sm:flex-row items-center justify-center gap-4">
            <CardapioButton
              id="about-cta-acessar-cardapio"
              text="🍣 🥢 ACESSAR CARDÁPIO E FAZER SEU PEDIDO"
              size="lg"
              showSparkles={true}
              className="w-full sm:w-auto"
            />
          </div>

        </div>

        {/* 4 Pillars of Quality */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          <div className="p-5 rounded-2xl bg-zinc-900/60 border border-zinc-800/80 space-y-2.5 hover:border-zinc-700 transition-all">
            <div className="w-10 h-10 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 flex items-center justify-center">
              <Award className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white font-['Cinzel',serif]">Experiência de SP</h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Técnica e rigor adquiridos no Super Grill Express da emblemática Avenida Paulista em São Paulo.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-zinc-900/60 border border-zinc-800/80 space-y-2.5 hover:border-zinc-700 transition-all">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center">
              <Sparkles className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white font-['Cinzel',serif]">Menos Arroz + Recheio</h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Nosso compromisso: peças generosamente recheadas com salmão e ingredientes nobres sem economia.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-zinc-900/60 border border-zinc-800/80 space-y-2.5 hover:border-zinc-700 transition-all">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center">
              <Fish className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white font-['Cinzel',serif]">Peixes Frescos do Dia</h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Cortes precisos e frescor rigoroso para garantir o sabor incomparável e textura perfeita.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-zinc-900/60 border border-zinc-800/80 space-y-2.5 hover:border-zinc-700 transition-all">
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400 flex items-center justify-center">
              <Truck className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white font-['Cinzel',serif]">Delivery Seguro & Quente</h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Embalagens pensadas para manter os fritos crocantes e os sushis frios e impecáveis na sua casa.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}
