import PrivatePage from "@/guards/PrivatePage";
import React, { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

const layout = ({ children }: Props) => {
  return <PrivatePage>{children}</PrivatePage>;
};

export default layout;
