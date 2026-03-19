import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Sparkles,
  Palette,
  Rocket,
  Building2,
  Users,
  Landmark,
  ArrowRight,
  ChevronDown,
} from "lucide-react";

const interfacePoints = [
  { icon: Sparkles, text: "Interface intuitive et responsive", description: "Navigation fluide sur tous les appareils" },
  { icon: Palette, text: "Personnalisation selon votre charte", description: "Couleurs, logos et templates adaptés" },
  { icon: Rocket, text: "Intégration rapide", description: "Connectez Hieraflow à vos outils existants en quelques clics" },
  { icon: Users, text: "Gestion collaborative des équipes", description: "Rôles, permissions et accès centralisés" },
  { icon: Building2, text: "Multi-sites et multi-entités", description: "Une vue unifiée de toute votre organisation" },
];

const audiences = [
  {
    icon: Building2,
    label: "PME",
    description: "Dès 10 employés",
    detail: "Hieraflow offre aux PME une solution simple et rapide à déployer pour structurer leur organisation dès les premières phases de croissance. Organigramme clair, gestion des rôles et onboarding facilité — sans complexité inutile.",
  },
  {
    icon: Users,
    label: "Grandes entreprises",
    description: "Jusqu'à 10 000+",
    detail: "Pour les grandes structures, Hieraflow gère la complexité multi-sites, multi-entités et multi-niveaux hiérarchiques. Synchronisation RH, droits d'accès granulaires et reporting avancé pour piloter l'organisation à grande échelle.",
  },
  {
    icon: Landmark,
    label: "Administrations",
    description: "Collectivités et services publics",
    detail: "Hieraflow répond aux exigences spécifiques du secteur public : hébergement souverain, conformité RGPD, gestion des organigrammes complexes et accompagnement dédié pour les collectivités et administrations.",
  },
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
            Une solution pensée pour
            <span className="block text-primary">répondre à vos besoins</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Chaque fonctionnalité a été conçue pour simplifier votre quotidien et accompagner votre organisation à chaque étape.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Left — Interface */}
          <div className="bg-gradient-to-br from-card to-muted/30 rounded-2xl p-8 lg:p-10 shadow-card border border-border/40">
            <h3 className="text-2xl font-bold text-foreground mb-2">
              Une interface pensée pour vous
            </h3>
            <p className="text-muted-foreground mb-6">
              Chaque fonctionnalité a été conçue pour simplifier votre quotidien et améliorer la collaboration.
            </p>
            <ul className="space-y-4" role="list" aria-label="Points clés de l'interface">
              {interfacePoints.map((point, index) => {
                const IconComponent = point.icon;
                return (
                  <li key={index} className="flex items-start gap-4 group" role="listitem">
                    <div className="w-11 h-11 shrink-0 bg-gradient-primary rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform" aria-hidden="true">
                      <IconComponent className="w-5 h-5 text-primary-foreground" />
                    </div>
                    <div>
                      <span className="text-foreground font-semibold block">{point.text}</span>
                      <span className="text-muted-foreground text-sm">{point.description}</span>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Right — Adaptation */}
          <div className="bg-gradient-to-br from-primary/8 to-accent/8 rounded-2xl p-8 lg:p-10 shadow-card border border-primary/15 flex flex-col">
            <h3 className="text-2xl font-bold text-foreground mb-2">
              Hieraflow s'adapte à votre organisation
            </h3>
            <p className="text-muted-foreground mb-8">
              Quelle que soit votre taille ou votre secteur, Hieraflow s'ajuste à votre structure pour répondre précisément à vos enjeux.
            </p>
            <ul className="space-y-4 flex-1 mb-8" role="list" aria-label="Types d'organisations supportées">
              {audiences.map((item, index) => {
                const IconComponent = item.icon;
                return (
                  <li key={index} className="flex items-center gap-4 p-3.5 rounded-xl bg-card/80 border border-border/30 group hover:shadow-card transition-all" role="listitem">
                    <div className="w-10 h-10 shrink-0 rounded-lg bg-primary/10 flex items-center justify-center" aria-hidden="true">
                      <IconComponent className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <span className="text-foreground font-semibold block text-sm">{item.label}</span>
                      <span className="text-muted-foreground text-xs">{item.description}</span>
                    </div>
                  </li>
                );
              })}
            </ul>
            <Button variant="corporate" size="lg" className="w-full group" asChild>
              <a href="#contact">
                Demander une démo
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
