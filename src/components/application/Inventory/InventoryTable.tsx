"use client";
import { ProductDB } from "@/types/api/inventory";
import { cn } from "@/utils/cn";
import { flexRender, Table } from "@tanstack/react-table";
import React from "react";

interface Props {
  table: Table<ProductDB>;
}

const InventoryTable = ({ table }: Props) => {
  return (
    <div className="overflow-x-auto grid gap-6">
      <table className="w-[1300px] md:w-full">
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
    </div>
  );
};

export default InventoryTable;
