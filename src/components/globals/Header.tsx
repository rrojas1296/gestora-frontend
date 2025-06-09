"use client";
import React from "react";
import MainLogoIcon from "../Icons/MainLogoIcon";
import { Button } from "housy-lib";
import MenuIcon from "../Icons/MenuIcon";
import { useAppDispatch } from "@/store/hooks";
import { setSidebarOpen } from "@/store/slices/config.slice";
import { useQuery } from "@tanstack/react-query";
import { createClient } from "@/utils/supabase/client";
import { useLocale, useTranslations } from "next-intl";
import { formatDate } from "@/utils/formateDate";

const Header = () => {
  const today = new Date();
  const locale = useLocale();
  const formatted = formatDate(today, locale);
  const t = useTranslations("Header");
  const dispatch = useAppDispatch();
  const { data: userInfo, isLoading: queryLoading } = useQuery({
    queryKey: ["userInfo"],
    queryFn: () => createClient().auth.getUser(),
  });
  console.log({
    userInfo,
    queryLoading,
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
          {t("greeting.text")}
          <span className="font-bold"> Diego Raul</span>
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
    </div>
  );
};

export default Header;
