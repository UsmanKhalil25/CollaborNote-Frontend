import axios from "axios";
import { API_BASE_URL } from "@/config/api-config.ts";
import { camelCaseKeys, snakeCaseKeys } from "@/utils";

export const api = axios.create({
  baseURL: API_BASE_URL,
});

api.interceptors.request.use((config) => {
  if (config.data) {
    config.data = snakeCaseKeys(config.data);
  }
  return config;
});

api.interceptors.response.use((response) => {
  if (response.data.data) {
    response.data.data = camelCaseKeys(response.data.data);
  }
  return response;
});
