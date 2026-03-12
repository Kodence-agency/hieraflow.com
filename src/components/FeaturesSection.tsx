import { Sparkles, Palette, Rocket } from "lucide-react";

const interfacePoints = [
  { icon: Sparkles, text: "Interface intuitive et responsive" },
  { icon: Palette, text: "Personnalisation selon votre charte" },
  { icon: Rocket, text: "Déploiement rapide et sécurisé" },
];

const FeaturesSection = () => {
  return (
    <section
      id="main-content"
      className="py-20 bg-background"
      aria-labelledby="features-title"
    >
      <div className="container mx-auto px-4">
        <div className="text-center space-y-4 mb-16">
          <h2
            id="features-title"
            className="text-4xl lg:text-5xl font-bold text-foreground"
          >
            Soutenir la croissance de
            <span className="block text-primary">votre organisation</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Quand l'entreprise grandit, la complexité augmente. Sans clarté organisationnelle, la performance ralentit.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-br from-card to-muted/30 rounded-2xl p-10 shadow-card">
            <h3 className="text-3xl font-bold text-foreground mb-4 text-center">
              Une interface pensée pour vous
            </h3>
            <p className="text-lg text-muted-foreground text-center mb-8 max-w-2xl mx-auto">
              Chaque fonctionnalité de Hieraflow a été conçue pour simplifier votre quotidien et améliorer la collaboration au sein de votre organisation.
            </p>
            <ul className="grid sm:grid-cols-3 gap-6" role="list" aria-label="Points clés de l'interface">
              {interfacePoints.map((point, index) => {
                const IconComponent = point.icon;
                return (
                  <li key={index} className="flex flex-col items-center text-center gap-3 p-4" role="listitem">
                    <div className="w-14 h-14 bg-gradient-primary rounded-xl flex items-center justify-center" aria-hidden="true">
                      <IconComponent className="w-7 h-7 text-primary-foreground" />
                    </div>
                    <span className="text-foreground font-medium">{point.text}</span>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
