import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3001',
  withCredentials: true,
});

export const setCsrfTokenHeader = (token) => {
  api.defaults.headers.post['X-CSRF-TOKEN'] = token;
  api.defaults.headers.put['X-CSRF-TOKEN'] = token;
  api.defaults.headers.patch['X-CSRF-TOKEN'] = token;
  api.defaults.headers.delete['X-CSRF-TOKEN'] = token;
};

export default api;
