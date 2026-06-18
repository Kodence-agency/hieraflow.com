# Fix — Envoi d'email du formulaire de contact

## Why

Le formulaire de contact renvoie `500 Internal Server Error` et les logs vite montrent `AggregateError [ECONNREFUSED]` sur le proxy `/api/contact`. Deux causes :

1. **Backend non démarré.** `npm run dev` ne lance que vite (port 8080). Le serveur API (`server/index.ts`, port 3001) n'est jamais démarré, donc le proxy vite `/api → localhost:3001` tombe dans le vide → `ECONNREFUSED` → 500.
2. **Variables d'env backend invisibles.** `server/index.ts` charge l'env via `import "dotenv/config"`, qui ne lit que `.env` (comportement par défaut de dotenv — il n'a aucune notion de `.env.local`, qui est une convention Vite). Or `.env` a été supprimé (`git status: D .env`) et les clés sont dans `.env.local`. Au démarrage le backend ne trouve pas `RESEND_API_KEY` et fait `process.exit(1)` (`server/index.ts:14-17`), reproduisant le `ECONNREFUSED`.

Les deux doivent être corrigés : sinon, même en lançant le backend, il crashe immédiatement.

## What Changes

- Recréer le fichier `.env` (gitignoré, non versionné) à la racine avec les trois variables requises par le backend : `RESEND_API_KEY`, `CONTACT_FROM`, `CONTACT_TO`.
- Documenter que le développement se lance avec `npm run dev:full` (front + API), jamais `npm run dev` seul, dès lors que le formulaire de contact est testé.
- Aucune modification du code applicatif `server/index.ts` (approche B retenue : on aligne l'environnement sur ce que le backend lit déjà, plutôt que de changer le code).

## Impact

- Capacité affectée : `contact-form-email` (envoi d'email via Resend depuis le formulaire de démo).
- Fichiers : `.env` (recréé, hors git), documentation de lancement (`README` / `CLAUDE.md` déjà à jour sur `dev:full`).
- Aucun changement de schéma, d'API ou de contrat front/back. Risque faible, réversible.
- Sécurité : `.env` contient un secret Resend → doit rester gitignoré, jamais commité.
