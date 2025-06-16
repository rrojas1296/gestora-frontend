"use client";
import { cn } from "@/utils/cn";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useTranslations } from "next-intl";
import Image from "next/image";

type TendProduct = {
  name: string;
  sales: number;
  price: number;
  image_url: string;
  currency: string;
};

const image_url =
  "https://images.unsplash.com/photo-1553456558-aff63285bdd1?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

const data: TendProduct[] = [
  {
    name: "Product 1",
    sales: 150,
    price: 29.99,
    image_url,
    currency: "USD",
  },
  {
    name: "Product 2",
    sales: 200,
    price: 49.99,
    image_url,
    currency: "USD",
  },
  {
    name: "Product 3",
    sales: 300,
    price: 19.99,
    image_url,
    currency: "USD",
  },
  {
    name: "Product 4",
    sales: 100,
    price: 39.99,
    image_url,
    currency: "USD",
  },
  {
    name: "Product 5",
    sales: 300,
    price: 209.99,
    image_url,
    currency: "USD",
  },
];

const columnHelper = createColumnHelper<TendProduct>();

const DashboardTable = () => {
  const t = useTranslations("Dashboard");
  const columns = [
    columnHelper.accessor("name", {
      cell: (info) => {
        const row = info.row.original;
        return (
          <div className="flex items-center gap-4 w-fit">
            <Image
              src={row.image_url}
              alt={row.name}
              width={50}
              height={50}
              className="rounded-full object-cover w-10 h-10"
            />
            <span className="text-sm">{row.name}</span>
          </div>
        );
      },
      header: t("table.columns.name.header"),
    }),
    columnHelper.accessor("sales", {
      cell: (info) => info.getValue(),
      header: t("table.columns.sales.header"),
    }),
    columnHelper.accessor("price", {
      cell: (info) => {
        const row = info.row.original;
        return (
          <div className="flex gap-2 items-center w-[120px]">
            <span>{row.price}</span>
            <span className="font-semibold">{row.currency}</span>
          </div>
        );
      },
      header: t("table.columns.price.header"),
    }),
  ];
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });
  return (
    <table className="w-full">
      <thead>
        {table.getHeaderGroups().map((headerGroup) => (
          <tr key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <th
                key={header.id}
                className="py-2 text-start pr-6 font-semibold"
              >
                {!header.isPlaceholder &&
                  flexRender(
                    header.column.columnDef.header,
                    header.getContext(),
                  )}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody>
        {table.getRowModel().rows.map((row) => (
          <tr key={row.id} className="hover:bg-bg-2 transition-colors">
            {row.getVisibleCells().map((cell) => (
              <td
                key={cell.id}
                className={cn("text-sm py-2 border-t-[1px] border-border-2")}
              >
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default DashboardTable;
