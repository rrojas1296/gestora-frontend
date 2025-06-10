"use client";
import React from "react";
import MainLogoIcon from "../Icons/MainLogoIcon";
import { Button } from "housy-lib";
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

const Header = () => {
  const today = new Date();
  const locale = useLocale();
  const formatted = formatDate(today, locale);
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
  return (
    <div className="flex justify-between w-full">
      <div className="flex flex-row gap-2 items-center lg:hidden">
        <MainLogoIcon className="text-text-1 w-6 h-6 stroke-current" />
        <p className="text-text-1 text-sm font-bold">{t("brand")}</p>
      </div>
      <div className="hidden lg:block">
        <p className="text-2xl text-text-1">
          {t("greeting.text")}{" "}
          <span className="font-bold">
            {userInfo?.first_name} {userInfo?.last_name}
          </span>
        </p>
        <p className="text-text-2 text-base">{formatted}</p>
      </div>
      <Button
        variant="icon"
        className="p-0 hover:bg-bg-1 lg:hidden"
        onClick={openSidebar}
      >
        <MenuIcon className="w-6 h-6 text-text-1 stroke-current" />
      </Button>
      <div className="items-center gap-4 hidden lg:flex">
        <Button variant="icon" className="p-0 hover:bg-bg-1">
          <BellIcon className="w-6 h-6 text-text-1 stroke-current" />
        </Button>
        <Button
          className="p-0 hover:bg-bg-1"
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
        <Image
          src={userInfo?.photo_url || IMG_USER_DEFAULT}
          className="h-[40px] object-cover w-[40px] xl:h-[50px] xl:w-[50px] rounded-full hidden lg:block"
          width={60}
          height={60}
          alt="User image"
        />
      </div>
    </div>
  );
};

export default Header;
