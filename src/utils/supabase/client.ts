import { environments } from "@/config/environments";
import { createBrowserClient } from "@supabase/ssr";

export const createClient = () =>
  createBrowserClient(
    environments.SUPABASE_PROJECT_URL,
    environments.SUPABASE_ANON_KEY,
  );
