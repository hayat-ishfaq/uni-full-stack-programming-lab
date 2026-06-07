import axios from "axios";
import { clearAuthStorage } from "@/lib/authStorage";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

// Add Authorization header automatically if token exists
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      clearAuthStorage();
      window.location.href = "/auth";
    }
    return Promise.reject(error);
  }
);

export default api;
