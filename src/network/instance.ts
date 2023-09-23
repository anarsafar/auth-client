import axios from 'axios';
import axiosRetry from 'axios-retry';

axiosRetry(axios, { retries: 3 });

export const BASE_URL = 'https://auth-server-iv8b.onrender.com';
export const instance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});
