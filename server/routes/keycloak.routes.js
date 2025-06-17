import express from 'express';
import keycloakAuth from '../services/keycloak.auth.js';
import axios from 'axios';
import qs from 'qs';

const router = express.Router();
const keycloak = keycloakAuth.getKeycloakInstance();

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
    
    const authUrl = `${process.env.KEYCLOAK_AUTH_SERVER_URL}/realms/${process.env.KEYCLOAK_REALM}/protocol/openid-connect/auth`;
    const params = new URLSearchParams({
        client_id: process.env.KEYCLOAK_CLIENT_ID,
        response_type: 'code',
        scope: 'openid email profile',
        redirect_uri: 'http://localhost:3001/api/keycloak/callback',
    });
    
    const finalUrl = `${authUrl}?${params.toString()}`;
    console.log('URL de redirection Keycloak:', finalUrl);
    
    res.redirect(finalUrl);
});

router.get('/callback', async (req, res) => {
    const { code } = req.query;
    
    if (!code) {
        console.error('No authorization code received');
        return res.redirect('http://localhost:3000/login?error=no_code');
    }

    try {
        // Échanger le code contre un token
        const tokenEndpoint = `${process.env.KEYCLOAK_AUTH_SERVER_URL}/realms/${process.env.KEYCLOAK_REALM}/protocol/openid-connect/token`;
        
        const tokenResponse = await axios.post(tokenEndpoint, qs.stringify({
            grant_type: 'authorization_code',
            client_id: process.env.KEYCLOAK_CLIENT_ID,
            client_secret: process.env.KEYCLOAK_CLIENT_SECRET,
            code: code,
            redirect_uri: 'http://localhost:3001/api/keycloak/callback'
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
        
        res.redirect('http://localhost:3000');
    } catch (error) {
        console.error('Error during Keycloak callback:', error);
        res.redirect('http://localhost:3000/login?error=auth_failed');
    }
});

// Route pour récupérer les infos utilisateur Keycloak
router.get('/user/infos', (req, res) => {
    if (req.session && req.session.user) {
        res.json(req.session.user);
    } else {
        res.status(401).json({ message: 'Non authentifié' });
    }
});

// Route pour déconnexion Keycloak
router.get('/user/logout', (req, res) => {
    if (req.session.user && req.session.user.id_token) {
        const keycloakLogoutUrl = `${process.env.KEYCLOAK_AUTH_SERVER_URL}/realms/${process.env.KEYCLOAK_REALM}/protocol/openid-connect/logout`;
        const params = new URLSearchParams({
            id_token_hint: req.session.user.id_token,
            post_logout_redirect_uri: 'http://localhost:3000/login' // Rediriger vers la page de connexion de l'application
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

router.get('/protected', 
    keycloak.protect(),
    (req, res) => {
        res.json({ message: 'Protected resource accessed successfully' });
    }
);

export default router;