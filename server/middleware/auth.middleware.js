import keycloakAuth from '../services/keycloak.auth.js';
// import jwt from 'jsonwebtoken'; // Plus nécessaire, Keycloak-connect gère le décodage

export const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  
  if (!authHeader) {
    return res.status(401).json({ message: 'No token provided' });
  }

  if (!keycloakAuth.verifyToken(authHeader)) {
    return res.status(401).json({ message: 'Invalid or expired token' });
  }

  next();
};

export const injectUserInfo = (req, res, next) => {
  console.log('InjectUserInfo: Début');
  console.log('InjectUserInfo: req.session:', req.session);
  console.log('InjectUserInfo: req.user (avant):', req.user);

  // Priorité 1: Utilisateur déjà défini (Google auth via Passport)
  if (req.user) {
    console.log('InjectUserInfo: Utilisateur déjà défini (Google):', req.user);
    return next();
  }

  // Priorité 2: Session utilisateur stockée (Keycloak ou Google)
  if (req.session && req.session.user) {
    req.user = req.session.user;
    console.log('InjectUserInfo: Utilisateur depuis session:', req.user);
    return next();
  }

  // Priorité 3: Token Keycloak dans les headers (pour les appels API)
  const authHeader = req.headers['authorization'];
  if (authHeader && authHeader.startsWith('Bearer ')) {
    const token = authHeader.substring(7);
    if (keycloakAuth.verifyToken(token)) {
      try {
        // Décoder le token JWT pour obtenir les informations utilisateur
        const [header, payload, signature] = token.split('.');
        const decodedPayload = JSON.parse(Buffer.from(payload, 'base64').toString());
        
        req.user = {
          id: decodedPayload.sub,
          name: decodedPayload.name || decodedPayload.preferred_username,
          email: decodedPayload.email
        };
        console.log('InjectUserInfo: Utilisateur Keycloak depuis token:', req.user);
        return next();
      } catch (error) {
        console.error('Error decoding Keycloak token:', error);
      }
    }
  }

  console.log('InjectUserInfo: Aucun utilisateur authentifié trouvé');
  next();
};