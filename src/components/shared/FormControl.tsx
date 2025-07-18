import { cn } from "@/utils/cn";
import { Input, Textarea } from "gestora-lib";
import type { ComponentProps, HTMLInputTypeAttribute, JSX } from "react";
import { Control, Controller, type UseFormRegister } from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "gestora-lib";

interface Props extends ComponentProps<"input"> {
  label: string;
  register: UseFormRegister<any>;
  Icon?: JSX.Element;
  error?: string;
  className?: string;
  control?: Control<any>;
  options?: { value: string; label: string }[];
}

const inputTypes: HTMLInputTypeAttribute[] = [
  "text",
  "password",
  "email",
  "number",
];

const FormControl = ({
  Icon,
  type,
  placeholder,
  label,
  name = "",
  register,
  error,
  className,
  control,
  options,
}: Props) => {
  return (
    <div className={cn("grid gap-2 w-full", className)}>
      {label && (
        <label
          htmlFor={name}
          className={cn(
            "text-text-1 text-sm font-medium",
            error && "text-danger",
          )}
        >
          {label}
        </label>
      )}
      {inputTypes.includes(type!) ? (
        <Input
          containerClassName={cn(
            "border-border-1 w-full max-w-none focus-within:ring-2 focus-within:ring-primary/60 transition-all",
            error && "border-danger focus-within:ring-danger",
          )}
          inputClassName={cn("text-text-1 placeholder:text-text-2 w-full")}
          Icon={Icon}
          type={type}
          placeholder={placeholder}
          id={name}
          {...register(name)}
        />
      ) : type === "select" ? (
        <Controller
          name={name}
          control={control}
          render={({ field }) => {
            return (
              <Select onValueChange={field.onChange} value={field.value}>
                <SelectTrigger
                  className={cn(
                    "w-full col-span-2 border-border-1 data-[size=default]:h-10 text-text-1",
                    error && "border-danger",
                  )}
                >
                  <SelectValue placeholder="Select a status" />
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
            );
          }}
        />
      ) : type === "textarea" ? (
        <Textarea
          placeholder={placeholder}
          id={name}
          className={cn(
            "w-full h-32 focus-within:ring-2 focus-within:ring-primary/60 transition-all",
            error &&
              "border-danger placeholder:text-danger focus-within:ring-danger",
          )}
          {...register(name)}
        />
      ) : null}
      {error && <p className="text-danger text-sm">{error}</p>}
    </div>
  );
};

export default FormControl;
