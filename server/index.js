import express from 'express';
import session from 'express-session';
import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import js2xmlparser from 'js2xmlparser';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

app.use(session({
  secret: 'your_session_secret',
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));

// Configuration de la stratégie Google
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:3001/auth/google/callback"
  },
  (accessToken, refreshToken, profile, done) => {
    const user = {
      id: profile.id,
      firstName: profile.name.givenName,
      lastName: profile.name.familyName,
      email: profile.emails[0].value,
      picture: profile.photos[0].value
    };
    return done(null, user);
  }
));

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

app.get('/auth/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

app.get('/auth/google/callback', 
  passport.authenticate('google', { 
    failureRedirect: 'http://localhost:3000/login',
    successRedirect: 'http://localhost:3000'
  })
);

app.get('/api/user', (req, res) => {
  if (req.isAuthenticated()) {
    res.json(req.user);
  } else {
    res.status(401).json({ error: 'Not authenticated' });
  }
});

app.get('/api/logout', (req, res) => {
  req.logout((err) => {
    if (err) {
      return res.status(500).json({ error: 'Error during logout' });
    }
    req.session.destroy((err) => {
      if (err) {
        return res.status(500).json({ error: 'Error destroying session' });
      }
      res.clearCookie('connect.sid');
      res.json({ success: true });
    });
  });
});

const port = 3001;
const vol = {
    compagnie: 'Air France',
    numero: 'AF1234',
    place: '12A',
    prix: 199.99,
    date: '2025-07-01T10:00:00Z'
};

app.get('/compagnies/:compagnieId/vols/:volId', (req, res) => {
    const accept = req.headers['accept'];
    if (accept && accept.includes('application/xml')) {
        res.set('Content-Type', 'application/xml');
        res.send(js2xmlparser.parse('vol', vol));
    } else {
        res.json(vol);
    }
});

app.get('/compagnies', (req, res) => {
    res.json([{ id: 'AF', nom: 'Air France' }, { id: 'LH', nom: 'Lufthansa' }]);
});

app.get('/compagnies/:compagnieId/vols', (req, res) => {
    res.json([vol]);
});

app.get('/compagnies/:compagnieId/vols/:volId/places', (req, res) => {
    res.json([{ id: '12A', disponible: true }, { id: '12B', disponible: false }]);
});

app.get('/compagnies/:compagnieId/vols/:volId/date', (req, res) => {
    res.json({ date: vol.date });
});

app.listen(port, () => {
    console.log(`API REST statique sur http://localhost:${port}`);
});
