import { ArrowRight, Users, Building2 } from "lucide-react";

const HeroSection = () => {
  return (
    <section
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#0a1628]"
      role="banner"
    >
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-0 focus:left-0 z-50 bg-primary text-primary-foreground px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
      >
        Aller au contenu principal
      </a>

      <div className="container mx-auto px-4 py-32 relative z-20">
        <div className="max-w-4xl mx-auto lg:mx-0">
          {/* Text backdrop for readability */}
          <div className="bg-gradient-to-r from-blue-500/50 to-green-400/40 rounded-3xl p-10 lg:p-16 space-y-8">
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

              <div className="space-y-4">
                <h1
                  className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold text-white leading-[1.05]"
                  style={{ textShadow: "0 2px 16px rgba(0,0,0,0.5)" }}
                >
                  <span className="block">Structurez votre</span>
                  <span className="block text-white">organisation</span>
                </h1>
                <p
                  className="text-xl sm:text-2xl lg:text-3xl text-white leading-relaxed max-w-2xl"
                  style={{ textShadow: "0 1px 8px rgba(0,0,0,0.4)" }}
                >
                  Libérez le potentiel de vos équipes, et fluidifiez leur coopération.
                </p>
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
      </div>
    </section>
  );
};

export default HeroSection;
