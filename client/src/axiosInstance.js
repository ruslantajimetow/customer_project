import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: `${import.meta.env.VITE_BASE_URL}/${import.meta.env.VITE_API}`, //! http://localhost:3100
});

let accessToken = '';

function setAccessToken(newToken) {
  accessToken = newToken;
}

axiosInstance.interceptors.request.use((config) => {
  config.withCredentials = true;
  if (!config.headers.Authorization) {
    config.headers.Authorization = `Wolves ${accessToken}`;
  }
  return config;
});

export { setAccessToken };

export default axiosInstance;
