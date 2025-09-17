import { Shield, CheckCircle, Users, Eye, Keyboard, Volume2, Smartphone, Globe } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Accessibilite = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-20" role="main">
        {/* Hero Section */}
        <section className="bg-gradient-subtle py-20" aria-labelledby="accessibility-title">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h1 id="accessibility-title" className="text-4xl md:text-5xl font-bold text-foreground mb-6">
                Déclaration d'Accessibilité
              </h1>
              <p className="text-xl text-muted-foreground mb-8">
                Hieraflow s'engage à rendre ses services accessibles à tous, conformément au RGAA (Référentiel Général d'Amélioration de l'Accessibilité).
              </p>
            </div>
          </div>
        </section>

        {/* Conformité RGAA */}
        <section className="py-20" aria-labelledby="conformity-title">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <h2 id="conformity-title" className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                  État de conformité
                </h2>
                <p className="text-lg text-muted-foreground max-w-4xl mx-auto">
                  Cette déclaration d'accessibilité s'applique au site web Hieraflow (hieraflow.com) et à l'application web Hieraflow.
                </p>
              </div>

              <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
                <div>
                  <Card className="border-primary/20 bg-primary/5">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-3">
                        <Shield className="w-6 h-6 text-primary" aria-hidden="true" />
                        Niveau de conformité RGAA 4.1
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-center gap-3">
                          <CheckCircle className="w-5 h-5 text-green-600" aria-hidden="true" />
                          <span className="text-foreground font-semibold">Partiellement conforme</span>
                        </div>
                        <p className="text-muted-foreground">
                          Le site respecte une majorité des critères RGAA 4.1 niveau AA. 
                          Nous travaillons continuellement à améliorer l'accessibilité de nos services.
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-foreground mb-6">
                    Notre engagement
                  </h3>
                  <p className="text-muted-foreground text-lg leading-relaxed mb-4">
                    HEAVEN IT s'engage à rendre ses services numériques accessibles conformément à l'article 47 de la loi n° 2005-102 du 11 février 2005.
                  </p>
                  <p className="text-muted-foreground text-lg leading-relaxed">
                    Cette déclaration d'accessibilité a été établie le <strong>17 septembre 2024</strong> et mise à jour le <strong>17 septembre 2024</strong>.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Mesures d'accessibilité */}
        <section className="py-20 bg-gradient-subtle" aria-labelledby="measures-title">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <h2 id="measures-title" className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                  Mesures d'accessibilité mises en œuvre
                </h2>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8" role="list" aria-label="Mesures d'accessibilité">
                <Card className="border-primary/20 text-center" role="listitem">
                  <CardContent className="pt-6">
                    <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4" aria-hidden="true">
                      <Keyboard className="w-8 h-8 text-primary-foreground" />
                    </div>
                    <h3 className="text-lg font-semibold text-foreground mb-3">Navigation clavier</h3>
                    <p className="text-sm text-muted-foreground">
                      Tous les éléments interactifs sont accessibles au clavier avec des raccourcis appropriés
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-primary/20 text-center" role="listitem">
                  <CardContent className="pt-6">
                    <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4" aria-hidden="true">
                      <Eye className="w-8 h-8 text-primary-foreground" />
                    </div>
                    <h3 className="text-lg font-semibold text-foreground mb-3">Contrastes visuels</h3>
                    <p className="text-sm text-muted-foreground">
                      Respect des ratios de contraste WCAG AA pour une lisibilité optimale
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-primary/20 text-center" role="listitem">
                  <CardContent className="pt-6">
                    <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4" aria-hidden="true">
                      <Volume2 className="w-8 h-8 text-primary-foreground" />
                    </div>
                    <h3 className="text-lg font-semibold text-foreground mb-3">Lecteurs d'écran</h3>
                    <p className="text-sm text-muted-foreground">
                      Compatibilité avec les technologies d'assistance et lecteurs d'écran
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-primary/20 text-center" role="listitem">
                  <CardContent className="pt-6">
                    <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4" aria-hidden="true">
                      <Smartphone className="w-8 h-8 text-primary-foreground" />
                    </div>
                    <h3 className="text-lg font-semibold text-foreground mb-3">Responsive design</h3>
                    <p className="text-sm text-muted-foreground">
                      Interface adaptative sur tous les appareils et tailles d'écran
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Technologies utilisées */}
        <section className="py-20" aria-labelledby="technologies-title">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 id="technologies-title" className="text-3xl font-bold text-foreground mb-6">
                  Technologies utilisées
                </h2>
              </div>

              <div className="bg-card rounded-lg p-8 border">
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-xl font-semibold text-foreground mb-4">Technologies compatibles</h3>
                    <ul className="space-y-2 text-muted-foreground" role="list">
                      <li role="listitem">• HTML5 sémantique</li>
                      <li role="listitem">• CSS3 avec unités relatives</li>
                      <li role="listitem">• JavaScript accessible</li>
                      <li role="listitem">• ARIA (Accessible Rich Internet Applications)</li>
                      <li role="listitem">• Navigation au clavier</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-foreground mb-4">Technologies d'assistance supportées</h3>
                    <ul className="space-y-2 text-muted-foreground" role="list">
                      <li role="listitem">• NVDA (Windows)</li>
                      <li role="listitem">• JAWS (Windows)</li>
                      <li role="listitem">• VoiceOver (macOS/iOS)</li>
                      <li role="listitem">• TalkBack (Android)</li>
                      <li role="listitem">• Dragon NaturallySpeaking</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact et signalement */}
        <section className="py-20 bg-gradient-subtle" aria-labelledby="contact-title">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 id="contact-title" className="text-3xl font-bold text-foreground mb-6">
                Signaler un problème d'accessibilité
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Si vous rencontrez un défaut d'accessibilité sur notre site, n'hésitez pas à nous le signaler.
              </p>
              
              <div className="bg-card rounded-lg p-8 border text-left">
                <h3 className="text-xl font-semibold text-foreground mb-4">Voies de recours</h3>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    <strong>Nous contacter :</strong><br />
                    Email : <a href="mailto:accessibilite@hieraflow.com" className="text-primary hover:text-primary/80 underline">accessibilite@hieraflow.com</a><br />
                    Téléphone : +33 (0)1 23 45 67 89
                  </p>
                  <p>
                    <strong>Défenseur des droits :</strong><br />
                    Si vous n'obtenez pas de réponse rapide de notre part, vous êtes en droit de faire appel au Défenseur des droits.<br />
                    <a href="https://formulaire.defenseurdesdroits.fr/" target="_blank" rel="noopener noreferrer" className="text-primary hover:text-primary/80 underline">
                      Contacter le Défenseur des droits
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Accessibilite;