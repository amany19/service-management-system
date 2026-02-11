import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api", // your backend
  headers: {
    "Content-Type": "application/json",
  },
});

// ✅ Request interceptor to add JWT token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token"); // assuming you store JWT here
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ✅ Optional: Response interceptor for global error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // For example: redirect to login on 401
    if (error.response?.status === 401) {
      console.warn("Unauthorized! Redirecting to login...");
      // window.location.href = "/login"; // if you want
    }
    return Promise.reject(error);
  }
);

export default api;
