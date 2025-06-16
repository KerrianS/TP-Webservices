import { UserManager } from 'oidc-client';
import express from 'express';
import Keycloak from 'keycloak-connect';
import session from 'express-session';
import dotenv from 'dotenv';

dotenv.config();

const settings = {
  authority: `${process.env.KEYCLOAK_AUTH_SERVER_URL}/realms/${process.env.KEYCLOAK_REALM}`,
  client_id: process.env.KEYCLOAK_CLIENT_ID,
  redirect_uri: 'http://localhost:3000/callback',
  response_type: 'code',
  scope: 'openid profile email',
  post_logout_redirect_uri: 'http://localhost:3000'
};

class KeycloakAuth {
  userManager;

  constructor() {
    this.userManager = new UserManager(settings);
  }

  async login() {
    return this.userManager.signinRedirect();
  }

  async logout() {
    return this.userManager.signoutRedirect();
  }

  async getUser() {
    return this.userManager.getUser();
  }

  async handleCallback() {
    const user = await this.userManager.signinRedirectCallback();
    return user;
  }
}

const initKeycloakConfig = (app) => {
  const memoryStore = new session.MemoryStore();
  app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    store: memoryStore
  }));

  const keycloakConfig = {
    realm: process.env.KEYCLOAK_REALM,
    'auth-server-url': process.env.KEYCLOAK_AUTH_SERVER_URL,
    'ssl-required': 'external',
    resource: process.env.KEYCLOAK_CLIENT_ID,
    'bearer-only': true,
    'confidential-port': 0,
    'verify-token-audience': true
  };

  const keycloak = new Keycloak({ store: memoryStore }, keycloakConfig);
  app.use(keycloak.middleware());

  const protect = (role) => {
    return keycloak.protect(role);
  };

  return {
    keycloak,
    protect
  };
};

export default {
  auth: new KeycloakAuth(),
  initKeycloakConfig
};