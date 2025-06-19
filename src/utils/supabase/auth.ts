import { Provider } from "@supabase/supabase-js";
import { supabaseClient } from "./client";

const loginWithProvider = async (provider: Provider, path?: string) => {
  const redirectURL = new URL(`${window.location.origin}/auth/callback`);
  if (path) {
    redirectURL.searchParams.set("path", path);
  }
  return supabaseClient.auth.signInWithOAuth({
    provider,
    options: {
      redirectTo: redirectURL.toString(),
    },
  });
};

export const logginGoogle = (path?: string) =>
  loginWithProvider("google", path);
