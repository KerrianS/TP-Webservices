#!/bin/bash

echo "🧪 Test de l'installation k3s..."

# Configurer KUBECONFIG
export KUBECONFIG="/etc/rancher/k3s/k3s.yaml"

# Vérifier le statut de k3s
echo "🔍 Statut de k3s :"
sudo systemctl status k3s --no-pager

# Vérifier les nodes
echo ""
echo "🖥️  Nodes disponibles :"
k3s kubectl get nodes

# Vérifier les namespaces
echo ""
echo "📦 Namespaces :"
k3s kubectl get namespaces

# Vérifier les pods système
echo ""
echo "🔧 Pods système :"
k3s kubectl get pods -n kube-system

# Vérifier les services
echo ""
echo "🌐 Services système :"
k3s kubectl get services -n kube-system

# Vérifier la version
echo ""
echo "📋 Version k3s :"
k3s --version

echo ""
echo "✅ Test terminé !"
echo "🚀 k3s est prêt pour déployer vos services !" 