import { useEffect, useState } from "react";
import { BookOpen, X } from "lucide-react";

const STORAGE_KEY = "hieraflow-wp-popup-dismissed";

const WhitepapersPopup = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const t = setTimeout(() => setVisible(true), 300);
    return () => clearTimeout(t);
  }, []);

  const dismiss = () => {
    setVisible(false);
    try {
      sessionStorage.setItem(STORAGE_KEY, "1");
    } catch {
      /* ignore */
    }
  };

  const handleClick = () => {
    dismiss();
    const el = document.getElementById("livres-blancs");
    if (el) el.scrollIntoView({ behavior: "smooth" });
    else window.location.hash = "#livres-blancs";
  };

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-labelledby="wp-popup-title"
      aria-describedby="wp-popup-desc"
      className="fixed bottom-6 right-6 z-[60] max-w-sm animate-in fade-in slide-in-from-bottom-4 duration-500"
    >
      <div className="relative rounded-2xl bg-white border border-border shadow-elegant p-5 pr-10">
        <button
          onClick={dismiss}
          aria-label="Fermer"
          className="absolute top-2 right-2 p-1.5 rounded-full text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="flex items-start gap-3">
          <div className="shrink-0 w-10 h-10 rounded-full bg-gradient-primary flex items-center justify-center">
            <BookOpen className="w-5 h-5 text-primary-foreground" />
          </div>
          <div className="flex-1">
            <p className="text-xs font-semibold uppercase tracking-wider text-primary mb-1">
              Nouveau
            </p>
            <h3 id="wp-popup-title" className="text-base font-bold text-foreground leading-snug">
              Découvrez nos nouveaux livres blancs
            </h3>
            <p id="wp-popup-desc" className="mt-1 text-sm text-muted-foreground">
              Gen Z, Teams, organigramme : nos guides experts à télécharger gratuitement.
            </p>
            <button
              onClick={handleClick}
              className="mt-3 inline-flex items-center text-sm font-semibold text-primary hover:underline"
            >
              Les découvrir →
            </button>
          </div>
        </div>

        <span
          aria-hidden="true"
          className="absolute -bottom-2 right-8 w-4 h-4 rotate-45 bg-white border-r border-b border-border"
        />
      </div>
    </div>
  );
};

export default WhitepapersPopup;
