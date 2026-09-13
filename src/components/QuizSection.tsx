import { useState, useEffect } from 'react';
import { Sparkles, ArrowRight, ArrowLeft, RotateCcw, MessageCircle, Star, Instagram, CheckCircle2, Copy, Check, Play, Zap, Flame } from 'lucide-react';
import { QUIZ_QUESTIONS, QUIZ_RESULTS, RESTAURANT_INFO } from '../data/restaurantData';
import { QuizResultProfile } from '../types';
import { getWhatsAppLink } from '../utils/helpers';
import { CardapioButton } from './CardapioButton';
import { 
  playClickSound, 
  playHoverTick, 
  playQuizSelectTone, 
  playQuizCelebration, 
  playWhatsappTone, 
  playStartGameSound,
  playCardapioChime 
} from '../utils/soundEffects';

interface QuizSectionProps {
  onOpenMenu?: () => void;
}

type GamePhase = 'intro' | 'loading' | 'quiz' | 'result';

export function QuizSection({ onOpenMenu }: QuizSectionProps) {
  const [gamePhase, setGamePhase] = useState<GamePhase>('intro');
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [loadingStepText, setLoadingStepText] = useState('Iniciando o sistema...');
  const [currentStep, setCurrentStep] = useState(0); // 0 to 5 for questions
  const [answers, setAnswers] = useState<Record<number, { letter: string; scoreType: string }>>({});
  const [result, setResult] = useState<QuizResultProfile | null>(null);
  const [copiedLink, setCopiedLink] = useState(false);
  const [activeQuizImageIndex, setActiveQuizImageIndex] = useState(0);

  const quizImages = [
    "https://res.cloudinary.com/mbpsuaz1/image/upload/v1789323883/WhatsApp_Image_2026-09-13_at_3.05.08_PM.jpg",
    "https://res.cloudinary.com/mbpsuaz1/image/upload/v1789323883/WhatsApp_Image_2026-09-13_at_2.21.39_PM.jpg"
  ];

  // Alternating floating showcase images timer
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveQuizImageIndex((prev) => (prev === 0 ? 1 : 0));
    }, 3800);
    return () => clearInterval(timer);
  }, []);

  // Loading animation controller when user clicks START
  useEffect(() => {
    if (gamePhase !== 'loading') return;

    setLoadingProgress(0);
    const steps = [
      { progress: 25, text: '🥢 Afiando facas do Chef SP...', delay: 300 },
      { progress: 60, text: '🐟 Selecionando o salmão mais fresco...', delay: 900 },
      { progress: 90, text: '🍣 Montando seu teste gastronômico...', delay: 1500 },
      { progress: 100, text: '✨ Pronto! Bom Quiz!', delay: 2100 }
    ];

    const timeouts: NodeJS.Timeout[] = [];

    steps.forEach(({ progress, text, delay }) => {
      const t = setTimeout(() => {
        setLoadingProgress(progress);
        setLoadingStepText(text);
        if (progress === 100) {
          setTimeout(() => {
            playCardapioChime();
            setGamePhase('quiz');
            setCurrentStep(0);
          }, 350);
        }
      }, delay);
      timeouts.push(t);
    });

    return () => {
      timeouts.forEach(t => clearTimeout(t));
    };
  }, [gamePhase]);

  const handleStartGame = () => {
    playStartGameSound();
    setGamePhase('loading');
  };

  const currentQuestion = QUIZ_QUESTIONS[currentStep];

  const handleSelectOption = (letter: 'A' | 'B' | 'C' | 'D', scoreType: string) => {
    playQuizSelectTone();
    const updatedAnswers = {
      ...answers,
      [currentQuestion.id]: { letter, scoreType }
    };
    setAnswers(updatedAnswers);

    // If it's the last question, calculate result
    if (currentStep === QUIZ_QUESTIONS.length - 1) {
      calculateResult(updatedAnswers);
    } else {
      setCurrentStep(prev => prev + 1);
    }
  };

  const calculateResult = (finalAnswers: Record<number, { letter: string; scoreType: string }>) => {
    const scoreCounts: Record<string, number> = {
      iniciante_hot: 0,
      classico_salmao: 0,
      expert_sashimi: 0,
      familia_banquete: 0
    };

    Object.values(finalAnswers).forEach(ans => {
      if (scoreCounts[ans.scoreType] !== undefined) {
        scoreCounts[ans.scoreType] += 1;
      }
    });

    // Find highest score
    let bestType = 'classico_salmao';
    let maxCount = -1;

    Object.entries(scoreCounts).forEach(([type, count]) => {
      if (count > maxCount) {
        maxCount = count;
        bestType = type;
      }
    });

    setResult(QUIZ_RESULTS[bestType] || QUIZ_RESULTS['classico_salmao']);
    setGamePhase('result');
    playQuizCelebration();
  };

  const handlePrevious = () => {
    playClickSound();
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleRestart = () => {
    playClickSound();
    setAnswers({});
    setResult(null);
    setCurrentStep(0);
    setGamePhase('intro');
  };

  const handleShareQuiz = () => {
    playClickSound();
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <section id="quiz-sushi" className="py-16 md:py-24 bg-zinc-950 relative overflow-hidden border-b border-zinc-800/80">
      {/* Background Decorative Lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-rose-600/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute left-8 top-10 text-zinc-900/40 font-['Yuji_Boku',serif] text-8xl select-none pointer-events-none">
        美味
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Minigame Section Header */}
        <div className="text-center space-y-3 mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-gradient-to-r from-rose-500/20 to-amber-500/20 border border-rose-500/30 text-rose-300 text-xs sm:text-sm font-bold shadow-inner">
            <Sparkles className="w-4 h-4 text-amber-400 animate-spin" style={{ animationDuration: '6s' }} />
            <span>Minigame Interativo: Quiz Gastronômico</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white font-['Cinzel',serif] tracking-tight">
            Qual Sushi Combina Com Você?
          </h2>
          <p className="text-sm sm:text-base text-zinc-300 max-w-2xl mx-auto leading-relaxed">
            Responda a 6 perguntas rápidas e descubra o combinado perfeito para o seu paladar hoje, com padrão Chef SP e menos arroz! 🍣✨
          </p>
        </div>

        {/* PHASE 1: INTRO SCREEN WITH ALTERNATING IMAGES & START BUTTON */}
        {gamePhase === 'intro' && (
          <div className="rounded-3xl bg-zinc-900/90 border border-zinc-800 p-6 sm:p-10 shadow-2xl backdrop-blur-xl text-center space-y-8 animate-in fade-in zoom-in-95 duration-300">
            
            {/* Alternating Floating Image Showcase Block */}
            <div className="max-w-md mx-auto rounded-2xl bg-gradient-to-r from-rose-600/30 via-amber-500/30 to-pink-600/30 p-0.5 shadow-xl shadow-rose-950/40">
              <div className="relative h-44 sm:h-56 w-full rounded-[14px] overflow-hidden bg-zinc-950 border border-zinc-800 flex items-center justify-center group">
                <img
                  src={quizImages[activeQuizImageIndex]}
                  alt="Sushi Paulista Quiz Destaque"
                  className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent flex items-end p-2.5 sm:p-3">
                  <div className="bg-zinc-950/85 backdrop-blur-md px-3 py-1.5 rounded-lg border border-rose-500/30 flex items-center gap-2 shadow-lg w-full justify-between">
                    <span className="text-[11px] sm:text-xs font-medium text-zinc-200 flex items-center gap-1.5 truncate">
                      <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-pulse shrink-0" />
                      <span className="truncate">Especialidades Sushi Paulista • Águas Belas</span>
                    </span>
                    <div className="flex gap-1 shrink-0">
                      {quizImages.map((_, idx) => (
                        <button
                          key={idx}
                          onClick={() => { playClickSound(); setActiveQuizImageIndex(idx); }}
                          className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${activeQuizImageIndex === idx ? 'w-4 bg-rose-500' : 'w-1.5 bg-zinc-700'}`}
                          title={`Ver imagem ${idx + 1}`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Benefits Badges */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-2xl mx-auto text-xs">
              <div className="p-3 rounded-2xl bg-zinc-950/80 border border-zinc-800 flex items-center justify-center gap-2 text-zinc-200">
                <span className="text-lg">⏱️</span>
                <span className="font-semibold">6 Perguntas Rápidas (1 min)</span>
              </div>
              <div className="p-3 rounded-2xl bg-zinc-950/80 border border-zinc-800 flex items-center justify-center gap-2 text-zinc-200">
                <span className="text-lg">👨‍🍳</span>
                <span className="font-semibold">Recomendação do Chef SP</span>
              </div>
              <div className="p-3 rounded-2xl bg-zinc-950/80 border border-zinc-800 flex items-center justify-center gap-2 text-zinc-200">
                <span className="text-lg">🎁</span>
                <span className="font-semibold">Desconto & Atendimento VIP</span>
              </div>
            </div>

            {/* BIG VIBRANT START BUTTON WITH SOUND */}
            <div className="pt-2 max-w-md mx-auto">
              <button
                onClick={handleStartGame}
                onMouseEnter={() => playHoverTick()}
                id="quiz-start-game-btn"
                className="relative overflow-hidden w-full group flex items-center justify-center gap-3 px-8 py-5 rounded-2xl font-black text-lg sm:text-xl text-white uppercase tracking-wider shadow-2xl transition-all duration-300 transform hover:scale-105 active:scale-95 cursor-pointer border-2 border-white/50 bg-gradient-to-r from-rose-600 via-amber-500 via-pink-600 via-purple-600 to-rose-600 animate-colorful-gradient animate-glow-rainbow"
              >
                <span className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/50 to-transparent pointer-events-none animate-sheen" />
                <Play className="w-6 h-6 fill-white text-white drop-shadow group-hover:scale-110 transition-transform" />
                <span className="relative z-10 drop-shadow-md">START • COMEÇAR QUIZ ➔</span>
                <Sparkles className="w-5 h-5 text-amber-200 animate-spin" style={{ animationDuration: '3s' }} />
              </button>
              <p className="text-xs text-zinc-400 mt-3">
                Toque no botão START para ligar os efeitos e descobrir seu prato ideal!
              </p>
            </div>

          </div>
        )}

        {/* PHASE 2: ANIMATED LOADING SCREEN BEFORE QUESTION 1 */}
        {gamePhase === 'loading' && (
          <div className="rounded-3xl bg-zinc-900/90 border border-zinc-800 p-8 sm:p-14 shadow-2xl backdrop-blur-xl text-center space-y-6 animate-in fade-in zoom-in-95 duration-200 max-w-xl mx-auto">
            
            {/* Spinning Food Animation */}
            <div className="relative w-24 h-24 mx-auto flex items-center justify-center">
              <div className="absolute inset-0 rounded-full border-4 border-rose-500/20 border-t-rose-500 animate-spin" style={{ animationDuration: '1s' }} />
              <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-rose-600 to-amber-500 flex items-center justify-center text-3xl shadow-lg shadow-rose-950 animate-bounce">
                🍣
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="text-xl sm:text-2xl font-extrabold text-white font-['Cinzel',serif]">
                Preparando Seu Quiz...
              </h3>
              <p className="text-sm font-semibold text-rose-300 min-h-[24px] animate-pulse">
                {loadingStepText}
              </p>
            </div>

            {/* Progress Bar */}
            <div className="w-full space-y-2">
              <div className="w-full h-3.5 bg-zinc-950 rounded-full overflow-hidden p-0.5 border border-zinc-700/60 shadow-inner">
                <div
                  className="h-full bg-gradient-to-r from-rose-500 via-amber-400 to-emerald-400 rounded-full transition-all duration-300 shadow-md"
                  style={{ width: `${loadingProgress}%` }}
                />
              </div>
              <div className="flex justify-between text-xs font-bold text-zinc-400">
                <span>Carregando ingredientes</span>
                <span className="text-amber-400">{loadingProgress}%</span>
              </div>
            </div>

          </div>
        )}

        {/* PHASE 3: ACTIVE QUIZ QUESTIONS */}
        {gamePhase === 'quiz' && currentQuestion && (
          <div className="rounded-3xl bg-zinc-900/90 border border-zinc-800 p-6 sm:p-10 shadow-2xl backdrop-blur-xl relative animate-in fade-in duration-300">
            
            {/* Progress Header */}
            <div className="space-y-3 pb-6 border-b border-zinc-800">
              <div className="flex items-center justify-between text-xs sm:text-sm font-semibold">
                <span className="text-rose-400 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping" />
                  Pergunta {currentStep + 1} de {QUIZ_QUESTIONS.length}
                </span>
                <span className="text-zinc-400">
                  {Math.round(((currentStep + 1) / QUIZ_QUESTIONS.length) * 100)}% Concluído
                </span>
              </div>
              
              {/* Animated Progress Bar */}
              <div className="w-full h-2.5 bg-zinc-800 rounded-full overflow-hidden p-0.5 border border-zinc-700/50">
                <div 
                  className="h-full bg-gradient-to-r from-rose-500 via-red-500 to-amber-400 rounded-full transition-all duration-300 shadow-sm"
                  style={{ width: `${((currentStep + 1) / QUIZ_QUESTIONS.length) * 100}%` }}
                />
              </div>
            </div>

            {/* Question Title & Subtitle */}
            <div className="py-6 space-y-2">
              <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight leading-snug">
                {currentQuestion.question}
              </h3>
              {currentQuestion.subtitle && (
                <p className="text-xs sm:text-sm text-zinc-400">
                  {currentQuestion.subtitle}
                </p>
              )}
            </div>

            {/* 4 Options Grid (A, B, C, D) */}
            <div className="grid grid-cols-1 gap-3.5 sm:gap-4 pt-2">
              {currentQuestion.options.map((opt) => {
                const isSelected = answers[currentQuestion.id]?.letter === opt.letter;
                return (
                  <button
                    key={opt.letter}
                    onClick={() => handleSelectOption(opt.letter, opt.scoreType)}
                    onMouseEnter={() => playHoverTick()}
                    id={`quiz-q${currentQuestion.id}-opt-${opt.letter.toLowerCase()}`}
                    className={`group w-full p-4 sm:p-5 rounded-2xl text-left border transition-all flex items-center gap-4 cursor-pointer relative overflow-hidden active:scale-98 ${
                      isSelected
                        ? 'bg-rose-500/20 border-rose-500 shadow-lg shadow-rose-950/60 ring-1 ring-rose-400'
                        : 'bg-zinc-950/70 hover:bg-zinc-800/80 border-zinc-800 hover:border-zinc-700'
                    }`}
                  >
                    {/* Letter Badge */}
                    <div className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center font-extrabold text-sm sm:text-base transition-colors shrink-0 ${
                      isSelected
                        ? 'bg-rose-600 text-white shadow-md'
                        : 'bg-zinc-900 text-zinc-300 border border-zinc-700 group-hover:bg-zinc-800 group-hover:text-white'
                    }`}>
                      {opt.letter}
                    </div>

                    {/* Option Text */}
                    <div className="flex-1 pr-2">
                      <p className="text-sm sm:text-base font-semibold text-zinc-200 group-hover:text-white leading-snug">
                        {opt.text}
                      </p>
                    </div>

                    {/* Emoji / Icon indicator */}
                    <div className="text-xl sm:text-2xl shrink-0 opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all">
                      {opt.icon}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Bottom Nav Controls */}
            <div className="mt-8 pt-6 border-t border-zinc-800/80 flex items-center justify-between">
              <button
                onClick={handlePrevious}
                onMouseEnter={() => playHoverTick()}
                disabled={currentStep === 0}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold text-zinc-400 hover:text-white disabled:opacity-30 disabled:pointer-events-none transition-colors cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Voltar anterior</span>
              </button>

              <button
                onClick={handleRestart}
                onMouseEnter={() => playHoverTick()}
                className="inline-flex items-center gap-1.5 text-xs text-zinc-400 hover:text-rose-400 transition-colors cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reiniciar Minigame</span>
              </button>
            </div>

          </div>
        )}

        {/* PHASE 4: FINAL DO QUIZ & CHAMADAS PARA AÇÃO (CTAS FINAIS) */}
        {gamePhase === 'result' && result && (
          <div className="rounded-3xl bg-zinc-900/95 border-2 border-rose-500/40 p-6 sm:p-10 shadow-2xl backdrop-blur-xl relative overflow-hidden animate-in fade-in zoom-in-95 duration-300">
            {/* Background celebration glow */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-rose-600/15 rounded-full blur-3xl pointer-events-none" />
            
            {/* Top Banner Celebration */}
            <div className="text-center space-y-3 pb-8 border-b border-zinc-800">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-bold text-xs sm:text-sm">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>🎉 Quiz Concluído com Sucesso!</span>
              </div>
              
              <h3 className="text-2xl sm:text-4xl font-extrabold text-white font-['Cinzel',serif]">
                Seu Prato Ideal: {result.title}
              </h3>

              {/* Prompt Required Mandatory Quote */}
              <div className="p-4 rounded-2xl bg-zinc-950/80 border border-amber-500/30 max-w-2xl mx-auto shadow-inner">
                <p className="text-sm sm:text-base text-zinc-200 leading-relaxed font-medium">
                  "Parabéns por completar o Quiz! O seu prato ideal está te esperando com peixe fresco, preparo profissional e aquele padrão impecável de <strong className="text-amber-400 font-extrabold">'Menos Arroz + RECHEIO'</strong>!"
                </p>
              </div>
            </div>

            {/* Matched Dish Profile Showcase */}
            <div className="py-8 grid sm:grid-cols-12 gap-6 items-center">
              
              {/* Dish Image */}
              <div className="sm:col-span-5 relative rounded-2xl overflow-hidden border border-zinc-700 shadow-xl group aspect-square sm:aspect-auto sm:h-64">
                <img
                  src={result.imageUrl}
                  alt={result.recommendedDish}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-3 left-3 bg-zinc-950/85 backdrop-blur-md px-2.5 py-1 rounded-lg border border-rose-500/40 text-[11px] font-bold text-rose-300">
                  {result.piecesCount}
                </div>
                <div className="absolute bottom-3 right-3 bg-amber-500 text-zinc-950 font-black px-3 py-1 rounded-lg shadow-lg text-xs">
                  {result.priceEstimate}
                </div>
              </div>

              {/* Dish Details */}
              <div className="sm:col-span-7 space-y-4">
                <div>
                  <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">Recomendação Personalizada</span>
                  <h4 className="text-xl sm:text-2xl font-bold text-white mt-0.5">
                    {result.recommendedDish}
                  </h4>
                  <p className="text-xs font-semibold text-rose-400 italic mt-0.5">
                    {result.slogan}
                  </p>
                </div>

                <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                  {result.dishDescription}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {result.tags.map((tag, i) => (
                    <span key={i} className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-zinc-800 text-zinc-300 border border-zinc-700">
                      ✓ {tag}
                    </span>
                  ))}
                </div>

                <div className="pt-2 flex items-center gap-3">
                  <button
                    onClick={handleRestart}
                    onMouseEnter={() => playHoverTick()}
                    className="inline-flex items-center gap-1.5 text-xs text-zinc-400 hover:text-white transition-colors cursor-pointer"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    Refazer o Quiz
                  </button>
                  <span className="text-zinc-600">•</span>
                  <button
                    onClick={handleShareQuiz}
                    onMouseEnter={() => playHoverTick()}
                    className="inline-flex items-center gap-1.5 text-xs text-zinc-400 hover:text-white transition-colors cursor-pointer"
                  >
                    {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedLink ? "Link copiado!" : "Compartilhar Quiz"}</span>
                  </button>
                </div>
              </div>

            </div>

            {/* CTAS FINAIS COM BOTÃO COLORIDO & BRILHANTE */}
            <div className="pt-8 border-t border-zinc-800 space-y-6">
              
              <div>
                <h4 className="text-sm sm:text-base font-bold text-white flex items-center gap-2 mb-1">
                  <span>🚀 Escolha sua próxima ação:</span>
                </h4>
                <p className="text-xs text-zinc-400">
                  Selecione uma das opções abaixo para garantir seu pedido com desconto e atendimento prioritário:
                </p>
              </div>

              {/* Pronto para comer? */}
              <div className="space-y-3">
                <span className="text-xs font-bold text-rose-400 uppercase tracking-wider block">
                  Pronto para comer?
                </span>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  {/* 🔴 [ ABRIR CARDÁPIO COMPLETO ] -> Colorful Glowing Animated Cardápio Button */}
                  <CardapioButton
                    id="quiz-final-cta-cardapio"
                    text="🔴 📖 ABRIR CARDÁPIO COMPLETO"
                    size="md"
                    showSparkles={true}
                  />

                  {/* 🟢 [ FAZER PEDIDO VIA WHATSAPP ] */}
                  <a
                    href={getWhatsAppLink(result.whatsappMessage)}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => playWhatsappTone()}
                    onMouseEnter={() => playHoverTick()}
                    id="quiz-final-cta-whatsapp"
                    className="group flex items-center justify-center gap-3 px-6 py-4 rounded-2xl bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-500 hover:to-green-500 text-white font-extrabold text-sm sm:text-base shadow-lg shadow-emerald-950/60 hover:shadow-emerald-600/30 transition-all transform active:scale-98 border border-emerald-400/30 cursor-pointer"
                  >
                    <MessageCircle className="w-5 h-5 fill-white text-emerald-600" />
                    <span>🟢 💬 FAZER PEDIDO VIA WHATSAPP</span>
                  </a>
                </div>
              </div>

              {/* Secondary Engagement Actions */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
                {/* ⭐ [ DEIXAR AVALIAÇÃO 5 ESTRELAS NO GOOGLE ] */}
                <a
                  href={RESTAURANT_INFO.googleReviewUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => playClickSound()}
                  onMouseEnter={() => playHoverTick()}
                  id="quiz-final-cta-google"
                  className="flex items-center justify-center gap-2.5 px-5 py-3.5 rounded-2xl bg-zinc-950 hover:bg-zinc-800 text-amber-300 hover:text-amber-200 font-bold text-xs sm:text-sm border border-amber-500/30 transition-all transform active:scale-98 shadow-md cursor-pointer"
                >
                  <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                  <span>⭐ 🌟 AVALIAÇÃO 5 ESTRELAS GOOGLE</span>
                </a>

                {/* 📸 [ SEGUIR @SUSHI_PAULISTA NO INSTAGRAM ] */}
                <a
                  href={RESTAURANT_INFO.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => playClickSound()}
                  onMouseEnter={() => playHoverTick()}
                  id="quiz-final-cta-instagram"
                  className="flex items-center justify-center gap-2.5 px-5 py-3.5 rounded-2xl bg-zinc-950 hover:bg-zinc-800 text-pink-300 hover:text-pink-200 font-bold text-xs sm:text-sm border border-pink-500/30 transition-all transform active:scale-98 shadow-md cursor-pointer"
                >
                  <Instagram className="w-4 h-4 text-pink-400" />
                  <span>📸 📷 SEGUIR NO INSTAGRAM</span>
                </a>
              </div>

            </div>

          </div>
        )}

      </div>
    </section>
  );
}
