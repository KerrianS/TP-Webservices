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

##QUESTION 6

Résultat avec le token reçu de Keycloak dans la réponse suivant : 
"client_secret=A9b02ZURyQ53B4f8zKGTVD4LcwiUFjjn"
{"access_token":"eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICIwRjQxYkwxZHdLZ0JLZjBmWEtBNHJDa0Roc2Z0V05JcGpER1JoL
WxLUG0wIn0.
eyJleHAiOjE3NTAwODY4NjcsImlhdCI6MTc1MDA4NjU2NywianRpIjoidHJydGNjOjBkYjcwYTIxLTk2MjgtNGNlMS05NzllLTkxYTZiZWRmNWQ5YSIsIm
lzcyI6Imh0dHA6Ly9sb2NhbGhvc3Q6ODA4MC9yZWFsbXMvb3BvbWx5dHJhdmVsIiwiYXVkIjoiYWNjb3VudCIsInN1YiI6IjY3Zjg1NTE5LTc2ZGYtNGEx
Ni05MmFmLTFiMWZjMjU0ZDEwOSIsInR5cCI6IkJlYXJlciIsImF6cCI6Im9wb21seXRyYXZlbCIsImFjciI6IjEiLCJhbGxvd2VkLW9yaWdpbnMiOlsiaH
R0cDovL2xvY2FsaG9zdDozMDAwIl0sInJlYWxtX2FjY2VzcyI6eyJyb2xlcyI6WyJkZWZhdWx0LXJvbGVzLW9wb21seXRyYXZlbCIsIm9mZmxpbmVfYWNj
ZXNzIiwidW1hX2F1dGhvcml6YXRpb24iXX0sInJlc291cmNlX2FjY2VzcyI6eyJvcG9tbHl0cmF2ZWwiOnsicm9sZXMiOlsidW1hX3Byb3RlY3Rpb24iXX
0sImFjY291bnQiOnsicm9sZXMiOlsibWFuYWdlLWFjY291bnQiLCJtYW5hZ2UtYWNjb3VudC1saW5rcyIsInZpZXctcHJvZmlsZSJdfX0sInNjb3BlIjoi
cHJvZmlsZSBlbWFpbCIsImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwiY2xpZW50SG9zdCI6IjE3Mi4xOC4wLjEiLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJzZX
J2aWNlLWFjY291bnQtb3BvbWx5dHJhdmVsIiwiY2xpZW50QWRkcmVzcyI6IjE3Mi4xOC4wLjEiLCJjbGllbnRfaWQiOiJvcG9tbHl0cmF2ZWwifQ.
fkrEfjDIaB1kSwNAq5mmuTSAqKUw9rmnW58Ui8Pnen-WvGQJExJ1YIz8MrSt9yrOKRtCcaJSCpwH0ruq55L2ZE2zMXVV1xMxlJ56ReOGHA7NPxx907s1ea
J9KP7UjjSkFvrPmO3vzCaJVbonGjIIpcbtpsEJxsQ8G_hDoea2la2hhdI4z3RZjwhgtGwUuCUrammESRJNikAXefvYlhtkAYoi1A-3Bh0_bezNgBiCFVAI
nv9ye7qCrwDF99ltsw5FeQrSKTFX9RO3K2yb4WVmrJVdjw-YwXa_82pkdbLSDouK5nE0TkLcLVKDHY5tEzNsKkKPBBY7dJdqNJJMD5Rm9A",
"expires_in":300,"refresh_expires_in":0,"token_type":"Bearer","not-before-policy":0,"scope":"profile email"}
{
  "exp": 1750086867,
  "iat": 1750086567,
  "jti": "trrtcc:0db70a21-9628-4ce1-979e-91a6bedf5d9a",
  "iss": "http://localhost:8080/realms/opomlytravel",
  "aud": "account",
  "sub": "67f85519-76df-4a16-92af-1b1fc254d109",
  "typ": "Bearer",
  "azp": "opomlytravel",
  "acr": "1",
  "allowed-origins": [
    "http://localhost:3000"
  ],
  "realm_access": {
    "roles": [
      "default-roles-opomlytravel",
      "offline_access",
      "uma_authorization"
    ]
  },
  "resource_access": {
    "opomlytravel": {
      "roles": [
        "uma_protection"
      ]
    },
    "account": {
      "roles": [
        "manage-account",
        "manage-account-links",
        "view-profile"
      ]
    }
  },
  "scope": "profile email",
  "email_verified": false,
  "clientHost": "172.18.0.1",
  "preferred_username": "service-account-opomlytravel",
  "clientAddress": "172.18.0.1",
  "client_id": "opomlytravel"
}