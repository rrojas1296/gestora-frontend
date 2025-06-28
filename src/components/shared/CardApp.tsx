import { cn } from "@/utils/cn";
import React, { ReactNode } from "react";

type Props = {
  children?: ReactNode;
  className?: string;
};

const CardApp = ({ children, className }: Props) => {
  return (
    <div
      className={cn(
        "p-[18px] rounded-xl bg-bg-1 overflow-x-auto border border-border-2",
        className,
      )}
    >
      {children}
    </div>
  );
};

export default CardApp;
