import axios from "axios";

export const apiBaseUrl = import.meta.env.VITE_CDN_BASE_URL;

// this instead of `new Axios` to have axios defaults like transformResponse
export const apiClient = axios.create({
  baseURL: apiBaseUrl,
});
