# Guide de déploiement — hieraflow.com

Déploiement complet sur VPS Ubuntu avec Docker, Apache reverse proxy, et SSL Let's Encrypt.

**Prérequis sur le VPS :**
- Docker + Docker Compose installés
- Apache2 actif (ports 80 et 443)
- Certbot installé (`certbot --version`)

---

## Architecture

```
GitHub push → GitHub Actions (build + push GHCR)
                      ↓
             ghcr.io/heavenflowgroup/hieraflow-landing-page:latest
                      ↓
Internet → Apache (80/443) → http://127.0.0.1:8080 → Container nginx (landing)
                                                              ↓ /api/*
                                                       Container bun (api)
```

- `landing` : image pré-buildée sur GHCR, Nginx sert le build React et proxifie `/api/`.
- `api` : buildé localement sur le VPS, gère `POST /api/contact` via Resend.

---

## Section 0 — Pipeline CI/CD (automatique)

À chaque push sur `main`, GitHub Actions :
1. Build le target `frontend` du Dockerfile.
2. Pousse l'image sur `ghcr.io/heavenflowgroup/hieraflow-landing-page` avec deux tags :
   - `latest`
   - SHA court du commit (ex : `a3f7c1b`)

Aucune action manuelle n'est requise côté CI. Le pipeline est défini dans
`.github/workflows/docker-publish.yml`.

---

## Section 1 — Installation initiale sur le VPS

### Étape 1 — Connexion SSH

```bash
ssh <VPS_USER>@<VPS_IP>
```

Remplacer `<VPS_USER>` (ex : `ubuntu`, `root`) et `<VPS_IP>` par l'IP publique du VPS.

---

### Étape 2 — Cloner le projet

```bash
git clone https://github.com/heavenflowgroup/hieraflow-landing-page.git /opt/hieraflow-landing-page
cd /opt/hieraflow-landing-page
```

---

### Étape 3 — Configurer les variables d'environnement

```bash
cp .env.example .env
nano .env
```

Renseigner les trois variables :

```
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxxxxxxxxxx
CONTACT_FROM=noreply@hieraflow.com
CONTACT_TO=contact@hieraflow.com
```

Sauvegarder et fermer (`Ctrl+O`, `Entrée`, `Ctrl+X` sous nano).

---

## Section 2 — Authentification GHCR sur le VPS

> Nécessaire uniquement si le package GHCR est privé (voir Section 6).
> Si le package est public, passer directement à la Section 3.

### Étape 1 — Générer un Personal Access Token GitHub

1. Aller sur GitHub : **Settings → Developer settings → Personal access tokens → Tokens (classic)**.
2. Cliquer **Generate new token (classic)**.
3. Nom : `hieraflow-vps-ghcr-read`
4. Expiration : selon politique de sécurité (90 jours recommandé).
5. Scope : cocher **uniquement** `read:packages`.
6. Générer et copier le token (affiché une seule fois).

---

### Étape 2 — Se connecter au registre GHCR

```bash
echo "<PAT>" | docker login ghcr.io -u <GITHUB_USERNAME> --password-stdin
```

Remplacer `<PAT>` par le token généré et `<GITHUB_USERNAME>` par le nom d'utilisateur GitHub
(ex : `christopher` ou le nom de service `heavenflowgroup`).

---

### Étape 3 — Persister le PAT pour les reconnexions futures

```bash
echo 'export GHCR_PAT="<PAT>"' >> ~/.bashrc
source ~/.bashrc
echo $GHCR_PAT | docker login ghcr.io -u <GITHUB_USERNAME> --password-stdin
```

---

### Étape 4 — Vérifier la persistance du login

```bash
cat ~/.docker/config.json | grep ghcr.io
```

Résultat attendu : une entrée `"ghcr.io"` avec `"auth"` dans le JSON.

---

## Section 3 — Premier lancement des containers

### Étape 1 — Récupérer l'image depuis GHCR

```bash
docker compose pull landing
```

