import express from 'express';
import cors from 'cors';
import session from 'express-session';
import initGoogleAuth from './services/google.auth.js';
import keycloakAuth from './services/keycloak.auth.js';
import dotenv from 'dotenv';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

import googleRoutes from './routes/google.routes.js';
import keycloakRoutes from './routes/keycloak.routes.js';
import tripsRoutes from './routes/trips.routes.js';

dotenv.config();
const app = express();

// Configuration CORS pour accepter les requêtes depuis le client Docker et localhost
app.use(cors({
  origin: ['http://localhost:3000'],
  credentials: true
}));

app.use(express.json());
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false,
        httpOnly: true,
        sameSite: 'lax',
        maxAge: 24 * 60 * 60 * 1000
    }
}));

const keycloak = keycloakAuth.getKeycloakInstance();
initGoogleAuth(app);

app.use('/api/google', googleRoutes);
app.use('/api/keycloak', keycloak.middleware(), keycloakRoutes);
app.use('/api/trips', tripsRoutes);

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'OpomlyTravel API',
      version: '1.0.0',
      description: 'API de gestion des voyages (exemple avec Express)'
    },
    servers: [
      { url: 'http://localhost:3001' }
    ]
  },
  apis: ['./routes/*.js'],
};
const swaggerSpec = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

const port = process.env.PORT || 3001;
app.listen(port, () => {
    console.log(`API REST running on http://localhost:${port}`);
});
