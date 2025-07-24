"use client";
import React from "react";
import DashboardIcon from "../Icons/DashboardIcon";
import UsersIcon from "../Icons/UsersIcon";
import { IconProps } from "@/types/icon";
import MainLogoIcon from "../Icons/MainLogoIcon";
import { cn } from "@/utils/cn";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  Button,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "gestora-lib";
import ArrowLeft from "../Icons/CloseIcon";
import { setSidebarOpen } from "@/store/slices/config.slice";
import useMediaQuery from "@/hooks/useMediaQuery";
import { useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import InventoryIcon from "../Icons/InventoryIcon";
import CartIcon from "../Icons/CartIcon";
import CreditCardIcon from "../Icons/CreditCardIcon";
import ReportIcon from "../Icons/ReportIcon";
import SettingsIcon from "../Icons/SettingsIcon";
import CategoryIcon from "../Icons/CategoryIcon";
import CompaniesIcon from "../Icons/CompaniesIcon";
import { setUser } from "@/store/slices/user.slice";

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
    path: "/inventory",
    label: "links.inventory",
    icon: InventoryIcon,
  },
  {
    path: "/categories",
    label: "links.categories",
    icon: CategoryIcon,
  },
  {
    path: "/companies",
    label: "links.companies",
    icon: CompaniesIcon,
  },
  {
    path: "/sales",
    label: "links.sales",
    icon: CartIcon,
  },
  {
    path: "/purchases",
    label: "links.purchases",
    icon: CreditCardIcon,
  },
  {
    path: "/reports",
    label: "links.reports",
    icon: ReportIcon,
  },
  {
    path: "/users",
    label: "links.users",
    icon: UsersIcon,
  },
  {
    path: "/settings",
    label: "links.settings",
    icon: SettingsIcon,
  },
];

const MainSidebar = () => {
  const t = useTranslations("Sidebar");
  const pathname = usePathname();
  const section = "/" + pathname.split("/")[1];
  const router = useRouter();
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const { sidebarOpen } = useAppSelector((state) => state.config);
  const companies = useAppSelector((state) => state.user.companies);
  const dispatch = useAppDispatch();

  const closeSidebar = () => dispatch(setSidebarOpen({ sidebarOpen: false }));
  const goToLink = (path: string) => {
    dispatch(setSidebarOpen({ sidebarOpen: false }));
    router.push(path);
  };

  const onChangeCompany = (id: string) => {
    const newCompanies = companies?.map((c) => ({
      ...c,
      current: c.id === id,
    }));
    dispatch(setUser({ companies: newCompanies }));
  };

  return (
    <>
      <div
        className={cn(
          "fixed inset-0 z-20 duration-200 bg-black/50 transition-opacity top-0 left-0",
          sidebarOpen
            ? "opacity-50 pointer-events-auto"
            : "opacity-0 pointer-events-none",
        )}
        onClick={closeSidebar}
      />
      <div
        className={cn(
          "pt-11 w-fit z-20 fixed top-0 left-0 h-screen transition-[width] overflow-x-hidden bg-bg-1 duration-200 lg:border-r border-r-border-2",
          sidebarOpen ? "w-[272px]" : "w-0 lg:w-[68px]",
        )}
        style={{
          transition: "width 0.2s ease-in-out",
        }}
      >
        <div className="w-[272px] px-4">
          <div className="flex gap-4 justify-between items-center">
            <div className="flex gap-6 items-center pl-2">
              <MainLogoIcon className="text-text-1 w-5 h-5 stroke-current" />
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
          {companies && companies.length > 1 && (
            <Select
              onValueChange={onChangeCompany}
              defaultValue={companies.find((c) => c.current)?.id}
            >
              <SelectTrigger
                className={cn(
                  "w-full mt-8 text-text-1",
                  !sidebarOpen && "opacity-0",
                )}
              >
                <SelectValue placeholder="Select a company" />
              </SelectTrigger>
              <SelectContent>
                {companies.map((comp) => {
                  return (
                    <SelectItem
                      defaultChecked={comp.current}
                      key={comp.id}
                      value={comp.id}
                    >
                      {comp.name}
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>
          )}
          <ul className="mt-6">
            <p
              className={cn(
                "text-text-2 text-sm mb-4",
                !sidebarOpen && "opacity-0",
              )}
            >
              {t("sections.main")}
            </p>
            {links.map((link, index) => {
              const Icon = link.icon;
              const active = section === link.path;
              return (
                <div
                  key={index}
                  onClick={() => goToLink(link.path)}
                  className={cn(
                    "text-text-1 rounded-md flex gap-6 py-2 px-2 items-center cursor-pointer transition-colors",
                    active && "bg-primary text-text-3 font-semibold",
                    isDesktop && !active && "text-text-2 hover:text-text-1",
                  )}
                >
                  <Icon className={cn("stroke-current w-5 h-5")} />
                  <span className={cn("text-sm")}>{t(link.label)}</span>
                </div>
              );
            })}
          </ul>
        </div>
      </div>
    </>
  );
};

export default MainSidebar;
