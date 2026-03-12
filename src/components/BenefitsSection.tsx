import { Button } from "@/components/ui/button";
import { 
  Clock, 
  Target, 
  Eye, 
  Award, 
  Zap, 
  Headphones,
  CheckCircle2
} from "lucide-react";

const solutions = [
  {
    icon: Clock,
    title: "Gain de temps",
    description: "Simplifiez la gestion de vos équipes au quotidien grâce à une interface centralisée."
  },
  {
    icon: Target,
    title: "Adaptabilité",
    description: "S'adapte à votre organisation unique, quelle que soit sa taille ou son secteur."
  },
  {
    icon: Eye,
    title: "Transparence",
    description: "Offrez une visibilité totale sur la structure et les compétences de vos équipes."
  },
  {
    icon: Award,
    title: "Image professionnelle",
    description: "Renforcez votre image avec un organigramme moderne et interactif."
  },
  {
    icon: Zap,
    title: "Déploiement facile",
    description: "Solution 100% cloud ou on-premise, opérationnelle en quelques heures."
  },
  {
    icon: Headphones,
    title: "Support réactif",
    description: "Un accompagnement dédié pour garantir votre succès à chaque étape."
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
            Des équipes alignées, une organisation lisible, et des décisions prises plus vite : Hieraflow donne à chaque collaborateur la clarté dont il a besoin pour avancer.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto mb-12">
          {solutions.map((solution, index) => {
            const IconComponent = solution.icon;
            return (
              <div 
                key={index} 
                className="flex items-start gap-4 p-6 rounded-xl bg-card/80 backdrop-blur-sm shadow-card hover:shadow-elegant transition-all duration-300 group hover:-translate-y-1"
              >
                <div className="w-12 h-12 shrink-0 bg-gradient-primary rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform" aria-hidden="true">
                  <IconComponent className="w-6 h-6 text-primary-foreground" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors mb-1">
                    {solution.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {solution.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="text-center">
          <a href="#contact">
            <Button variant="corporate" size="lg" className="text-lg px-10 py-6">
              Demander une démo
            </Button>
          </a>
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;
