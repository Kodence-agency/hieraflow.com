import { TrendingUp, Users, Zap, Shield, Target, ArrowRight } from "lucide-react";

const challenges = [
  {
    icon: Users,
    problem: "Qui contacter ?",
    description: "Vos équipes perdent du temps à chercher le bon interlocuteur.",
  },
  {
    icon: Target,
    problem: "Qui fait quoi ?",
    description: "Les rôles et périmètres deviennent flous à mesure que l'organisation grandit.",
  },
  {
    icon: Zap,
    problem: "Décisions ralenties",
    description: "Sans visibilité sur la structure, les circuits de validation s'allongent.",
  },
  {
    icon: Shield,
    problem: "Intégration difficile",
    description: "Les nouveaux collaborateurs mettent des semaines à comprendre l'organisation.",
  },
];

const solutions = [
  "Un organigramme toujours à jour, accessible par tous en temps réel",
  "Une identification instantanée des rôles, rattachements et contacts",
  "Une navigation intuitive dans la structure, même multi-sites",
  "Une intégration accélérée des nouveaux collaborateurs",
  "Des données organisationnelles fiables pour piloter la croissance",
];

const GrowthSection = () => {
  return (
    <section className="py-24 bg-gradient-to-b from-muted/30 to-background" aria-labelledby="growth-title">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-primary/10 rounded-full px-4 py-2 text-primary mb-6">
            <TrendingUp className="w-4 h-4" />
            <span className="text-sm font-medium">Accompagner votre croissance</span>
          </div>
          <h2
            id="growth-title"
            className="text-4xl lg:text-5xl font-bold text-foreground mb-6"
          >
            Soutenir la croissance de
            <span className="block text-primary">votre organisation</span>
          </h2>
          <p className="text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto">
            Quand l'entreprise grandit, la complexité augmente. Sans clarté organisationnelle, la performance ralentit. Hieraflow donne à chacun la visibilité nécessaire pour avancer vite et bien.
          </p>
        </div>

        {/* Challenges grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {challenges.map((item, index) => {
            const IconComponent = item.icon;
            return (
              <div
                key={index}
                className="group p-6 rounded-2xl bg-card border border-border/50 shadow-card hover:shadow-elegant transition-all duration-300 hover:-translate-y-1"
              >
                <div className="w-12 h-12 bg-destructive/10 rounded-xl flex items-center justify-center mb-4" aria-hidden="true">
                  <IconComponent className="w-6 h-6 text-destructive" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">{item.problem}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
              </div>
            );
          })}
        </div>

        {/* Solution block */}
        <div className="max-w-4xl mx-auto">
          <div className="relative rounded-2xl bg-gradient-primary p-10 lg:p-14 overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.1),transparent_60%)]" aria-hidden="true" />
            <div className="relative z-10">
              <h3
                className="text-2xl lg:text-3xl font-bold text-primary-foreground mb-3"
                style={{ textShadow: "0 1px 8px rgba(0,0,0,0.15)" }}
              >
                Ce que Hieraflow apporte
              </h3>
              <p className="text-primary-foreground/80 mb-8 text-lg">
                Une plateforme qui transforme la complexité en clarté.
              </p>
              <ul className="space-y-4">
                {solutions.map((solution, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="mt-1 w-5 h-5 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                      <ArrowRight className="w-3 h-3 text-primary-foreground" />
                    </div>
                    <span className="text-primary-foreground/90 text-base leading-relaxed">{solution}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GrowthSection;
