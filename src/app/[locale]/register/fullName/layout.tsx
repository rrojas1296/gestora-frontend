import PrivatePage from "@/guards/PrivatePage";
import { getUserById } from "@/utils/api/users/getUserById";
import { createSupabaseServer } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import React, { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

const layout = async ({ children }: Props) => {
  const client = await createSupabaseServer();
  const user = await client.auth.getUser();
  if (!user.data.user) {
    return redirect("/login");
  }
  const userDB = await getUserById(user.data.user.id);
  if (userDB) {
    return redirect("/dashboard");
  }
  return <PrivatePage>{children}</PrivatePage>;
};

export default layout;
