import { TrendingUp, Users, Zap, Shield, Target, Network, UserCheck, MapPin, UserPlus, BarChart3 } from "lucide-react";

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
  {
    icon: Network,
    text: "Un organigramme toujours à jour, accessible par tous en temps réel",
  },
  {
    icon: UserCheck,
    text: "Une identification instantanée des rôles, rattachements et contacts",
  },
  {
    icon: MapPin,
    text: "Une navigation intuitive dans la structure, même multi-sites",
  },
  {
    icon: UserPlus,
    text: "Une intégration accélérée des nouveaux collaborateurs",
  },
  {
    icon: BarChart3,
    text: "Des données organisationnelles fiables pour piloter la croissance",
  },
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
          <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">
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

        {/* Solution bubbles block */}
        <div className="max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center space-x-2 bg-primary/10 rounded-full px-4 py-2 text-primary mb-6">
            <TrendingUp className="w-4 h-4" />
            <span className="text-sm font-medium">Ce que Hieraflow apporte</span>
          </div>
          <h2
            id="growth-title"
            className="text-3xl lg:text-4xl font-bold text-foreground mb-4"
          >
            La réponse à vos
            <span className="block bg-gradient-secondary bg-clip-text text-transparent">
              défis organisationnels
            </span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-2">
            Hieraflow apporte une solution concrète à chacun de ces problèmes, en un seul outil.
          </p>

          <div className="flex flex-wrap justify-center gap-4 mt-10">
            {solutions.map((solution, index) => {
              const IconComponent = solution.icon;
              return (
                <div
                  key={index}
                  className="group flex items-center gap-3 bg-card border border-border/60 rounded-full px-6 py-4 shadow-card hover:shadow-elegant hover:border-primary/30 hover:-translate-y-1 transition-all duration-300"
                >
                  <div className="w-10 h-10 shrink-0 bg-gradient-primary rounded-full flex items-center justify-center group-hover:scale-110 transition-transform" aria-hidden="true">
                    <IconComponent className="w-5 h-5 text-primary-foreground" />
                  </div>
                  <span className="text-sm font-medium text-foreground leading-snug text-left">
                    {solution.text}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default GrowthSection;
