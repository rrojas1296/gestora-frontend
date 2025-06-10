import BuildingIcon from "@/components/Icons/BuildingIcon";
import RequestsIcon from "@/components/Icons/RequestsIcon";
import ReservationsIcon from "@/components/Icons/ReservationsIcon";
import TenantsIcon from "@/components/Icons/TenantsIcon";
import { useTranslations } from "next-intl";
import React from "react";

const data = [
  {
    title: "properties.title",
    description: "properties.description",
    icon: BuildingIcon,
    mount: 10,
  },
  {
    title: "tenants.title",
    description: "tenants.description",
    icon: TenantsIcon,
    mount: 12,
  },
  {
    title: "requests.title",
    description: "requests.description",
    icon: RequestsIcon,
    mount: 25,
  },
  {
    title: "reservations.title",
    description: "reservations.description",
    icon: ReservationsIcon,
    mount: 200,
  },
];

const Dashboard = () => {
  const t = useTranslations("Dashboard");
  return (
    <div>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {data.map((item, index) => {
          const { title, description, mount } = item;
          return (
            <div
              key={index}
              className="p-[18px] grid gap-2 rounded-md bg-bg-1 shadow-lg shadow-shadow-1"
            >
              <div className="flex justify-between items-center">
                <p className="text-xl font-medium">{t(title)}</p>
                <item.icon className="w-6 h-6 text-text-1 stroke-current" />
              </div>
              <p className="text-5xl font-extrabold">{mount}</p>
              <p className="text-sm w-9/12">{t(description)}</p>
            </div>
          );
        })}
      </div>

      <div></div>
    </div>
  );
};

export default Dashboard;
