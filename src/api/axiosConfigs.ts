import axios, { AxiosError } from "axios";
import { refreshUser } from "./AuthApi";

export interface BaseRes<T = any> {
  status: number;
  data?: T;
}

export async function baseApiCall<T = any>(
  func: () => Promise<any>
): Promise<BaseRes<T>> {
  try {
    const res = await func();
    return { status: res.status, data: res.data };
  } catch (error) {
    if (error instanceof AxiosError) {
      return { status: error.status ?? 500 };
    }
    return { status: 500 };
  }
}

export const api = axios.create({
  baseURL: "http://3.88.183.50:8080/api",
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
