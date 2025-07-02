import { environments } from "@/config/environments";
import axios from "axios";
import { createClient } from "../supabase/client";
const apiInstance = axios.create({
  baseURL: environments.API_URL,
});

apiInstance.interceptors.request.use(async (config) => {
  const {
    data: { session },
  } = await createClient().auth.getSession();
  if (session?.access_token) {
    config.headers.authorization = `Bearer ${session.access_token}`;
  }
  return config;
});

export default apiInstance;
