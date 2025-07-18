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
    active: "bg-success",
    out_of_stock: "bg-danger",
    discontinued: "bg-yellow-700",
    inactive: "bg-gray-700",
    draft: "bg-gray-700",
    archived: "bg-gray-600",
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
