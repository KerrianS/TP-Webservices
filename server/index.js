import express from 'express';
import cors from 'cors';
import session from 'express-session';
import initGoogleAuth from './services/google.auth.js';
import keycloakAuth from './services/keycloak.auth.js';
import dotenv from 'dotenv';

import googleRoutes from './routes/google.routes.js';
import keycloakRoutes from './routes/keycloak.routes.js';

dotenv.config();
const app = express();

app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));

app.use(express.json());
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: process.env.NODE_ENV === 'production',
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000
    }
}));

const keycloak = keycloakAuth.getKeycloakInstance();
initGoogleAuth(app);

app.use('/api/google', googleRoutes);
app.use('/api/keycloak', keycloak.middleware(), keycloakRoutes);

const port = process.env.PORT || 3001;
app.listen(port, () => {
    console.log(`API REST running on http://localhost:${port}`);
});
