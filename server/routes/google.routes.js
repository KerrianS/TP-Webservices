import express from 'express';
import { googleAuth, googleAuthCallback, getGoogleUserInfos, googleLogout } from '../controllers/google.controller.js';

const router = express.Router();

/**
 * @swagger
 * /api/google/auth/google:
 *   get:
 *     summary: Démarre l'authentification Google (redirection)
 *     tags: [Google]
 *     responses:
 *       302:
 *         description: Redirige vers Google pour l'authentification
 */
router.get('/auth/google', googleAuth);

/**
 * @swagger
 * /api/google/auth/google/callback:
 *   get:
 *     summary: Callback Google après authentification
 *     tags: [Google]
 *     responses:
 *       302:
 *         description: Redirige vers l'accueil après authentification
 */
router.get('/auth/google/callback', ...googleAuthCallback);

/**
 * @swagger
 * /api/google/user/infos:
 *   get:
 *     summary: Récupère les infos utilisateur Google (si authentifié)
 *     tags: [Google]
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
 *         description: Non authentifié via Google
 */
router.get('/user/infos', ...getGoogleUserInfos);

/**
 * @swagger
 * /api/google/user/logout:
 *   get:
 *     summary: Déconnexion Google
 *     tags: [Google]
 *     responses:
 *       200:
 *         description: Déconnecté avec succès de Google
 */
router.get('/user/logout', googleLogout);

export default router;