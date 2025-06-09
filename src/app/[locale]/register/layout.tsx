"use client";
import MoonIcon from "@/components/Icons/MoonIcon";
import SunIcon from "@/components/Icons/SunIcon";
import WorldIcon from "@/components/Icons/WorldIcon";
import { usePathname, useRouter } from "@/i18n/navigation";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setTheme } from "@/store/slices/config.slice";
import { Button } from "housy-lib";
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
  const theme = useAppSelector((state) => state.config.currentTheme);
  return (
    <div className="bg-bg-1 gap-8 md:h-screen md:bg-bg-2 grid place-items-center py-8 lg:py-0">
      <div className="w-10/12 grid gap-6 max-w-sm md:bg-bg-1 p-4 md:max-w-[480px] md:px-14 md:rounded-xl md:py-14 md:shadow-lg md:shadow-shadow-1 2xl:py-20">
        {children}
      </div>
      <div className="flex gap-4 items-center md:absolute md:translate-x-0 md:left-auto md:right-6 md:bottom-6">
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
          onClick={() =>
            dispath(
              setTheme({ currentTheme: theme === "dark" ? "light" : "dark" }),
            )
          }
        >
          {theme === "dark" ? (
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
