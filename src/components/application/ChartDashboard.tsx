"use client";
import { capitalize } from "@/utils/capitalize";
import React from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  NameType,
  Payload,
  ValueType,
} from "recharts/types/component/DefaultTooltipContent";

const dataSales = [
  {
    month: "Jan",
    name: "January",
    sales: 800,
  },
  {
    month: "Feb",
    name: "February",
    sales: 3000,
  },
  {
    month: "Mar",
    name: "March",
    sales: 2000,
  },
  {
    month: "Apr",
    name: "April",
    sales: 2780,
  },
  {
    month: "May",
    name: "May",
    sales: 1890,
  },
  {
    month: "Jun",
    name: "June",
    sales: 2390,
  },
  {
    month: "Jul",
    name: "July",
    sales: 3490,
  },
  {
    month: "Aug",
    name: "August",
    sales: 2000,
  },
  {
    month: "Sep",
    name: "September",
    sales: 2780,
  },
  {
    month: "Oct",
    name: "October",
    sales: 1890,
  },
  {
    month: "Nov",
    name: "November",
    sales: 2390,
  },
  {
    month: "Dec",
    name: "December",
    sales: 3100,
  },
];

type Props = {
  active?: boolean;
  payload?: Payload<ValueType, NameType>[];
  label: string;
};

const CustomTooltip = ({ active, payload }: Props) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-bg-1 rounded-xl shadow-lg shadow-shadow-1 border-[1px] border-border-2 px-4 py-2">
        <p className="text-sm">{payload[0].payload.name}</p>
        <p className="text-sm text-text-2">
          <span className="text-sm font-semibold">
            {capitalize(payload[0].name?.toString())}
          </span>
          : {payload[0].value}
        </p>
      </div>
    );
  }
};

const DashboardChart = () => {
  return (
    <div className="h-64 w-[1000px] lg:w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={dataSales}
          width={20}
          margin={{
            right: 30,
            top: 24,
          }}
        >
          <CartesianGrid vertical={false} className="stroke-border-2" />
          <XAxis
            dataKey="month"
            tickSize={10}
            stroke="var(--border-1)"
            strokeWidth={0}
            tick={{
              fill: "var(--text-1)",
            }}
          />
          <YAxis
            tickMargin={10}
            stroke="var(--border-1)"
            strokeWidth={0}
            tick={{
              fill: "var(--text-1)",
            }}
          />
          <Area
            type="monotone"
            dataKey="sales"
            stroke="var(--primary)"
            fill="url(#main)"
          />
          <Tooltip
            content={({ payload, label, active }) => (
              <CustomTooltip active={active} label={label} payload={payload} />
            )}
          />
          <defs>
            <linearGradient id="main" x1="0" y1="1" x2="0" y2="0">
              <stop offset="0%" stopColor="var(--primary)" stopOpacity={0} />
              <stop
                offset="100%"
                stopColor="var(--primary)"
                stopOpacity={0.8}
              />
            </linearGradient>
          </defs>
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default DashboardChart;
