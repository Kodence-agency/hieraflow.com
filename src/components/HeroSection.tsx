import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-organigramme.jpg";
import { ArrowRight, Users, Building2 } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen bg-gradient-hero flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent z-10"></div>
      
      <div className="container mx-auto px-4 py-20 relative z-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 text-white">
                <Building2 className="w-4 h-4" />
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
              <Button variant="hero" size="lg" className="group" onClick={() => document.getElementById('decouvrir')?.scrollIntoView({ behavior: 'smooth' })}>
                Découvrir Hieraflow
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="border-white/30 hover:bg-white/10"
                asChild
              >
                <a href="https://app.hieraflow.com" target="_blank" rel="noopener noreferrer" className="bg-gradient-to-r from-blue-400 to-green-400 bg-clip-text text-transparent font-semibold">
                  Voir la démo
                </a>
              </Button>
            </div>
            
            <div className="flex items-center space-x-8 pt-4">
              <div className="flex items-center space-x-2">
                <Users className="w-5 h-5 text-accent" />
                <span className="text-white/80 text-sm">PME • Grandes Entreprises</span>
              </div>
              <div className="flex items-center space-x-2">
                <Building2 className="w-5 h-5 text-secondary" />
                <span className="text-white/80 text-sm">Administrations</span>
              </div>
            </div>
          </div>
          
          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden shadow-glow">
              <img 
                src={heroImage} 
                alt="Hieraflow - Gestion d'organigrammes moderne" 
                className="w-full h-auto object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;