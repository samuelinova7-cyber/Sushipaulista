import { useState, useEffect, useRef } from 'react';
import { Sparkles, ArrowRight, ArrowLeft, RotateCcw, MessageCircle, Star, Instagram, CheckCircle2, Copy, Check, Play, Zap, Flame, Volume2, VolumeX, Film } from 'lucide-react';
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
  
  // Media carousel for Intro
  const [activeMediaIndex, setActiveMediaIndex] = useState(0);
  const introVideoRef = useRef<HTMLVideoElement | null>(null);

  // Question video controls & audio
  const questionVideoRef = useRef<HTMLVideoElement | null>(null);
  const [isQuestionAudioMuted, setIsQuestionAudioMuted] = useState(false);
  const [isVideoPlaying, setIsVideoPlaying] = useState(true);

  const introMediaList = [
    {
      type: 'video' as const,
      url: "https://res.cloudinary.com/h8uymlg5/video/upload/v1789510761/grok-video-2507bf03-7945-4d47-b3ea-e8736a23cc6c.mp4",
      label: "Especialidades Sushi Paulista • Águas Belas"
    },
    {
      type: 'image' as const,
      url: "https://res.cloudinary.com/mbpsuaz1/image/upload/v1789323883/WhatsApp_Image_2026-09-13_at_3.05.08_PM.jpg",
      label: "Combinados Exclusivos do Chef"
    },
    {
      type: 'image' as const,
      url: "https://res.cloudinary.com/mbpsuaz1/image/upload/v1789323883/WhatsApp_Image_2026-09-13_at_2.21.39_PM.jpg",
      label: "Padrão SP: Menos Arroz + Salmão Fresco"
    }
  ];

  // Alternating Intro Showcase: plays full video, then cycles through images
  useEffect(() => {
    if (gamePhase !== 'intro') return;

    const currentMedia = introMediaList[activeMediaIndex];

    if (currentMedia.type === 'image') {
      const timer = setTimeout(() => {
        setActiveMediaIndex((prev) => (prev + 1) % introMediaList.length);
      }, 4200);
      return () => clearTimeout(timer);
    }
  }, [activeMediaIndex, gamePhase, introMediaList.length]);

  const handleIntroVideoEnded = () => {
    setActiveMediaIndex((prev) => (prev + 1) % introMediaList.length);
  };

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

  // When changing step in quiz phase, ensure question video plays once with sound
  useEffect(() => {
    if (gamePhase === 'quiz' && questionVideoRef.current) {
      questionVideoRef.current.currentTime = 0;
      questionVideoRef.current.muted = isQuestionAudioMuted;
      questionVideoRef.current.play().then(() => {
        setIsVideoPlaying(true);
      }).catch(() => {
        // Fallback if browser requires muted initial start
        if (questionVideoRef.current) {
          questionVideoRef.current.muted = true;
          setIsQuestionAudioMuted(true);
          questionVideoRef.current.play().catch(() => {});
        }
      });
    }
  }, [currentStep, gamePhase, isQuestionAudioMuted]);

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
      }
    });

    // Match priority
    Object.entries(scoreCounts).forEach(([type, count]) => {
      if (count === maxCount) {
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

  const handleReplayQuestionVideo = () => {
    playClickSound();
    if (questionVideoRef.current) {
      questionVideoRef.current.currentTime = 0;
      questionVideoRef.current.muted = isQuestionAudioMuted;
      questionVideoRef.current.play().then(() => {
        setIsVideoPlaying(true);
      }).catch(() => {});
    }
  };

  const toggleQuestionAudio = () => {
    playClickSound();
    const newMutedState = !isQuestionAudioMuted;
    setIsQuestionAudioMuted(newMutedState);
    if (questionVideoRef.current) {
      questionVideoRef.current.muted = newMutedState;
    }
  };

  const handleShareQuiz = () => {
    playClickSound();
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <section id="quiz-sushi" className="py-6 sm:py-10 bg-zinc-950 relative overflow-hidden border-b border-zinc-800/80">
      {/* Background Decorative Lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-rose-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute left-6 top-6 text-zinc-900/40 font-['Yuji_Boku',serif] text-7xl select-none pointer-events-none">
        美味
      </div>

      <div className="max-w-4xl mx-auto px-3 sm:px-6 lg:px-8 relative z-10">
        
        {/* Minigame Section Header - Compact */}
        <div className="text-center space-y-1.5 mb-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-gradient-to-r from-rose-500/20 to-amber-500/20 border border-rose-500/30 text-rose-300 text-xs font-bold shadow-inner">
            <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-spin" style={{ animationDuration: '6s' }} />
            <span>Minigame Interativo: Quiz Gastronômico</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white font-['Cinzel',serif] tracking-tight">
            Qual Sushi Combina Com Você?
          </h2>
          <p className="text-xs sm:text-sm text-zinc-300 max-w-xl mx-auto leading-relaxed">
            Responda 6 perguntas rápidas com vídeos e descubra o combinado ideal com padrão Chef SP! 🍣✨
          </p>
        </div>

        {/* PHASE 1: INTRO SCREEN WITH ALTERNATING VIDEO & IMAGES & START BUTTON */}
        {gamePhase === 'intro' && (
          <div className="rounded-2xl bg-zinc-900/90 border border-zinc-800 p-4 sm:p-6 shadow-2xl backdrop-blur-xl text-center space-y-4 animate-in fade-in zoom-in-95 duration-300">
            
            {/* Alternating Floating Video & Image Showcase Block - Compact */}
            <div className="max-w-sm sm:max-w-md mx-auto rounded-xl bg-gradient-to-r from-rose-600/30 via-amber-500/30 to-pink-600/30 p-0.5 shadow-lg shadow-rose-950/40">
              <div className="relative h-36 sm:h-44 w-full rounded-[10px] overflow-hidden bg-zinc-950 border border-zinc-800 flex items-center justify-center group">
                {introMediaList[activeMediaIndex].type === 'video' ? (
                  <video
                    ref={introVideoRef}
                    key={introMediaList[activeMediaIndex].url}
                    src={introMediaList[activeMediaIndex].url}
                    autoPlay
                    muted
                    playsInline
                    onEnded={handleIntroVideoEnded}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <img
                    src={introMediaList[activeMediaIndex].url}
                    alt="Sushi Paulista Quiz Destaque"
                    className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                )}

                {/* Badge Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent flex items-end p-2 pointer-events-none">
                  <div className="bg-zinc-950/85 backdrop-blur-md px-2.5 py-1 rounded-lg border border-rose-500/30 flex items-center gap-2 shadow-lg w-full justify-between pointer-events-auto">
                    <span className="text-[11px] font-medium text-zinc-200 flex items-center gap-1.5 truncate">
                      {introMediaList[activeMediaIndex].type === 'video' ? (
                        <Film className="w-3 h-3 text-rose-400 shrink-0" />
                      ) : (
                        <Sparkles className="w-3 h-3 text-amber-400 animate-pulse shrink-0" />
                      )}
                      <span className="truncate">{introMediaList[activeMediaIndex].label}</span>
                    </span>
                    <div className="flex gap-1 shrink-0">
                      {introMediaList.map((media, idx) => (
                        <button
                          key={idx}
                          onClick={() => { playClickSound(); setActiveMediaIndex(idx); }}
                          className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${activeMediaIndex === idx ? 'w-3.5 bg-rose-500' : 'w-1.5 bg-zinc-700'}`}
                          title={`Ver ${media.type === 'video' ? 'Vídeo' : `Imagem ${idx}`}`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Benefits Badges - Compact */}
            <div className="grid grid-cols-3 gap-2 max-w-lg mx-auto text-[11px] sm:text-xs">
              <div className="py-2 px-2 rounded-xl bg-zinc-950/80 border border-zinc-800 flex items-center justify-center gap-1.5 text-zinc-200">
                <span>🎬</span>
                <span className="font-semibold truncate">6 Vídeos (1 min)</span>
              </div>
              <div className="py-2 px-2 rounded-xl bg-zinc-950/80 border border-zinc-800 flex items-center justify-center gap-1.5 text-zinc-200">
                <span>👨‍🍳</span>
                <span className="font-semibold truncate">Dica do Chef</span>
              </div>
              <div className="py-2 px-2 rounded-xl bg-zinc-950/80 border border-zinc-800 flex items-center justify-center gap-1.5 text-zinc-200">
                <span>🎁</span>
                <span className="font-semibold truncate">VIP & Desconto</span>
              </div>
            </div>

            {/* BIG VIBRANT START BUTTON WITH SOUND - Compact */}
            <div className="pt-1 max-w-sm sm:max-w-md mx-auto">
              <button
                onClick={handleStartGame}
                onMouseEnter={() => playHoverTick()}
                id="quiz-start-game-btn"
                className="relative overflow-hidden w-full group flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl font-black text-base sm:text-lg text-white uppercase tracking-wider shadow-xl transition-all duration-300 transform hover:scale-[1.02] active:scale-95 cursor-pointer border-2 border-white/50 bg-gradient-to-r from-rose-600 via-amber-500 via-pink-600 via-purple-600 to-rose-600 animate-colorful-gradient animate-glow-rainbow"
              >
                <span className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/50 to-transparent pointer-events-none animate-sheen" />
                <Play className="w-5 h-5 fill-white text-white drop-shadow group-hover:scale-110 transition-transform" />
                <span className="relative z-10 drop-shadow-md">START • COMEÇAR QUIZ ➔</span>
                <Sparkles className="w-4 h-4 text-amber-200 animate-spin" style={{ animationDuration: '3s' }} />
              </button>
              <p className="text-[11px] text-zinc-400 mt-2">
                Vídeos narrados com som para descobrir seu prato ideal!
              </p>
            </div>

          </div>
        )}

        {/* PHASE 2: ANIMATED LOADING SCREEN BEFORE QUESTION 1 */}
        {gamePhase === 'loading' && (
          <div className="rounded-2xl bg-zinc-900/90 border border-zinc-800 p-6 sm:p-8 shadow-2xl backdrop-blur-xl text-center space-y-4 animate-in fade-in zoom-in-95 duration-200 max-w-md mx-auto">
            
            {/* Spinning Food Animation */}
            <div className="relative w-16 h-16 mx-auto flex items-center justify-center">
              <div className="absolute inset-0 rounded-full border-3 border-rose-500/20 border-t-rose-500 animate-spin" style={{ animationDuration: '1s' }} />
              <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-rose-600 to-amber-500 flex items-center justify-center text-2xl shadow-lg shadow-rose-950 animate-bounce">
                🍣
              </div>
            </div>

            <div className="space-y-1">
              <h3 className="text-lg sm:text-xl font-extrabold text-white font-['Cinzel',serif]">
                Preparando os Vídeos do Quiz...
              </h3>
              <p className="text-xs sm:text-sm font-semibold text-rose-300 min-h-[20px] animate-pulse">
                {loadingStepText}
              </p>
            </div>

            {/* Progress Bar */}
            <div className="w-full space-y-1.5">
              <div className="w-full h-2.5 bg-zinc-950 rounded-full overflow-hidden p-0.5 border border-zinc-700/60 shadow-inner">
                <div
                  className="h-full bg-gradient-to-r from-rose-500 via-amber-400 to-emerald-400 rounded-full transition-all duration-300 shadow-md"
                  style={{ width: `${loadingProgress}%` }}
                />
              </div>
              <div className="flex justify-between text-[11px] font-bold text-zinc-400">
                <span>Carregando mídia e áudio</span>
                <span className="text-amber-400">{loadingProgress}%</span>
              </div>
            </div>

          </div>
        )}

        {/* PHASE 3: ACTIVE QUIZ QUESTIONS WITH NARRATED VIDEO - COMPACT & RESPONSIVE */}
        {gamePhase === 'quiz' && currentQuestion && (
          <div className="rounded-2xl bg-zinc-900/90 border border-zinc-800 p-4 sm:p-6 shadow-2xl backdrop-blur-xl relative animate-in fade-in duration-300">
            
            {/* Top Progress Header */}
            <div className="space-y-2 pb-3 border-b border-zinc-800/80">
              <div className="flex items-center justify-between text-xs font-semibold">
                <span className="text-rose-400 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping" />
                  Pergunta {currentStep + 1} de {QUIZ_QUESTIONS.length}
                </span>
                <span className="text-zinc-400 text-[11px]">
                  {Math.round(((currentStep + 1) / QUIZ_QUESTIONS.length) * 100)}% Concluído
                </span>
              </div>
              
              {/* Animated Progress Bar */}
              <div className="w-full h-2 bg-zinc-800 rounded-full overflow-hidden p-0.5 border border-zinc-700/50">
                <div 
                  className="h-full bg-gradient-to-r from-rose-500 via-red-500 to-amber-400 rounded-full transition-all duration-300 shadow-sm"
                  style={{ width: `${((currentStep + 1) / QUIZ_QUESTIONS.length) * 100}%` }}
                />
              </div>
            </div>

            {/* Split 2-Column Responsive Layout on md/lg: Left = Video + Question info, Right = Options */}
            <div className="pt-3.5 md:grid md:grid-cols-12 md:gap-5 md:items-center">
              
              {/* Left Column: Video Player + Title */}
              <div className="md:col-span-5 space-y-2.5">
                {currentQuestion.videoUrl && (
                  <div className="rounded-xl overflow-hidden bg-zinc-950 border border-rose-500/30 shadow-xl relative group/qvideo">
                    <div className="relative aspect-[16/9] w-full flex items-center justify-center bg-black max-h-44 sm:max-h-48">
                      <video
                        ref={questionVideoRef}
                        key={`q-video-${currentQuestion.id}`}
                        src={currentQuestion.videoUrl}
                        autoPlay
                        playsInline
                        muted={isQuestionAudioMuted}
                        onPlay={() => setIsVideoPlaying(true)}
                        onEnded={() => setIsVideoPlaying(false)}
                        className="w-full h-full object-cover"
                      />

                      {/* Video Top Controls: Replay + Sound Toggle */}
                      <div className="absolute top-2 right-2 flex items-center gap-1.5 z-20">
                        <button
                          onClick={handleReplayQuestionVideo}
                          onMouseEnter={() => playHoverTick()}
                          className="px-2 py-1 rounded-md bg-zinc-950/80 hover:bg-zinc-900 backdrop-blur-md border border-zinc-700 text-[11px] font-semibold text-zinc-200 hover:text-white flex items-center gap-1 transition-all shadow-md cursor-pointer"
                          title="Repetir vídeo"
                        >
                          <RotateCcw className="w-3 h-3 text-rose-400" />
                          <span className="hidden sm:inline text-[10px]">Repetir</span>
                        </button>

                        <button
                          onClick={toggleQuestionAudio}
                          onMouseEnter={() => playHoverTick()}
                          className={`px-2.5 py-1 rounded-md backdrop-blur-md border text-[11px] font-bold flex items-center gap-1 transition-all shadow-md cursor-pointer ${
                            !isQuestionAudioMuted 
                              ? 'bg-rose-600/90 hover:bg-rose-500 border-rose-400 text-white' 
                              : 'bg-zinc-950/80 hover:bg-zinc-900 border-zinc-700 text-zinc-300'
                          }`}
                          title={!isQuestionAudioMuted ? "Som ativado (clique para silenciar)" : "Som desativado (clique para ativar)"}
                        >
                          {!isQuestionAudioMuted ? (
                            <>
                              <Volume2 className="w-3.5 h-3.5 text-white" />
                              <span className="text-[10px]">Som 🔊</span>
                            </>
                          ) : (
                            <>
                              <VolumeX className="w-3.5 h-3.5 text-zinc-400" />
                              <span className="text-[10px]">Mudo 🔇</span>
                            </>
                          )}
                        </button>
                      </div>

                      {/* Video Bottom Left Tag */}
                      <div className="absolute bottom-2 left-2 bg-zinc-950/85 backdrop-blur-md px-2 py-0.5 rounded border border-zinc-800 text-[10px] font-semibold text-zinc-300 flex items-center gap-1 shadow-md">
                        <Film className="w-3 h-3 text-amber-400" />
                        <span>Vídeo {currentStep + 1} de {QUIZ_QUESTIONS.length}</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Question Title & Subtitle */}
                <div className="space-y-1">
                  <h3 className="text-base sm:text-lg font-bold text-white tracking-tight leading-snug">
                    {currentQuestion.question}
                  </h3>
                  {currentQuestion.subtitle && (
                    <p className="text-[11px] sm:text-xs text-zinc-400 leading-relaxed">
                      {currentQuestion.subtitle}
                    </p>
                  )}
                </div>
              </div>

              {/* Right Column: Options List (A, B, C, D) */}
              <div className="md:col-span-7 space-y-2 mt-3 md:mt-0">
                {currentQuestion.options.map((opt) => {
                  const isSelected = answers[currentQuestion.id]?.letter === opt.letter;
                  return (
                    <button
                      key={opt.letter}
                      onClick={() => handleSelectOption(opt.letter, opt.scoreType)}
                      onMouseEnter={() => playHoverTick()}
                      id={`quiz-q${currentQuestion.id}-opt-${opt.letter.toLowerCase()}`}
                      className={`group w-full py-2.5 px-3 sm:py-3 sm:px-3.5 rounded-xl text-left border transition-all flex items-center gap-2.5 sm:gap-3 cursor-pointer relative overflow-hidden active:scale-98 ${
                        isSelected
                          ? 'bg-rose-500/20 border-rose-500 shadow-md shadow-rose-950/60 ring-1 ring-rose-400'
                          : 'bg-zinc-950/70 hover:bg-zinc-800/80 border-zinc-800 hover:border-zinc-700'
                      }`}
                    >
                      {/* Letter Badge */}
                      <div className={`w-7 h-7 sm:w-8 sm:h-8 rounded-lg flex items-center justify-center font-extrabold text-xs sm:text-sm transition-colors shrink-0 ${
                        isSelected
                          ? 'bg-rose-600 text-white shadow-md'
                          : 'bg-zinc-900 text-zinc-300 border border-zinc-700 group-hover:bg-zinc-800 group-hover:text-white'
                      }`}>
                        {opt.letter}
                      </div>

                      {/* Option Text */}
                      <div className="flex-1 pr-1">
                        <p className="text-xs sm:text-sm font-semibold text-zinc-200 group-hover:text-white leading-snug">
                          {opt.text}
                        </p>
                      </div>

                      {/* Emoji / Icon indicator */}
                      <div className="text-lg sm:text-xl shrink-0 opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all">
                        {opt.icon}
                      </div>
                    </button>
                  );
                })}
              </div>

            </div>

            {/* Bottom Nav Controls - Compact */}
            <div className="mt-4 pt-3 border-t border-zinc-800/80 flex items-center justify-between">
              <button
                onClick={handlePrevious}
                onMouseEnter={() => playHoverTick()}
                disabled={currentStep === 0}
                className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-semibold text-zinc-400 hover:text-white disabled:opacity-30 disabled:pointer-events-none transition-colors cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Voltar</span>
              </button>

              <button
                onClick={handleRestart}
                onMouseEnter={() => playHoverTick()}
                className="inline-flex items-center gap-1 text-xs text-zinc-400 hover:text-rose-400 transition-colors cursor-pointer"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reiniciar</span>
              </button>
            </div>

          </div>
        )}

        {/* PHASE 4: FINAL DO QUIZ & CHAMADAS PARA AÇÃO (CTAS FINAIS) - COMPACT */}
        {gamePhase === 'result' && result && (
          <div className="rounded-2xl bg-zinc-900/95 border-2 border-rose-500/40 p-4 sm:p-6 shadow-2xl backdrop-blur-xl relative overflow-hidden animate-in fade-in zoom-in-95 duration-300">
            {/* Background celebration glow */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-rose-600/15 rounded-full blur-3xl pointer-events-none" />
            
            {/* Top Banner Celebration */}
            <div className="text-center space-y-2 pb-4 border-b border-zinc-800">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-bold text-xs">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>🎉 Quiz Concluído com Sucesso!</span>
              </div>
              
              <h3 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-white font-['Cinzel',serif]">
                Seu Prato Ideal: {result.title}
              </h3>

              {/* Mandatory Quote */}
              <div className="py-2 px-3 rounded-xl bg-zinc-950/80 border border-amber-500/30 max-w-xl mx-auto shadow-inner">
                <p className="text-xs sm:text-sm text-zinc-200 leading-relaxed font-medium">
                  "Parabéns por completar o Quiz! O seu prato ideal está te esperando com peixe fresco, preparo profissional e aquele padrão impecável de <strong className="text-amber-400 font-extrabold">'Menos Arroz + RECHEIO'</strong>!"
                </p>
              </div>
            </div>

            {/* Matched Dish Profile Showcase */}
            <div className="py-4 grid sm:grid-cols-12 gap-4 items-center">
              
              {/* Dish Image */}
              <div className="sm:col-span-5 relative rounded-xl overflow-hidden border border-zinc-700 shadow-xl group aspect-square sm:aspect-auto sm:h-48">
                <img
                  src={result.imageUrl}
                  alt={result.recommendedDish}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-2.5 left-2.5 bg-zinc-950/85 backdrop-blur-md px-2 py-0.5 rounded-md border border-rose-500/40 text-[10px] font-bold text-rose-300">
                  {result.piecesCount}
                </div>
                <div className="absolute bottom-2.5 right-2.5 bg-amber-500 text-zinc-950 font-black px-2.5 py-0.5 rounded-md shadow-lg text-[11px]">
                  {result.priceEstimate}
                </div>
              </div>

              {/* Dish Details */}
              <div className="sm:col-span-7 space-y-2.5">
                <div>
                  <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider">Recomendação Personalizada</span>
                  <h4 className="text-lg sm:text-xl font-bold text-white">
                    {result.recommendedDish}
                  </h4>
                  <p className="text-[11px] font-semibold text-rose-400 italic">
                    {result.slogan}
                  </p>
                </div>

                <p className="text-xs text-zinc-300 leading-relaxed">
                  {result.dishDescription}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-1 pt-0.5">
                  {result.tags.map((tag, i) => (
                    <span key={i} className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-zinc-800 text-zinc-300 border border-zinc-700">
                      ✓ {tag}
                    </span>
                  ))}
                </div>

                <div className="pt-1 flex items-center gap-3 text-xs">
                  <button
                    onClick={handleRestart}
                    onMouseEnter={() => playHoverTick()}
                    className="inline-flex items-center gap-1 text-[11px] text-zinc-400 hover:text-white transition-colors cursor-pointer"
                  >
                    <RotateCcw className="w-3 h-3" />
                    Refazer Quiz
                  </button>
                  <span className="text-zinc-600">•</span>
                  <button
                    onClick={handleShareQuiz}
                    onMouseEnter={() => playHoverTick()}
                    className="inline-flex items-center gap-1 text-[11px] text-zinc-400 hover:text-white transition-colors cursor-pointer"
                  >
                    {copiedLink ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                    <span>{copiedLink ? "Link copiado!" : "Compartilhar"}</span>
                  </button>
                </div>
              </div>

            </div>

            {/* CTAS FINAIS COM BOTÃO COLORIDO & BRILHANTE */}
            <div className="pt-4 border-t border-zinc-800 space-y-3">
              
              <div>
                <h4 className="text-xs sm:text-sm font-bold text-white flex items-center gap-1.5">
                  <span>🚀 Escolha sua próxima ação:</span>
                </h4>
              </div>

              {/* Main CTAs: Cardápio + WhatsApp */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {/* 🔴 [ ABRIR CARDÁPIO COMPLETO ] */}
                <CardapioButton
                  id="quiz-final-cta-cardapio"
                  text="🔴 📖 ABRIR CARDÁPIO COMPLETO"
                  size="sm"
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
                  className="group flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-500 hover:to-green-500 text-white font-extrabold text-xs sm:text-sm shadow-md shadow-emerald-950/60 hover:shadow-emerald-600/30 transition-all transform active:scale-98 border border-emerald-400/30 cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4 fill-white text-emerald-600" />
                  <span>🟢 💬 FAZER PEDIDO VIA WHATSAPP</span>
                </a>
              </div>

              {/* Secondary Actions: Google Review + Instagram */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                <a
                  href={RESTAURANT_INFO.googleReviewUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => playClickSound()}
                  onMouseEnter={() => playHoverTick()}
                  id="quiz-final-cta-google"
                  className="flex items-center justify-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-zinc-950 hover:bg-zinc-800 text-amber-300 hover:text-amber-200 font-bold text-xs border border-amber-500/30 transition-all transform active:scale-98 shadow-sm cursor-pointer"
                >
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  <span>⭐ 🌟 AVALIAÇÃO 5 ESTRELAS GOOGLE</span>
                </a>

                <a
                  href={RESTAURANT_INFO.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => playClickSound()}
                  onMouseEnter={() => playHoverTick()}
                  id="quiz-final-cta-instagram"
                  className="flex items-center justify-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-zinc-950 hover:bg-zinc-800 text-pink-300 hover:text-pink-200 font-bold text-xs border border-pink-500/30 transition-all transform active:scale-98 shadow-sm cursor-pointer"
                >
                  <Instagram className="w-3.5 h-3.5 text-pink-400" />
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
