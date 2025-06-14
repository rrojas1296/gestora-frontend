import { cn } from "@/utils/cn";
import React, { ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
};

const CardApp = ({ children, className }: Props) => {
  return (
    <div
      className={cn(
        "p-[18px] rounded-xl bg-bg-1 shadow-lg shadow-shadow-1 overflow-x-auto",
        className,
      )}
    >
      {children}
    </div>
  );
};

export default CardApp;
