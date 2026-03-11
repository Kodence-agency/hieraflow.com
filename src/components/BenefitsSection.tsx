import { Card, CardContent } from "@/components/ui/card";
import { 
  Clock, 
  Target, 
  Eye, 
  Award, 
  Zap, 
  Headphones 
} from "lucide-react";

const benefits = [
  {
    icon: Clock,
    title: "Gain de temps",
    description: "Simplifiez la gestion de vos équipes",
    color: "text-primary"
  },
  {
    icon: Target,
    title: "Adaptabilité",
    description: "S'adapte à votre organisation unique",
    color: "text-secondary"
  },
  {
    icon: Eye,
    title: "Transparence",
    description: "Meilleure visibilité organisationnelle",
    color: "text-accent"
  },
  {
    icon: Award,
    title: "Image professionnelle",
    description: "Renforcez votre image d'entreprise",
    color: "text-primary"
  },
  {
    icon: Zap,
    title: "Déploiement facile",
    description: "Solution 100% cloud ou on-premise",
    color: "text-secondary"
  },
  {
    icon: Headphones,
    title: "Support réactif",
    description: "Accompagnement et évolutivité assurés",
    color: "text-accent"
  }
];

const BenefitsSection = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-muted/30 to-background" aria-labelledby="benefits-title">
      <div className="container mx-auto px-4">
        <div className="text-center space-y-4 mb-16">
          <h2 id="benefits-title" className="text-4xl lg:text-5xl font-bold text-foreground">
            Pourquoi choisir
            <span className="block bg-gradient-secondary bg-clip-text text-transparent">
              Hieraflow ?
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Découvrez les avantages concrets qui feront de Hieraflow 
            votre partenaire de choix pour la gestion organisationnelle.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8" role="list" aria-label="Avantages de Hieraflow">
          {benefits.map((benefit, index) => {
            const IconComponent = benefit.icon;
            return (
              <Card key={index} className="bg-card/80 backdrop-blur-sm border-0 shadow-card hover:shadow-elegant transition-all duration-300 group hover:-translate-y-2 focus-within:ring-2 focus-within:ring-primary" role="listitem">
                <CardContent className="p-8 text-center space-y-4">
                  <div className={`w-16 h-16 mx-auto bg-gradient-to-r from-background to-muted rounded-full flex items-center justify-center group-hover:scale-110 transition-transform`} aria-hidden="true">
                    <IconComponent className={`w-8 h-8 ${benefit.color}`} />
                  </div>
                  <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                    {benefit.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {benefit.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
        
        <div className="mt-16 text-center">
          <div className="inline-flex items-center space-x-2 bg-gradient-accent rounded-full px-6 py-3 text-accent-foreground font-semibold" role="note" aria-label="Information sur les types d'organisations">
            <Award className="w-5 h-5" aria-hidden="true" />
            <span>Pensé pour les PME, grandes entreprises et administrations</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;