import apiInstance from "@/utils/api/instance";
import { createSupabaseServer } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

const PrivatePage = async ({ children }: Props) => {
  const client = await createSupabaseServer();
  const {
    data: { session },
  } = await client.auth.getSession();
  if (!session) return redirect("/login");

  const token = session.access_token;
  apiInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  const r = await apiInstance.get("/users/getAuthUser");
  const userDB = r.data.data;
  if (!userDB) return redirect("/register/fullName");
  return children;
};

export default PrivatePage;
