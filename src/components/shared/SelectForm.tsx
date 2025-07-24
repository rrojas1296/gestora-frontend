import { cn } from "@/utils/cn";
import { NativeSelect as Select } from "gestora-lib";
import { SelectOption } from "gestora-lib/dist/components/Select/Select";
import React from "react";
import { Controller } from "react-hook-form";

interface Props {
  name: string;
  placeholder: string;
  control: any;
  label: string;
  error?: string;
  options: SelectOption[];
}

const SelectForm = ({
  name,
  placeholder,
  label,
  error,
  control,
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
      <Controller
        name={name}
        control={control}
        render={({ field }) => {
          const value = options.find((option) => option.value === field.value);
          return (
            <Select
              className="w-full max-w-none"
              placeholder={placeholder}
              options={options}
              onChange={(val) => field.onChange(val.value)}
              value={value}
            />
          );
        }}
      />
      {error && <p className="text-danger text-sm">{error}</p>}
    </div>
  );
};

export default SelectForm;
