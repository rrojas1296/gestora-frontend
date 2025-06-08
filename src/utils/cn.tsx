import { ClassNameValue, twMerge as tw } from "tailwind-merge";
import clsx from "clsx";

export const cn = (...classes: ClassNameValue[]) => clsx(tw(classes));
