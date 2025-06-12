"use client";
import React, { useEffect, useRef } from "react";
import DashboardIcon from "../Icons/DashboardIcon";
import PropertiesIcon from "../Icons/PropertiesIcon";
import UsersIcon from "../Icons/UsersIcon";
import RequestsIcon from "../Icons/RequestsIcon";
import ReservationsIcon from "../Icons/ReservationsIcon";
import UserIcon from "../Icons/UserIcon";
import SettingsIcon from "../Icons/SettingsIcon";
import { IconProps } from "@/types/icon";
import MainLogoIcon from "../Icons/MainLogoIcon";
import { cn } from "@/utils/cn";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { Button } from "housy-lib";
import ArrowLeft from "../Icons/CloseIcon";
import { setSidebarOpen } from "@/store/slices/config.slice";
import useMediaQuery from "@/hooks/useMediaQuery";
import { useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";

type SidebarOption = {
  path: string;
  icon: React.FC<IconProps>;
  label: string;
};

const links: SidebarOption[] = [
  {
    path: "/dashboard",
    label: "links.dashboard",
    icon: DashboardIcon,
  },
  {
    path: "/properties",
    label: "links.properties",
    icon: PropertiesIcon,
  },
  {
    path: "/tenants",
    label: "links.tenants",
    icon: UsersIcon,
  },
  {
    path: "/requests",
    label: "links.requests",
    icon: RequestsIcon,
  },
  {
    path: "/reservations",
    label: "links.reservations",
    icon: ReservationsIcon,
  },
  {
    path: "/profile",
    label: "links.profile",
    icon: UserIcon,
  },
  {
    path: "/settings",
    label: "links.settings",
    icon: SettingsIcon,
  },
];

const Sidebar = () => {
  const t = useTranslations("Sidebar");
  const bgRef = useRef<null | HTMLDivElement>(null);
  const pathname = usePathname();
  const router = useRouter();
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const { sidebarOpen } = useAppSelector((state) => state.config);
  const dispatch = useAppDispatch();

  const closeSidebar = () => {
    dispatch(setSidebarOpen({ sidebarOpen: false }));
  };
  const goToLink = (path: string) => router.push(path);

  useEffect(() => {
    bgRef.current?.classList.add("-z-20");
  }, []);

  return (
    <>
      <div
        className={cn(
          "pt-11 w-fit absolute top-0 left-0 realtive h-screen z-30 transition-[width] overflow-x-hidden bg-bg-1 duration-200 lg: border-r-[1px] border-border-2",
          sidebarOpen ? "w-[272px]" : "w-0 lg:w-[68px]",
        )}
        style={{
          transition: "width 0.2s ease-in-out",
        }}
        onTransitionEnd={() =>
          !sidebarOpen && !isDesktop && bgRef.current?.classList.add("-z-20")
        }
        onTransitionStart={() =>
          sidebarOpen && !isDesktop && bgRef.current?.classList.remove("-z-20")
        }
        onMouseEnter={() =>
          isDesktop && dispatch(setSidebarOpen({ sidebarOpen: true }))
        }
        onMouseLeave={() =>
          isDesktop && dispatch(setSidebarOpen({ sidebarOpen: false }))
        }
      >
        <div className="w-[272px] px-4">
          <div className="flex gap-6 justify-between items-center">
            <div className="flex gap-[22px] items-center pl-[6px]">
              <MainLogoIcon className="text-text-1 w-6 h-6 stroke-current" />
              <div>
                <p className="text-lg font-bold text-text-1">
                  {t("brand.text")}
                </p>
                <p className="text-text-2 text-sm ">{t("brand.subtitle")}</p>
              </div>
            </div>
            <Button
              variant="icon"
              className="hover:bg-bg-2 p-0 lg:hidden"
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
                <div
                  key={index}
                  onClick={() => goToLink(link.path)}
                  className={cn(
                    "text-text-1 rounded-md flex gap-6 py-[10px] px-2 items-center cursor-pointer transition-colors",
                    active && "bg-primary",
                    isDesktop && !active && "text-text-2 hover:text-text-1",
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
                </div>
              );
            })}
          </ul>
        </div>
      </div>
      <div
        className={cn(
          "w-full h-full duration-200 bg-bg-3 absolute transition-all top-0 left-0 lg:hidden",
          sidebarOpen ? "opacity-100" : "opacity-0",
        )}
        ref={bgRef}
        onClick={closeSidebar}
      />
    </>
  );
};

export default Sidebar;
