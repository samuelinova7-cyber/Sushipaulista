import { useState } from 'react';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { AboutSection } from './components/AboutSection';
import { SocialAndReviewSection } from './components/SocialAndReviewSection';
import { QuizSection } from './components/QuizSection';
import { LocationSection } from './components/LocationSection';
import { DigitalMenuModal } from './components/DigitalMenuModal';
import { FloatingActionBar } from './components/FloatingActionBar';
import { Footer } from './components/Footer';

export default function App() {
  const [isMenuModalOpen, setIsMenuModalOpen] = useState(false);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 font-sans selection:bg-rose-500 selection:text-white flex flex-col">
      {/* Top Header */}
      <Header
        onOpenMenu={() => setIsMenuModalOpen(true)}
        onScrollToQuiz={() => scrollToSection('quiz-sushi')}
        onScrollToAbout={() => scrollToSection('sobre-nos')}
        onScrollToReviews={() => scrollToSection('redes-sociais-avaliacoes')}
        onScrollToLocation={() => scrollToSection('localizacao')}
      />

      <main className="flex-1">
        {/* 1. Cabeçalho / Banner Principal (Hero Section) */}
        <HeroSection
          onOpenMenu={() => setIsMenuModalOpen(true)}
          onScrollToQuiz={() => scrollToSection('quiz-sushi')}
          onScrollToLocation={() => scrollToSection('localizacao')}
        />

        {/* 2. Redes Sociais & Avaliação (Instagram Reels com Vídeos & Google 5.0) */}
        <SocialAndReviewSection />

        {/* 3. Sobre Nós (História do Chef & Qualidade) */}
        <AboutSection
          onOpenMenu={() => setIsMenuModalOpen(true)}
        />

        {/* 4. Minigame: Quiz "Qual Sushi Combina Com Você?" (6 Perguntas) & 5. Final do Quiz */}
        <QuizSection
          onOpenMenu={() => setIsMenuModalOpen(true)}
        />

        {/* Localização & Delivery */}
        <LocationSection
          onOpenMenu={() => setIsMenuModalOpen(true)}
        />
      </main>

      {/* Footer */}
      <Footer
        onOpenMenu={() => setIsMenuModalOpen(true)}
        onScrollToQuiz={() => scrollToSection('quiz-sushi')}
        onScrollToAbout={() => scrollToSection('sobre-nos')}
        onScrollToReviews={() => scrollToSection('redes-sociais-avaliacoes')}
        onScrollToLocation={() => scrollToSection('localizacao')}
      />

      {/* Interactive Digital Menu Modal */}
      <DigitalMenuModal
        isOpen={isMenuModalOpen}
        onClose={() => setIsMenuModalOpen(false)}
      />

      {/* Floating Action Bar (Sticky Conversion) */}
      <FloatingActionBar
        onOpenMenu={() => setIsMenuModalOpen(true)}
        onScrollToQuiz={() => scrollToSection('quiz-sushi')}
      />
    </div>
  );
}
