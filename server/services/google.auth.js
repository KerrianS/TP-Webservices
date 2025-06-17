import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import dotenv from 'dotenv';

dotenv.config();

const initGoogleAuth = (app) => {
    passport.use(
        new GoogleStrategy(
            {
                clientID: process.env.GOOGLE_CLIENT_ID,
                clientSecret: process.env.GOOGLE_CLIENT_SECRET,
                callbackURL: "http://localhost:3001/api/google/auth/google/callback",
            },
            (accessToken, refreshToken, profile, done) => {
                const user = {
                    id: profile.id,
                    email: profile.emails[0].value,
                    name: profile.displayName,
                    accessToken
                };
                return done(null, user);
            }
        )
    );

    passport.serializeUser((user, done) => {
        done(null, user);
    });

    passport.deserializeUser((user, done) => {
        done(null, user);
    });

    app.use(passport.initialize());
    app.use(passport.session());

    app.get(
        '/auth/google',
        passport.authenticate('google', {
            scope: ['profile', 'email']
        })
    );

    app.get(
        '/auth/google/callback',
        passport.authenticate('google', {
            failureRedirect: '/login',
            session: true 
        }),
        (req, res) => {
            res.redirect('http://localhost:3000');
        }
    );

    const authenticateGoogle = (req, res, next) => {
        passport.authenticate('google', { session: false })(req, res, next);
    };

    return authenticateGoogle;
};

export default initGoogleAuth;