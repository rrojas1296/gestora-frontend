"use client";
import React from "react";
import MainLogoIcon from "../Icons/MainLogoIcon";
import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  Toast,
} from "housy-lib";
import MenuIcon from "../Icons/MenuIcon";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setSidebarOpen, setTheme } from "@/store/slices/config.slice";
import { useQuery } from "@tanstack/react-query";
import { useLocale, useTranslations } from "next-intl";
import { formatDate } from "@/utils/formateDate";
import { getUserInfo } from "@/utils/api/users/getUserInfo";
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
import path from "path";

const Header = () => {
  const today = new Date();
  const locale = useLocale();
  const router = useRouter();
  const formatted = formatDate(today, locale);
  const pathname = usePathname();
  const { currentTheme } = useAppSelector((state) => state.config);
  const t = useTranslations("Header");
  const dispatch = useAppDispatch();
  const { data: userInfo } = useQuery({
    queryKey: ["userInfo"],
    queryFn: async () => await getUserInfo(),
  });
  const openSidebar = () => {
    dispatch(setSidebarOpen({ sidebarOpen: true }));
  };
  const signOutUser = async () => {
    try {
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

  return (
    <div className="flex sticky z-10 top-0 py-4 left-0 lg:py-6 bg-bg-2 items-center justify-between w-full">
      <Button
        variant="icon"
        className="p-0 hover:bg-bg-1 lg:hidden"
        onClick={openSidebar}
      >
        <MenuIcon className="w-6 h-6 text-text-1 stroke-current" />
      </Button>
      <div className="flex flex-row gap-2 items-center lg:hidden">
        <MainLogoIcon className="text-text-1 w-6 h-6 stroke-current" />
        <p className="text-text-1 text-sm font-bold">{t("brand")}</p>
      </div>
      <div className="hidden lg:block">
        {section === "dashboard" ? (
          <p className="text-2xl text-text-1">
            {t("greeting.text")}{" "}
            <span className="font-bold">
              {userInfo?.first_name} {userInfo?.last_name}
            </span>
          </p>
        ) : (
          <p className="font-bold text-2xl text-text-1">
            {t(`sections.${section}`)}
          </p>
        )}
        <p className="text-text-2 text-base">{formatted}</p>
      </div>
      <div className="items-center gap-4 lg:flex">
        <Button
          variant="icon"
          className="p-0 hidden place-items-center lg:block hover:bg-bg-1"
        >
          <BellIcon className="w-6 h-6 text-text-1 stroke-current" />
        </Button>
        <Button
          className="p-0 hover:bg-bg-1 hidden lg:block place-items-center"
          variant="icon"
          onClick={() =>
            dispatch(
              setTheme({
                currentTheme: currentTheme === "dark" ? "light" : "dark",
              }),
            )
          }
        >
          {currentTheme === "light" ? (
            <SunIcon className="w-6 h-6 text-text-1 stroke-current" />
          ) : (
            <MoonIcon className="w-6 h-6 text-text-1 stroke-current" />
          )}
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger className="outline-none">
            <Image
              src={userInfo?.photo_url || IMG_USER_DEFAULT}
              className="h-[40px] object-cover w-[40px] rounded-full block cursor-pointer"
              width={60}
              height={60}
              alt="User image"
            />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="bg-bg-1 border-[1px] border-border-2">
            <DropdownMenuItem className="text-text-1 py-2 px-3 cursor-pointer hover:bg-bg-2">
              <UserIcon className="w-5 h-5 stroke-current text-text-1" />
              {t("dropdown.profile")}
            </DropdownMenuItem>
            <DropdownMenuItem className="text-text-1 px-3 py-2 cursor-pointer hover:bg-bg-2">
              <SettingsIcon className="w-5 h-5 stroke-current text-text-1" />
              {t("dropdown.settings")}
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={signOutUser}
              className="text-red-500 py-2 px-3 cursor-pointer hover:bg-bg-2 hover:text-red-500"
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
