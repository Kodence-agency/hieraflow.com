# Spec delta — contact-form-email

## MODIFIED Requirements

### Requirement: Le backend de contact DOIT charger ses secrets depuis `.env`

Le serveur API (`server/index.ts`) charge sa configuration via `dotenv/config`, qui ne lit que le fichier `.env` à la racine. Les variables `RESEND_API_KEY`, `CONTACT_FROM` et `CONTACT_TO` DOIVENT donc être définies dans `.env` (et non uniquement `.env.local`, ignoré par dotenv).

#### Scenario: Démarrage avec secrets présents dans `.env`

- **GIVEN** un fichier `.env` à la racine contenant `RESEND_API_KEY`, `CONTACT_FROM`, `CONTACT_TO`
- **WHEN** on lance `npm run dev:server`
- **THEN** le serveur démarre sur le port 3001
- **AND** ne fait pas `process.exit(1)`

#### Scenario: Secret manquant

- **GIVEN** un `.env` sans `RESEND_API_KEY`
- **WHEN** on lance le backend
- **THEN** il logue `RESEND_API_KEY absente. Arrêt.` et s'arrête avec le code 1

### Requirement: Le test du formulaire DOIT démarrer le backend

Pour tester le formulaire de contact en local, le backend (port 3001) DOIT tourner en parallèle du front. La commande `npm run dev` seule ne suffit pas.

#### Scenario: Lancement complet

- **GIVEN** un `.env` correctement configuré
- **WHEN** on lance `npm run dev:full`
- **THEN** le front (8080) et l'API (3001) démarrent
- **AND** une soumission du formulaire répond `201` sans `ECONNREFUSED`
