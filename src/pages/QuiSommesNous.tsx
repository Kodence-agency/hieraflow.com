import { Building2, Users, Target, Lightbulb, Award, Heart } from "lucide-react";
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
                Hieraflow est développé par <span className="text-primary font-semibold">HEAVEN IT</span>, 
                une entreprise innovante spécialisée dans les solutions technologiques d'entreprise.
              </p>
            </div>
          </div>
        </section>

        {/* About HEAVEN IT */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                  À propos de HEAVEN IT
                </h2>
                <p className="text-lg text-muted-foreground">
                  Une vision moderne de l'innovation technologique
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-8 mb-16">
                <Card className="border-primary/20">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3">
                      <Target className="w-6 h-6 text-primary" />
                      Notre Mission
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      HEAVEN IT a pour mission de simplifier la gestion organisationnelle des entreprises 
                      grâce à des solutions technologiques innovantes et intuitives. Nous croyons que la 
                      technologie doit servir l'humain et non l'inverse.
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-primary/20">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3">
                      <Lightbulb className="w-6 h-6 text-primary" />
                      Notre Vision
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Devenir le partenaire de référence pour les entreprises qui souhaitent optimiser 
                      leur structure organisationnelle et améliorer leur efficacité opérationnelle grâce 
                      à des outils numériques de pointe.
                    </p>
                  </CardContent>
                </Card>
              </div>

              {/* Our Values */}
              <div className="mb-16">
                <h3 className="text-2xl font-bold text-foreground text-center mb-12">
                  Nos Valeurs
                </h3>
                <div className="grid md:grid-cols-3 gap-8">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                      <Award className="w-8 h-8 text-primary-foreground" />
                    </div>
                    <h4 className="text-xl font-semibold text-foreground mb-3">Excellence</h4>
                    <p className="text-muted-foreground">
                      Nous nous engageons à livrer des produits de la plus haute qualité, 
                      conçus avec attention aux détails.
                    </p>
                  </div>

                  <div className="text-center">
                    <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                      <Users className="w-8 h-8 text-primary-foreground" />
                    </div>
                    <h4 className="text-xl font-semibold text-foreground mb-3">Collaboration</h4>
                    <p className="text-muted-foreground">
                      Nous travaillons en étroite collaboration avec nos clients pour comprendre 
                      leurs besoins uniques.
                    </p>
                  </div>

                  <div className="text-center">
                    <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                      <Heart className="w-8 h-8 text-primary-foreground" />
                    </div>
                    <h4 className="text-xl font-semibold text-foreground mb-3">Passion</h4>
                    <p className="text-muted-foreground">
                      Notre passion pour l'innovation nous pousse à repenser constamment 
                      nos approches et solutions.
                    </p>
                  </div>
                </div>
              </div>

              {/* Our Expertise */}
              <div className="bg-card rounded-lg p-8 border">
                <h3 className="text-2xl font-bold text-foreground mb-6 text-center">
                  Notre Expertise
                </h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-lg font-semibold text-foreground mb-3">
                      Solutions d'Entreprise
                    </h4>
                    <ul className="space-y-2 text-muted-foreground">
                      <li>• Gestion organisationnelle et hiérarchique</li>
                      <li>• Systèmes de workflow personnalisés</li>
                      <li>• Optimisation des processus métier</li>
                      <li>• Interfaces utilisateur intuitives</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-foreground mb-3">
                      Technologies Modernes
                    </h4>
                    <ul className="space-y-2 text-muted-foreground">
                      <li>• Développement web et mobile</li>
                      <li>• Architecture cloud native</li>
                      <li>• Intelligence artificielle appliquée</li>
                      <li>• Sécurité et conformité</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Contact CTA */}
              <div className="text-center mt-16">
                <h3 className="text-2xl font-bold text-foreground mb-4">
                  Prêt à transformer votre organisation ?
                </h3>
                <p className="text-muted-foreground mb-8">
                  Découvrez comment HEAVEN IT peut vous accompagner dans votre transformation digitale.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <a href="#contact" className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2">
                    Nous contacter
                  </a>
                  <a href="https://app.hieraflow.com" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2">
                    Essayer Hieraflow
                  </a>
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

export default QuiSommesNous;