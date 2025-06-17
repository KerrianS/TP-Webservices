import express from 'express';
import passport from 'passport';

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
router.get(
    '/auth/google',
    passport.authenticate('google', {
        scope: ['profile', 'email']
    })
);

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
router.get(
    '/auth/google/callback',
    passport.authenticate('google', {
        failureRedirect: '/login',
        session: true 
    }),
    (req, res) => {
        if (req.user) {
            req.session.user = {
                id: req.user.id,
                name: req.user.name,
                email: req.user.email
            };
            console.log('Google user authenticated and stored in session:', req.session.user);
        }
        res.redirect('http://localhost:3000');
    }
);

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
router.get('/user/infos', passport.authenticate('session', { session: true }), (req, res) => {
    if (req.isAuthenticated() && req.user) {
        res.json({
            id: req.user.id,
            name: req.user.name,
            email: req.user.email
        });
    } else {
        res.status(401).json({ message: 'Non authentifié via Google' });
    }
});

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
router.get('/user/logout', (req, res) => {
    req.logout(() => {
        req.session.destroy((err) => {
            if (err) {
                console.error('Error destroying session:', err);
            }
            res.status(200).json({ message: 'Déconnecté avec succès de Google' });
        });
    });
});

export default router;