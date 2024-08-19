import axios from 'axios';

export const instance = axios.create({
  baseURL: 'https://currency-rates-server.onrender.com',
});
