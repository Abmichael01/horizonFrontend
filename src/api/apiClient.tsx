import axios, { AxiosRequestConfig, AxiosError, AxiosResponse } from "axios";

const API_BASE_URL = "http://localhost:8000/api";

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

 let isRefreshing = false;
let refreshPromise: Promise<unknown> | null = null;

apiClient.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as AxiosRequestConfig & { _retry?: boolean };

    // Only handle 401 errors and make sure we haven't already retried this request
    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      if (!isRefreshing) {
        isRefreshing = true;
        refreshPromise = apiClient
          .post("/token/refresh/")
          .finally(() => {
            isRefreshing = false;
            refreshPromise = null;
          });
      }

      try {
        // Wait for the refresh to finish (success or failure)
        if (refreshPromise) {
          await refreshPromise;
        }
      } catch {
        // ignore refresh failure here; caller will handle via error state
      }
      // Always reject the original request so callers (React Query) see an error
      return Promise.reject(error);
    }

    // If it's another error (like network failure, etc.), just reject it
    return Promise.reject(error);
  }
);

export default apiClient;
