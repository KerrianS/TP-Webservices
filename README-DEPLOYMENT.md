# Déploiement OpomlyTravel sur k3s

Ce document explique comment déployer le service OpomlyTravel sur un cluster k3s avec conteneurisation Docker et autoscaling.

## Prérequis

- WSL2 avec la dernière version
- Docker installé
- Mode réseau en mode "mirrored" dans WSL2

## Structure du projet

```
TP-Webservices/
├── server/                 # Service Node.js (OpomlyTravel)
│   ├── Dockerfile         # Configuration Docker
│   ├── index.js           # Point d'entrée du serveur
│   └── package.json       # Dépendances
├── docker-compose.yml     # Configuration Docker Compose
├── DockerRegistry.yaml    # Configuration du registry Docker
├── OpomlyTravel.yaml      # Déploiement Kubernetes
├── OpomlyTravel-hpa.yaml  # Configuration HPA
├── setup-k3s.sh          # Script d'installation k3s
├── deploy.sh             # Script de déploiement
├── stress-test.sh        # Script de test de charge
└── cleanup.sh            # Script de nettoyage
```

## Étapes de déploiement

### 1. Installation et configuration de k3s

```bash
# Rendre le script exécutable
chmod +x setup-k3s.sh

# Exécuter l'installation
./setup-k3s.sh
```

Ce script va :
- Installer k3s avec la configuration appropriée
- Configurer le registry Docker
- Configurer les entrées DNS dans /etc/hosts
- Configurer Docker pour utiliser le registry local

### 2. Déploiement du service

```bash
# Rendre le script exécutable
chmod +x deploy.sh

# Exécuter le déploiement
./deploy.sh
```

Ce script va :
- Builder l'image Docker
- Pousser l'image vers le registry local
- Déployer le registry Docker sur k3s
- Déployer le service OpomlyTravel
- Configurer l'autoscaling (HPA)

### 3. Vérification du déploiement

```bash
# Vérifier les pods
kubectl get pods

# Vérifier les services
kubectl get services

# Vérifier les ingress
kubectl get ingress

# Vérifier le HPA
kubectl get hpa
```

### 4. Test de l'autoscaling

```bash
# Rendre le script exécutable
chmod +x stress-test.sh

# Exécuter le test de charge
./stress-test.sh
```

Ce script va générer de la charge pendant 5 minutes pour déclencher l'autoscaling.

## Configuration détaillée

### Dockerfile
Le Dockerfile utilise une approche multi-stage pour optimiser la taille de l'image :
- Stage de build : installation des dépendances
- Stage de production : copie des dépendances et du code
- Utilisation d'un utilisateur non-root pour la sécurité
- Health check intégré

### Kubernetes
- **Deployment** : 2 réplicas par défaut
- **Service** : Load balancer interne
- **Ingress** : Point d'entrée externe via Traefik
- **HPA** : Autoscaling basé sur CPU et mémoire (80% de seuil)

### Registry Docker
- Registry local accessible via `registry.infres.fr`
- Configuration pour k3s et Docker local
- Stockage temporaire (emptyDir)

## Accès au service

- **API Documentation** : http://OpomlyTravel.infres.fr/api-docs
- **Service API** : http://OpomlyTravel.infres.fr/api/*
- **Registry** : http://registry.infres.fr

## Surveillance

```bash
# Surveiller les pods en temps réel
kubectl get pods -w

# Surveiller le HPA
kubectl get hpa opomlytravel-hpa -w

# Logs d'un pod
kubectl logs -f deployment/opomlytravel

# Métriques des ressources
kubectl top pods
```

## Nettoyage

```bash
# Rendre le script exécutable
chmod +x cleanup.sh

# Exécuter le nettoyage
./cleanup.sh
```

Ce script va supprimer toutes les ressources Kubernetes et désinstaller k3s.

## Dépannage

### Problèmes courants

1. **Registry inaccessible**
   ```bash
   # Vérifier que le registry est démarré
   kubectl get pods -l app=docker-registry
   
   # Vérifier les logs
   kubectl logs deployment/docker-registry
   ```

2. **Service non accessible**
   ```bash
   # Vérifier les pods du service
   kubectl get pods -l app=opomlytravel
   
   # Vérifier les logs
   kubectl logs deployment/opomlytravel
   ```

3. **HPA ne fonctionne pas**
   ```bash
   # Vérifier les métriques
   kubectl get hpa opomlytravel-hpa -o yaml
   
   # Vérifier que les métriques sont disponibles
   kubectl top pods
   ```

### Commandes utiles

```bash
# Redémarrer un déploiement
kubectl rollout restart deployment/opomlytravel

# Mettre à l'échelle manuellement
kubectl scale deployment opomlytravel --replicas=3

# Supprimer et recréer un pod
kubectl delete pod -l app=opomlytravel
```

## Notes importantes

- Le service utilise le port 3001
- L'autoscaling est configuré pour 2-4 réplicas
- Les seuils d'autoscaling sont à 80% pour CPU et mémoire
- Le registry utilise un stockage temporaire (données perdues au redémarrage)
- Les health checks utilisent l'endpoint `/api-docs` 