"use client";
import React from "react";
import DashboardIcon from "../Icons/DashboardIcon";
import PropertiesIcon from "../Icons/PropertiesIcon";
import UsersIcon from "../Icons/UsersIcon";
import RequestsIcon from "../Icons/RequestsIcon";
import ReservationsIcon from "../Icons/ReservationsIcon";
import UserIcon from "../Icons/UserIcon";
import SettingsIcon from "../Icons/SettingsIcon";
import { IconProps } from "@/types/icon";
import MainLogoIcon from "../Icons/MainLogoIcon";
import { useTranslation } from "react-i18next";
import { usePathname } from "next/navigation";
import { cn } from "@/utils/cn";
import Link from "next/link";
import { useAppSelector } from "@/store/hooks";

type SidebarOption = {
  path: string;
  icon: React.FC<IconProps>;
  label: string;
};

const links: SidebarOption[] = [
  {
    path: "/dashboard",
    label: "sidebar.links.dashboard",
    icon: DashboardIcon,
  },
  {
    path: "/properties",
    label: "sidebar.links.properties",
    icon: PropertiesIcon,
  },
  {
    path: "/tenants",
    label: "sidebar.links.tenants",
    icon: UsersIcon,
  },
  {
    path: "/requests",
    label: "sidebar.links.requests",
    icon: RequestsIcon,
  },
  {
    path: "/reservations",
    label: "sidebar.links.reservations",
    icon: ReservationsIcon,
  },
  {
    path: "/profile",
    label: "sidebar.links.profile",
    icon: UserIcon,
  },
  {
    path: "/settings",
    label: "sidebar.links.settings",
    icon: SettingsIcon,
  },
];

const Sidebar = () => {
  const { t } = useTranslation();
  const pathname = usePathname();
  const { sidebarOpen } = useAppSelector((state) => state.config);

  return (
    <div
      className={cn(
        "pt-11 w-[272px] h-screen transition-[width] overflow-x-hidden bg-bg-1 fixed top-0 left-0",
        sidebarOpen ? "w-[272px]" : "w-0",
      )}
      style={{
        transitionProperty: "width",
      }}
    >
      <div className="w-[240px] m-auto">
        <div className="flex gap-[18px] items-center">
          <MainLogoIcon className="text-text-1 w-8 h-8 stroke-current" />
          <span className="text-2xl font-bold text-text-1">
            {t("sidebar.brand.text")}
          </span>
        </div>
        <ul className="mt-14">
          {links.map((link, index) => {
            const Icon = link.icon;
            return (
              <Link
                href={link.path}
                key={index}
                className={cn(
                  "text-text-1 rounded-md flex gap-6 py-[10px] px-2 items-center cursor-pointer",
                  pathname === link.path
                    ? "bg-primary"
                    : "hover:text-text-2 transition-colors",
                )}
              >
                <Icon className="stroke-current w-5 h-5" />
                <span className="text-sm">{t(link.label)}</span>
              </Link>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
