# Correction du problème d'authentification en Docker

## Problème identifié

Le problème d'authentification en Docker était causé par plusieurs facteurs :

1. **URLs hardcodées** : Les URLs `http://localhost:3001` dans `AuthContext.tsx` ne fonctionnent pas dans l'environnement Docker
2. **Configuration CORS** : Le serveur n'acceptait que les requêtes de `localhost:3000`
3. **URLs de redirection** : Les routes d'authentification redirigeaient vers des URLs hardcodées

## Solutions appliquées

### 1. Modification du AuthContext.tsx

- Ajout d'une fonction `getServerUrl()` qui utilise des URLs relatives en production
- Remplacement de toutes les URLs hardcodées par des URLs dynamiques

### 2. Configuration CORS améliorée

- Modification de `server/index.js` pour accepter les requêtes depuis différents environnements
- Configuration flexible qui fonctionne en développement et en production

### 3. URLs de redirection dynamiques

- Modification des routes Google et Keycloak pour utiliser des variables d'environnement
- Ajout des variables `CLIENT_URL` et `SERVER_URL` dans docker-compose.yml

### 4. Configuration Docker optimisée

- Utilisation du proxy nginx pour router les requêtes API
- Configuration des variables d'environnement nécessaires

## Variables d'environnement ajoutées

```yaml
environment:
  - CLIENT_URL=http://localhost:3000
  - SERVER_URL=http://localhost:3001
  - KEYCLOAK_AUTH_SERVER_URL=http://localhost:8080
  - KEYCLOAK_REALM=master
  - KEYCLOAK_CLIENT_ID=opomlytravel-client
  - KEYCLOAK_CLIENT_SECRET=your-client-secret
```

## Comment tester

1. Arrêter les conteneurs existants :
   ```bash
   docker-compose down
   ```

2. Reconstruire et relancer :
   ```bash
   ./build-and-run.sh
   ```

3. Vérifier les logs :
   ```bash
   docker-compose logs opomlytravel-server
   docker-compose logs opomlytravel-client
   ```

## Points importants

- Le client utilise maintenant des URLs relatives en production (proxy nginx)
- Le serveur accepte les requêtes depuis différents environnements
- Les redirections d'authentification sont dynamiques
- La configuration Keycloak doit être correctement configurée dans l'interface d'administration

## Configuration Keycloak requise

1. Créer un realm "master" (ou utiliser le realm par défaut)
2. Créer un client "opomlytravel-client"
3. Configurer les URLs de redirection autorisées :
   - `http://localhost:3001/api/keycloak/callback`
4. Récupérer le client secret et l'ajouter dans docker-compose.yml 