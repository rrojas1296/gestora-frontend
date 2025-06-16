import Header from "@/components/shared/Header";
import Sidebar from "@/components/shared/Sidebar";
import PrivatePage from "@/guards/PrivatePage";
import React, { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

const AppLayout = ({ children }: Props) => {
  return (
    <PrivatePage>
      <div className="h-screen bg-bg-2">
        <div className="px-6 lg:pl-[92px] w-full h-screen overflow-y-auto">
          <div className="max-w-[1512px] flex w-full flex-col justify-self-center relative z-0">
            <Header />
            <div className="text-text-1 pb-6">{children}</div>
          </div>
        </div>
      </div>
      <Sidebar />
    </PrivatePage>
  );
};

export default AppLayout;
