import ChartDashboard from "@/components/application/ChartDashboard";
import BuildingIcon from "@/components/Icons/BuildingIcon";
import RequestsIcon from "@/components/Icons/RequestsIcon";
import ReservationsIcon from "@/components/Icons/ReservationsIcon";
import TenantsIcon from "@/components/Icons/TenantsIcon";
import CardApp from "@/components/shared/CardApp";
import { useTranslations } from "next-intl";
import React from "react";

const data = [
  {
    title: "earnings.title",
    description: "earnings.description",
    icon: BuildingIcon,
    mount: 10,
  },
  {
    title: "sales.title",
    description: "sales.description",
    icon: TenantsIcon,
    mount: 12,
  },
  {
    title: "reports.title",
    description: "reports.description",
    icon: RequestsIcon,
    mount: 25,
  },
  {
    title: "users.title",
    description: "users.description",
    icon: ReservationsIcon,
    mount: 200,
  },
];

const Dashboard = () => {
  const t = useTranslations("Dashboard");
  return (
    <div className="grid gap-6">
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {data.map((item, index) => {
          const { title, description, mount } = item;
          return (
            <CardApp key={index} className="grid gap-2">
              <div className="flex justify-between items-center">
                <p className="text-xl font-medium">{t(title)}</p>
                <item.icon className="w-6 h-6 text-text-1 stroke-current" />
              </div>
              <p className="text-5xl font-extrabold">{mount}</p>
              <p className="text-sm w-9/12">{t(description)}</p>
            </CardApp>
          );
        })}
      </div>
      <CardApp>
        <div className="grid gap-1 mb-2">
          <h1 className="text-xl text-text-1 font-medium">
            {t("chart.title")}
          </h1>
          <p className="text-text-2 text-sm">{t("chart.description")}</p>
        </div>
        <div className="w-full overflow-x-auto">
          <ChartDashboard />
        </div>
      </CardApp>
    </div>
  );
};

export default Dashboard;
