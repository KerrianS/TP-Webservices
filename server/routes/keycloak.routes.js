import express from 'express';
import keycloakAuth from '../services/keycloak.auth.js';
import axios from 'axios';
import qs from 'qs';

const router = express.Router();
const keycloak = keycloakAuth.getKeycloakInstance();

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
router.get('/auth', (req, res) => {
    if (!process.env.KEYCLOAK_AUTH_SERVER_URL || !process.env.KEYCLOAK_REALM || !process.env.KEYCLOAK_CLIENT_ID) {
        return res.status(500).json({ 
            error: 'Configuration Keycloak manquante',
            missing: {
                serverUrl: !process.env.KEYCLOAK_AUTH_SERVER_URL,
                realm: !process.env.KEYCLOAK_REALM,
                clientId: !process.env.KEYCLOAK_CLIENT_ID
            }
        });
    }
    
    const authUrl = `http://localhost:8080/realms/${process.env.KEYCLOAK_REALM}/protocol/openid-connect/auth`;
    const serverUrl = process.env.SERVER_URL || 'http://localhost:3001';
    const params = new URLSearchParams({
        client_id: process.env.KEYCLOAK_CLIENT_ID,
        response_type: 'code',
        scope: 'openid email profile',
        redirect_uri: `${serverUrl}/api/keycloak/callback`,
    });
    
    const finalUrl = `${authUrl}?${params.toString()}`;
    console.log('URL de redirection Keycloak:', finalUrl);
    
    res.redirect(finalUrl);
});

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
router.get('/callback', async (req, res) => {
    const { code } = req.query;
    
    if (!code) {
        console.error('No authorization code received');
        const clientUrl = process.env.CLIENT_URL || 'http://localhost:3000';
        return res.redirect(`${clientUrl}/login?error=no_code`);
    }

    try {
        // Échanger le code contre un token
        const tokenEndpoint = `${process.env.KEYCLOAK_AUTH_SERVER_URL}/realms/${process.env.KEYCLOAK_REALM}/protocol/openid-connect/token`;
        const serverUrl = process.env.SERVER_URL || 'http://localhost:3001';
        
        const tokenResponse = await axios.post(tokenEndpoint, qs.stringify({
            grant_type: 'authorization_code',
            client_id: process.env.KEYCLOAK_CLIENT_ID,
            client_secret: process.env.KEYCLOAK_CLIENT_SECRET,
            code: code,
            redirect_uri: `${serverUrl}/api/keycloak/callback`
        }), {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });

        const { access_token, id_token } = tokenResponse.data;
        
        // Décoder le token pour obtenir les informations utilisateur
        const tokenPayload = JSON.parse(Buffer.from(id_token.split('.')[1], 'base64').toString());
        
        // Stocker les informations utilisateur en session
        req.session.user = {
            id: tokenPayload.sub,
            name: tokenPayload.name || tokenPayload.preferred_username,
            email: tokenPayload.email,
            id_token: id_token
        };
        
        console.log('Keycloak user authenticated:', req.session.user);
        
        const clientUrl = process.env.CLIENT_URL || 'http://localhost:3000';
        res.redirect(clientUrl);
    } catch (error) {
        console.error('Error during Keycloak callback:', error);
        const clientUrl = process.env.CLIENT_URL || 'http://localhost:3000';
        res.redirect(`${clientUrl}/login?error=auth_failed`);
    }
});

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
router.get('/user/infos', (req, res) => {
    if (req.session && req.session.user) {
        res.json(req.session.user);
    } else {
        res.status(401).json({ message: 'Non authentifié' });
    }
});

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
router.get('/user/logout', (req, res) => {
    if (req.session.user && req.session.user.id_token) {
        const keycloakLogoutUrl = `${process.env.KEYCLOAK_AUTH_SERVER_URL}/realms/${process.env.KEYCLOAK_REALM}/protocol/openid-connect/logout`;
        const clientUrl = process.env.CLIENT_URL || 'http://localhost:3000';
        const params = new URLSearchParams({
            id_token_hint: req.session.user.id_token,
            post_logout_redirect_uri: `${clientUrl}/login` // Rediriger vers la page de connexion de l'application
        });
        
        req.session.destroy((err) => {
            if (err) {
                console.error('Error destroying session:', err);
            }
            res.redirect(`${keycloakLogoutUrl}?${params.toString()}`);
        });
    } else {
        req.session.destroy((err) => {
            if (err) {
                console.error('Error destroying session:', err);
            }
            res.status(200).json({ message: 'Déconnecté avec succès de l\'application' });
        });
    }
});

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
router.get('/protected', 
    keycloak.protect(),
    (req, res) => {
        res.json({ message: 'Protected resource accessed successfully' });
    }
);

export default router;