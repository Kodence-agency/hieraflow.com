import { useState } from "react";
import { Plus, Minus, HelpCircle } from "lucide-react";

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (i: number) => setOpenIndex(openIndex === i ? null : i);

  const faqs = [
    {
      question: "Comment se passe la mise en place de Hieraflow ?",
      answer: (
        <>
          <p className="mb-3">Deux scénarios selon votre choix de déploiement :</p>
          <p className="font-semibold text-foreground mb-1">En mode SaaS :</p>
          <p className="mb-3">
            Hieraflow fournit un template Excel à compléter avec vos données. Vous le chargez directement dans la plateforme en suivant les instructions fournies. Si vous préférez déléguer cette étape, l'équipe Hieraflow peut s'en charger (sur devis).
          </p>
          <p className="font-semibold text-foreground mb-1">En mode On-Premise :</p>
          <p>
            Une étude des prérequis infrastructure est réalisée en amont. L'équipe Hieraflow prend en charge l'installation. Le client peut également l'assurer lui-même grâce aux manuels d'installation et au support de l'équipe.
          </p>
        </>
      ),
    },
    {
      question: "Comment se fait le chargement des données dans Hieraflow ?",
      answer: (
        <>
          <p className="mb-2">Deux modes sont disponibles :</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>
              <span className="font-medium text-foreground">Chargement en bloc</span> : idéal pour les volumes importants, avec possibilité de développer une interface avec votre AD ou SIRH.
            </li>
            <li>
              <span className="font-medium text-foreground">Saisie manuelle</span> : créez et modifiez des fiches au fur et à mesure de la vie de l'organisation.
            </li>
          </ul>
          <p className="mt-2">Vous pouvez également exporter la base sous forme d'Excel, la modifier puis la réimporter.</p>
        </>
      ),
    },
    {
      question: "\"On a déjà un organigramme.\"",
      answer:
        "Est-il à jour en temps réel ou mis à jour après chaque mouvement ? La vraie question n'est pas d'avoir un organigramme, c'est d'avoir une structure fiable, utilisable par vos équipes au quotidien.",
    },
    {
      question: "\"On a déjà un SIRH.\"",
      answer:
        "Votre SIRH stocke des données RH. Hieraflow rend les données de l'organisation visibles et actionnables par tous. Ce n'est pas le même usage.",
    },
    {
      question: "\"Ce n'est pas prioritaire.\"",
      answer:
        "Combien de temps vos équipes perdent chaque semaine à chercher qui contacter ? Ce temps existe déjà. Hieraflow ne crée pas un coût, il supprime une perte.",
    },
    {
      question: "\"On n'a pas le temps d'un nouveau projet IT.\"",
      answer:
        "Justement : Hieraflow n'est pas un projet IT. Paramétrage en quelques jours. Adoption immédiate. Zéro refonte SI.",
    },
    {
      question: "\"Nos équipes ne vont pas l'utiliser.\"",
      answer:
        "Les équipes utilisent déjà Google pour chercher de l'info. Hieraflow fonctionne pareil. Pas de formation lourde. Adoption naturelle.",
    },
    {
      question: "\"On est trop petit pour ça.\"",
      answer:
        "Nos clients commencent souvent à 50–80 collaborateurs. C'est exactement le moment où la structure commence à devenir floue et difficilement maintenable.",
    },
    {
      question: "\"On est trop grand / trop complexe.\"",
      answer:
        "Hieraflow est conçu pour les structures multi-équipes, multi-sites et multi-rattachements. C'est précisément là qu'il apporte le plus de valeur.",
    },
    {
      question: "Quel nombre maximum de collaborateurs est supporté ?",
      answer:
        "Hieraflow s'adapte à toutes les tailles. Des discriminants (département, service) facilitent la lisibilité de l'affichage, configurables directement par l'utilisateur.",
    },
    {
      question: "\"On peut le faire nous-mêmes sur Excel / PowerPoint.\"",
      answer:
        "Vous pouvez aussi faire votre comptabilité sur Excel. La question est : est-ce fiable, à jour, partagé et utilisable par tous ceux qui en ont besoin chaque jour ?",
    },
    {
      question: "\"On manque déjà d'outils.\"",
      answer:
        "Hieraflow remplace des fichiers, PowerPoint, tableaux et intranet bricolés. Il simplifie votre écosystème, il ne rajoute pas une couche.",
    },
    {
      question: "Quel est le ROI ?",
      answer:
        "Une entreprise de 200 personnes qui perd 10 min/jour par collaborateur perd environ 400 h/mois. Hieraflow coûte une fraction de ce gaspillage. Sans compter les mails envoyés à la mauvaise personne : perte business, image, crédibilité et délais rallongés.",
    },
    {
      question: "\"Nos données sont sensibles.\"",
      answer:
        "Gestion fine des rôles, bases chiffrées et mécanismes d'authentification en mode SaaS. En mode on-premise, vous gardez la maîtrise totale de vos données.",
    },
    {
      question: "\"On verra plus tard.\"",
      answer:
        "Plus vous grandissez, plus la structure devient difficile à rattraper. Le bon moment, c'est avant que le flou ne coûte cher.",
    },
    {
      question: "\"Ce n'est qu'un organigramme.\"",
      answer:
        "Un organigramme figé montre une photo. Hieraflow montre le système vivant de votre entreprise. Création d'un nouveau service en temps réel, changements d'affectation instantanés : repositionnement transparent et rapide.",
    },
    {
      question: "Qui met à jour les données ?",
      answer: (
        <>
          <p className="mb-2">
            Hieraflow est conçu pour être simple à maintenir. Selon votre organisation, la mise à jour peut être assurée par l'équipe RH ou un référent identifié.
          </p>
          <p>Les droits sont configurés par rôle pour garantir des données fiables :</p>
          <ul className="list-disc pl-5 mt-1 space-y-1">
            <li><span className="font-medium text-foreground">Administrateur</span> : tous les droits</li>
            <li><span className="font-medium text-foreground">Éditeur</span> : édition et lecture</li>
            <li><span className="font-medium text-foreground">Lecteur</span> : lecture seule</li>
          </ul>
        </>
      ),
    },
    {
      question: "SaaS ou installation interne ?",
      answer: (
        <>
          <p className="mb-2">Les deux options sont possibles :</p>
          <ul className="list-disc pl-5 space-y-1">
            <li><span className="font-medium text-foreground">Version SaaS</span> : hébergement sécurisé, déploiement rapide, maintenance incluse.</li>
            <li><span className="font-medium text-foreground">Version On-Premise</span> : installation sur vos serveurs, maîtrise totale des données. Support Hieraflow possible sur devis.</li>
          </ul>
          <p className="mt-2">Vous choisissez selon vos contraintes IT et de sécurité.</p>
        </>
      ),
    },
    {
      question: "Combien de temps faut-il pour déployer Hieraflow ?",
      answer:
        "La structure initiale est paramétrée en quelques jours. La plateforme est opérationnelle très rapidement, sans projet IT lourd.",
    },
    {
      question: "Faut-il former les équipes ?",
      answer:
        "Non. L'interface est intuitive. La prise en main est immédiate, comme un site web classique.",
    },
    {
      question: "Les données sont-elles sécurisées ?",
      answer:
        "Oui. Gestion fine des accès par rôles, contrôle des droits, hébergement sécurisé ou interne selon votre choix.",
    },
    {
      question: "Qui utilise Hieraflow au quotidien ?",
      answer:
        "Tous les collaborateurs : dirigeants, RH, managers, chefs de projets et nouvelles recrues y trouvent instantanément les informations dont ils ont besoin.",
    },
  ];

  return (
    <section id="faq" className="py-20 bg-gradient-to-b from-muted/20 to-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-primary/10 rounded-full px-4 py-2 text-primary mb-4">
            <HelpCircle className="w-4 h-4" />
            <span className="text-sm font-medium">FAQ</span>
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Questions
            <span className="block bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              fréquentes
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Retrouvez les réponses aux questions les plus courantes sur Hieraflow.
          </p>
        </div>

        <div className="max-w-3xl mx-auto space-y-3">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="border border-border/50 rounded-xl bg-card overflow-hidden transition-shadow hover:shadow-md"
            >
              <button
                onClick={() => toggle(index)}
                className="w-full flex items-center justify-between p-5 text-left gap-4"
              >
                <span className="font-semibold text-foreground text-base leading-snug">
                  {faq.question}
                </span>
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center transition-colors group-hover:bg-primary/20">
                  {openIndex === index ? (
                    <Minus className="w-4 h-4 text-primary" />
                  ) : (
                    <Plus className="w-4 h-4 text-primary" />
                  )}
                </span>
              </button>
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  openIndex === index ? "max-h-[600px] opacity-100" : "max-h-0 opacity-0"
                }`}
              >
                <div className="px-5 pb-5 text-muted-foreground leading-relaxed">
                  {faq.answer}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
