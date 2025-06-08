import { Provider } from "@supabase/supabase-js";
import { createClient } from "./client";

const loginWithProvider = async (provider: Provider, path?: string) => {
  const redirectURL = new URL(`${window.location.origin}/auth/callback`);
  if (path) {
    redirectURL.searchParams.set("path", path);
  }
  const client = createClient();
  return client.auth.signInWithOAuth({
    provider,
    options: {
      redirectTo: redirectURL.toString(),
    },
  });
};

export const logginGoogle = (path?: string) =>
  loginWithProvider("google", path);
