import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Network,
  Users,
  Shield,
  Palette,
  Cloud,
  Building2,
  ArrowRight,
  CheckCircle,
  ChevronDown,
  Search,
  Eye,
  Lock,
  Settings,
  Server,
  Globe,
} from "lucide-react";
import { useState } from "react";

const DiscoverSection = () => {
  const [openItems, setOpenItems] = useState<number[]>([]);

  const toggleItem = (index: number) => {
    setOpenItems(
      (prev) =>
        prev.includes(index)
          ? [] // Close the current item
          : [index] // Close all others and open only this one
    );
  };

  const features = [
    {
      icon: Network,
      title: "Organigramme interactif",
      description:
        "Vue hiérarchique complète de vos collaborateurs organisée par services et départements.",
      details: {
        subtitle: "Visualisation hiérarchique intelligente",
        content: [
          "Navigation intuitive dans l'arbre organisationnel",
          "Zoom et filtrage par service, département ou fonction",
          "Vue d'ensemble ou détaillée selon les besoins",
          "Mise à jour automatique des relations hiérarchiques",
        ],
        highlights: [
          { icon: Search, text: "Recherche instantanée par nom ou fonction" },
          { icon: Eye, text: "Vue interactive avec zoom et navigation fluide" },
        ],
      },
    },
    {
      icon: Users,
      title: "Trombinoscope dynamique",
      description:
        "Identification facilitée des agents par fonction, service et nom avec photos professionnelles.",
      details: {
        subtitle: "Répertoire visuel complet",
        content: [
          "Photos professionnelles haute résolution",
          "Informations de contact intégrées",
          "Filtrage avancé par critères multiples",
          "Mise à jour simple des profils collaborateurs",
        ],
        highlights: [
          {
            icon: Users,
            text: "Base de données centralisée des collaborateurs",
          },
          { icon: Search, text: "Recherche multicritères avancée" },
        ],
      },
    },
    {
      icon: Palette,
      title: "Interface personnalisable",
      description:
        "Design adapté à votre charte graphique et compatible avec vos CMS existants.",
      details: {
        subtitle: "Adaptation parfaite à votre identité",
        content: [
          "Personnalisation complète des couleurs et logos",
          "Templates adaptés à différents secteurs",
          "Intégration WordPress et autres CMS",
          "Interface responsive sur tous les appareils",
        ],
        highlights: [
          { icon: Palette, text: "Thèmes personnalisés selon votre charte" },
          { icon: Globe, text: "Compatible avec tous les CMS populaires" },
        ],
      },
    },
    {
      icon: Shield,
      title: "Gestion sécurisée des rôles",
      description:
        "Contrôle précis des accès et permissions selon les niveaux d'autorisation.",
      details: {
        subtitle: "Sécurité et contrôle d'accès avancés",
        content: [
          "Définition fine des rôles et permissions",
          "Authentification sécurisée multi-facteurs",
          "Audit trail complet des modifications",
          "Conformité RGPD intégrée",
        ],
        highlights: [
          { icon: Lock, text: "Chiffrement des données sensibles" },
          { icon: Shield, text: "Authentification sécurisée SSO disponible" },
        ],
      },
    },
    {
      icon: Building2,
      title: "Gestion complète des entités",
      description:
        "Administration centralisée des collaborateurs, départements et sites.",
      details: {
        subtitle: "Administration centralisée",
        content: [
          "Gestion multi-sites et multi-départements",
          "Import/export de données en masse",
          "Historique des modifications",
          "Workflows d'approbation personnalisables",
        ],
        highlights: [
          { icon: Building2, text: "Structure organisationnelle flexible" },
          { icon: Settings, text: "Workflows personnalisables" },
        ],
      },
    },
    {
      icon: Cloud,
      title: "Déploiement flexible",
      description:
        "Solution 100% cloud ou on-premise selon vos exigences de sécurité.",
      details: {
        subtitle: "Infrastructure adaptée à vos besoins",
        content: [
          "Déploiement cloud sécurisé ou sur vos serveurs",
          "Sauvegarde automatique et redondance",
          "Monitoring 24/7 et support technique",
          "Évolutivité selon votre croissance",
        ],
        highlights: [
          { icon: Cloud, text: "Hébergement sécurisé en Europe" },
          { icon: Server, text: "Option on-premise disponible" },
        ],
      },
    },
  ];

  const benefits = [
    "Gain de temps dans la gestion des équipes",
    "Adaptabilité parfaite à votre organisation",
    "Transparence organisationnelle renforcée",
    "Image professionnelle valorisée",
    "Support client réactif et évolutivité assurée",
  ];

  return (
    <section
      id="decouvrir"
      className="py-20 bg-gradient-to-b from-background to-muted/20"
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-primary/10 rounded-full px-4 py-2 text-primary mb-4">
            <Building2 className="w-4 h-4" />
            <span className="text-sm font-medium">Découvrir Hieraflow</span>
          </div>

          <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Le système nerveux de
            <span className="block bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              votre organisation
            </span>
          </h2>

          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Hieraflow rend visible et accessible les compétences, les rôles, et comment vos équipes sont reliées, pour que chacun sache en temps réel qui contacter et que les managers atteignent leurs objectifs avec clarté et simplicité avec une expérience fluide et intuitive.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => (
            <Collapsible
              key={index}
              open={openItems.includes(index)}
              onOpenChange={() => toggleItem(index)}
            >
              <Card className="group hover:shadow-elegant transition-all duration-300 border-border/50 overflow-hidden">
                <CardContent className="p-0">
                  <CollapsibleTrigger asChild>
                    <div className="p-6 cursor-pointer hover:bg-muted/30 transition-colors">
                      <div className="flex items-start justify-between mb-4">
                        <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                          <feature.icon className="w-6 h-6 text-primary-foreground" />
                        </div>
                        <ChevronDown
                          className={`w-5 h-5 text-muted-foreground transition-transform duration-200 ${
                            openItems.includes(index) ? "rotate-180" : ""
                          }`}
                        />
                      </div>
                      <h3 className="text-xl font-semibold text-foreground mb-3">
                        {feature.title}
                      </h3>
                      <p className="text-muted-foreground leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  </CollapsibleTrigger>

                  <CollapsibleContent className="border-t border-border/30">
                    <div className="p-6 bg-muted/20">
                      <h4 className="text-lg font-semibold text-foreground mb-4">
                        {feature.details.subtitle}
                      </h4>

                      <ul className="space-y-2 mb-6">
                        {feature.details.content.map((item, idx) => (
                          <li key={idx} className="flex items-start space-x-2">
                            <CheckCircle className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                            <span className="text-sm text-muted-foreground">
                              {item}
                            </span>
                          </li>
                        ))}
                      </ul>

                      <div className="space-y-3">
                        {feature.details.highlights.map((highlight, idx) => (
                          <div
                            key={idx}
                            className="flex items-center space-x-3 p-3 bg-card rounded-lg border border-border/30"
                          >
                            <highlight.icon className="w-5 h-5 text-primary flex-shrink-0" />
                            <span className="text-sm font-medium text-foreground">
                              {highlight.text}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CollapsibleContent>
                </CardContent>
              </Card>
            </Collapsible>
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
                    Demander une démo
                    <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
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
                    Que vous soyez une PME de 10 employés ou une grande
                    entreprise de 10 000 collaborateurs, Hieraflow s'adapte à
                    votre structure organisationnelle.
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
