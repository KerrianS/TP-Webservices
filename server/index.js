import express from 'express';
import cors from 'cors';
import session from 'express-session';
import initGoogleAuth from './services/google.auth.js';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
  }
}));

const authenticateGoogle = initGoogleAuth(app);

// Ajouter cette route pour récupérer les infos utilisateur
app.get('/api/user', (req, res) => {
  if (req.user) {
    res.json({
      id: req.user.id,
      name: req.user.name,
      email: req.user.email
    });
  } else {
    res.status(401).json({ message: 'Non authentifié' });
  }
});

// Ajouter une route de déconnexion
app.get('/api/logout', (req, res) => {
  req.logout(() => {
    res.status(200).json({ message: 'Déconnecté avec succès' });
  });
});

app.use('/api', authenticateGoogle);

const port = 3001;

app.listen(port, () => {
    console.log(`API REST running on http://localhost:${port}`);
});
