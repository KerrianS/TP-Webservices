import { UserManager } from 'oidc-client';

const settings = {
  authority: 'http://localhost:8080/realms/opomlytravel',
  client_id: 'react-client',
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

export default new KeycloakAuth();