Cette commande télécharge `ghcr.io/heavenflowgroup/hieraflow-landing-page:latest`
depuis GHCR. Le service `api` sera buildé localement à l'étape suivante.

---

### Étape 2 — Démarrer les containers

```bash
docker compose up -d
```

Docker utilisera l'image GHCR pour `landing` et buildera `api` depuis les sources locales.

---

### Étape 3 — Vérifier que les containers tournent

```bash
docker compose ps
```

Les deux services (`landing` et `api`) doivent afficher `Up` ou `running`.

Tester l'accès local au container frontend :

```bash
curl -I http://127.0.0.1:8080
```

Résultat attendu : `HTTP/1.1 200 OK`.

---

## Section 4 — Configuration Apache comme reverse proxy

Apache occupe déjà les ports 80 et 443. La stratégie retenue : Apache reçoit les requêtes
HTTPS et les proxifie vers le container Docker sur `127.0.0.1:8080`.

### Étape 1 — Activer les modules Apache

```bash
sudo a2enmod proxy proxy_http ssl headers rewrite
sudo systemctl restart apache2
```

---

### Étape 2 — Créer le VirtualHost HTTP (redirection vers HTTPS)

```bash
sudo nano /etc/apache2/sites-available/hieraflow.conf
```

Coller le contenu suivant :

```apache
<VirtualHost *:80>
    ServerName hieraflow.com
    ServerAlias www.hieraflow.com

    RewriteEngine On
    RewriteCond %{HTTPS} off
    RewriteRule ^(.*)$ https://%{HTTP_HOST}$1 [R=301,L]
</VirtualHost>
```

---

### Étape 3 — Créer le VirtualHost HTTPS

Dans le **même fichier**, ajouter à la suite :

```apache
<VirtualHost *:443>
    ServerName hieraflow.com
    ServerAlias www.hieraflow.com

    SSLEngine On
    SSLCertificateFile    /etc/letsencrypt/live/hieraflow.com/fullchain.pem
    SSLCertificateKeyFile /etc/letsencrypt/live/hieraflow.com/privkey.pem

    ProxyPreserveHost On
    ProxyPass        / http://127.0.0.1:8080/
    ProxyPassReverse / http://127.0.0.1:8080/

    Header always set X-Frame-Options "SAMEORIGIN"
    Header always set X-Content-Type-Options "nosniff"
    Header always set Strict-Transport-Security "max-age=31536000; includeSubDomains"
    Header always set Referrer-Policy "strict-origin-when-cross-origin"

    ErrorLog  ${APACHE_LOG_DIR}/hieraflow-error.log
    CustomLog ${APACHE_LOG_DIR}/hieraflow-access.log combined
</VirtualHost>
```

Sauvegarder et fermer.

---

### Étape 4 — Activer le site et recharger Apache

```bash
sudo a2ensite hieraflow.conf
sudo apache2ctl configtest
```

Si `configtest` affiche `Syntax OK` :

```bash
sudo systemctl reload apache2
```

> **Note :** Si `configtest` échoue sur les certificats SSL, commenter temporairement le bloc
> `<VirtualHost *:443>`, activer le HTTP seul, obtenir le certificat (Section 5),
> puis décommenter et recharger.

---

## Section 5 — Certificat SSL avec Certbot

> **Prérequis :** Les enregistrements DNS doivent déjà pointer vers le VPS (Section 6).

### Étape 1 — Obtenir le certificat

```bash
sudo certbot --apache -d hieraflow.com -d www.hieraflow.com
```

Si le plugin Apache n'est pas disponible :

```bash
sudo certbot certonly --webroot \
  -w /var/www/html \
  -d hieraflow.com \
  -d www.hieraflow.com
```

---

### Étape 2 — Vérifier la présence des certificats

```bash
sudo ls -la /etc/letsencrypt/live/hieraflow.com/
```

Fichiers attendus : `fullchain.pem`, `privkey.pem`, `cert.pem`, `chain.pem`.

---

### Étape 3 — Tester le renouvellement automatique

```bash
sudo certbot renew --dry-run
```

