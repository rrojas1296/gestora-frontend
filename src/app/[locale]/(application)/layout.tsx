import Sidebar from "@/components/application/Sidebar";
import Header from "@/components/shared/Header";
import PrivatePage from "@/guards/PrivatePage";
import React, { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

const AppLayout = ({ children }: Props) => {
  return (
    <PrivatePage>
      <div className="h-screen bg-bg-2">
        <div className="px-6 flex flex-col lg:pl-[92px] w-full h-screen overflow-y-auto max-w-[1512px] justify-self-center">
          <Header />
          <div className="text-text-1">{children}</div>
        </div>
      </div>
      <Sidebar />
    </PrivatePage>
  );
};

export default AppLayout;
