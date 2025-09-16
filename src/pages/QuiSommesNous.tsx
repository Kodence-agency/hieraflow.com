import { Building2, Users, Target, Lightbulb, Award, Heart, Shield, TrendingUp, Clock, CheckCircle, Leaf, Accessibility, HandHeart } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const QuiSommesNous = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-20">
        {/* Hero Section */}
        <section className="bg-gradient-subtle py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
                Qui sommes-nous ?
              </h1>
              <p className="text-xl text-muted-foreground mb-8">
                Hieraflow est développé par <a href="https://heavenit.org" target="_blank" rel="noopener noreferrer" className="text-primary font-semibold hover:text-primary/80 underline transition-colors">HEAVEN IT</a>, 
                acteur engagé dans l'accessibilité, l'éthique et la sustainability numérique.
              </p>
            </div>
          </div>
        </section>

        {/* About HEAVEN IT */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                  À propos de HEAVEN IT
                </h2>
                <p className="text-lg text-muted-foreground max-w-4xl mx-auto">
                  HEAVEN IT est spécialisée dans l'accompagnement des organisations, collectivités et administrations 
                  dans leur transformation digitale. Son expertise se concentre sur la gestion applicative et les 
                  services aux utilisateurs, avec pour objectif de développer des solutions agiles et performantes, 
                  adaptées aux besoins métiers.
                </p>
              </div>

              {/* Core Values */}
              <div className="grid md:grid-cols-3 gap-8 mb-20">
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                    <Accessibility className="w-8 h-8 text-primary-foreground" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-3">Accessibilité</h3>
                  <p className="text-muted-foreground">
                    Solutions numériques inclusives et accessibles à tous
                  </p>
                </div>

                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                    <HandHeart className="w-8 h-8 text-primary-foreground" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-3">Éthique</h3>
                  <p className="text-muted-foreground">
                    Approche responsable et transparente dans tous nos projets
                  </p>
                </div>

                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                    <Leaf className="w-8 h-8 text-primary-foreground" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-3">Sustainability</h3>
                  <p className="text-muted-foreground">
                    Développement durable et solutions éco-responsables
                  </p>
                </div>
              </div>

              {/* Philosophy */}
              <div className="bg-card rounded-lg p-8 border mb-20">
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-foreground mb-4">
                    Notre Philosophie
                  </h3>
                </div>
                <p className="text-muted-foreground text-lg leading-relaxed text-center max-w-4xl mx-auto">
                  En plaçant l'humain et l'expérience utilisateur au centre, Heaven IT contribue à améliorer 
                  la qualité des environnements de travail numériques et à créer les conditions d'innovation 
                  pour ses clients. Grâce à son approche basée sur la proximité, l'écoute et l'excellence 
                  opérationnelle, Heaven IT se positionne comme un partenaire de confiance pour accélérer 
                  et réussir les projets de transformation digitale.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Why Trust Us */}
        <section className="py-20 bg-gradient-subtle">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                  Pourquoi nous faire confiance ?
                </h2>
              </div>

              <div className="grid md:grid-cols-2 gap-8 mb-12">
                <Card className="border-primary/20">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3">
                      <Shield className="w-6 h-6 text-primary" />
                      Sécurité & Conformité
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">
                      Hiéraflow garantit la fiabilité des données et assure la confidentialité maximale, 
                      conformément aux exigences du RGPD.
                    </p>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li>• Hébergement sécurisé</li>
                      <li>• Chiffrement des données</li>
                      <li>• Contrôles d'accès stricts</li>
                      <li>• Conformité RGPD</li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="border-primary/20">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3">
                      <Users className="w-6 h-6 text-primary" />
                      Accompagnement Humain
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">
                      Notre équipe de spécialistes assure un support réactif et un suivi continu 
                      pour garantir la meilleure adoption possible.
                    </p>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li>• Support réactif</li>
                      <li>• Formations adaptées</li>
                      <li>• Suivi personnalisé</li>
                      <li>• Partenariat durable</li>
                    </ul>
                  </CardContent>
                </Card>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                <Card className="border-primary/20">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3">
                      <Target className="w-6 h-6 text-primary" />
                      Flexibilité & Évolutivité
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Hiéraflow s'adapte à toutes les tailles et structures d'entreprise, 
                      avec une interface intuitive qui simplifie la prise en main. 
                      Les processus automatisés libèrent du temps aux équipes RH.
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-primary/20">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3">
                      <Award className="w-6 h-6 text-primary" />
                      Excellence Opérationnelle
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Notre engagement va au-delà de la simple fourniture d'un outil : 
                      nous créons un véritable partenariat centré sur la confiance, 
                      la transparence et l'excellence opérationnelle.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Key Figures */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                  Quelques chiffres clés
                </h2>
                <p className="text-lg text-muted-foreground">
                  L'impact mesurable de nos solutions sur votre organisation
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                <Card className="text-center border-primary/20">
                  <CardContent className="pt-6">
                    <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                      <Clock className="w-8 h-8 text-primary-foreground" />
                    </div>
                    <div className="text-3xl font-bold text-primary mb-2">30%</div>
                    <p className="text-sm text-muted-foreground">
                      Réduction du temps consacré à la gestion RH grâce à la centralisation 
                      et à l'automatisation
                    </p>
                  </CardContent>
                </Card>

                <Card className="text-center border-primary/20">
                  <CardContent className="pt-6">
                    <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                      <TrendingUp className="w-8 h-8 text-primary-foreground" />
                    </div>
                    <div className="text-3xl font-bold text-primary mb-2">15-25%</div>
                    <p className="text-sm text-muted-foreground">
                      Amélioration de la productivité des équipes par une meilleure 
                      visibilité et coordination
                    </p>
                  </CardContent>
                </Card>

                <Card className="text-center border-primary/20">
                  <CardContent className="pt-6">
                    <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                      <Lightbulb className="w-8 h-8 text-primary-foreground" />
                    </div>
                    <div className="text-3xl font-bold text-primary mb-2">50%</div>
                    <p className="text-sm text-muted-foreground">
                      Agilité organisationnelle accrue permettant une réponse aux changements 
                      plus rapide
                    </p>
                  </CardContent>
                </Card>

                <Card className="text-center border-primary/20">
                  <CardContent className="pt-6">
                    <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                      <CheckCircle className="w-8 h-8 text-primary-foreground" />
                    </div>
                    <div className="text-3xl font-bold text-primary mb-2">40%</div>
                    <p className="text-sm text-muted-foreground">
                      Diminution des erreurs liées à la gestion manuelle grâce aux outils 
                      numériques simplifiés
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Contact CTA */}
        <section className="py-20 bg-gradient-subtle">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                Prêt à transformer votre organisation ?
              </h2>
              <p className="text-xl text-muted-foreground mb-8">
                Avec HEAVEN IT et Hiéraflow, vous disposez d'un allié technologique et humain fiable, 
                capable de soutenir durablement vos projets de transformation digitale et de valorisation 
                du capital humain.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a href="#contact" className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-11 px-6 py-2">
                  Nous contacter
                </a>
                <a href="https://app.hieraflow.com" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-11 px-6 py-2">
                  Essayer Hieraflow
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default QuiSommesNous;