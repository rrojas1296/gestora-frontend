import Header from "@/components/shared/Header";
import MainSidebar from "@/components/shared/Sidebar";
import PrivatePage from "@/guards/PrivatePage";
import UserProvider from "@/providers/UserProvider";
import React, { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

const AppLayout = ({ children }: Props) => {
  return (
    <UserProvider>
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
    </UserProvider>
  );
};

export default AppLayout;
