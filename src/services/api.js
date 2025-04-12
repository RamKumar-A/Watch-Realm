import axios from 'axios';

const api = axios.create({
  baseURL: 'https://watch-realm-api.onrender.com/api/v1',
  // baseURL: 'http://localhost:8000/api/v1',
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response.status === 401) {
      // maybe redirect to login
      // console.error('Unauthorized! Redirecting...');
    }
    return Promise.reject(error);
  }
);

export { api };
