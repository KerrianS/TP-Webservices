#!/bin/bash

echo "🚀 Installation et configuration de k3s..."

# Vérifier que nous sommes sur Ubuntu
if ! grep -q "Ubuntu" /etc/os-release; then
    echo "❌ Ce script doit être exécuté sur Ubuntu"
    exit 1
fi

# Mettre à jour les paquets
echo "📦 Mise à jour des paquets système..."
sudo apt update && sudo apt upgrade -y

# Installer les dépendances nécessaires
echo "🔧 Installation des dépendances..."
sudo apt install -y curl wget

# Arrêter k3s s'il est déjà en cours d'exécution
echo "🛑 Arrêt de k3s s'il est en cours d'exécution..."
sudo systemctl stop k3s 2>/dev/null || true

# Désactiver k3s au démarrage
echo "⚙️  Désactivation de k3s au démarrage..."
sudo systemctl disable k3s 2>/dev/null || true

# Installer k3s avec la configuration appropriée
echo "📥 Installation de k3s..."
curl -sfL https://get.k3s.io | K3S_KUBECONFIG_MODE="644" sh -

# Attendre que k3s démarre
echo "⏳ Attente du démarrage de k3s..."
sleep 10

# Vérifier le statut de k3s
echo "🔍 Vérification du statut de k3s..."
sudo systemctl status k3s --no-pager

# Configurer KUBECONFIG pour l'utilisateur actuel
echo "⚙️  Configuration de KUBECONFIG..."
export KUBECONFIG="/etc/rancher/k3s/k3s.yaml"

# Ajouter KUBECONFIG au profil bash
echo 'export KUBECONFIG="/etc/rancher/k3s/k3s.yaml"' >> ~/.bashrc

# Tester l'installation
echo "🧪 Test de l'installation..."
k3s kubectl get nodes

# Vérifier les pods système
echo "📊 Vérification des pods système..."
k3s kubectl get pods -n kube-system

echo ""
echo "✅ Installation de k3s terminée !"
echo ""
echo "📝 Commandes utiles :"
echo "   - Vérifier les nodes : k3s kubectl get nodes"
echo "   - Vérifier les pods : k3s kubectl get pods --all-namespaces"
echo "   - Arrêter k3s : sudo systemctl stop k3s"
echo "   - Démarrer k3s : sudo systemctl start k3s"
echo ""
echo "🌐 k3s est maintenant prêt pour déployer vos services !" 