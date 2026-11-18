import axios from "axios";

const clientAxios = axios.create({
  baseURL: `${import.meta.env.VITE_BACKEND_URL}/api`,
});

clientAxios.interceptors.request.use(config => {
  const token = localStorage.getItem("session");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

clientAxios.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 401) {
      window.dispatchEvent(new Event("auth:session-expired"));
    }

    return Promise.reject(error);
  },
);

export default clientAxios;
