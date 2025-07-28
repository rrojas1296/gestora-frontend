import { cn } from "@/utils/cn";
import { AutoComplete, Input, Textarea } from "gestora-lib";
import type { ComponentProps, HTMLInputTypeAttribute, JSX } from "react";
import { Control, Controller, type UseFormRegister } from "react-hook-form";

interface Props extends ComponentProps<"input"> {
  label: string;
  register: UseFormRegister<any>;
  Icon?: JSX.Element;
  error?: string;
  className?: string;
  control?: Control<any>;
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
  control,
  name = "",
  register,
  error,
  className,
}: Props) => {
  return (
    <div className={cn("grid gap-2 w-full", className)}>
      <label
        htmlFor={name}
        className={cn(
          "text-text-1 text-sm font-medium",
          error && "text-danger",
        )}
      >
        {label}
      </label>
      {inputTypes.includes(type!) ? (
        <Input
          containerClassName={cn(
            "border-border-1 w-full max-w-none focus-within:ring-2 focus-within:ring-primary/60 transition-all",
            error && "border-danger focus-within:ring-danger",
          )}
          inputClassName={cn("text-text-1 placeholder:text-text-2 w-full")}
          Icon={Icon}
          type={type}
          autoComplete="off"
          placeholder={placeholder}
          id={name}
          {...register(name, {
            valueAsNumber: type === "number",
          })}
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
      ) : type === "autocomplete" ? (
        <Controller
          name={name}
          control={control}
          render={({ field }) => (
            <AutoComplete
              containerClassName="w-full"
              triggerClassName={cn(error && "border-danger")}
              value={field.value}
              id={name}
              autoComplete="off"
              options={[
                {
                  value: "razer",
                  label: "Razer",
                },
                {
                  value: "apple",
                  label: "Apple",
                },
                {
                  value: "google",
                  label: "Google",
                },
              ]}
              placeholder={placeholder}
              handleSelect={(val) => {
                field.onChange(val.value);
              }}
            />
          )}
        />
      ) : null}
      {error && <p className="text-danger text-sm">{error}</p>}
    </div>
  );
};

export default FormControl;
