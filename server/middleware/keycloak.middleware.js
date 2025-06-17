import keycloak from '../services/keycloak.auth.js';
import jwt from 'jsonwebtoken';

export const validateToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  
  if (!authHeader) {
    return res.status(401).json({ message: 'No token provided' });
  }

  keycloak.protect()(req, res, next);
};

export const injectKeycloakUser = (req, res, next) => {
  // Si l'utilisateur est déjà authentifié (Google ou session), on continue
  if (req.user) {
    return next();
  }

  const authHeader = req.headers['authorization'];
  if (!authHeader) {
    return res.status(401).json({ message: 'No token provided' });
  }

  const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : authHeader;
  try {
    const decoded = jwt.decode(token);
    if (!decoded) {
      return res.status(401).json({ message: 'Invalid token' });
    }

    req.user = {
      id: decoded.sub,
      name: decoded.name,
      email: decoded.email
    };
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Token decode error' });
  }
};