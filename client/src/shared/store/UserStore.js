import { makeAutoObservable, flow } from 'mobx';
import { LoginStatus } from 'shared/constants/auth';
import api from './api';

const isString = (variable) => {
  return typeof variable === 'string' || variable instanceof String;
};

const getInitialUserData = () => ({
  customization: {
    theme: null,
  },
  username: null,
  email: null,
});

class UserStore {
  stores = null;
  csrfToken = null;
  userLoading = false;
  user = getInitialUserData();

  constructor({ stores }) {
    makeAutoObservable(this);

    this.stores = stores;

    (async () => {
      await this.fetchCsrfToken();
      this.refresh({
        redirectUrl: window.location.pathname.startsWith('/auth')
          ? '/project'
          : undefined,
        failureRedirectUrl: window.location.pathname.startsWith('/auth')
          ? undefined
          : '/auth/login',
      });
    })();
  }

  fetchCsrfToken = flow(function* () {
    try {
      const { data } = yield api.get('/auth/csrf-token');
      this.csrfToken = data.csrfToken;
    } catch (err) {
      this.stores.toaster.error(err);
    }
  });

  login = flow(function* ({ email, password }, { redirectUrl }) {
    this.userLoading = true;

    try {
      const { data } = yield api.post('/auth/login', {
        email,
        password,
      });

      this.user = data;
      yield this.stores.projects.fetchProjects();

      if (isString(redirectUrl)) {
        this.stores.view.navigate(redirectUrl);
      }
    } catch (err) {
      this.stores.toaster.error(err);
    }

    this.userLoading = false;
  });

  signup = flow(function* ({ email, username, password }, { redirectUrl }) {
    this.userLoading = true;

    try {
      const { data } = yield api.post('/auth/signup', {
        email,
        username,
        password,
      });

      this.user = data;
      yield this.stores.projects.fetchProjects();

      if (isString(redirectUrl)) {
        this.stores.view.navigate(redirectUrl);
      }
    } catch (err) {
      this.stores.toaster.error(err);
    }

    this.userLoading = false;
  });

  refresh = flow(function* ({
    toastsEnabled = false,
    failureRedirectUrl,
    redirectUrl,
  }) {
    this.userLoading = true;

    try {
      const { data } = yield api.get('/auth/refresh');

      this.user = data;
      yield this.stores.projects.fetchProjects();

      if (isString(redirectUrl)) {
        this.stores.view.navigate(redirectUrl);
      }
    } catch (err) {
      if (toastsEnabled) {
        this.stores.toaster.error(err);
      }

      if (isString(failureRedirectUrl)) {
        this.stores.view.navigate(failureRedirectUrl);
      }
    }

    this.userLoading = false;
  });

  logout = flow(function* ({ redirectUrl }) {
    try {
      yield api.post('/auth/logout');
    } catch (err) {
      this.stores.toaster.error(err);
    }

    this.user = getInitialUserData();

    if (isString(redirectUrl)) {
      this.stores.view.navigate(redirectUrl);
    }
  });

  get loginStatus() {
    if (this.userLoading) {
      return LoginStatus.PENDING;
    }

    if (this.user.email === null) {
      return LoginStatus.ANONYMOUS;
    }

    return LoginStatus.AUTHENTICATED;
  }
}

export default UserStore;
