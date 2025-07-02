"use client";
import FormAddProduct from "@/components/application/Inventory/FormAddProduct";
import InventoryTable from "@/components/application/Inventory/InventoryTable";
import ExportIcon from "@/components/Icons/ExportIcon";
import FilterIcon from "@/components/Icons/FilterIcon";
import PlusIcon from "@/components/Icons/PlusIcon";
import SearchIcon from "@/components/Icons/SearchIcon";
import CardApp from "@/components/shared/CardApp";
import Pagination from "@/components/shared/Pagination";
import useProducts from "@/hooks/useProducts";
import {
  addProductInitialState,
  addProductSchema,
} from "@/schemas/addProductSchema";
import { getProductsTable } from "@/utils/api/products/getProductsTable";
import { generateInvetoryColumns } from "@/utils/application/inventory";
import { zodResolver } from "@hookform/resolvers/zod";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import {
  ColumnFiltersState,
  getCoreRowModel,
  getFilteredRowModel,
  PaginationState,
  useReactTable,
} from "@tanstack/react-table";
import { Button, Input, Sidebar } from "housy-lib";
import { useTranslations } from "next-intl";
import React, { useEffect, useMemo, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";

const Inventory = () => {
  const t = useTranslations("Inventory");
  const [openSidebar, setOpenSidebar] = useState(false);
  const [rowSelected, setRowSelected] = useState<Record<number, boolean>>({});
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });
  console.log({ pagination });
  const [search, setSearch] = useState("");

  const { data, refetch } = useQuery({
    queryKey: ["productsTable", pagination, search],
    queryFn: () =>
      getProductsTable(pagination.pageIndex + 1, pagination.pageSize, search),
    placeholderData: keepPreviousData,
  });
  const totalPages = data ? Math.ceil(data.total / pagination.pageSize) : 0;
  const columns = useMemo(() => generateInvetoryColumns(t), [t]);
  const table = useReactTable({
    data: data?.products || [],
    columns,
    state: {
      rowSelection: rowSelected,
      columnFilters,
      pagination,
    },
    manualPagination: true,
    rowCount: data?.total || 0,
    pageCount: totalPages,
    getRowId: (row) => row.id,
    enableRowSelection: true,
    onRowSelectionChange: setRowSelected,
    onColumnFiltersChange: setColumnFilters,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });
  const methods = useForm({
    resolver: zodResolver(addProductSchema),
    defaultValues: addProductInitialState,
  });

  const handleInputChange = (value: string) => {
    const hg = table.getHeaderGroups()[0].headers.find((h) => h.id === "name");
    hg?.column.setFilterValue(value);
    setSearch(value);
    setPagination({
      pageSize: 10,
      pageIndex: 0,
    });
  };

  const setPage = (page: number) => {
    setPagination({
      pageSize: 10,
      pageIndex: page,
    });
  };
  return (
    <>
      <FormProvider {...methods}>
        <CardApp className="grid gap-6">
          <div className="grid gap-6 items-center sm:flex sm:justify-between">
            <Input
              placeholder={t("search")}
              containerClassName="border-border-1 max-w-none w-full sm:max-w-[307px] w-full"
              onChange={(e) => handleInputChange(e.target.value)}
              Icon={
                <SearchIcon className="w-6 h-6 text-text-2 stroke-current" />
              }
              style={{
                maxWidth: "unset",
              }}
            />

            <div className="flex lg:justify-between items-center gap-6 grid-cols-4 overflow-x-auto sm:overflow-x-visible">
              <div className="flex items-center gap-6">
                <Button
                  variant="outlined"
                  className="text-nowrap h-9 max-w-none text-text-2"
                >
                  <FilterIcon className="w-4 h-4 stroke-current" />
                  {t("filter")}
                </Button>
                <Button
                  variant="outlined"
                  className="text-nowrap h-9 max-w-none text-text-2"
                >
                  <ExportIcon className="w-4 h-4 stroke-current" />
                  {t("export")}
                </Button>
                <Button
                  variant="filled"
                  className="text-nowrap h-9 font-normal text-sm items-center w-fit"
                  onClick={() => setOpenSidebar(true)}
                >
                  <PlusIcon className="w-4 h-4 text-text-3 stroke-current" />
                  {t("add")}
                </Button>
              </div>
            </div>
          </div>
          <InventoryTable table={table} />
          <Pagination
            totalPages={totalPages}
            setPage={setPage}
            pagination={pagination}
            className="mt-9"
          />
        </CardApp>
        <Sidebar
          open={openSidebar}
          setOpen={(open) => {
            setOpenSidebar(open);
            methods.reset(addProductInitialState);
          }}
          position="right"
          className="w-screen bg-bg-1 lg:w-md px-8 border-l py-8 overflow-y-auto"
        >
          <FormAddProduct
            refetch={refetch}
            onClose={() => setOpenSidebar(false)}
          />
        </Sidebar>
      </FormProvider>
    </>
  );
};

export default Inventory;
