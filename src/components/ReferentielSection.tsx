import { BookOpen, Search, Users, Rocket } from "lucide-react";

const highlights = [
  { icon: Search, text: "Comprendre l'entreprise" },
  { icon: Users, text: "Trouver les bons contacts" },
  { icon: Rocket, text: "Staffer et gérer les projets plus vite" },
  { icon: BookOpen, text: "Intégrer un nouveau en quelques jours" },
];

const ReferentielSection = () => {
  return (
    <section className="py-20 bg-muted/20" aria-labelledby="referentiel-title">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2
            id="referentiel-title"
            className="text-4xl lg:text-5xl font-bold text-foreground mb-6"
          >
            Un référentiel humain vivant,
            <span className="block text-primary">utile au quotidien</span>
          </h2>
          <p className="text-xl text-muted-foreground leading-relaxed mb-12 max-w-3xl mx-auto">
            Hieraflow transforme l'organigramme d'un document figé en outil opérationnel du quotidien : on comprend l'entreprise, on trouve les bons contacts, on staffe et on gère les projets plus vite, on intègre un nouveau en quelques jours.
          </p>
          <ul className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6" role="list">
            {highlights.map((item, index) => {
              const IconComponent = item.icon;
              return (
                <li
                  key={index}
                  className="flex flex-col items-center gap-3 p-5 rounded-xl bg-card shadow-card hover:shadow-elegant transition-all duration-300 hover:-translate-y-1"
                  role="listitem"
                >
                  <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center" aria-hidden="true">
                    <IconComponent className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <span className="text-foreground font-medium text-sm">{item.text}</span>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default ReferentielSection;
