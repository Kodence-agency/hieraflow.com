// Update this page (the content is just a fallback if you fail to update the page)

import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import DiscoverSection from "@/components/DiscoverSection";
import ReferentielSection from "@/components/ReferentielSection";
import GrowthSection from "@/components/GrowthSection";
import FeaturesSection from "@/components/FeaturesSection";
import BenefitsSection from "@/components/BenefitsSection";
import ContactSection from "@/components/ContactSection";
import FAQSection from "@/components/FAQSection";
import WhitepapersSection from "@/components/WhitepapersSection";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";
import { Building2, Menu } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

const Index = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="min-h-screen">
      <header className="fixed top-0 w-full bg-white/95 backdrop-blur-sm border-b border-border/50 z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <a
              href="/#"
              className="flex items-center space-x-3 hover:opacity-80 transition-opacity"
            >
              <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center">
                <Building2 className="w-6 h-6 text-primary-foreground" />
              </div>
              <span className="text-2xl font-bold text-foreground">
                Hieraflow
              </span>
            </a>

            <nav className="hidden md:flex items-center space-x-8">
              <a
                href="/#"
                className="text-foreground hover:text-primary transition-colors"
              >
                Accueil
              </a>
              <a
                href="#decouvrir"
                className="text-foreground hover:text-primary transition-colors"
              >
                Fonctionnalités
              </a>
              <a
                href="#avantages"
                className="text-foreground hover:text-primary transition-colors"
              >
                Avantages
              </a>
              <a
                href="/qui-sommes-nous"
                className="text-foreground hover:text-primary transition-colors"
              >
                Qui sommes-nous ?
              </a>
              <a
                href="#faq"
                className="text-foreground hover:text-primary transition-colors"
              >
                FAQ
              </a>
              <a
                href="#contact"
                className="text-foreground hover:text-primary transition-colors"
              >
                Contact
              </a>
            </nav>

            <div className="hidden md:flex items-center space-x-3">
              <a href="#livres-blancs">
                <Button variant="outline" className="gap-2">
                  <FileText className="w-4 h-4" />
                  Ressources gratuites
                </Button>
              </a>
              <a href="/#contact">
                <Button variant="corporate">Démonstration</Button>
              </a>
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
              <a
                href="/#"
                className="block text-foreground hover:text-primary transition-colors"
              >
                Accueil
              </a>
              <a
                href="#decouvrir"
                className="block text-foreground hover:text-primary transition-colors"
              >
                Fonctionnalités
              </a>
              <a
                href="/#avantages"
                className="block text-foreground hover:text-primary transition-colors"
              >
                Avantages
              </a>
              <a
                href="/qui-sommes-nous"
                className="block text-foreground hover:text-primary transition-colors"
              >
                Qui sommes-nous ?
              </a>
              <a
                href="#faq"
                className="block text-foreground hover:text-primary transition-colors"
              >
                FAQ
              </a>
              <a
                href="/#contact"
                className="block text-foreground hover:text-primary transition-colors"
              >
                Contact
              </a>
              <div className="pt-4 space-y-2">
                <a href="/#contact">
                  <Button variant="corporate" className="w-full">
                    Démonstration
                  </Button>
                </a>
              </div>
            </div>
          )}
        </div>
      </header>
      <main>
        <HeroSection />
        <ReferentielSection />
        <DiscoverSection />
        <GrowthSection />
        <div id="fonctionnalites">
          <FeaturesSection />
        </div>
        <div id="avantages">
          <BenefitsSection />
        </div>
        <WhitepapersSection />
        <FAQSection />

        <div id="contact">
          <ContactSection />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