Résultat attendu : `Congratulations, all simulated renewals succeeded.`

---

### Étape 4 — Vérifier le timer systemd

```bash
systemctl status certbot.timer
```

Le timer doit être `active (waiting)`. Si absent :

```bash
sudo systemctl enable --now certbot.timer
```

---

## Section 6 — Visibilité du package GHCR

Par défaut, les packages GHCR d'une organisation GitHub sont **privés**.

**Option A — Rendre le package public (recommandé pour simplifier le déploiement) :**

1. Aller sur GitHub : **Organisation heavenflowgroup → Packages → hieraflow-landing-page**.
2. Cliquer **Package settings**.
3. Dans "Danger Zone" → **Change visibility → Public**.

Avec un package public, le VPS peut `docker pull` sans authentification.

**Option B — Garder le package privé :**

L'authentification PAT (Section 2) est obligatoire avant chaque `docker compose pull`.
Le login Docker persiste dans `~/.docker/config.json` — pas besoin de se reconnecter
à chaque mise à jour, seulement après expiration du token.

---

## Section 7 — Configuration DNS

### Enregistrements à créer

| Type | Nom             | Valeur     | TTL  |
|------|-----------------|------------|------|
| A    | `hieraflow.com` | `<VPS_IP>` | 3600 |
| A    | `www`           | `<VPS_IP>` | 3600 |

> Alternative : `CNAME www → hieraflow.com`

---

### Vérifier la propagation

```bash
dig hieraflow.com +short
dig www.hieraflow.com +short
```

Les deux commandes doivent retourner `<VPS_IP>`.

---

### Test final

Ouvrir `https://hieraflow.com` dans un navigateur et vérifier :
- Cadenas SSL affiché.
- Landing page affichée correctement.
- Redirection `http://` → `https://` fonctionnelle.
- Formulaire de contact opérationnel.

---

## Procédure de mise à jour

À exécuter après chaque déploiement CI (push sur `main`).

### Étape 1 — Connexion SSH

```bash
ssh <VPS_USER>@<VPS_IP>
```

---

### Étape 2 — Se placer dans le répertoire du projet

```bash
cd /opt/hieraflow-landing-page
```

---

### Étape 3 — Récupérer la dernière image depuis GHCR

```bash
docker compose pull
```

Télécharge `ghcr.io/heavenflowgroup/hieraflow-landing-page:latest` depuis GHCR.

---

### Étape 4 — Redémarrer les services

```bash
docker compose up -d
```

Docker remplace le container `landing` par la nouvelle image.
Le service `api` n'est redémarré que si son image locale a changé.

---

### Étape 5 — Vérifier la mise à jour

```bash
docker compose ps
```

```bash
docker inspect $(docker compose ps -q landing) | grep '"Image"' | head -1
```

Affiche le SHA de l'image active — doit correspondre au dernier commit sur `main`.

---

### Étape 6 — Nettoyer les anciennes images

```bash
docker image prune -f
```

Supprime les images non utilisées pour libérer de l'espace disque.

---

## Opérations courantes

### Consulter les logs

```bash
# Logs nginx (frontend)
docker compose logs -f landing

# Logs API (contact form)
docker compose logs -f api

# Logs Apache
sudo tail -f /var/log/apache2/hieraflow-error.log
```

### Déployer un tag spécifique (ex : SHA de commit)

```bash
IMAGE_TAG=a3f7c1b docker compose up -d
```

### Redémarrer un service

```bash
docker compose restart landing
docker compose restart api
```

### Arrêter tous les containers

```bash
docker compose down
```

---

## Placeholders à remplacer

| Placeholder        | Description                                        |
|--------------------|----------------------------------------------------|
| `<VPS_IP>`         | Adresse IPv4 publique du VPS                       |
| `<VPS_USER>`       | Utilisateur SSH (ex : `ubuntu`, `root`)            |
| `<PAT>`            | Personal Access Token GitHub (scope `read:packages`) |
| `<GITHUB_USERNAME>`| Nom d'utilisateur ou d'organisation GitHub         |
