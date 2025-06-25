// Contrôleur pour l'authentification Google
import passport from 'passport';

export const googleAuth = passport.authenticate('google', {
    scope: ['profile', 'email']
});

export const googleAuthCallback = [
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
        const clientUrl = process.env.CLIENT_URL || 'http://localhost:3000';
        res.redirect(clientUrl);
    }
];

export const getGoogleUserInfos = [
    passport.authenticate('session', { session: true }),
    (req, res) => {
        if (req.isAuthenticated() && req.user) {
            res.json({
                id: req.user.id,
                name: req.user.name,
                email: req.user.email
            });
        } else {
            res.status(401).json({ message: 'Non authentifié via Google' });
        }
    }
];

export const googleLogout = (req, res) => {
    req.logout(() => {
        req.session.destroy((err) => {
            if (err) {
                console.error('Error destroying session:', err);
            }
            res.status(200).json({ message: 'Déconnecté avec succès de Google' });
        });
    });
};
