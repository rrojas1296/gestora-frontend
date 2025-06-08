import Sidebar from "@/components/application/Sidebar";
import PrivatePage from "@/guards/PrivatePage";
import React, { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

const AppLayout = ({ children }: Props) => {
  return (
    <PrivatePage>
      <div className="flex bg-bg-2 h-screen">
        <Sidebar />
        {children}
      </div>
    </PrivatePage>
  );
};

export default AppLayout;
