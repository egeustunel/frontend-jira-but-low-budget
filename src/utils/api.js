import axios from 'axios';

const instance = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_URL,
});

instance.interceptors.request.use(
  config => {
    let accessToken = JSON.parse(localStorage.getItem('user'))?.accessToken;
    config.headers['Authorization'] = `Bearer ${accessToken}`;
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

export default instance;
