import { Status } from "@/types/api/inventory";
import { cn } from "@/utils/cn";
import React, { ReactNode } from "react";

type BadgeType = Status;

interface Props {
  children: ReactNode;
  type: BadgeType;
}

const Badge = ({ type, children }: Props) => {
  const classes: Record<BadgeType, string> = {
    active: "bg-green-700",
    out_of_stock: "bg-red-700",
    discontinued: "bg-yellow-700",
    inactive: "bg-gray-700",
  };
  return (
    <div
      className={cn(
        "text-xs text-text-3 py-1 px-3 rounded-full w-fit",
        classes[type],
      )}
    >
      {children}
    </div>
  );
};

export default Badge;
