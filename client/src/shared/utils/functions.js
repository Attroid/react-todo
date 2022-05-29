import { stores } from 'shared/store';

const functions = {
  login: (credentials) => stores.user.login(credentials),
  register: (registrationData) => stores.user.register(registrationData),
  logout: () => stores.user.logout(),
  requestPasswordReset: () => stores.user.requestPasswordReset(),
  updatePassword: ({ passwordResetToken, password }) =>
    stores.user.updatePassword({ passwordResetToken, password }),
  requestDeleteAccount: () => stores.user.requestDeleteAccount(),
  deleteAccount: ({ userDeleteToken, password }) =>
    stores.user.deleteAccount({ userDeleteToken, password }),
  updateDisplayName: ({ displayName }) =>
    stores.user.updateDisplayName({ displayName }),
  updateTheme: ({ theme }) => stores.user.updateTheme({ theme }),
};

export default functions;
