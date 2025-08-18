import axios, { AxiosRequestConfig, AxiosError, AxiosResponse } from "axios";

const API_BASE_URL = "http://localhost:8000/api";

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

apiClient.interceptors.response.use(
  (response: AxiosResponse) => response, // Pass successful responses directly
  async (error: AxiosError) => {
    const originalRequest = error.config as AxiosRequestConfig & { _retry?: boolean };

    // Only handle 401 errors and make sure we haven't already retried this request
    if (error.response && error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // Attempt to refresh the token
        await apiClient.post("/token/refresh/");

        // Once refreshed, make the original request again
        return apiClient(originalRequest);
      } catch (refreshError) {
        // Redirect to login if refresh fails
        window.location.href = "/portal/login";

        // Reject the original request to stop further processing
        return Promise.reject(refreshError);
      }
    }

    // If it's another error (like network failure, etc.), just reject it
    return Promise.reject(error);
  }
);

export default apiClient;
