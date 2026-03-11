import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const ContactSection = () => {
  const { toast } = useToast();
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    company: "",
    message: "",
    _honey: "",
  });
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (loading) return;
    setLoading(true);
    try {
      const r = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (r.ok) {
        toast({
          title: "Demande envoyée",
          description: "Nous revenons vers vous sous 24h.",
        });
        setForm({
          firstName: "",
          lastName: "",
          email: "",
          company: "",
          message: "",
          _honey: "",
        });
      } else {
        const data = await r.json().catch(() => ({}));
        toast({
          title: "Erreur",
          description:
            data.error === "validation_error"
              ? "Champs invalides."
              : "Une erreur est survenue.",
          variant: "destructive",
        });
      }
    } catch (err) {
      toast({
        title: "Erreur réseau",
        description: "Impossible de contacter le serveur.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="py-20 bg-gradient-hero relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-black/30 to-black/10"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-white">
            Prêt à transformer
            <span className="block text-accent">votre organisation ?</span>
          </h2>
          <p className="text-xl text-white/90 max-w-2xl mx-auto">
            Contactez-nous dès aujourd'hui pour découvrir comment Hieraflow peut
            révolutionner la gestion de vos équipes.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          <Card className="bg-white/10 backdrop-blur-md border-white/20 text-white">
            <CardHeader>
              <CardTitle className="text-2xl text-center">
                Demandez une démonstration
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <form className="space-y-4" onSubmit={onSubmit}>
                <div className="grid md:grid-cols-2 gap-4">
                  <Input
                    placeholder="Votre prénom"
                    className="bg-white/10 border-white/30 text-white placeholder:text-white/70"
                    value={form.firstName}
                    onChange={(e) =>
                      setForm({ ...form, firstName: e.target.value })
                    }
                  />
                  <Input
                    placeholder="Votre nom"
                    className="bg-white/10 border-white/30 text-white placeholder:text-white/70"
                    value={form.lastName}
                    onChange={(e) =>
                      setForm({ ...form, lastName: e.target.value })
                    }
                  />
                </div>
                <Input
                  type="email"
                  placeholder="Votre email professionnel"
                  className="bg-white/10 border-white/30 text-white placeholder:text-white/70"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                />
                <Input
                  placeholder="Votre entreprise"
                  className="bg-white/10 border-white/30 text-white placeholder:text-white/70"
                  value={form.company}
                  onChange={(e) =>
                    setForm({ ...form, company: e.target.value })
                  }
                />
                <Textarea
                  placeholder="Parlez-nous de vos besoins..."
                  rows={4}
                  className="bg-white/10 border-white/30 text-white placeholder:text-white/70"
                  value={form.message}
                  onChange={(e) =>
                    setForm({ ...form, message: e.target.value })
                  }
                />
                <Button
                  variant="corporate"
                  size="lg"
                  className="w-full group"
                  disabled={loading}
                >
                  {loading ? (
                    <span className="animate-spin">Envoi...</span>
                  ) : (
                    <>
                      <Send className="w-4 h-4 mr-2 group-hover:translate-x-1 transition-transform" />
                      Envoyer ma demande
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>

          <div className="space-y-8">
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-white">
                Contactez notre équipe
              </h3>
              <p className="text-white/80 text-lg">
                Notre équipe d'experts est là pour répondre à toutes vos
                questions et vous accompagner dans votre projet de
                transformation organisationnelle.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center">
                  <Mail className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <p className="text-white font-semibold">Email</p>
                  <a
                    href="mailto:contact@hieraflow.com"
                    className="text-accent hover:text-accent/80 transition-colors"
                  >
                    contact@hieraflow.com
                  </a>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center">
                  <Phone className="w-6 h-6 text-secondary" />
                </div>
                <div>
                  <p className="text-white font-semibold">
                    Support Téléphonique
                  </p>
                  <p className="text-white/80">
                    Disponible du lundi au vendredi
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center">
                  <MapPin className="w-6 h-6 text-primary-glow" />
                </div>
                <div>
                  <p className="text-white font-semibold">Déploiement</p>
                  <p className="text-white/80">
                    France • Europe • International
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <h4 className="text-lg font-semibold text-white mb-3">
                Réponse Garantie
              </h4>
              <p className="text-white/80 mb-4">
                Nous nous engageons à vous répondre dans les 24h ouvrées.
              </p>
              <div className="flex items-center space-x-2 text-accent">
                <div className="w-2 h-2 bg-accent rounded-full animate-pulse"></div>
                <span className="text-sm font-medium">
                  Support réactif disponible
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
