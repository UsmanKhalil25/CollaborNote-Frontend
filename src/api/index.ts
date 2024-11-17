import axios from "axios";
import { API_BASE_URL } from "@/config/api-config.ts";

export const api = axios.create({
  baseURL: API_BASE_URL,
});
