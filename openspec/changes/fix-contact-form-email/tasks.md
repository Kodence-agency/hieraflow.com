# Tasks — Fix envoi email formulaire de contact

## 1. Environnement backend

- [x] 1.1 Vérifier que `.env` est listé dans `.gitignore` (sinon l'ajouter avant toute écriture de secret) → vérifier : `git check-ignore .env` renvoie `.env`
- [ ] 1.2 Recréer `.env` à la racine avec `RESEND_API_KEY`, `CONTACT_FROM`, `CONTACT_TO` (valeurs reprises de `.env.local`) → vérifier : les 3 variables présentes
- [ ] 1.3 `CONTACT_FROM` utilise un domaine vérifié dans Resend → vérifier : domaine validé dans le dashboard Resend

## 2. Validation du backend

- [ ] 2.1 Lancer `npm run dev:server` seul → vérifier : log `[contact-api] Démarré sur 3001 … RESEND_API_KEY=re_…`, aucun `Arrêt.`

## 3. Test bout-en-bout

- [ ] 3.1 Lancer `npm run dev:full` → vérifier : front sur 8080 + API sur 3001 démarrés
- [ ] 3.2 Soumettre le formulaire de contact → vérifier : réponse HTTP `201`, toast « Demande envoyée », aucun `ECONNREFUSED` dans les logs
- [ ] 3.3 Confirmer la réception de l'email sur l'adresse `CONTACT_TO`

## 4. Documentation

- [x] 4.1 S'assurer que la doc projet indique d'utiliser `npm run dev:full` pour tester le formulaire (et que le backend lit `.env`, pas `.env.local`) → vérifier : note présente dans `CLAUDE.md` ou `README`
