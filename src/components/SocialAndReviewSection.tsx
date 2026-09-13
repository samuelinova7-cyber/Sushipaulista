import React, { useState, useRef, useEffect } from 'react';
import { Instagram, Star, ExternalLink, MessageCircle, Heart, Share2, Play, Volume2, ChevronLeft, ChevronRight, Sparkles, Film } from 'lucide-react';
import { RESTAURANT_INFO, REVIEWS_LIST, INSTAGRAM_REELS } from '../data/restaurantData';
import { InstagramReel } from '../types';
import { playClickSound, playHoverTick, playSwipeWhoosh } from '../utils/soundEffects';

export function SocialAndReviewSection() {
  const [isPaused, setIsPaused] = useState(false);
  const [selectedReel, setSelectedReel] = useState<InstagramReel | null>(null);
  
  // Reels Carousel refs & state
  const carouselRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  // Google Reviews Carousel refs & state
  const reviewsCarouselRef = useRef<HTMLDivElement>(null);
  const [isReviewsPaused, setIsReviewsPaused] = useState(false);
  const [isReviewsDragging, setIsReviewsDragging] = useState(false);
  const [reviewsStartX, setReviewsStartX] = useState(0);
  const [reviewsScrollLeft, setReviewsScrollLeft] = useState(0);

  // Auto-scroll loop for Instagram Reels
  useEffect(() => {
    let animationFrameId: number;
    let lastTime = performance.now();

    const scrollLoop = (time: number) => {
      const delta = time - lastTime;
      lastTime = time;

      if (!isPaused && !isDragging && carouselRef.current) {
        const scrollAmount = (delta / 1000) * 40;
        carouselRef.current.scrollLeft += scrollAmount;

        if (
          carouselRef.current.scrollLeft >=
          carouselRef.current.scrollWidth - carouselRef.current.clientWidth - 10
        ) {
          carouselRef.current.scrollLeft = 0;
        }
      }

      animationFrameId = requestAnimationFrame(scrollLoop);
    };

    animationFrameId = requestAnimationFrame(scrollLoop);
    return () => cancelAnimationFrame(animationFrameId);
  }, [isPaused, isDragging]);

  // Auto-scroll loop for Google Reviews (side-by-side auto moving)
  useEffect(() => {
    let animationFrameId: number;
    let lastTime = performance.now();

    const reviewScrollLoop = (time: number) => {
      const delta = time - lastTime;
      lastTime = time;

      if (!isReviewsPaused && !isReviewsDragging && reviewsCarouselRef.current) {
        const scrollAmount = (delta / 1000) * 35; // smooth marquee speed
        reviewsCarouselRef.current.scrollLeft += scrollAmount;

        if (
          reviewsCarouselRef.current.scrollLeft >=
          reviewsCarouselRef.current.scrollWidth - reviewsCarouselRef.current.clientWidth - 10
        ) {
          reviewsCarouselRef.current.scrollLeft = 0;
        }
      }

      animationFrameId = requestAnimationFrame(reviewScrollLoop);
    };

    animationFrameId = requestAnimationFrame(reviewScrollLoop);
    return () => cancelAnimationFrame(animationFrameId);
  }, [isReviewsPaused, isReviewsDragging]);

  // Drag-to-scroll Mouse handlers for Reels
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!carouselRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - carouselRef.current.offsetLeft);
    setScrollLeft(carouselRef.current.scrollLeft);
    playSwipeWhoosh();
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !carouselRef.current) return;
    e.preventDefault();
    const x = e.pageX - carouselRef.current.offsetLeft;
    const walk = (x - startX) * 1.5;
    carouselRef.current.scrollLeft = scrollLeft - walk;
  };

  // Drag-to-scroll Mouse handlers for Google Reviews
  const handleReviewMouseDown = (e: React.MouseEvent) => {
    if (!reviewsCarouselRef.current) return;
    setIsReviewsDragging(true);
    setReviewsStartX(e.pageX - reviewsCarouselRef.current.offsetLeft);
    setReviewsScrollLeft(reviewsCarouselRef.current.scrollLeft);
    playSwipeWhoosh();
  };

  const handleReviewMouseUp = () => {
    setIsReviewsDragging(false);
  };

  const handleReviewMouseMove = (e: React.MouseEvent) => {
    if (!isReviewsDragging || !reviewsCarouselRef.current) return;
    e.preventDefault();
    const x = e.pageX - reviewsCarouselRef.current.offsetLeft;
    const walk = (x - reviewsStartX) * 1.5;
    reviewsCarouselRef.current.scrollLeft = reviewsScrollLeft - walk;
  };

  // Scroll manually left or right for Reels
  const handleScrollManual = (direction: 'left' | 'right') => {
    if (!carouselRef.current) return;
    playClickSound();
    playSwipeWhoosh();
    const scrollOffset = 280;
    carouselRef.current.scrollBy({
      left: direction === 'left' ? -scrollOffset : scrollOffset,
      behavior: 'smooth'
    });
  };

  // Scroll manually left or right for Reviews
  const handleReviewScrollManual = (direction: 'left' | 'right') => {
    if (!reviewsCarouselRef.current) return;
    playClickSound();
    playSwipeWhoosh();
    const scrollOffset = 320;
    reviewsCarouselRef.current.scrollBy({
      left: direction === 'left' ? -scrollOffset : scrollOffset,
      behavior: 'smooth'
    });
  };

  return (
    <section id="redes-sociais-avaliacoes" className="py-16 md:py-24 bg-zinc-900/40 border-b border-zinc-800/80 relative overflow-hidden">
      
      {/* Background Japanese Watermark */}
      <div className="absolute right-6 top-10 text-zinc-900/50 font-['Yuji_Boku',serif] text-8xl select-none pointer-events-none">
        映像
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-gradient-to-r from-pink-500/10 to-amber-500/10 border border-pink-500/20 text-pink-400 text-xs font-bold">
            <Instagram className="w-3.5 h-3.5 text-pink-400" />
            <span>Vídeos Oficiais & Comunidade</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white font-['Cinzel',serif] tracking-tight">
            Instagram Reels & Avaliações Google
          </h2>
          <p className="text-sm sm:text-base text-zinc-400">
            Acompanhe nossos vídeos exclusivos do preparo dos combos em Águas Belas e confira as 10 avaliações 5 estrelas dos nossos clientes!
          </p>
        </div>

        {/* ================= INSTAGRAM REELS SECTION (Vídeos Cloudinary) ================= */}
        <div className="space-y-6">
          
          {/* Top Bar for Instagram section */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-zinc-950/80 p-4 sm:p-6 rounded-3xl border border-zinc-800/90 shadow-xl">
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-yellow-500 via-pink-600 to-purple-600 p-0.5 shadow-lg shadow-pink-900/30 shrink-0">
                <div className="w-full h-full bg-zinc-950 rounded-[14px] flex items-center justify-center">
                  <Instagram className="w-6 h-6 text-pink-400" />
                </div>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-1.5">
                    <span>📸 Siga-nos no Instagram</span>
                  </h3>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-pink-500/20 text-pink-300 border border-pink-500/30 flex items-center gap-1">
                    <Film className="w-3 h-3 text-pink-400" />
                    Reels & Vídeos Oficiais
                  </span>
                </div>
                <p className="text-xs text-pink-400 font-semibold">{RESTAURANT_INFO.instagramHandle}</p>
                <p className="text-xs text-zinc-400 mt-0.5">
                  Assista aos vídeos reais dos nossos combos de 20 e 50 peças e do preparo artesanal!
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
              {/* Carousel Manual Controls */}
              <div className="flex items-center gap-1.5 bg-zinc-900 p-1 rounded-xl border border-zinc-800">
                <button
                  onClick={() => handleScrollManual('left')}
                  id="reels-scroll-left-btn"
                  className="p-2 rounded-lg hover:bg-zinc-800 text-zinc-300 hover:text-white transition-colors cursor-pointer"
                  title="Rolar para esquerda"
                  aria-label="Voltar vídeos"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <span className="text-[10px] font-bold text-zinc-500 px-1 select-none">
                  Arrastar ⇄
                </span>
                <button
                  onClick={() => handleScrollManual('right')}
                  id="reels-scroll-right-btn"
                  className="p-2 rounded-lg hover:bg-zinc-800 text-zinc-300 hover:text-white transition-colors cursor-pointer"
                  title="Rolar para direita"
                  aria-label="Avançar vídeos"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              {/* Instagram Follow Button */}
              <a
                href={RESTAURANT_INFO.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => playClickSound()}
                onMouseEnter={() => playHoverTick()}
                id="social-cta-instagram-btn"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-pink-600 via-rose-600 to-purple-600 hover:from-pink-500 hover:to-purple-500 text-white font-extrabold text-xs sm:text-sm shadow-md shadow-pink-950/50 transition-all transform active:scale-95 whitespace-nowrap"
              >
                <Instagram className="w-4 h-4" />
                <span>📸 Siga o {RESTAURANT_INFO.instagramHandle}</span>
                <ExternalLink className="w-3.5 h-3.5 opacity-70" />
              </a>
            </div>
          </div>

          {/* Interactive Drag & Auto-Scrolling Reels Marquee with Cloudinary Videos */}
          <div className="relative group/marquee">
            
            <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-zinc-950 to-transparent z-10 pointer-events-none hidden sm:block" />
            <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-zinc-950 to-transparent z-10 pointer-events-none hidden sm:block" />

            <div
              ref={carouselRef}
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => { setIsPaused(false); setIsDragging(false); }}
              onMouseDown={handleMouseDown}
              onMouseUp={handleMouseUp}
              onMouseMove={handleMouseMove}
              onTouchStart={() => { setIsPaused(true); playSwipeWhoosh(); }}
              onTouchEnd={() => setIsPaused(false)}
              className="flex gap-4 sm:gap-6 overflow-x-auto no-scrollbar py-2 px-1 cursor-grab active:cursor-grabbing select-none scroll-smooth"
            >
              {[...INSTAGRAM_REELS, ...INSTAGRAM_REELS].map((reel, index) => (
                <div
                  key={`${reel.id}-${index}`}
                  onClick={() => {
                    playClickSound();
                    setSelectedReel(reel);
                  }}
                  className="relative flex-shrink-0 w-56 sm:w-64 rounded-3xl overflow-hidden border border-zinc-800/90 shadow-2xl bg-zinc-950 group/reel transition-all duration-300 hover:border-pink-500/50 hover:scale-[1.03] hover:shadow-pink-950/40 cursor-pointer"
                  style={{ aspectRatio: '9/16' }}
                >
                  {/* Video or Image Preview */}
                  {reel.videoUrl ? (
                    <video
                      src={reel.videoUrl}
                      autoPlay
                      muted
                      loop
                      playsInline
                      className="w-full h-full object-cover group-hover/reel:scale-105 transition-transform duration-700"
                    />
                  ) : (
                    <img
                      src={reel.imageUrl}
                      alt={reel.title}
                      className="w-full h-full object-cover group-hover/reel:scale-105 transition-transform duration-700"
                      referrerPolicy="no-referrer"
                      draggable={false}
                    />
                  )}

                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/30 to-zinc-950/60" />

                  {/* Top Header inside Reel */}
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
                    <span className="flex items-center gap-1.5 text-[10px] font-black px-2 py-0.5 rounded-full bg-zinc-950/80 backdrop-blur-md text-white border border-white/20">
                      <Film className="w-3 h-3 text-pink-400" />
                      <span>Reels</span>
                    </span>

                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-rose-600/90 text-white shadow-sm">
                      {reel.tag}
                    </span>
                  </div>

                  {/* Center Play Button Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="w-12 h-12 rounded-full bg-zinc-950/70 backdrop-blur-md border border-white/30 flex items-center justify-center text-white shadow-xl group-hover/reel:scale-110 group-hover/reel:bg-pink-600 group-hover/reel:border-pink-400 transition-all">
                      <Play className="w-5 h-5 fill-white ml-0.5" />
                    </div>
                  </div>

                  {/* Right Side Reel Actions */}
                  <div className="absolute right-2.5 bottom-16 flex flex-col items-center gap-3 text-white pointer-events-none">
                    <div className="flex flex-col items-center">
                      <div className="p-1.5 rounded-full bg-zinc-950/60 backdrop-blur-sm border border-white/10">
                        <Heart className="w-4 h-4 fill-pink-500 text-pink-500" />
                      </div>
                      <span className="text-[10px] font-bold mt-0.5 drop-shadow">{reel.likes}</span>
                    </div>

                    <div className="flex flex-col items-center">
                      <div className="p-1.5 rounded-full bg-zinc-950/60 backdrop-blur-sm border border-white/10">
                        <MessageCircle className="w-4 h-4 fill-white/80 text-transparent" />
                      </div>
                      <span className="text-[10px] font-bold mt-0.5 drop-shadow">{reel.commentsCount}</span>
                    </div>

                    <div className="p-1.5 rounded-full bg-zinc-950/60 backdrop-blur-sm border border-white/10">
                      <Share2 className="w-4 h-4 text-white" />
                    </div>
                  </div>

                  {/* Bottom Reel Caption */}
                  <div className="absolute bottom-3 left-3 right-12 space-y-1 text-left pointer-events-none">
                    <p className="text-xs font-bold text-white drop-shadow line-clamp-1">
                      {RESTAURANT_INFO.instagramHandle}
                    </p>
                    <p className="text-[11px] text-zinc-200 line-clamp-2 leading-tight drop-shadow">
                      {reel.caption}
                    </p>
                    <div className="flex items-center gap-1 text-[10px] text-zinc-300 font-medium pt-0.5">
                      <Volume2 className="w-3 h-3 text-pink-400 shrink-0" />
                      <span className="truncate">{reel.audioTrack}</span>
                    </div>
                  </div>

                </div>
              ))}
            </div>

            <div className="text-center pt-2">
              <span className="text-xs text-zinc-500 flex items-center justify-center gap-1.5">
                <span>👈 Arraste para os lados para ver mais vídeos ou clique em qualquer Reel</span>
              </span>
            </div>

          </div>

        </div>

        {/* ================= GOOGLE REVIEWS 5.0 SECTION (10 Comentários Lado a Lado + Arrastar + Auto-Scroll) ================= */}
        <div className="rounded-3xl bg-zinc-950 p-6 sm:p-8 border border-zinc-800/90 shadow-2xl space-y-6 relative overflow-hidden">
          <div className="absolute -top-16 -right-16 w-44 h-44 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

          {/* Google Review Header */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-500 to-yellow-400 p-0.5 shadow-lg shadow-amber-900/30 shrink-0">
                <div className="w-full h-full bg-zinc-950 rounded-[14px] flex items-center justify-center">
                  <span className="text-xl">🌟</span>
                </div>
              </div>
              <div>
                <h3 className="text-lg sm:text-xl font-bold text-white">⭐ 10 Avaliações Verificadas do Google</h3>
                <p className="text-xs text-amber-400 font-semibold">Nota 5.0 • Águas Belas - PE ({REVIEWS_LIST.length} depoimentos em destaque)</p>
              </div>
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
              {/* Reviews Manual Controls */}
              <div className="flex items-center gap-1.5 bg-zinc-900 p-1 rounded-xl border border-zinc-800">
                <button
                  onClick={() => handleReviewScrollManual('left')}
                  id="reviews-scroll-left-btn"
                  className="p-2 rounded-lg hover:bg-zinc-800 text-zinc-300 hover:text-white transition-colors cursor-pointer"
                  title="Rolar para esquerda"
                  aria-label="Voltar avaliações"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <span className="text-[10px] font-bold text-zinc-500 px-1 select-none">
                  Arrastar Avaliações ⇄
                </span>
                <button
                  onClick={() => handleReviewScrollManual('right')}
                  id="reviews-scroll-right-btn"
                  className="p-2 rounded-lg hover:bg-zinc-800 text-zinc-300 hover:text-white transition-colors cursor-pointer"
                  title="Rolar para direita"
                  aria-label="Avançar avaliações"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              {/* Pontuação Atual 5.0 Badge */}
              <div className="hidden md:flex items-center gap-2 bg-zinc-900/90 border border-amber-500/30 px-4 py-2 rounded-2xl">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <span className="text-amber-400 font-black text-base">5.0</span>
                <span className="text-xs text-zinc-400 font-medium">({RESTAURANT_INFO.googleRatingCount} avaliações)</span>
              </div>
            </div>
          </div>

          {/* Prompt Required Text */}
          <div className="p-4 rounded-2xl bg-zinc-900/80 border border-amber-500/20 space-y-1.5">
            <p className="text-sm font-bold text-amber-300">
              "Sua opinião importa! Já nos conhece?"
            </p>
            <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
              Ajude-nos a continuar crescendo deixando sua avaliação de 5 estrelas no Google. Cada feedback nos motiva a manter o padrão impecável de menos arroz e mais recheio!
            </p>
          </div>

          {/* 10 Google Reviews Side-by-Side Carousel (Auto-scrolling + Drag-to-scroll) */}
          <div className="relative group/reviews">
            
            <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-zinc-950 to-transparent z-10 pointer-events-none hidden sm:block" />
            <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-zinc-950 to-transparent z-10 pointer-events-none hidden sm:block" />

            <div
              ref={reviewsCarouselRef}
              onMouseEnter={() => setIsReviewsPaused(true)}
              onMouseLeave={() => { setIsReviewsPaused(false); setIsReviewsDragging(false); }}
              onMouseDown={handleReviewMouseDown}
              onMouseUp={handleReviewMouseUp}
              onMouseMove={handleReviewMouseMove}
              onTouchStart={() => { setIsReviewsPaused(true); playSwipeWhoosh(); }}
              onTouchEnd={() => setIsReviewsPaused(false)}
              className="flex gap-4 overflow-x-auto no-scrollbar py-3 px-1 cursor-grab active:cursor-grabbing select-none scroll-smooth"
            >
              {[...REVIEWS_LIST, ...REVIEWS_LIST].map((rev, index) => (
                <div
                  key={`${rev.id}-${index}`}
                  className="flex-shrink-0 w-72 sm:w-80 p-5 rounded-2xl bg-zinc-900/70 border border-zinc-800/90 text-xs space-y-3 flex flex-col justify-between shadow-lg hover:border-amber-500/40 transition-all"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <div className={`w-8 h-8 rounded-full bg-gradient-to-tr ${rev.avatarColor} text-white font-bold text-xs flex items-center justify-center shadow-md`}>
                          {rev.author[0]}
                        </div>
                        <div>
                          <span className="font-bold text-zinc-100 block text-xs">{rev.author}</span>
                          <span className="text-[10px] text-zinc-400">{rev.location}</span>
                        </div>
                      </div>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-300 border border-amber-500/20">
                        Google Verificado
                      </span>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-0.5">
                        {[...Array(rev.rating)].map((_, i) => (
                          <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                        ))}
                      </div>
                      <span className="text-[10px] text-zinc-400 font-medium">{rev.date}</span>
                    </div>

                    <p className="text-zinc-200 text-xs italic leading-relaxed">"{rev.comment}"</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center pt-2">
              <span className="text-xs text-zinc-500 flex items-center justify-center gap-1.5">
                <span>👈 Arraste para o lado ou deixe rodando automaticamente para ver todas as 10 avaliações do Google</span>
              </span>
            </div>

          </div>

          {/* Google Review CTA Button */}
          <div className="pt-2 text-center">
            <a
              href={RESTAURANT_INFO.googleReviewUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => playClickSound()}
              onMouseEnter={() => playHoverTick()}
              id="social-cta-google-review-btn"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-2xl bg-gradient-to-r from-amber-500 via-amber-600 to-yellow-500 hover:from-amber-400 hover:to-amber-500 text-zinc-950 font-black text-sm sm:text-base shadow-lg shadow-amber-950/50 hover:shadow-amber-500/30 transition-all transform active:scale-98 cursor-pointer"
            >
              <Star className="w-5 h-5 fill-zinc-950" />
              <span>⭐ Avaliar no Google (Deixar 5 Estrelas)</span>
              <ExternalLink className="w-4 h-4 opacity-70" />
            </a>
          </div>

        </div>

      </div>

      {/* Reel Preview Modal with Cloudinary Video Player */}
      {selectedReel && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/90 backdrop-blur-md animate-in fade-in duration-200"
          onClick={() => setSelectedReel(null)}
        >
          <div 
            className="relative w-full max-w-sm rounded-3xl overflow-hidden bg-zinc-950 border border-zinc-800 shadow-2xl flex flex-col"
            onClick={(e) => e.stopPropagation()}
            style={{ aspectRatio: '9/16' }}
          >
            {selectedReel.videoUrl ? (
              <video
                src={selectedReel.videoUrl}
                controls
                autoPlay
                playsInline
                className="w-full h-full object-cover"
              />
            ) : (
              <img
                src={selectedReel.imageUrl}
                alt={selectedReel.title}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            )}
            
            <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10 pointer-events-auto">
              <div className="flex items-center gap-2 text-white bg-zinc-950/80 px-3 py-1 rounded-full backdrop-blur-md">
                <Instagram className="w-4 h-4 text-pink-400" />
                <span className="font-bold text-xs">{RESTAURANT_INFO.instagramHandle}</span>
              </div>
              <button
                onClick={() => setSelectedReel(null)}
                className="w-8 h-8 rounded-full bg-zinc-900/90 text-zinc-300 hover:text-white flex items-center justify-center border border-white/20 cursor-pointer shadow-lg"
              >
                ✕
              </button>
            </div>

            {/* Bottom Modal Details */}
            <div className="absolute bottom-4 left-4 right-4 space-y-3 z-10 bg-zinc-950/80 backdrop-blur-md p-3 rounded-2xl border border-white/10">
              <p className="text-xs text-white leading-relaxed font-medium">
                {selectedReel.caption}
              </p>

              <a
                href={RESTAURANT_INFO.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => playClickSound()}
                className="w-full py-2.5 rounded-xl bg-gradient-to-r from-pink-600 via-rose-600 to-purple-600 text-white font-extrabold text-xs flex items-center justify-center gap-2 shadow-lg"
              >
                <Instagram className="w-4 h-4" />
                <span>Ver no Instagram Oficial</span>
              </a>
            </div>
          </div>
        </div>
      )}

    </section>
  );
}
