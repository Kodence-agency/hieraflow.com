# Design — Fix envoi email formulaire de contact

## Contexte technique

- Front : vite (port 8080) avec proxy `"/api" → http://localhost:3001` (`vite.config.ts:11-15`).
- Back : serveur HTTP Node (`server/index.ts`) sur port 3001, route `POST /api/contact`, validation Zod, envoi via Resend SDK.
- Lancement : scripts `package.json` — `dev` (vite seul), `dev:server` (`tsx server/index.ts`), `dev:full` (`concurrently` front + API).

## Diagnostic

### Cause 1 — proxy sans cible

`npm run dev` ne démarre pas le backend. Le proxy vers `localhost:3001` échoue par `ECONNREFUSED`. C'est l'erreur exacte des logs.

### Cause 2 — dotenv ne lit pas `.env.local`

`server/index.ts:1` : `import "dotenv/config"`.

dotenv, par défaut, charge **uniquement** `./.env`. Il ne connaît pas `.env.local` — cette cascade (`.env.local`, `.env.development.local`, etc.) est une convention propre à Vite/Next, implémentée par leurs loaders, pas par dotenv.

État actuel :
- `.env` supprimé (`git status: D .env`).
- Clés présentes dans `.env.local` → lues par vite (front) mais **pas** par le backend.

Conséquence : `server/index.ts:14-17` détecte `RESEND_API_KEY` absente et `process.exit(1)`. Le port 3001 meurt → `ECONNREFUSED` à nouveau.

## Décision

**Approche B — recréer `.env`** (choix utilisateur).

Raisons :
- Aligne l'environnement sur ce que le backend lit déjà (`dotenv/config` → `.env`), zéro modification de code applicatif (respect de la règle « modifications chirurgicales »).
- Convention backend Node standard : secrets serveur dans `.env`.
- `.env.local` reste la source côté vite/front ; `.env` couvre le backend. Pas de duplication de logique de chargement.

Alternative écartée — Approche A (`dotenv.config({ path: ".env.local" })`) : modifie le code pour pointer vers un fichier à convention front, plus surprenant pour un mainteneur backend. Non retenu.

## Variables requises (`server/index.ts:7`)

| Variable | Rôle |
|---|---|
| `RESEND_API_KEY` | Clé API Resend. Absente → `process.exit(1)`. |
| `CONTACT_FROM` | Expéditeur. Si pas de `<` ni `@`, wrappé en `Hieraflow <...>`. Doit être un domaine vérifié Resend. |
| `CONTACT_TO` | Destinataire des demandes de démo. |

## Vérification

1. `npm run dev:server` seul → log `[contact-api] Démarré sur 3001 … RESEND_API_KEY=re_xxx…` (plus de `Arrêt.`).
2. `npm run dev:full` → soumettre le formulaire → réponse `201 { status: "ok", correlationId }`, email reçu sur `CONTACT_TO`.

## Note sécurité

`.env` contient un secret. Vérifier qu'il est bien dans `.gitignore` et ne jamais le committer.
