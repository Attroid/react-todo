import api from './api';

class Auth {
  baseUrl = '/auth';

  loadCsrfToken() {
    return api.get(`${this.baseUrl}/csrf-token`);
  }

  login(credentials) {
    return api.post(`${this.baseUrl}/login`, credentials);
  }

  register(registrationData) {
    return api.post(`${this.baseUrl}/signup`, registrationData);
  }

  refresh() {
    return api.get(`${this.baseUrl}/refresh`);
  }

  logout() {
    return api.post(`${this.baseUrl}/logout`);
  }

  requestPasswordReset(email) {
    return api.post(`${this.baseUrl}/request-password-reset`, { email });
  }

  updatePassword(passwordResetToken, password) {
    return api.post(`${this.baseUrl}/password-reset`, {
      passwordResetToken,
      password,
    });
  }

  requestDeleteAccount(email) {
    return api.post(`${this.baseUrl}/request-user-delete`, { email });
  }

  deleteAccount(userDeleteToken, password) {
    return api.post(`${this.baseUrl}/user-delete`, {
      userDeleteToken,
      password,
    });
  }

  updateDisplayName(username) {
    return api.patch(`/me/data`, { username });
  }

  updateTheme(theme) {
    return api.patch(`/me/data`, { customization: { theme } });
  }
}

export default Auth;
