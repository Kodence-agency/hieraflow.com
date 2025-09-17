import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-organigramme.jpg";
import { ArrowRight, Users, Building2 } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen bg-gradient-hero flex items-center justify-center overflow-hidden" role="banner">
      {/* Skip link for keyboard navigation */}
      <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-0 focus:left-0 z-50 bg-primary text-primary-foreground px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-ring">
        Aller au contenu principal
      </a>
      
      <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent z-10" aria-hidden="true"></div>
      
      <div className="container mx-auto px-4 py-20 relative z-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 text-white" role="note" aria-label="Information sur le type de solution">
                <Building2 className="w-4 h-4" aria-hidden="true" />
                <span className="text-sm font-medium">Solution SaaS & On-Premise</span>
              </div>
              
              <h1 className="text-5xl lg:text-7xl font-bold text-white leading-tight">
                <span className="block">Structurez votre</span>
                <span className="block bg-gradient-to-r from-accent to-primary-glow bg-clip-text text-transparent">
                  Organisation
                </span>
              </h1>
              
              <p className="text-xl text-white/90 leading-relaxed max-w-lg">
                Hieraflow révolutionne la gestion de vos organigrammes avec une solution 
                intuitive pour visualiser et gérer vos équipes efficacement.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <button 
                type="button"
                className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-white/10 text-white border border-white/20 hover:bg-white/20 h-11 px-6 py-2 group"
                onClick={() => document.getElementById('main-content')?.scrollIntoView({ behavior: 'smooth' })}
                aria-label="Découvrir les fonctionnalités de Hieraflow"
              >
                Découvrir Hieraflow
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
              </button>
              <a 
                href="https://app.hieraflow.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-white/30 hover:bg-white/10 h-11 px-6 py-2 bg-gradient-to-r from-blue-400 to-green-400 bg-clip-text text-transparent font-semibold"
                aria-label="Accéder à la démonstration de Hieraflow dans un nouvel onglet"
              >
                Voir la démo
              </a>
            </div>
            
            <div className="flex items-center space-x-8 pt-4" role="list" aria-label="Types d'organisations supportées">
              <div className="flex items-center space-x-2" role="listitem">
                <Users className="w-5 h-5 text-accent" aria-hidden="true" />
                <span className="text-white/80 text-sm">PME • Grandes Entreprises</span>
              </div>
              <div className="flex items-center space-x-2" role="listitem">
                <Building2 className="w-5 h-5 text-secondary" aria-hidden="true" />
                <span className="text-white/80 text-sm">Administrations</span>
              </div>
            </div>
          </div>
          
          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden shadow-glow">
              <img 
                src={heroImage} 
                alt="Interface de gestion d'organigrammes Hieraflow montrant une vue hiérarchique interactive des équipes avec photos et informations détaillées des collaborateurs" 
                className="w-full h-auto object-cover"
                loading="eager"
                fetchPriority="high"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent" aria-hidden="true"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;