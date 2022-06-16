import axios from 'axios';
import { stores } from '.';

const api = axios.create({
  baseURL: 'http://localhost:3001',
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  config.headers['X-CSRF-TOKEN'] = stores.user.csrfToken;
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      if (!error.response.data) {
        return Promise.reject('Server is probably down');
      }

      if (
        error.response.data.error.code === 'INVALID_TOKEN' &&
        error.response.config.url !== '/auth/refresh'
      ) {
        stores.user.logout();
      }

      return Promise.reject(error.response.data.error);
    } else {
      return Promise.reject(error);
    }
  }
);

export default api;
