import express from 'express';
import {
    keycloakAuthStart,
    keycloakCallback,
    getKeycloakUserInfos,
    keycloakLogout,
    keycloakProtected
} from '../controllers/keycloak.controller.js';

const router = express.Router();

/**
 * @swagger
 * /api/keycloak/auth:
 *   get:
 *     summary: Démarre l'authentification Keycloak (redirection)
 *     tags: [Keycloak]
 *     responses:
 *       302:
 *         description: Redirige vers Keycloak pour l'authentification
 */
router.get('/auth', keycloakAuthStart);

/**
 * @swagger
 * /api/keycloak/callback:
 *   get:
 *     summary: Callback Keycloak après authentification
 *     tags: [Keycloak]
 *     responses:
 *       302:
 *         description: Redirige vers l'accueil après authentification
 */
router.get('/callback', keycloakCallback);

/**
 * @swagger
 * /api/keycloak/user/infos:
 *   get:
 *     summary: Récupère les infos utilisateur Keycloak (si authentifié)
 *     tags: [Keycloak]
 *     responses:
 *       200:
 *         description: Infos utilisateur
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 name:
 *                   type: string
 *                 email:
 *                   type: string
 *       401:
 *         description: Non authentifié
 */
router.get('/user/infos', getKeycloakUserInfos);

/**
 * @swagger
 * /api/keycloak/user/logout:
 *   get:
 *     summary: Déconnexion Keycloak
 *     tags: [Keycloak]
 *     responses:
 *       200:
 *         description: Déconnecté avec succès de Keycloak
 */
router.get('/user/logout', keycloakLogout);

/**
 * @swagger
 * /api/keycloak/protected:
 *   get:
 *     summary: Accès à une ressource protégée par Keycloak
 *     tags: [Keycloak]
 *     responses:
 *       200:
 *         description: Accès autorisé
 *       401:
 *         description: Accès non autorisé
 */
router.get('/protected', ...keycloakProtected);

export default router;