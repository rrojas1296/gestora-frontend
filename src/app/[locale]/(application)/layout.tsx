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
        <Sidebar />
        <div className="p-6 flex flex-col gap-4 xl:gap-11 xl:pt-8 lg:pl-[92px] w-full h-screen max-w-[1512px] justify-self-center">
          <Header />
          <div className="text-text-1">{children}</div>
        </div>
      </div>
    </PrivatePage>
  );
};

export default AppLayout;
