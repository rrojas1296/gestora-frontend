"use client";
import MoonIcon from "@/components/Icons/MoonIcon";
import SunIcon from "@/components/Icons/SunIcon";
import WorldIcon from "@/components/Icons/WorldIcon";
import { usePathname, useRouter } from "@/i18n/navigation";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setTheme } from "@/store/slices/config.slice";
import { Button } from "gestora-lib";
import { useLocale } from "next-intl";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

const Register = ({ children }: Props) => {
  const dispath = useAppDispatch();
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const { isDark } = useAppSelector((state) => state.config);
  return (
    <div className="h-screen bg-bg-1 flex flex-col py-12 gap-12 place-items-center overflow-y-auto lg:bg-bg-2 lg:grid lg:place-items-center">
      <div className="grid gap-6 w-full max-w-md px-8 lg:bg-bg-1 lg:px-14 lg:rounded-xl lg:py-14 lg:shadow-lg lg:shadow-shadow-1 2xl:py-20">
        {children}
      </div>
      <div className="flex gap-4 items-center lg:absolute lg:right-6 lg:bottom-6">
        <Button
          onClick={() => {
            const newLocale = locale === "en" ? "es" : "en";
            router.replace(pathname, {
              locale: newLocale,
            });
          }}
          variant="icon"
          className="p-0 hover:bg-bg-2"
        >
          <WorldIcon className="w-6 h-6 text-text-1 stroke-current" />
        </Button>
        <Button
          variant="icon"
          className="p-0 hover:bg-bg-2"
          onClick={() => dispath(setTheme({ isDark: !isDark }))}
        >
          {isDark ? (
            <SunIcon className="w-6 h-6 text-text-1 stroke-current" />
          ) : (
            <MoonIcon className="w-6 h-6 text-text-1 stroke-current" />
          )}
        </Button>
      </div>
    </div>
  );
};

export default Register;
