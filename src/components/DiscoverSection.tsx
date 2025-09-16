import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Network, 
  Users, 
  Shield, 
  Palette, 
  Cloud, 
  Building2, 
  ArrowRight,
  CheckCircle
} from "lucide-react";

const DiscoverSection = () => {
  const features = [
    {
      icon: Network,
      title: "Organigramme Interactif",
      description: "Vue hiérarchique complète de vos collaborateurs organisée par services et départements."
    },
    {
      icon: Users,
      title: "Trombinoscope Dynamique",
      description: "Identification facilitée des agents par fonction, service et nom avec photos professionnelles."
    },
    {
      icon: Palette,
      title: "Interface Personnalisable",
      description: "Design adapté à votre charte graphique et compatible avec vos CMS existants."
    },
    {
      icon: Shield,
      title: "Gestion Sécurisée des Rôles",
      description: "Contrôle précis des accès et permissions selon les niveaux d'autorisation."
    },
    {
      icon: Building2,
      title: "Gestion Complète des Entités",
      description: "Administration centralisée des collaborateurs, départements et sites."
    },
    {
      icon: Cloud,
      title: "Déploiement Flexible",
      description: "Solution 100% cloud ou on-premise selon vos exigences de sécurité."
    }
  ];

  const benefits = [
    "Gain de temps dans la gestion des équipes",
    "Adaptabilité parfaite à votre organisation",
    "Transparence organisationnelle renforcée",
    "Image professionnelle valorisée",
    "Support client réactif et évolutivité assurée"
  ];

  return (
    <section id="decouvrir" className="py-20 bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-primary/10 rounded-full px-4 py-2 text-primary mb-4">
            <Building2 className="w-4 h-4" />
            <span className="text-sm font-medium">Découvrir Hieraflow</span>
          </div>
          
          <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">
            La solution complète pour
            <span className="block bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              structurer votre organisation
            </span>
          </h2>
          
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Hieraflow transforme la gestion de vos organigrammes en une expérience fluide et intuitive, 
            pensée pour les PME, grandes entreprises et administrations publiques.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => (
            <Card key={index} className="group hover:shadow-elegant transition-all duration-300 border-border/50">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <feature.icon className="w-6 h-6 text-primary-foreground" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="bg-card rounded-2xl p-8 lg:p-12 shadow-card border border-border/50">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-3xl font-bold text-foreground mb-6">
                Pourquoi choisir Hieraflow ?
              </h3>
              <div className="space-y-4 mb-8">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-muted-foreground">{benefit}</span>
                  </div>
                ))}
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button variant="corporate" size="lg" className="group" asChild>
                  <a href="#contact">
                    Demander une démonstration
                    <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </a>  
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <a href="https://app.hieraflow.com" target="_blank" rel="noopener noreferrer">
                    Tester maintenant
                  </a>
                </Button>
              </div>
            </div>
            
            <div className="relative">
              <div className="bg-gradient-to-br from-primary/20 to-accent/20 rounded-2xl p-8 backdrop-blur-sm">
                <div className="text-center">
                  <Building2 className="w-16 h-16 text-primary mx-auto mb-6" />
                  <h4 className="text-2xl font-bold text-foreground mb-4">
                    Solution Adaptée
                  </h4>
                  <p className="text-muted-foreground mb-6">
                    Que vous soyez une PME de 10 employés ou une grande entreprise de 10 000 collaborateurs, 
                    Hieraflow s'adapte à votre structure organisationnelle.
                  </p>
                  <div className="flex items-center justify-center space-x-6 text-sm text-muted-foreground">
                    <span>PME</span>
                    <div className="w-8 h-px bg-border"></div>
                    <span>Grandes Entreprises</span>
                    <div className="w-8 h-px bg-border"></div>
                    <span>Administrations</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DiscoverSection;