import type { ComponentProps } from "react";
import type { IconProps } from "./icon";

export type Control<T> = {
  name: T;
  label: string;
  type: ComponentProps<"input">["type"];
  placeholder: string;
  icon?: React.FC<IconProps>;
  className?: string;
  options?: {
    value: string;
    label: string;
  }[];
};
