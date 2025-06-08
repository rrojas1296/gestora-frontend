"use client";
import React from "react";
import MainLogoIcon from "../Icons/MainLogoIcon";
import { useTranslation } from "react-i18next";
import { Button } from "housy-lib";
import MenuIcon from "../Icons/MenuIcon";
import { useAppDispatch } from "@/store/hooks";
import { setSidebarOpen } from "@/store/slices/config.slice";

const Header = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const openSidebar = () => {
    dispatch(setSidebarOpen({ sidebarOpen: true }));
  };
  return (
    <div className="flex justify-between">
      <div className="flex gap-2 items-center">
        <MainLogoIcon className="text-text-1 w-6 h-6 stroke-current" />
        <span className="text-text-1 text-sm font-bold">
          {t("header.brand")}
        </span>
      </div>
      <Button
        variant="icon"
        className="p-0 hover:bg-bg-1"
        onClick={openSidebar}
      >
        <MenuIcon className="w-6 h-6 text-text-1 stroke-current" />
      </Button>
    </div>
  );
};

export default Header;
