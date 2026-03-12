import { ArrowRight, Users, Building2 } from "lucide-react";
import { useEffect, useState, useRef } from "react";
import heroCarousel1 from "@/assets/hero-carousel-1.png";
import heroCarousel2 from "@/assets/hero-carousel-2.png";
import heroCarousel3 from "@/assets/hero-carousel-3.png";
import heroCarousel4 from "@/assets/hero-carousel-4.png";
import heroCarousel5 from "@/assets/hero-carousel-5.png";
import heroCarousel6 from "@/assets/hero-carousel-6.png";

const heroSlides = [
  { src: heroCarousel1, alt: "Équipe collaborant dans un bureau moderne" },
  { src: heroCarousel2, alt: "Collaboration d'équipe et technologies avancées" },
  { src: heroCarousel3, alt: "Professionnels connectés dans un réseau d'entreprise" },
  { src: heroCarousel4, alt: "Équipe analysant des données et présentant des résultats" },
  { src: heroCarousel5, alt: "Réunion stratégique entre collaborateurs" },
  { src: heroCarousel6, alt: "Interface d'organigramme Hieraflow sur écran" },
];

const HeroSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const timeoutRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const goToSlide = (index: number) => {
    if (index === currentIndex) return;
    setCurrentIndex(index);
  };

  useEffect(() => {
    timeoutRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => {
      if (timeoutRef.current) clearInterval(timeoutRef.current);
    };
  }, []);

  return (
    <section
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{ background: "linear-gradient(135deg, #0a1628 0%, #1a3a5c 30%, #2667ff 60%, #34d399 100%)" }}
      role="banner"
    >
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-0 focus:left-0 z-50 bg-primary text-primary-foreground px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
      >
        Aller au contenu principal
      </a>

      <div className="container mx-auto px-4 py-24 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          {/* Left — Text content */}
          <div className="space-y-8">
            <div
              className="inline-flex items-center space-x-2 bg-white/15 backdrop-blur-md border border-white/20 rounded-full px-5 py-2.5 text-white shadow-lg"
              role="note"
              aria-label="Information sur le type de solution"
            >
              <Building2 className="w-4 h-4" aria-hidden="true" />
              <span className="text-sm font-medium tracking-wide">
                Solution SaaS & on-premise
              </span>
            </div>

            <div className="space-y-4">
              <h1
                className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-[1.08]"
                style={{ textShadow: "0 2px 16px rgba(0,0,0,0.5)" }}
              >
                <span className="block">Structurez votre</span>
                <span className="block">organisation</span>
              </h1>
              <p
                className="text-lg sm:text-xl lg:text-2xl text-white/90 leading-relaxed max-w-xl"
                style={{ textShadow: "0 1px 8px rgba(0,0,0,0.4)" }}
              >
                Libérez le potentiel de vos équipes, et fluidifiez leur coopération.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <button
                type="button"
                className="inline-flex items-center justify-center rounded-xl text-sm font-semibold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 bg-white/15 backdrop-blur-md text-white border border-white/25 hover:bg-white/25 hover:border-white/40 h-12 px-8 group shadow-lg"
                onClick={() =>
                  document
                    .getElementById("main-content")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                aria-label="Découvrir les fonctionnalités de Hieraflow"
              >
                Découvrir Hieraflow
                <ArrowRight
                  className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform"
                  aria-hidden="true"
                />
              </button>
              <a
                href="/#contact"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-xl text-sm font-semibold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 h-12 px-8 bg-gradient-to-r from-blue-400/90 to-green-400/90 text-white hover:from-blue-400 hover:to-green-400 shadow-lg backdrop-blur-sm"
                aria-label="Accéder à la démonstration de Hieraflow"
              >
                Demander une démo
              </a>
            </div>

            <div
              className="flex items-center gap-4 flex-wrap"
              role="list"
              aria-label="Types d'organisations supportées"
            >
              <div
                className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 border border-white/10"
                role="listitem"
              >
                <Users className="w-4 h-4 text-accent" aria-hidden="true" />
                <span className="text-white/90 text-sm">PME • grandes entreprises</span>
              </div>
              <div
                className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 border border-white/10"
                role="listitem"
              >
                <Building2 className="w-4 h-4 text-secondary" aria-hidden="true" />
                <span className="text-white/90 text-sm">Administrations</span>
              </div>
            </div>
          </div>

          {/* Right — Image carousel */}
          <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl border border-white/10">
            {heroSlides.map((slide, index) => (
              <img
                key={index}
                src={slide.src}
                alt={slide.alt}
                className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${
                  index === currentIndex ? "opacity-100" : "opacity-0"
                }`}
                loading={index === 0 ? "eager" : "lazy"}
                fetchPriority={index === 0 ? "high" : undefined}
              />
            ))}

            {/* Carousel indicators */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
              {heroSlides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`rounded-full transition-all duration-500 ${
                    index === currentIndex
                      ? "w-7 h-2 bg-white/90 shadow-lg"
                      : "w-2 h-2 bg-white/40 hover:bg-white/60"
                  }`}
                  aria-label={`Voir image ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;