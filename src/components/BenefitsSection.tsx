import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Clock,
  Target,
  Eye,
  Award,
  Zap,
  Headphones,
  ArrowRight,
  ChevronDown,
} from "lucide-react";

const solutions = [
  {
    icon: Clock,
    title: "Gain de temps et productivité",
    description: "Simplifiez la gestion de vos équipes au quotidien grâce à une interface centralisée.",
    detail: "Hieraflow centralise toutes les informations organisationnelles en un seul endroit. Fini les allers-retours entre fichiers Excel, annuaires obsolètes et organigrammes figés. Vos équipes gagnent en moyenne 3h par semaine sur les tâches de coordination.",
  },
  {
    icon: Target,
    title: "Adaptabilité",
    description: "S'adapte à votre organisation unique, quelle que soit sa taille ou son secteur.",
    detail: "Que vous soyez une PME de 20 personnes ou un groupe de 10 000 collaborateurs, Hieraflow s'ajuste à votre structure : hiérarchie classique, matricielle, multi-sites ou hybride. La configuration est flexible et évolutive.",
  },
  {
    icon: Eye,
    title: "Transparence",
    description: "Offrez une visibilité totale sur les rôles et les responsabilités de vos équipes.",
    detail: "Chaque collaborateur accède à une vue claire de l'organisation : qui fait quoi, qui reporte à qui, quels sont les périmètres de chacun. Cette transparence renforce la confiance et fluidifie la communication interne.",
  },
  {
    icon: Award,
    title: "Image valorisée",
    description: "Renforcez votre image avec un organigramme moderne et interactif.",
    detail: "Présentez votre organisation de manière professionnelle à vos partenaires, clients et candidats. L'organigramme interactif de Hieraflow reflète le dynamisme et la modernité de votre entreprise.",
  },
  {
    icon: Zap,
    title: "Déploiement facile",
    description: "Solution 100% cloud ou on-premise, opérationnelle en quelques heures.",
    detail: "Aucune infrastructure lourde à installer. Hieraflow se déploie en mode SaaS ou on-premise selon vos contraintes. L'import de vos données existantes est automatisé et votre équipe est opérationnelle dès le premier jour.",
  },
  {
    icon: Headphones,
    title: "Support réactif assuré",
    description: "Une équipe dédiée vous accompagne à chaque étape pour garantir votre réussite.",
    detail: "Notre équipe support vous accompagne de l'onboarding à l'usage quotidien : formation personnalisée, assistance technique réactive et suivi régulier pour garantir une adoption optimale par vos équipes.",
  },
];

const BenefitsSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleBenefit = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section
      className="py-20 bg-gradient-to-br from-muted/30 to-background"
      aria-labelledby="benefits-title"
    >
      <div className="container mx-auto px-4">
        <div className="text-center space-y-4 mb-16">
          <h2
            id="benefits-title"
            className="text-4xl lg:text-5xl font-bold text-foreground"
          >
            Pourquoi choisir
            <span className="block text-primary">
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
            const isOpen = openIndex === index;
            return (
              <div key={index}>
                <button
                  onClick={() => toggleBenefit(index)}
                  className={`w-full flex items-start gap-4 p-6 rounded-xl bg-card/80 backdrop-blur-sm shadow-card transition-all duration-300 group cursor-pointer text-left ${
                    isOpen ? "shadow-elegant border border-primary/30" : "hover:shadow-elegant hover:-translate-y-1 border border-transparent"
                  }`}
                  aria-expanded={isOpen}
                >
                  <div
                    className="w-12 h-12 shrink-0 bg-gradient-primary rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform"
                    aria-hidden="true"
                  >
                    <IconComponent className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors mb-1">
                      {solution.title}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {solution.description}
                    </p>
                  </div>
                  <ChevronDown
                    className={`w-5 h-5 shrink-0 text-muted-foreground mt-1 transition-transform duration-300 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                    aria-hidden="true"
                  />
                </button>
                <div className={`overflow-hidden transition-all duration-300 ${isOpen ? "max-h-48 opacity-100 mt-2" : "max-h-0 opacity-0 mt-0"}`}>
                  <div className="bg-card border border-border/50 rounded-xl px-5 py-4 shadow-card">
                    <p className="text-sm text-muted-foreground leading-relaxed">{solution.detail}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="text-center">
          <Button variant="corporate" size="lg" className="text-lg px-10 py-6 group" asChild>
            <a href="#contact">
              Demander une démo
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;
