import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Network, 
  Users2, 
  Smartphone, 
  Shield, 
  Settings, 
  Cloud,
  CheckCircle2,
  Sparkles,
  Palette,
  Rocket
} from "lucide-react";

const features = [
  {
    icon: Network,
    title: "Organigramme Interactif",
    description: "Visualisation hiérarchique intuitive des collaborateurs au sein de tous vos services et départements."
  },
  {
    icon: Users2,
    title: "Trombinoscope Dynamique",
    description: "Identification rapide des agents par fonction, service et nom avec photos et informations détaillées."
  },
  {
    icon: Smartphone,
    title: "Interface Web Fluide",
    description: "Compatible CMS WordPress, personnalisable selon votre charte graphique d'entreprise."
  },
  {
    icon: Shield,
    title: "Gestion Sécurisée des Rôles",
    description: "Contrôle d'accès granulaire et gestion sécurisée des permissions utilisateurs."
  },
  {
    icon: Settings,
    title: "Gestion Complète des Composants",
    description: "Administration centralisée des collaborateurs, départements, sites et métiers."
  },
  {
    icon: Cloud,
    title: "Solution Cloud & On-Premise",
    description: "Déploiement flexible selon vos besoins : cloud sécurisé ou infrastructure dédiée."
  }
];

const interfacePoints = [
  { icon: Sparkles, text: "Interface intuitive et responsive" },
  { icon: Palette, text: "Personnalisation selon votre charte" },
  { icon: Rocket, text: "Déploiement rapide et sécurisé" },
];

const FeaturesSection = () => {
  return (
    <section id="main-content" className="py-20 bg-background" aria-labelledby="features-title">
      <div className="container mx-auto px-4">
        <div className="text-center space-y-4 mb-16">
          <h2 id="features-title" className="text-4xl lg:text-5xl font-bold text-foreground">
            Soutenir la croissance de
            <span className="block text-primary">votre organisation</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Quand l'entreprise grandit, la complexité augmente. Sans clarté organisationnelle, la performance ralentit.
          </p>
        </div>

        {/* Interface section - redesigned without image */}
        <div className="max-w-4xl mx-auto mb-20">
          <div className="bg-gradient-to-br from-card to-muted/30 rounded-2xl p-10 shadow-card">
            <h3 className="text-3xl font-bold text-foreground mb-4 text-center">
              Une interface pensée pour vous
            </h3>
            <p className="text-lg text-muted-foreground text-center mb-8 max-w-2xl mx-auto">
              Chaque fonctionnalité de Hieraflow a été conçue pour simplifier 
              votre quotidien et améliorer la collaboration au sein de votre organisation.
            </p>
            <div className="grid sm:grid-cols-3 gap-6">
              {interfacePoints.map((point, index) => {
                const IconComponent = point.icon;
                return (
                  <div key={index} className="flex flex-col items-center text-center gap-3 p-4">
                    <div className="w-14 h-14 bg-gradient-primary rounded-xl flex items-center justify-center">
                      <IconComponent className="w-7 h-7 text-primary-foreground" />
                    </div>
                    <span className="text-foreground font-medium">{point.text}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        
      </div>
    </section>
  );
};

export default FeaturesSection;
