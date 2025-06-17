#!/bin/bash

echo "=== Test de charge pour l'autoscaling ==="

# URL du service
SERVICE_URL="http://OpomlyTravel.infres.fr"

echo "Démarrage du test de charge sur $SERVICE_URL"
echo "Ce test va générer de la charge pendant 5 minutes pour déclencher l'autoscaling"
echo "Appuyez sur Ctrl+C pour arrêter le test"

# Fonction pour afficher le nombre de pods
show_pods() {
    echo "Nombre de pods actuellement: $(kubectl get pods -l app=opomlytravel --no-headers | wc -l)"
    kubectl get hpa opomlytravel-hpa
}

# Affichage initial
echo "État initial:"
show_pods

# Test de charge avec curl en boucle
echo "Démarrage du test de charge..."
for i in {1..300}; do
    # Requêtes parallèles pour générer de la charge
    curl -s "$SERVICE_URL/api-docs" > /dev/null &
    curl -s "$SERVICE_URL/api/trips" > /dev/null &
    curl -s "$SERVICE_URL/api/keycloak" > /dev/null &
    
    # Afficher le statut toutes les 30 secondes
    if [ $((i % 30)) -eq 0 ]; then
        echo "Test en cours... ($i/300 secondes)"
        show_pods
    fi
    
    sleep 1
done

echo "Test terminé. État final:"
show_pods

echo "Vous pouvez continuer à surveiller avec: kubectl get hpa opomlytravel-hpa -w" 