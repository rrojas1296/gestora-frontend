import { cn } from "@/utils/cn";
import { Input } from "housy-lib";
import type { ComponentProps, JSX } from "react";
import type { UseFormRegister } from "react-hook-form";

interface Props extends ComponentProps<"input"> {
  Icon?: JSX.Element;
  label?: string;
  register: UseFormRegister<any>;
  error?: string;
  className?: string;
}

const FormControl = ({
  Icon,
  type,
  placeholder,
  label,
  name = "",
  register,
  error,
  className,
}: Props) => {
  return (
    <div className={cn("grid gap-2 w-full", className)}>
      {label && (
        <label
          htmlFor={name}
          className={cn(
            "text-text-1 text-sm font-medium",
            error && "text-red-500",
          )}
        >
          {label}
        </label>
      )}
      <Input
        containerClassName={cn(
          "border-border-1 w-full max-w-none",
          error && "border-red-500",
        )}
        inputClassName={cn(
          "text-text-1 placeholder:text-text-2 w-full",
          error && "placeholder:text-red-500",
        )}
        Icon={Icon}
        type={type}
        placeholder={placeholder}
        id={name}
        {...register(name)}
      />
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
};

export default FormControl;
