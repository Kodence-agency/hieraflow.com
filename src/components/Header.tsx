import { Button } from "@/components/ui/button";
import { Building2, Menu } from "lucide-react";
import { useState } from "react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 w-full bg-white/95 backdrop-blur-sm border-b border-border/50 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center">
              <Building2 className="w-6 h-6 text-primary-foreground" />
            </div>
            <span className="text-2xl font-bold text-foreground">Hieraflow</span>
          </div>
          
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#fonctionnalites" className="text-foreground hover:text-primary transition-colors">
              Fonctionnalités
            </a>
            <a href="#avantages" className="text-foreground hover:text-primary transition-colors">
              Avantages
            </a>
            <a href="#contact" className="text-foreground hover:text-primary transition-colors">
              Contact
            </a>
          </nav>
          
          <div className="hidden md:flex items-center space-x-4">
            <Button variant="ghost">
              Connexion
            </Button>
            <Button variant="corporate">
              Démonstration
            </Button>
          </div>
          
          <button 
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <Menu className="w-6 h-6 text-foreground" />
          </button>
        </div>
        
        {isMenuOpen && (
          <div className="md:hidden border-t border-border/50 py-4 space-y-4">
            <a href="#fonctionnalites" className="block text-foreground hover:text-primary transition-colors">
              Fonctionnalités
            </a>
            <a href="#avantages" className="block text-foreground hover:text-primary transition-colors">
              Avantages
            </a>
            <a href="#contact" className="block text-foreground hover:text-primary transition-colors">
              Contact
            </a>
            <div className="pt-4 space-y-2">
              <Button variant="ghost" className="w-full">
                Connexion
              </Button>
              <Button variant="corporate" className="w-full">
                Démonstration
              </Button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;