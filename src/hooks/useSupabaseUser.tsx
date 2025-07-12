import { createClient } from "@/utils/supabase/client";
import { Session } from "@supabase/supabase-js";
import { useEffect, useState } from "react";

const useSupabaseSession = () => {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  const getSesssion = async () => {
    try {
      const c = createClient();
      const s = await c.auth.getSession();
      if (s.data.session) setSession(s.data.session);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getSesssion();
  }, []);
  return {
    session,
    loading,
  };
};

export default useSupabaseSession;
