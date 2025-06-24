#!/bin/bash

echo "🔄 Arrêt des conteneurs existants..."
docker-compose down

echo "🧹 Nettoyage des images..."
docker-compose build --no-cache

echo "🚀 Démarrage des services..."
docker-compose up -d

echo "⏳ Attente du démarrage des services..."
sleep 10

echo "📊 Statut des services:"
docker-compose ps

echo "🔍 Vérification des logs du serveur:"
docker-compose logs opomlytravel-server

echo "🔍 Vérification des logs du client:"
docker-compose logs opomlytravel-client

echo "✅ Services démarrés !"
echo "🌐 Client accessible sur: http://localhost:3000"
echo "🔧 Serveur accessible sur: http://localhost:3001"
echo "🔐 Keycloak accessible sur: http://localhost:8080"

echo ""
echo "📝 Keycloak credentials:"
echo "   Username: admin"
echo "   Password: admin"
echo ""
echo "🛑 To stop services, run: docker-compose down" 