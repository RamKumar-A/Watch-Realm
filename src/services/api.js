import axios from 'axios';

export const url = axios.create({
  baseURL: 'https://watch-realm-api.onrender.com/api/v1',
  headers: {
    'Content-Type': 'application/json',
  },
});
