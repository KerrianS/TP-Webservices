import express from 'express';
import passport from 'passport';

const router = express.Router();

router.get(
    '/auth/google',
    passport.authenticate('google', {
        scope: ['profile', 'email']
    })
);

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

// Route pour récupérer les infos utilisateur Google
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

// Route pour déconnexion Google
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