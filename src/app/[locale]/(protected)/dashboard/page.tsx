import DashboardChart from "@/components/application/Dashboard/DashboardChart";
import DashboardTopProducts from "@/components/application/Dashboard/DashboardTopProducts";
import CartIcon from "@/components/Icons/CartIcon";
import ReportIcon from "@/components/Icons/ReportIcon";
import TaxIcon from "@/components/Icons/TaxIcon";
import UsersIcon from "@/components/Icons/UsersIcon";
import CardApp from "@/components/shared/CardApp";
import { useTranslations } from "next-intl";
import React from "react";

const data = [
  {
    title: "earnings.title",
    description: "earnings.description",
    icon: TaxIcon,
    mount: 3400,
  },
  {
    title: "sales.title",
    description: "sales.description",
    icon: CartIcon,
    mount: 12,
  },
  {
    title: "reports.title",
    description: "reports.description",
    icon: ReportIcon,
    mount: 25,
  },
  {
    title: "users.title",
    description: "users.description",
    icon: UsersIcon,
    mount: 3,
  },
];

const Dashboard = () => {
  const t = useTranslations("Dashboard");

  return (
    <div className="grid gap-4">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {data.map((item, index) => {
          const { title, description, mount } = item;
          return (
            <CardApp key={index} className="grid gap-2">
              <div className="flex justify-between items-center">
                <p className="text-lg">{t(title)}</p>
                <item.icon className="w-6 h-6 text-text-1 stroke-current" />
              </div>
              <p className="text-4xl font-bold">{mount}</p>
              <p className="text-sm">{t(description)}</p>
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
          <DashboardChart />
        </div>
      </CardApp>
      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
        <CardApp className="col-start-1 col-end-2">
          <div className="grid gap-1 mb-6">
            <h1 className="text-xl text-text-1 font-medium">
              {t("topProducts.title")}
            </h1>
            <p className="text-text-2 text-sm">
              {t("topProducts.description")}
            </p>
          </div>
          <DashboardTopProducts />
        </CardApp>
        <CardApp>Pending</CardApp>
        <CardApp>Pending</CardApp>
      </div>
    </div>
  );
};

export default Dashboard;
