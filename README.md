# TP-Webservices : OpomlyTravel

Ce projet s’inscrit dans une série de trois travaux pratiques dédiés à la conception, au déploiement et à la sécurisation de Web Services modernes. À travers ces TP, nous explorons des thématiques clés du développement backend et DevOps : création d’API REST, authentification déléguée (OAuth2, Keycloak), documentation Swagger, containerisation (Docker), orchestration (k3s/Kubernetes) et sécurité en environnement cloud-native.

[📄 Rapport d'Analyse et de Déploiement](./Rapport%20d'Analyse%20et%20de%20D%C3%A9ploiement%20-%20TP%20Webservices.pdf)


## Sommaire
- [1. Structure du Projet](#structure-du-projet)
- [2. Prérequis](#prérequis)
- [3. Installation locale](#installation-locale)
- [4. Lancement local](#lancement-local)
- [5. Fonctionnalités principales](#fonctionnalités-principales)
- [6. Documentation API (Swagger/OpenAPI)](#documentation-api-swaggeropenapi)
- [7. Sécurité et Middleware](#sécurité-et-middleware)
- [8. Tests](#tests)
- [9. Déploiement avec Docker](#déploiement-avec-docker)
- [10. Déploiement Kubernetes (k3s)](#déploiement-kubernetes-k3s)

---

## 1. Structure du Projet

```
TP-Webservices/
├── client/        # Frontend React (SPA)
├── server/        # Backend Express/Node.js (API REST)
├── docker-compose.yml
└── docs/          # Spécifications Swagger/OpenAPI, fichiers techniques
```

## 2. Prérequis

### Pour le développement local :
- Node.js ≥ 16.x
- npm
- Docker et Docker Compose
- Navigateur web récent (Chrome, Firefox…)

### Pour le déploiement Kubernetes :
- WSL 2 (Windows Subsystem for Linux)
- k3s
- kubectl
- Accès à un registre Docker privé (registry.infres.fr)

## 3. Installation locale

### Étapes
1. Cloner le dépôt
   ```bash
   git clone <url-du-repo>
   cd TP-Webservices
   ```
2. Installer les dépendances
   - **Backend** :
     ```bash
     cd server
     npm install
     ```
   - **Frontend** :
     ```bash
     cd ../client
     npm install
     ```

## 4. Lancement local

### 4.1. Lancement via NPM (développement)
- **Backend** :
  ```bash
  npm run server
  # API accessible sur http://localhost:3001
  ```
- **Frontend** :
  ```bash
  npm run client
  # Application accessible sur http://localhost:3000
  ```

### 4.2. Lancement via Docker Compose
```bash
  docker-compose up --build
```

#### Accès
- Frontend : http://localhost:3000
- Backend : http://localhost:3001
- Keycloak : http://localhost:8080
- Swagger : http://localhost:3001/api-docs

## 5. Fonctionnalités principales

### Authentification
- Authentification par Google OAuth 2.1
- Authentification par Keycloak (OpenID Connect)
- Stockage sécurisé des tokens
- Déconnexion, rafraîchissement de session

### Page d'accueil
- Hero section immersive
- Grille de destinations de rêve (images Unsplash)
- Bouton d’appel à l’action : redirection vers les voyages réservés si authentifié

### Voyages réservés
- Route GET `/api/trips`
- Affichage sous forme de cartes (image, destination, prix, date)
- Données mockées mais structurées pour un backend réel

### API REST
- `/api/google/*` → Gestion des connexions Google
- `/api/keycloak/*` → Gestion des sessions Keycloak
- `/api/trips` → Récupération des voyages disponibles

## 6. Documentation API (Swagger/OpenAPI)
- Accessible via : http://localhost:3001/api-docs
- Visualisation interactive des routes
- Possibilité de tester les endpoints avec token JWT
- Contrat rédigé manuellement avec Swagger Editor

## 7. Sécurité et Middleware
- Middleware de protection des routes (JWT obligatoire)
- Intégration Keycloak (client "bearer-only" pour le backend)
- Configuration CORS entre client et serveur
- Validation manuelle du JWT (middleware personnalisé)

## 8. Tests

### Tests manuels
- Lancement de l’app via navigateur : accès à `/`, login, `/mytrip`
- Vérification de la protection des routes via appels sans token
- Inspection du token JWT avec [jwt.io](https://jwt.io)

### Tests API
- Swagger UI
- Postman avec token dans l’en-tête Authorization

## 9. Déploiement avec Docker

### Build local
```bash
docker-compose build
```

### Push vers registre privé
```bash
docker tag opomly-server registry.infres.fr/opomly/server
docker push registry.infres.fr/opomly/server
```

## 10. Déploiement Kubernetes (k3s)

### Étapes générales
- Installation de k3s
  ```bash
  curl -sfL https://get.k3s.io | K3S_KUBECONFIG_MODE="644" sh -
  ```
- Déploiement
  ```bash
  kubectl apply -f k8s/opomly-server.yaml
  kubectl apply -f k8s/opomly-client.yaml
  ```

#### Accès
- Ajouter dans `/etc/hosts` :
  ```
  127.0.0.1 opomly.infres.fr
  ```
- Accéder à : http://opomly.infres.fr
