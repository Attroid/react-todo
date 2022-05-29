import { Button } from 'react-bootstrap';
import { makeAutoObservable, flow, when } from 'mobx';
import { setCsrfTokenHeader } from './api/api';
import toast from 'react-hot-toast';
import js from 'shared/utils/javascript';

const supportedThemes = [
  'cerulean',
  'cosmo',
  'sandstone',
  'simplex',
  'spacelab',
  'united',
  'yeti',
  'zephyr',
];
const defaultTheme = 'cerulean';

class UserStore {
  stores = null;
  displayName = null;
  email = null;
  csrfInHeader = false;
  theme = null;
  supportedThemes = supportedThemes;
  defaultTheme = defaultTheme;
  refreshing = false;
  loadedTheme = null;
  isAuthPending = false;

  constructor({ stores }) {
    this.stores = stores;
    makeAutoObservable(this);
    this.loadCsrfToken();
    this.refresh();
  }

  get loginStatus() {
    if (this.isAuthPending === true) {
      return 'pending';
    } else if (this.email === null) {
      return 'anonymous';
    } else {
      return 'authenticated';
    }
  }

  get currentTheme() {
    return this.theme || this.defaultTheme;
  }

  loadTheme() {
    if (this.loadedTheme) return;

    const themeToLoad = this.supportedThemes.includes(this.currentTheme)
      ? this.currentTheme
      : this.defaultTheme;

    import(`bootswatch/dist/${themeToLoad}/bootstrap.min.css`);
    this.loadedTheme = themeToLoad;
  }

  showLoadYourCustomThemeToast() {
    if (this.loadedTheme === this.currentTheme) return;

    toast(
      () => (
        <Button onClick={js.refreshPage}>
          Click to load your custom theme
        </Button>
      ),
      { duration: 10000 }
    );
  }

  setLoggedUser(user) {
    this.displayName = user.username;
    this.email = user.email;
    this.theme = user.customization.theme;
  }

  clearLoggedUser() {
    this.displayName = null;
    this.email = null;
    this.theme = null;
  }

  loadCsrfToken = flow(function* loadCsrfToken() {
    try {
      const response = yield this.stores.apis.auth.loadCsrfToken();

      setCsrfTokenHeader(response.data.csrfToken);
      this.csrfInHeader = true;
    } catch (error) {
      toast.error('Network error');
      console.log(error);
    }
  });

  login = flow(function* login({ email, password }) {
    yield when(() => this.loginStatus !== 'pending');

    if (this.loginStatus === 'authenticated') {
      this.stores.view.navigate('/');
      return;
    }

    try {
      this.isAuthPending = true;
      const loginPromise = this.stores.apis.auth.login({ email, password });

      toast.promise(loginPromise, {
        loading: 'Logging in...',
        success: <b>Logged in succesfully</b>,
        error: (error) => {
          if (error?.response?.status === 401) {
            return <b>Wrong credentials</b>;
          } else {
            return <b>Error occured, try again later</b>;
          }
        },
      });

      const response = yield loginPromise;
      this.setLoggedUser(response.data);
      this.showLoadYourCustomThemeToast();
      this.stores.projects.syncWithServer();
      this.stores.view.navigate('/');
    } catch (error) {
      console.error(error);
    }

    this.isAuthPending = false;
  });

  register = flow(function* register({ username, email, password }) {
    yield when(() => this.loginStatus !== 'pending');

    if (this.loginStatus === 'authenticated') {
      this.stores.view.navigate('/');
      return;
    }

    try {
      this.isAuthPending = true;
      const registerPromise = this.stores.apis.auth.register({
        username,
        email,
        password,
      });

      toast.promise(registerPromise, {
        loading: 'Registering...',
        success: <b>Registered user succesfully</b>,
        error: (error) => {
          if (error?.response?.status === 400) {
            return <b>Bad request</b>;
          } else {
            return <b>Error occured, try again later</b>;
          }
        },
      });

      const response = yield registerPromise;

      this.setLoggedUser(response.data);
      this.stores.projects.syncWithServer();
      this.stores.view.navigate('/');
    } catch (error) {
      console.error(error);
    }

    this.isAuthPending = false;
  });

