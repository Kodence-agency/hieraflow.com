import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import featuresImage from "@/assets/features-dashboard.jpg";
import { 
  Network, 
  Users2, 
  Smartphone, 
  Shield, 
  Settings, 
  Cloud 
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

const FeaturesSection = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-foreground">
            Fonctionnalités
            <span className="block text-primary">Innovantes</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Hieraflow combine simplicité et puissance pour offrir une expérience 
            de gestion organisationnelle sans précédent.
          </p>
        </div>
        
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-16">
          <div className="relative">
            <img 
              src={featuresImage} 
              alt="Interface Hieraflow - Dashboard de gestion" 
              className="w-full h-auto rounded-2xl shadow-card"
            />
          </div>
          
          <div className="space-y-6">
            <h3 className="text-3xl font-bold text-foreground">
              Une Interface Pensée Pour Vous
            </h3>
            <p className="text-lg text-muted-foreground">
              Chaque fonctionnalité de Hieraflow a été conçue pour simplifier 
              votre quotidien et améliorer la collaboration au sein de votre organisation.
            </p>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                <span className="text-foreground">Interface intuitive et responsive</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-secondary rounded-full"></div>
                <span className="text-foreground">Personnalisation selon votre charte</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-accent rounded-full"></div>
                <span className="text-foreground">Déploiement rapide et sécurisé</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <Card key={index} className="border-0 shadow-card hover:shadow-elegant transition-all duration-300 group">
                <CardHeader className="space-y-4">
                  <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                    <IconComponent className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <CardTitle className="text-xl text-foreground group-hover:text-primary transition-colors">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;