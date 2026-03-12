import { ArrowRight, Users, Building2 } from "lucide-react";
import { useEffect, useState } from "react";
import heroCollaboration from "@/assets/hero-collaboration.jpg";
import heroSharing from "@/assets/hero-sharing.jpg";
import heroPresentation from "@/assets/hero-presentation.jpg";

const heroImages = [
  {
    src: heroCollaboration,
    alt: "Équipe collaborant sur un projet autour d'une table dans un bureau moderne",
  },
  {
    src: heroSharing,
    alt: "Personnes heureuses partageant des informations et échangeant des idées",
  },
  {
    src: heroPresentation,
    alt: "Personne présentant des résultats à un groupe de collègues dans une salle de réunion",
  },
];

const HeroSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % heroImages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      className="relative min-h-screen bg-gradient-hero flex items-center justify-center overflow-hidden"
      role="banner"
    >
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-0 focus:left-0 z-50 bg-primary text-primary-foreground px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
      >
        Aller au contenu principal
      </a>

      <div
        className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent z-10"
        aria-hidden="true"
      ></div>

      <div className="container mx-auto px-4 py-20 relative z-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <div
                className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 text-white"
                role="note"
                aria-label="Information sur le type de solution"
              >
                <Building2 className="w-4 h-4" aria-hidden="true" />
                <span className="text-sm font-medium">
                  Solution SaaS & on-premise
                </span>
              </div>

              <h1 className="text-5xl lg:text-7xl font-bold text-white leading-tight">
                <span className="block">Structurez votre</span>
                <span className="block bg-gradient-to-r from-accent to-primary-glow bg-clip-text text-transparent">
                  organisation
                </span>
              </h1>

              <p className="text-xl text-white/90 leading-relaxed max-w-lg">
                Libérez le potentiel de vos équipes, et fluidifiez leur coopération.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <button
                type="button"
                className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-white/10 text-white border border-white/20 hover:bg-white/20 h-11 px-6 py-2 group"
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
                className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-white/30 hover:bg-white/10 h-11 px-6 py-2 bg-gradient-to-r from-blue-400 to-green-400 bg-clip-text text-transparent"
                aria-label="Accéder à la démonstration de Hieraflow dans un nouvel onglet"
              >
                Demander une démo
              </a>
            </div>

            <div
              className="flex items-center space-x-8 pt-4"
              role="list"
              aria-label="Types d'organisations supportées"
            >
              <div className="flex items-center space-x-2" role="listitem">
                <Users className="w-5 h-5 text-accent" aria-hidden="true" />
                <span className="text-white/80 text-sm">
                  PME • grandes entreprises
                </span>
              </div>
              <div className="flex items-center space-x-2" role="listitem">
                <Building2
                  className="w-5 h-5 text-secondary"
                  aria-hidden="true"
                />
                <span className="text-white/80 text-sm">Administrations</span>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden shadow-glow">
              {heroImages.map((image, index) => (
                <img
                  key={index}
                  src={image.src}
                  alt={image.alt}
                  className={`w-full h-auto object-cover transition-opacity duration-1000 ${
                    index === currentIndex
                      ? "opacity-100 relative"
                      : "opacity-0 absolute inset-0"
                  }`}
                  loading={index === 0 ? "eager" : "lazy"}
                  fetchPriority={index === 0 ? "high" : undefined}
                />
              ))}
              <div
                className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent"
                aria-hidden="true"
              ></div>
            </div>
            {/* Carousel indicators */}
            <div className="flex justify-center gap-2 mt-4">
              {heroImages.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                    index === currentIndex
                      ? "bg-white scale-125"
                      : "bg-white/40 hover:bg-white/60"
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
