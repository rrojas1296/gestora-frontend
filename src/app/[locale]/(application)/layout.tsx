import Sidebar from "@/components/application/Sidebar";
import Header from "@/components/globals/Header";
import PrivatePage from "@/guards/PrivatePage";
import React, { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

const AppLayout = ({ children }: Props) => {
  return (
    <PrivatePage>
      <div className="h-screen bg-bg-2">
        <Sidebar />
        <div className="p-6 flex flex-col gap-4 lg:pl-[92px] h-screen">
          <Header />
          <div className="text-text-1">{children}</div>
        </div>
      </div>
    </PrivatePage>
  );
};

export default AppLayout;
