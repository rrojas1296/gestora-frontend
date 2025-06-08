import { environments } from "@/config/environments";
import axios from "axios";
export const apiInstance = axios.create({
  baseURL: environments.API_URL,
});
