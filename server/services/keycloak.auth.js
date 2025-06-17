import express from 'express';
import Keycloak from 'keycloak-connect';
import session from 'express-session';
import dotenv from 'dotenv';
import axios from 'axios';
import qs from 'qs';

dotenv.config();

class KeycloakAuth {
  constructor() {
    const memoryStore = new session.MemoryStore();
    
    const keycloakConfig = {
      realm: process.env.KEYCLOAK_REALM,
      bearerOnly: false,
      serverUrl: process.env.KEYCLOAK_AUTH_SERVER_URL,
      sslRequired: 'external',
      resource: process.env.KEYCLOAK_CLIENT_ID,
      credentials: {
        secret: process.env.KEYCLOAK_CLIENT_SECRET
      }
    };

    this.config = keycloakConfig;
    this.keycloak = new Keycloak({ store: memoryStore }, keycloakConfig);
  }

  async login(username, password) {
    try {
      const tokenEndpoint = `${this.config.serverUrl}/realms/${this.config.realm}/protocol/openid-connect/token`;
      
      const data = qs.stringify({
        grant_type: 'password',
        client_id: this.config.resource,
        username: username,
        password: password,
        scope: 'openid profile email'
      });

      const response = await axios.post(tokenEndpoint, data, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      });

      return response.data;
    } catch (error) {
      throw new Error(`Authentication failed: ${error.message}`);
    }
  }

  verifyToken(token) {
    try {
      if (!token) return false;
      
      const bearerToken = token.startsWith('Bearer ') ? token.slice(7) : token;
      const [header, payload, signature] = bearerToken.split('.');
      const decodedPayload = JSON.parse(Buffer.from(payload, 'base64').toString());
      
      const now = Date.now() / 1000;
      return decodedPayload.exp > now;
    } catch (error) {
      return false;
    }
  }

  protect() {
    return this.keycloak.protect();
  }

  getKeycloakInstance() {
    return this.keycloak;
  }
}

const keycloakAuth = new KeycloakAuth();
export default keycloakAuth;