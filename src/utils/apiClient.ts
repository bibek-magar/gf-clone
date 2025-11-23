import axios, { type AxiosInstance } from "axios";

// Create axios instance
const apiClient: AxiosInstance = axios.create({
  baseURL: `https://${import.meta.env.VITE_RAPIDAPI_HOST}/api/v1`,
  headers: {
    "x-rapidapi-key": import.meta.env.VITE_RAPIDAPI_KEY,
    "x-rapidapi-host": import.meta.env.VITE_RAPIDAPI_HOST,
  },
});

export { apiClient };
