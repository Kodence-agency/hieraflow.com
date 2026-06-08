import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { FileText, Download } from "lucide-react";
import { toast } from "sonner";
import genzAsset from "@/assets/livre-blanc-genz.pdf.asset.json";
import teamsAsset from "@/assets/livre-blanc-teams.pdf.asset.json";

type Wp = { id: "genz" | "teams"; title: string; description: string; url: string };

const whitepapers: Wp[] = [
  {
    id: "genz",
    title: "Manager la Gen Z",
    description: "Comprendre et engager les nouvelles générations dans votre organisation grâce à Hieraflow.",
    url: genzAsset.url,
  },
  {
    id: "teams",
    title: "Structurer ses équipes",
    description: "Méthodologie et bonnes pratiques pour bâtir des équipes performantes avec Hieraflow.",
    url: teamsAsset.url,
  },
];

const WhitepapersSection = () => {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<Wp | null>(null);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [honey, setHoney] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const openDialog = (wp: Wp) => {
    setSelected(wp);
    setOpen(true);
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selected) return;
    setSubmitting(true);
    try {
      const res = await fetch("/api/whitepaper", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName, lastName, email,
          whitepaper: selected.id,
          _honey: honey,
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        toast.error("Une erreur est survenue. Merci de réessayer.");
        return;
      }
      toast.success("Merci ! Le livre blanc vous a été envoyé par email.");
      // Téléchargement immédiat
      window.open(selected.url, "_blank", "noopener,noreferrer");
      setOpen(false);
      setFirstName(""); setLastName(""); setEmail("");
    } catch {
      toast.error("Erreur réseau. Merci de réessayer.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="livres-blancs" className="py-20 bg-muted/30" aria-labelledby="livres-blancs-title">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 id="livres-blancs-title" className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Nos livres blancs
          </h2>
          <p className="text-muted-foreground text-lg">
            Téléchargez nos ressources gratuites pour aller plus loin avec Hieraflow.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {whitepapers.map((wp) => (
            <Card key={wp.id} className="hover:shadow-elegant transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center mb-4">
                  <FileText className="w-6 h-6 text-primary-foreground" />
                </div>
                <CardTitle>{wp.title}</CardTitle>
                <CardDescription>{wp.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="corporate" onClick={() => openDialog(wp)} className="w-full">
                  <Download className="w-4 h-4" />
                  Télécharger le livre blanc
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Recevoir le livre blanc</DialogTitle>
            <DialogDescription>
              {selected ? selected.title : ""} — renseignez vos coordonnées pour recevoir le PDF par email.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={onSubmit} className="space-y-4">
            <input
              type="text" tabIndex={-1} autoComplete="off"
              value={honey} onChange={(e) => setHoney(e.target.value)}
              style={{ position: "absolute", left: "-9999px" }} aria-hidden="true"
            />
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="wp-firstName">Prénom *</Label>
                <Input id="wp-firstName" value={firstName} onChange={(e) => setFirstName(e.target.value)} required maxLength={100} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="wp-lastName">Nom *</Label>
                <Input id="wp-lastName" value={lastName} onChange={(e) => setLastName(e.target.value)} required maxLength={100} />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="wp-email">Email *</Label>
              <Input id="wp-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required maxLength={255} />
            </div>
            <DialogFooter>
              <Button type="submit" variant="corporate" disabled={submitting}>
                {submitting ? "Envoi..." : "Recevoir le PDF"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default WhitepapersSection;
