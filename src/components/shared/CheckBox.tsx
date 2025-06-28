import React from "react";
import CheckIcon from "../Icons/CheckIcon";
import { cn } from "@/utils/cn";

interface Props {
  checked: boolean;
  onChange: (e: any) => void;
}

const CheckBox = ({ onChange, checked }: Props) => {
  return (
    <div
      className={cn(
        "w-5 h-5 rounded-md border-border-1 border grid place-items-center cursor-pointer",
        checked && "bg-primary border-primary",
      )}
      onClick={onChange}
    >
      {checked && <CheckIcon className="w-4 h-4 stroke-current text-text-3" />}
    </div>
  );
};

export default CheckBox;
