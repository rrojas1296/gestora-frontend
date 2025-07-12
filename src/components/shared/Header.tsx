"use client";
import React, { useEffect } from "react";
import MainLogoIcon from "../Icons/MainLogoIcon";
import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  Toast,
} from "gestora-lib";
import MenuIcon from "../Icons/MenuIcon";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  setLoading,
  setSidebarOpen,
  setTheme,
} from "@/store/slices/config.slice";
import { useLocale, useTranslations } from "next-intl";
import { formatDate } from "@/utils/formateDate";
import Image from "next/image";
import { IMG_USER_DEFAULT } from "@/config/constants";
import SunIcon from "../Icons/SunIcon";
import MoonIcon from "../Icons/MoonIcon";
import BellIcon from "../Icons/BellIcon";
import LogOutIcon from "../Icons/LogOutIcon";
import UserIcon from "../Icons/UserIcon";
import SettingsIcon from "../Icons/SettingsIcon";
import { useRouter } from "@/i18n/navigation";
import { toast } from "sonner";
import { signOut } from "@/utils/supabase/actions/logout";
import { usePathname } from "next/navigation";

const Header = () => {
  const today = new Date();
  const locale = useLocale();
  const router = useRouter();
  const formatted = formatDate(today, locale);
  const pathname = usePathname();
  const { isDark } = useAppSelector((state) => state.config);
  const t = useTranslations("Header");
  const dispatch = useAppDispatch();
  const userDB = useAppSelector((state) => state.user);
  const openSidebar = () => {
    dispatch(setSidebarOpen({ sidebarOpen: true }));
  };
  const signOutUser = async () => {
    try {
      dispatch(setLoading({ loader: true }));
      await signOut();
      router.push("/login");
    } catch {
      toast.custom(() => (
        <Toast
          className="bg-bg-1 text-text-1 border-border-2"
          text={t("errors.server_error")}
          type="error"
        />
      ));
    }
  };
  const section = pathname.split("/")[2];

  useEffect(() => {
    return () => {
      dispatch(setLoading({ loader: false }));
    };
  }, []);

  return (
    <div className="flex sticky top-0 py-4 left-0 lg:py-6 bg-bg-2 items-center justify-between w-full">
      <div className="flex items-center gap-4">
        <Button variant="icon" onClick={openSidebar}>
          <MenuIcon className="w-6 h-6 text-text-1 stroke-current" />
        </Button>
        <div className="flex flex-row gap-2 items-center lg:hidden">
          <MainLogoIcon className="text-text-1 w-6 h-6 stroke-current" />
          <p className="text-text-1 text-sm font-bold">{t("brand")}</p>
        </div>
        <div className="hidden lg:block">
          {section === "dashboard" ? (
            <p className="text-xl text-text-1 font-light">
              {t("greeting.text")}{" "}
              <span className="font-bold">
                {userDB?.first_name} {userDB?.last_name}
              </span>
            </p>
          ) : (
            <p className="font-bold text-2xl text-text-1">
              {t(`sections.${section}`)}
            </p>
          )}
          <p className="text-text-2 text-sm">{formatted}</p>
        </div>
      </div>
      <div className="items-center gap-4 lg:flex">
        <Button variant="icon" className="hidden lg:flex hover:bg-bg-1">
          <BellIcon className="w-5 h-5 text-text-1 stroke-current" />
        </Button>
        <Button
          className="hidden lg:flex hover:bg-bg-1"
          variant="icon"
          onClick={() =>
            dispatch(
              setTheme({
                isDark: !isDark,
              })
            )
          }
        >
          {isDark ? (
            <SunIcon className="w-5 h-5 text-text-1 stroke-current" />
          ) : (
            <MoonIcon className="w-5 h-5 text-text-1 stroke-current" />
          )}
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger className="outline-none">
            <Image
              src={userDB?.photo_url || IMG_USER_DEFAULT}
              className="h-[40px] object-cover w-[40px] rounded-full block cursor-pointer"
              width={60}
              height={60}
              alt="User image"
            />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-36">
            <DropdownMenuItem onClick={() => router.push("/profile")}>
              <UserIcon className="w-5 h-5 stroke-current text-text-1" />
              {t("dropdown.profile")}
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => router.push("/settings")}>
              <SettingsIcon className="w-5 h-5 stroke-current text-text-1" />
              {t("dropdown.settings")}
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={signOutUser}
              className="text-red-500 hover:text-red-500"
            >
              <LogOutIcon className="w-5 h-5 stroke-current text-red-500" />
              {t("dropdown.logout")}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default Header;
