# Guide de déploiement — hieraflow.com

Déploiement complet sur VPS Ubuntu avec Docker, Apache reverse proxy, et SSL Let's Encrypt.

**Prérequis sur le VPS :**
- Docker + Docker Compose installés
- Apache2 actif (ports 80 et 443)
- Certbot installé (`certbot --version`)
- Git installé

---

## Architecture

```
Internet → Apache (80/443) → http://127.0.0.1:8080 → Container nginx (landing)
                                                              ↓ /api/*
                                                       Container bun (api)
```

- `landing` : Nginx sert le build React statique et proxifie `/api/` vers le service `api`.
- `api` : Serveur Bun/Node.js qui gère `POST /api/contact` (envoi d'email via Resend).

---

## Section 2.1 — Transfert et lancement

### Étape 1 — Connexion SSH

```bash
ssh <VPS_USER>@<VPS_IP>
```

Remplacer `<VPS_USER>` (ex : `ubuntu`, `root`) et `<VPS_IP>` par l'IP publique du VPS.

---

### Étape 2 — Cloner le projet

```bash
git clone https://github.com/<ORG>/hieraflow-landing-page.git /opt/hieraflow
cd /opt/hieraflow
```

Ou via `scp` depuis votre machine locale :

```bash
scp -r /chemin/local/hieraflow-landing-page <VPS_USER>@<VPS_IP>:/opt/hieraflow
ssh <VPS_USER>@<VPS_IP>
cd /opt/hieraflow
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

Sauvegarder et fermer (`Ctrl+O`, `Ctrl+X` sous nano).

---

### Étape 4 — Lancer les containers

```bash
docker compose up -d --build
```

Le build initial prend quelques minutes (installation des dépendances, compilation Vite).

---

### Étape 5 — Vérifier que les containers tournent

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

## Section 2.2 — Configuration Apache comme reverse proxy

Apache occupe déjà les ports 80 et 443. La stratégie retenue : Apache reçoit les requêtes HTTPS et les proxifie vers le container Docker sur `127.0.0.1:8080`. Docker n'expose rien sur 80/443.

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

    # Redirection permanente vers HTTPS
    RewriteEngine On
    RewriteCond %{HTTPS} off
    RewriteRule ^(.*)$ https://%{HTTP_HOST}$1 [R=301,L]
</VirtualHost>
```

---

### Étape 3 — Créer le VirtualHost HTTPS

Dans le **même fichier** `/etc/apache2/sites-available/hieraflow.conf`, ajouter à la suite :

```apache
<VirtualHost *:443>
    ServerName hieraflow.com
    ServerAlias www.hieraflow.com

    # Certificat SSL Let's Encrypt
    SSLEngine On
    SSLCertificateFile    /etc/letsencrypt/live/hieraflow.com/fullchain.pem
    SSLCertificateKeyFile /etc/letsencrypt/live/hieraflow.com/privkey.pem

    # Reverse proxy vers le container Docker
    ProxyPreserveHost On
    ProxyPass        / http://127.0.0.1:8080/
    ProxyPassReverse / http://127.0.0.1:8080/

    # Headers de sécurité
    Header always set X-Frame-Options "SAMEORIGIN"
    Header always set X-Content-Type-Options "nosniff"
    Header always set Strict-Transport-Security "max-age=31536000; includeSubDomains"
    Header always set Referrer-Policy "strict-origin-when-cross-origin"

    # Logs
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

> **Note :** Si `configtest` échoue avec une erreur sur les certificats SSL, c'est normal si Certbot n'a pas encore été exécuté. Commenter temporairement le bloc `<VirtualHost *:443>`, activer le site HTTP seul, puis obtenir le certificat (Section 3), puis décommenter et recharger.

---

## Section 3 — Certificat SSL avec Certbot

> **Prérequis :** Les enregistrements DNS `hieraflow.com` et `www.hieraflow.com` doivent déjà pointer vers l'IP du VPS avant cette étape (voir Section 4).

### Étape 1 — Obtenir le certificat

Avec le plugin Apache (recommandé — modifie automatiquement la configuration Apache) :

```bash
sudo certbot --apache -d hieraflow.com -d www.hieraflow.com
```

Si le plugin Apache n'est pas disponible, utiliser le mode webroot :

```bash
sudo certbot certonly --webroot \
  -w /var/www/html \
  -d hieraflow.com \
  -d www.hieraflow.com
```

Suivre les instructions interactives (adresse email, acceptation des CGU).

---

### Étape 2 — Vérifier la présence des certificats

```bash
sudo ls -la /etc/letsencrypt/live/hieraflow.com/
```

Les fichiers suivants doivent être présents :
- `fullchain.pem`
- `privkey.pem`
- `cert.pem`
- `chain.pem`

---

### Étape 3 — Tester le renouvellement automatique

```bash
sudo certbot renew --dry-run
```

Résultat attendu : `Congratulations, all simulated renewals succeeded.`

---

### Étape 4 — Vérifier le timer systemd de renouvellement

```bash
systemctl status certbot.timer
```

Le timer doit être `active (waiting)`. Il déclenche le renouvellement automatique deux fois par jour.

Si le timer est absent :

```bash
sudo systemctl enable --now certbot.timer
```

---

### Étape 5 — Activer la configuration HTTPS complète

Si vous avez commenté le bloc `<VirtualHost *:443>` à l'étape 2.2, le décommenter maintenant :

```bash
sudo nano /etc/apache2/sites-available/hieraflow.conf
# Décommenter le bloc <VirtualHost *:443>
sudo apache2ctl configtest && sudo systemctl reload apache2
```

---

## Section 4 — Configuration DNS

### Enregistrements à créer

Dans l'interface DNS de votre registrar (OVH, Gandi, Namecheap, Cloudflare…) :

| Type | Nom              | Valeur       | TTL  |
|------|------------------|--------------|------|
| A    | `hieraflow.com`  | `<VPS_IP>`   | 3600 |
| A    | `www`            | `<VPS_IP>`   | 3600 |

Remplacer `<VPS_IP>` par l'adresse IPv4 publique du VPS.

> Alternative : créer un enregistrement `CNAME www → hieraflow.com` si le registrar le permet.

---

### Délai de propagation

Entre **5 minutes** et **48 heures** selon le TTL configuré. Avec un TTL de 3600 (1 heure), compter généralement moins d'une heure.

---

### Vérifier la propagation DNS

```bash
dig hieraflow.com +short
dig www.hieraflow.com +short
```

Les deux commandes doivent retourner `<VPS_IP>`.

Vérification externe (depuis une autre machine ou via un service en ligne) :

```bash
nslookup hieraflow.com 8.8.8.8
```

---

### Test final

Ouvrir `https://hieraflow.com` dans un navigateur.

Vérifier :
- Le cadenas SSL est affiché (certificat valide).
- La page de la landing page s'affiche correctement.
- La redirection `http://hieraflow.com` → `https://hieraflow.com` fonctionne.
- Le formulaire de contact envoie correctement (tester avec une vraie adresse).

---

## Opérations courantes

### Mettre à jour le site après un push git

```bash
cd /opt/hieraflow
git pull
docker compose up -d --build
```

### Consulter les logs

```bash
# Logs nginx (frontend)
docker compose logs -f landing

# Logs API (contact form)
docker compose logs -f api

# Logs Apache
sudo tail -f /var/log/apache2/hieraflow-error.log
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

| Placeholder   | Description                          |
|---------------|--------------------------------------|
| `<VPS_IP>`    | Adresse IPv4 publique du VPS         |
| `<VPS_USER>`  | Utilisateur SSH (ex : `ubuntu`, `root`) |
| `<ORG>`       | Organisation GitHub (si clone via git) |
