import axios from "axios";
import { refreshUser } from "./UserApi";

export const api = axios.create({
  baseURL: "http://localhost:8000/api",
  withCredentials: true,
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Refresh request fails
    if (error.config.url.includes("/auth/refresh")) {
      return Promise.reject(error);
    }

    // Authentication error
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // Refresh token and retry
        await refreshUser();
        return api(originalRequest);
      } catch (refreshError) {
        // Redirect to login on error
        window.location.href = "/login";
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);
