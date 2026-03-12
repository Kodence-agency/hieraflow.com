import { ArrowRight, Users, Building2 } from "lucide-react";
import { useEffect, useState, useRef } from "react";
import heroCarousel1 from "@/assets/hero-carousel-1.png";
import heroCarousel2 from "@/assets/hero-carousel-2.png";
import heroCarousel3 from "@/assets/hero-carousel-3.png";
import heroCarousel4 from "@/assets/hero-carousel-4.png";
import heroCarousel5 from "@/assets/hero-carousel-5.png";
import heroCarousel6 from "@/assets/hero-carousel-6.png";

const heroSlides = [
  {
    src: heroCarousel1,
    alt: "Équipe collaborant dans un bureau moderne avec interfaces holographiques",
    headline: "Structurez votre",
    highlight: "organisation",
    subtitle: "Libérez le potentiel de vos équipes, et fluidifiez leur coopération.",
  },
  {
    src: heroCarousel2,
    alt: "Collaboration d'équipe et technologies avancées",
    headline: "Visualisez votre",
    highlight: "structure",
    subtitle: "Un organigramme interactif, toujours à jour, accessible par tous.",
  },
  {
    src: heroCarousel3,
    alt: "Professionnels connectés dans un réseau d'entreprise",
    headline: "Connectez vos",
    highlight: "équipes",
    subtitle: "Identifiez instantanément le bon interlocuteur, où qu'il soit.",
  },
  {
    src: heroCarousel4,
    alt: "Équipe analysant des données et présentant des résultats",
    headline: "Pilotez avec",
    highlight: "clarté",
    subtitle: "Des données organisationnelles fiables pour des décisions éclairées.",
  },
  {
    src: heroCarousel5,
    alt: "Réunion stratégique entre collaborateurs",
    headline: "Décidez en",
    highlight: "confiance",
    subtitle: "Une vision claire de votre organisation pour agir vite et bien.",
  },
  {
    src: heroCarousel6,
    alt: "Interface d'organigramme Hieraflow sur écran",
    headline: "Adoptez un outil",
    highlight: "intuitif",
    subtitle: "Prise en main immédiate, sans formation, comme un site web.",
  },
];

const HeroSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState<"next" | "prev">("next");
  const [isAnimating, setIsAnimating] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const goToSlide = (index: number) => {
    if (isAnimating || index === currentIndex) return;
    setDirection(index > currentIndex ? "next" : "prev");
    setIsAnimating(true);
    setCurrentIndex(index);
    setTimeout(() => setIsAnimating(false), 1500);
  };

  useEffect(() => {
    timeoutRef.current = setInterval(() => {
      setDirection("next");
      setIsAnimating(true);
      setCurrentIndex((prev) => (prev + 1) % heroSlides.length);
      setTimeout(() => setIsAnimating(false), 800);
    }, 5000);
    return () => {
      if (timeoutRef.current) clearInterval(timeoutRef.current);
    };
  }, []);

  return (
    <section
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      role="banner"
    >
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-0 focus:left-0 z-50 bg-primary text-primary-foreground px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
      >
        Aller au contenu principal
      </a>

      {/* Full-screen carousel background — no overlay, images shown clearly */}
      <div className="absolute inset-0" aria-hidden="true">
        {heroSlides.map((slide, index) => (
          <div
            key={index}
            className="absolute inset-0 transition-transform duration-700 ease-[cubic-bezier(0.25,0.1,0.25,1)]"
            style={{
              transform:
                index === currentIndex
                  ? "translateX(0%)"
                  : index < currentIndex || (currentIndex === 0 && index === heroSlides.length - 1 && direction === "next")
                    ? "translateX(-100%)"
                    : "translateX(100%)",
              zIndex: index === currentIndex ? 2 : 1,
            }}
          >
            <img
              src={slide.src}
              alt={slide.alt}
              className="w-full h-full object-cover"
              loading={index === 0 ? "eager" : "lazy"}
              fetchPriority={index === 0 ? "high" : undefined}
            />
          </div>
        ))}
      </div>

      {/* Content overlay — text panel with backdrop for readability */}
      <div className="container mx-auto px-4 py-32 relative z-20">
        <div className="max-w-3xl mx-auto lg:mx-0">
          {/* Text backdrop for readability */}
          <div className="bg-black/40 backdrop-blur-sm rounded-3xl p-8 lg:p-12 space-y-8">
            <div className="space-y-6">
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

              {/* Animated text — swipe right to left */}
              <div className="relative h-[180px] sm:h-[200px] lg:h-[220px] overflow-hidden">
                {heroSlides.map((slide, index) => (
                  <div
                    key={index}
                    className="absolute inset-0 transition-transform duration-700 ease-[cubic-bezier(0.25,0.1,0.25,1)]"
                    style={{
                      transform:
                        index === currentIndex
                          ? "translateX(0%)"
                          : index < currentIndex || (currentIndex === 0 && index === heroSlides.length - 1 && direction === "next")
                            ? "translateX(-110%)"
                            : "translateX(110%)",
                    }}
                  >
                    <h1
                      className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-[1.05]"
                      style={{ textShadow: "0 2px 12px rgba(0,0,0,0.5)" }}
                    >
                      <span className="block">{slide.headline}</span>
                      <span className="block bg-gradient-to-r from-accent to-primary-glow bg-clip-text text-transparent">
                        {slide.highlight}
                      </span>
                    </h1>
                    <p
                      className="mt-4 text-lg sm:text-xl lg:text-2xl text-white/95 leading-relaxed max-w-xl"
                      style={{ textShadow: "0 1px 8px rgba(0,0,0,0.4)" }}
                    >
                      {slide.subtitle}
                    </p>
                  </div>
                ))}
              </div>
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
                <span className="text-white/90 text-sm">
                  PME • grandes entreprises
                </span>
              </div>
              <div
                className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 border border-white/10"
                role="listitem"
              >
                <Building2 className="w-4 h-4 text-secondary" aria-hidden="true" />
                <span className="text-white/90 text-sm">
                  Administrations
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Carousel indicators */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2.5">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`rounded-full transition-all duration-500 ${
                index === currentIndex
                  ? "w-8 h-2.5 bg-white/90 shadow-lg"
                  : "w-2.5 h-2.5 bg-white/40 hover:bg-white/60"
              }`}
              aria-label={`Voir image ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
