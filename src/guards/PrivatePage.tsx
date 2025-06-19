import { createSupabaseServer } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

const PrivatePage = async ({ children }: Props) => {
  const client = await createSupabaseServer();
  const { data, error } = await client.auth.getUser();
  if (error || !data || !data.user) {
    return redirect("/login");
  }
  return children;
};

export default PrivatePage;
