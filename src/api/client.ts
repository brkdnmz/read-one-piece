import { Axios } from "axios";

export const apiBaseUrl = import.meta.env.VITE_CDN_BASE_URL;

export const apiClient = new Axios({
  baseURL: apiBaseUrl,
});
