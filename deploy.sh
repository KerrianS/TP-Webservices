#!/bin/bash

echo "=== Build et déploiement d'OpomlyTravel ==="

# Build et push de l'image
echo "Build de l'image Docker..."
docker-compose build

echo "Push de l'image vers le registry..."
docker-compose push

# Test du push
echo "Test du push vers le registry..."
wget -qO- http://registry.infres.fr/v2/OpomlyTravel/tags/list

# Déploiement sur k3s
echo "Déploiement du registry Docker..."
kubectl apply -f DockerRegistry.yaml

echo "Attente du démarrage du registry..."
kubectl wait --for=condition=available --timeout=300s deployment/docker-registry

echo "Déploiement du service OpomlyTravel..."
kubectl apply -f OpomlyTravel.yaml

echo "Déploiement du HPA..."
kubectl apply -f OpomlyTravel-hpa.yaml

echo "Attente du démarrage du service..."
kubectl wait --for=condition=available --timeout=300s deployment/opomlytravel

echo "=== Déploiement terminé ==="
echo "Vérifiez le statut avec: kubectl get pods"
echo "Accédez au service via: http://OpomlyTravel.infres.fr" 