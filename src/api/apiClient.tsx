// src/apiClient.js

import axios from "axios";

// Base URL of your Django API (update this with your Django API base URL)
const API_BASE_URL = "http://localhost:8000/api";  // Replace with your Django API URL

// Create an Axios instance with default configuration
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add a request interceptor to include the authorization token (if available) in the headers
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("key");  // Get token from localStorage (or cookies)
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Add a response interceptor to handle error responses globally
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // You can handle errors globally here, like logging out the user on 401 or 403
    if (error.response && (error.response.status === 401 || error.response.status === 403)) {
      // Clear the token if it's invalid
      localStorage.removeItem("access_token");
      window.location.href = "/login";  // Redirect to login page
    }
    return Promise.reject(error);
  }
);

export default apiClient;
