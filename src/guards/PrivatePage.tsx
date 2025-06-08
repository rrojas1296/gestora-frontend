import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

const PrivatePage = async ({ children }: Props) => {
  const client = await createClient();

  const { data, error } = await client.auth.getUser();
  if (error || !data?.user) {
    redirect("/login");
  }
  return children;
};

export default PrivatePage;
