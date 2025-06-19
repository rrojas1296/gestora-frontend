import { clientSupabase } from "@/utils/supabase";
import { User } from "@supabase/supabase-js";
import { useEffect, useState } from "react";

const useSupabaseUser = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    (async () => {
      try {
        const { data } = await clientSupabase.auth.getUser();
        if (data.user) {
          setUser(data.user);
        } else {
          setUser(null);
        }
      } finally {
        setLoading(false);
      }
    })();
  }, []);
  return { user, loading };
};

export default useSupabaseUser;
