import { ArrowRight, Users, Building2 } from "lucide-react";
import { useEffect, useState } from "react";
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

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(interval);
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

      {/* Full-screen carousel background */}
      <div className="absolute inset-0" aria-hidden="true">
        {heroSlides.map((slide, index) => (
          <img
            key={index}
            src={slide.src}
            alt={slide.alt}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-[1500ms] ease-in-out ${
              index === currentIndex ? "opacity-100" : "opacity-0"
            }`}
            loading={index === 0 ? "eager" : "lazy"}
            fetchPriority={index === 0 ? "high" : undefined}
          />
        ))}
        {/* Blue-tinted overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-[hsla(215,60%,20%,0.55)] via-[hsla(215,50%,30%,0.35)] to-[hsla(215,60%,15%,0.6)]" />
        <div className="absolute inset-0 bg-gradient-to-r from-[hsla(215,55%,18%,0.5)] via-transparent to-transparent" />
      </div>

      {/* Content overlay */}
      <div className="container mx-auto px-4 py-32 relative z-20">
        <div className="max-w-3xl mx-auto lg:mx-0 space-y-8">
          <div className="space-y-6">
            <div
              className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-5 py-2.5 text-white shadow-lg"
              role="note"
              aria-label="Information sur le type de solution"
            >
              <Building2 className="w-4 h-4" aria-hidden="true" />
              <span className="text-sm font-medium tracking-wide">
                Solution SaaS & on-premise
              </span>
            </div>

            {/* Animated text per slide */}
            <div className="relative h-[200px] sm:h-[220px] lg:h-[260px]">
              {heroSlides.map((slide, index) => (
                <div
                  key={index}
                  className={`absolute inset-0 transition-all duration-700 ease-in-out ${
                    index === currentIndex
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-4 pointer-events-none"
                  }`}
                >
                  <h1
                    className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold text-white leading-[1.05]"
                    style={{ textShadow: "0 2px 20px rgba(0,0,0,0.4), 0 4px 40px rgba(0,0,0,0.2)" }}
                  >
                    <span className="block">{slide.headline}</span>
                    <span className="block bg-gradient-to-r from-accent to-primary-glow bg-clip-text text-transparent drop-shadow-lg">
                      {slide.highlight}
                    </span>
                  </h1>
                  <p
                    className="mt-4 text-lg sm:text-xl lg:text-2xl text-white/90 leading-relaxed max-w-xl"
                    style={{ textShadow: "0 1px 10px rgba(0,0,0,0.3)" }}
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
            className="flex items-center gap-6 pt-2"
            role="list"
            aria-label="Types d'organisations supportées"
          >
            <div
              className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 border border-white/10"
              role="listitem"
            >
              <Users className="w-4 h-4 text-accent" aria-hidden="true" />
              <span className="text-white/85 text-sm" style={{ textShadow: "0 1px 4px rgba(0,0,0,0.3)" }}>
                PME • grandes entreprises
              </span>
            </div>
            <div
              className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 border border-white/10"
              role="listitem"
            >
              <Building2 className="w-4 h-4 text-secondary" aria-hidden="true" />
              <span className="text-white/85 text-sm" style={{ textShadow: "0 1px 4px rgba(0,0,0,0.3)" }}>
                Administrations
              </span>
            </div>
          </div>
        </div>

        {/* Carousel indicators - bottom center */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2.5">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`rounded-full transition-all duration-500 ${
                index === currentIndex
                  ? "w-8 h-2.5 bg-white/90"
                  : "w-2.5 h-2.5 bg-white/30 hover:bg-white/50"
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
