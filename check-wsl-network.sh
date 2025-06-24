#!/bin/bash

echo "🔍 Vérification de la configuration réseau WSL2..."

# Vérifier la version de WSL
echo "📋 Version WSL :"
wsl --version

# Vérifier les distributions installées
echo ""
echo "📦 Distributions WSL installées :"
wsl -l -v

# Vérifier la configuration réseau
echo ""
echo "🌐 Configuration réseau WSL2 :"
echo "Pour activer le mode réseau mirroiré, créez ou modifiez le fichier :"
echo "C:\\Users\\%USERNAME%\\AppData\\Local\\Microsoft\\WindowsApps\\wsl.exe"
echo ""
echo "Ajoutez cette ligne dans le fichier .wslconfig :"
echo "[wsl2]"
echo "networkingMode=mirrored"
echo ""

# Instructions pour configurer le réseau mirroiré
echo "📝 Instructions pour configurer le réseau mirroiré :"
echo "1. Créez un fichier .wslconfig dans votre répertoire utilisateur Windows"
echo "2. Ajoutez le contenu suivant :"
echo ""
echo "   [wsl2]"
echo "   networkingMode=mirrored"
echo "   memory=4GB"
echo "   processors=2"
echo ""
echo "3. Redémarrez WSL : wsl --shutdown"
echo "4. Relancez WSL : wsl"
echo ""

# Vérifier si .wslconfig existe
if [ -f "/mnt/c/Users/$USER/.wslconfig" ]; then
    echo "✅ Fichier .wslconfig trouvé :"
    cat "/mnt/c/Users/$USER/.wslconfig"
else
    echo "❌ Fichier .wslconfig non trouvé"
    echo "Création du fichier .wslconfig..."
    cat > "/mnt/c/Users/$USER/.wslconfig" << EOF
[wsl2]
networkingMode=mirrored
memory=4GB
processors=2
EOF
    echo "✅ Fichier .wslconfig créé !"
fi

echo ""
echo "🚀 Prêt pour l'installation de k3s !" 