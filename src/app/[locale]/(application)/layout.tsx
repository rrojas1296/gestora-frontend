import Header from "@/components/shared/Header";
import MainSidebar from "@/components/shared/Sidebar";
import PrivatePage from "@/guards/PrivatePage";
import { getUserById } from "@/utils/api/users/getUserById";
import { createSupabaseServer } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import React, { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

const AppLayout = async ({ children }: Props) => {
  const client = await createSupabaseServer();
  const user = await client.auth.getUser();
  if (!user.data.user) {
    return redirect("/login");
  }
  const userDB = await getUserById(user.data.user.id);
  if (!userDB) {
    return redirect("/register/fullName");
  }
  return (
    <PrivatePage>
      <div className="h-screen bg-bg-2">
        <div className="px-6 lg:pl-[92px] w-full h-screen overflow-y-auto">
          <div className="max-w-[1512px] flex w-full flex-col justify-self-center">
            <Header />
            <div className="text-text-1 pb-6">{children}</div>
          </div>
        </div>
      </div>
      <MainSidebar />
    </PrivatePage>
  );
};

export default AppLayout;
