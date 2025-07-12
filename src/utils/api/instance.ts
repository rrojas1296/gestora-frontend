import { environments } from "@/config/environments";
import axios from "axios";
import { clientSupabase } from "../supabase";
const apiInstance = axios.create({
  baseURL: environments.API_URL,
});

apiInstance.interceptors.request.use(async (config) => {
  const {
    data: { session },
  } = await clientSupabase.auth.getSession();
  if (session?.access_token) {
    config.headers.authorization = `Bearer ${session.access_token}`;
  }
  return config;
});

export default apiInstance;
