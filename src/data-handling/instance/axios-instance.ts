import axios from "axios";
import { getCookie } from "cookies-next";

export const PolyErpClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Attach token before every request
PolyErpClient.interceptors.request.use(
  (config) => {
    const token = getCookie("auth_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    } else {
      delete config.headers.Authorization; // avoid sending stale tokens
    }
    return config;
  },
  (error) => Promise.reject(error)
);
