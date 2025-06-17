# OpomlyTravel - Webservices

Ce projet est une application web de gestion de voyages avec authentification (Google/Keycloak), affichage de destinations de rêve, gestion de voyages réservés, et documentation Swagger.

## Structure du projet

```
TP-Webservices/
  client/        # Frontend React
  server/        # Backend Express/Node.js
```

## Prérequis
- Node.js >= 16
- npm

## Installation

1. **Cloner le dépôt**
2. **Installer les dépendances**
   - Backend :
     ```bash
     cd server
     npm install
     ```
   - Frontend :
     ```bash
     cd ../client
     npm install
     ```

## Lancement du projet

- **Backend** :
  ```bash
  cd server
  node index.js
  ```
  L'API tourne sur http://localhost:3001

- **Frontend** :
  ```bash
  cd client
  npm run start
  ```
  L'application React tourne sur http://localhost:3000

## Fonctionnalités principales

### Authentification
- Authentification via Google OAuth2 ou Keycloak (SSO)
- Gestion de session sécurisée (cookies)
- Affichage conditionnel selon l'état de connexion

### Page d'accueil
- Hero section immersive avec image de rêve
- Grille de destinations de rêve (images Unsplash)
- Bouton "Planifiez votre aventure" qui redirige vers la page de voyages réservés si connecté, sinon vers la page de login

### Voyages réservés
- Page "Mes voyages réservés" (`/mytrip`) qui récupère les voyages mockés depuis le backend (`/api/trips`)
- Affichage sous forme de cartes stylées (image, destination, date, description)

### API REST
- `/api/google/...` : Authentification et infos utilisateur Google
- `/api/keycloak/...` : Authentification et infos utilisateur Keycloak
- `/api/trips` : Liste des voyages réservés (mock)

### Documentation Swagger
- Documentation interactive de l'API accessible sur :
  [http://localhost:3001/api-docs](http://localhost:3001/api-docs)
- Toutes les routes principales sont documentées (Google, Keycloak, Trips)

## Personnalisation
- Pour changer les images de rêve, modifiez les URLs Unsplash dans `client/src/pages/HomePage/Home.tsx`.
- Pour connecter à un vrai backend ou une vraie base de données, adaptez la route `/api/trips`.

## Sécurité
- Les routes d'infos utilisateur nécessitent une authentification (Google ou Keycloak).
- Les sessions sont sécurisées côté backend.

## Développement
- Le code est découpé en composants React réutilisables.
- Le backend est modulaire (routes séparées, middleware, services).
- Swagger permet de tester l'API facilement.

## Auteur
- Projet pédagogique IMT - Webservices 2025 By SALAÜN Kerrian