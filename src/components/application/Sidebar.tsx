"use client";
import React, { useRef } from "react";
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
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { Button } from "housy-lib";
import ArrowLeft from "../Icons/CloseIcon";
import { setSidebarOpen } from "@/store/slices/config.slice";

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
  const bgRef = useRef<null | HTMLDivElement>(null);
  const pathname = usePathname();
  const { sidebarOpen } = useAppSelector((state) => state.config);
  const dispatch = useAppDispatch();

  const closeSidebar = () => {
    dispatch(setSidebarOpen({ sidebarOpen: false }));
  };

  return (
    <div
      ref={bgRef}
      className={cn(
        "h-screen w-full fixed top-0 left-0",
        sidebarOpen && "z-10",
      )}
    >
      <div
        className={cn(
          "pt-11 w-[272px] h-screen transition-[width] overflow-x-hidden bg-bg-1 relative z-10",
          sidebarOpen ? "w-[272px]" : "w-0",
        )}
        style={{}}
      >
        <div className="w-[272px] px-4">
          <div className="flex gap-6 justify-between items-center">
            <div className="flex gap-[22px] items-center pl-[6px]">
              <MainLogoIcon className="text-text-1 w-6 h-6 stroke-current" />
              <div>
                <p className="text-sm font-bold text-text-1">
                  {t("sidebar.brand.text")}
                </p>
                <p className="text-text-2 text-sm ">
                  {t("sidebar.brand.subtitle")}
                </p>
              </div>
            </div>
            <Button
              variant="icon"
              className="hover:bg-bg-2 p-0"
              onClick={() => closeSidebar()}
            >
              <ArrowLeft className="w-5 h-5 text-text-1 stroke-current" />
            </Button>
          </div>
          <ul className="mt-14">
            {links.map((link, index) => {
              const Icon = link.icon;
              const active = pathname === link.path;
              return (
                <Link
                  href={link.path}
                  key={index}
                  className={cn(
                    "text-text-1 rounded-md flex gap-6 py-[10px] px-2 items-center cursor-pointer",
                    active
                      ? "bg-primary"
                      : "hover:text-text-2 transition-colors",
                  )}
                >
                  <Icon
                    className={cn(
                      "stroke-current w-5 h-5",
                      active && "text-text-3",
                    )}
                  />
                  <span
                    className={cn(
                      "text-sm",
                      active && "font-semibold text-text-3",
                    )}
                  >
                    {t(link.label)}
                  </span>
                </Link>
              );
            })}
          </ul>
        </div>
      </div>
      <div
        className={cn(
          "w-full h-full bg-bg-3 absolute transition-opacity  top-0 left-0",
          sidebarOpen ? "opacity-100" : "opacity-0",
        )}
        onTransitionEnd={() => {
          if (!sidebarOpen && bgRef.current) {
            console.log("Here");
            bgRef.current.classList.add("-z-50");
          } else if (sidebarOpen && bgRef.current)
            bgRef.current.classList.remove("-z-50");
        }}
        onClick={closeSidebar}
      />
    </div>
  );
};

export default Sidebar;