  refresh = flow(function* refresh() {
    this.refreshing = true;
    yield when(() => this.csrfInHeader);

    try {
      this.isAuthPending = true;
      const refreshPromise = this.stores.apis.auth.refresh();

      const response = yield refreshPromise;

      toast.success(`Logged in as ${response.data.displayName}`);
      this.setLoggedUser(response.data);
      this.stores.projects.syncWithServer();
    } catch (error) {
      if (error?.response?.status !== 401) {
        console.error(error);
      }
    }

    this.isAuthPending = false;
    this.refreshing = false;
    this.loadTheme();
  });

  logout = flow(function* logout() {
    yield when(() => this.loginStatus !== 'pending');

    try {
      this.isAuthPending = true;
      const logoutPromise = this.stores.apis.auth.logout();

      toast.promise(logoutPromise, {
        loading: 'Logging out...',
        success: <b>Logged out succesfully</b>,
        error: <b>Failed to logout</b>,
      });

      yield logoutPromise;

      this.clearLoggedUser();
      this.showLoadYourCustomThemeToast();
    } catch (error) {
      console.error(error);
    }

    this.isAuthPending = false;
  });

  requestPasswordReset = flow(function* requestPasswordReset() {
    try {
      const requestPasswordResetPromise =
        this.stores.apis.auth.requestPasswordReset(this.email);

      toast.promise(requestPasswordResetPromise, {
        loading: 'Requesting password reset...',
        success: <b>Sent reset email succesfully</b>,
        error: <b>Failed to send email</b>,
      });
    } catch (error) {
      console.error(error);
    }
  });

  updatePassword = flow(function* updatePassword({
    passwordResetToken,
    password,
  }) {
    try {
      const passwordUpdatePromise = this.stores.apis.auth.updatePassword(
        passwordResetToken,
        password
      );

      toast.promise(passwordUpdatePromise, {
        loading: 'Updating password...',
        success: <b>Updated password succesfully</b>,
        error: <b>Could not update password</b>,
      });
    } catch (error) {
      console.error(error);
    }
  });

  requestDeleteAccount = flow(function* requestDeleteAccount() {
    try {
      const requestDeleteAccount = this.stores.apis.auth.requestDeleteAccount(
        this.email
      );

      toast.promise(requestDeleteAccount, {
        loading: 'Requesting account delete...',
        success: <b>Sent delete account email succesfully</b>,
        error: <b>Failed to send email</b>,
      });
    } catch (error) {
      console.error(error);
    }
  });

  deleteAccount = flow(function* deleteAccount({ userDeleteToken, password }) {
    try {
      const deleteAccountPromise = this.stores.apis.auth.deleteAccount(
        userDeleteToken,
        password
      );

      toast.promise(deleteAccountPromise, {
        loading: 'Deleting account...',
        success: <b>Deleted account succesfully</b>,
        error: <b>Could not delete account</b>,
      });
    } catch (error) {
      console.error(error);
    }
  });

  updateDisplayName = flow(function* updateDisplayName({ displayName }) {
    try {
      const updateDisplayNamePromise =
        this.stores.apis.auth.updateDisplayName(displayName);

      toast.promise(updateDisplayNamePromise, {
        loading: 'Updating display name...',
        success: <b>Updated display name succesfully</b>,
        error: <b>Failed to update display name</b>,
      });

      yield updateDisplayNamePromise;

      this.displayName = displayName;
      return { status: 'success', data: {} };
    } catch (error) {
      console.error(error);
      return { status: 'error', error };
    }
  });

  updateTheme = flow(function* updateTheme({ theme }) {
    try {
      yield this.stores.apis.auth.updateTheme(theme);
      js.refreshPage();
    } catch (error) {
      console.log(error);
      toast.error('Internal server error');
    }
  });
}

export default UserStore;
