import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Download } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import genzAsset from "@/assets/livre-blanc-genz.pdf.asset.json";
import teamsAsset from "@/assets/livre-blanc-teams.pdf.asset.json";
import coverGenz from "@/assets/cover-genz.jpg";
import coverTeams from "@/assets/cover-teams.jpg";

type Wp = { id: "genz" | "teams"; title: string; description: string; url: string; cover: string };

const whitepapers: Wp[] = [
  {
    id: "genz",
    title: "Comment réduire de 40% le turnover de vos talents Gen Z en changeant une seule chose dans votre organisation",
    description: "Ce que votre organisation révèle à un talent de 25 ans et que vous ne voyez plus depuis longtemps.",
    url: genzAsset.url,
    cover: coverGenz,
  },
  {
    id: "teams",
    title: "Pourquoi Teams ne remplacera jamais votre organigramme",
    description: "Ce que Teams fait très bien — et ce qu'il ne fera jamais à votre place.",
    url: teamsAsset.url,
    cover: coverTeams,
  },
];

const WhitepapersSection = () => {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<Wp | null>(null);
  const [lastName, setLastName] = useState("");
  const [company, setCompany] = useState("");
  const [headcount, setHeadcount] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
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
    const downloadUrl = selected.url;
    const downloadWindow = window.open(downloadUrl, "_blank", "noopener,noreferrer");
    try {
      const absoluteUrl = new URL(selected.url, window.location.origin).toString();
      const { data, error } = await supabase.functions.invoke("send-whitepaper", {
        body: {
          firstName: lastName, // legacy field — store full contact name
          lastName: company,
          email,
          phone,
          company,
          headcount,
          whitepaperTitle: selected.title,
          whitepaperUrl: absoluteUrl,
          _honey: honey,
        },
      });
      if (error || (data && (data as any).error)) {
        console.error("send-whitepaper error", error, data);
        toast.warning("Le PDF s'ouvre, mais l'email n'a pas pu être envoyé pour le moment.");
        setOpen(false);
        return;
      }
      toast.success("Merci ! Le livre blanc vous a été envoyé par email.");
      setOpen(false);
      setLastName(""); setCompany(""); setHeadcount(""); setEmail(""); setPhone("");
    } catch (err) {
      console.error(err);
      toast.error("Erreur réseau. Merci de réessayer.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="livres-blancs" className="py-20 bg-muted/30" aria-labelledby="livres-blancs-title">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <span className="inline-block px-3 py-1 mb-4 text-xs font-semibold uppercase tracking-wider text-primary bg-primary/10 rounded-full">
            Ressources gratuites
          </span>
          <h2 id="livres-blancs-title" className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Boostez vos équipes avec nos guides experts
          </h2>
          <p className="text-muted-foreground text-lg">
            Téléchargez gratuitement nos livres blancs et passez à l'action dès aujourd'hui.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-6 max-w-3xl mx-auto">
          {whitepapers.map((wp) => (
            <Card key={wp.id} className="overflow-hidden hover:shadow-elegant transition-shadow flex flex-col">
              <div className="aspect-[3/4] overflow-hidden bg-muted">
                <img
                  src={wp.cover}
                  alt={`Couverture du livre blanc : ${wp.title}`}
                  loading="lazy"
                  width={1024}
                  height={1536}
                  className="w-full h-full object-cover"
                />
              </div>
              <CardHeader className="p-4">
                <CardTitle className="text-base leading-snug">{wp.title}</CardTitle>
                <CardDescription className="text-sm">{wp.description}</CardDescription>
              </CardHeader>
              <CardContent className="p-4 pt-0 mt-auto">
                <Button variant="corporate" size="sm" onClick={() => openDialog(wp)} className="w-full">
                  <Download className="w-4 h-4" />
                  Télécharger
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
                <Label htmlFor="wp-lastName">Nom et prénom *</Label>
                <Input id="wp-lastName" value={lastName} onChange={(e) => setLastName(e.target.value)} required maxLength={150} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="wp-company">Nom de société *</Label>
                <Input id="wp-company" value={company} onChange={(e) => setCompany(e.target.value)} required maxLength={150} />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="wp-headcount">Effectif *</Label>
                <Input id="wp-headcount" value={headcount} onChange={(e) => setHeadcount(e.target.value)} required maxLength={50} placeholder="ex : 50-200" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="wp-phone">Téléphone</Label>
                <Input id="wp-phone" type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} maxLength={30} />
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
