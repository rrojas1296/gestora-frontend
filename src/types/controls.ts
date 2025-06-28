import type { ComponentProps } from "react";
import type { IconProps } from "./icon";

export type FormControlType<T> = {
  name: T;
  label: string;
  type: ComponentProps<"input">["type"];
  placeholder: string;
  icon?: React.FC<IconProps>;
  className?: string;
};
