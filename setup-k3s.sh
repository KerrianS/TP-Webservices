#!/bin/bash

echo "=== Installation et configuration de k3s ==="

# Installation de k3s
echo "Installation de k3s..."
sudo su - << 'EOF'
curl -sfL https://get.k3s.io | K3S_KUBECONFIG_MODE="644" sh -
systemctl disable k3s
EOF

# Test de l'installation
echo "Test de l'installation k3s..."
k3s kubectl get node

# Configuration de la variable d'environnement
echo "Configuration de KUBECONFIG..."
export KUBECONFIG="/etc/rancher/k3s/k3s.yaml"
echo 'export KUBECONFIG="/etc/rancher/k3s/k3s.yaml"' >> ~/.bashrc

# Configuration du registry dans /etc/hosts
echo "Configuration du registry dans /etc/hosts..."
sudo su - << 'EOF'
echo "$(hostname -I | awk '{print $1}') registry.infres.fr" >> /etc/hosts
echo "$(hostname -I | awk '{print $1}') OpomlyTravel.infres.fr" >> /etc/hosts
EOF

# Configuration du registry pour k3s
echo "Configuration du registry pour k3s..."
sudo su - << 'EOF'
cat <<EOF >/etc/rancher/k3s/registries.yaml
mirrors:
  registry.infres.fr:
    endpoint:
      - "http://registry.infres.fr"
EOF
systemctl restart k3s
EOF

# Configuration du registry pour Docker local
echo "Configuration du registry pour Docker local..."
sudo su - << 'EOF'
if [ ! -f /etc/docker/daemon.json ]; then
    echo '{"insecure-registries": ["registry.infres.fr"]}' > /etc/docker/daemon.json
else
    # Ajouter le registry à la configuration existante
    jq '.insecure-registries += ["registry.infres.fr"]' /etc/docker/daemon.json > /tmp/daemon.json
    mv /tmp/daemon.json /etc/docker/daemon.json
fi
systemctl restart docker
EOF

echo "=== Configuration terminée ==="
echo "Vous pouvez maintenant déployer le registry avec: kubectl apply -f DockerRegistry.yaml" 