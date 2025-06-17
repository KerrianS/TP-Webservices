#!/bin/bash

echo "=== Nettoyage et désinstallation ==="

# Suppression des ressources Kubernetes
echo "Suppression des ressources Kubernetes..."
kubectl delete -f OpomlyTravel-hpa.yaml --ignore-not-found=true
kubectl delete -f OpomlyTravel.yaml --ignore-not-found=true
kubectl delete -f DockerRegistry.yaml --ignore-not-found=true

# Arrêt de k3s
echo "Arrêt de k3s..."
sudo systemctl stop k3s

# Désinstallation de k3s
echo "Désinstallation de k3s..."
sudo /usr/local/bin/k3s-uninstall.sh

# Nettoyage des images Docker
echo "Nettoyage des images Docker..."
docker rmi registry.infres.fr/OpomlyTravel --force 2>/dev/null || true

# Nettoyage des entrées dans /etc/hosts
echo "Nettoyage des entrées dans /etc/hosts..."
sudo sed -i '/registry.infres.fr/d' /etc/hosts
sudo sed -i '/OpomlyTravel.infres.fr/d' /etc/hosts

echo "=== Nettoyage terminé ===" 