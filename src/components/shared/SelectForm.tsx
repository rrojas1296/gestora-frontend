import { cn } from "@/utils/cn";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "gestora-lib";
import React from "react";

interface Props {
  name: string;
  placeholder: string;
  control: any;
  label: string;
  error?: string;
  value: string;
  onChange: (value: string) => void;
  options?: { value: string; label: string }[];
}

const SelectForm = ({
  name,
  placeholder,
  label,
  error,
  onChange,
  value,
  options,
}: Props) => {
  return (
    <div className="grid gap-2">
      <label
        htmlFor={name}
        className={cn(
          "text-text-1 text-sm font-medium",
          error && "text-danger",
        )}
      >
        {label}
      </label>
      <Select autoComplete="on" value={value} onValueChange={onChange}>
        <SelectTrigger
          className={cn(
            "w-full col-span-2 border-border-1 data-[size=default]:h-10 text-text-1",
            error && "border-danger",
          )}
        >
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {options?.map((option) => {
            const { label, value } = option;
            return (
              <SelectItem value={value} key={value}>
                {label}
              </SelectItem>
            );
          })}
        </SelectContent>
      </Select>
      {error && <p className="text-danger text-sm">{error}</p>}
    </div>
  );
};

export default SelectForm;
