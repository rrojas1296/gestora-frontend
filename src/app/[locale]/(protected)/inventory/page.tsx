"use client";
import EmptyTable from "@/components/application/Inventory/EmptyTable";
import InventoryTable from "@/components/application/Inventory/InventoryTable";
import ExportIcon from "@/components/Icons/ExportIcon";
import FilterIcon from "@/components/Icons/FilterIcon";
import LoaderIcon from "@/components/Icons/LoaderIcon";
import PlusIcon from "@/components/Icons/PlusIcon";
import SearchIcon from "@/components/Icons/SearchIcon";
import CardApp from "@/components/shared/CardApp";
import Loader from "@/components/shared/Loader";

import Pagination from "@/components/shared/Pagination";
import useInventoryColumns from "@/hooks/useInventoryColumns";
import { useAppSelector } from "@/store/hooks";
import { deleteProduct } from "@/utils/api/products/deleteProduct";
import { getProductsTable } from "@/utils/api/products/getProductsTable";
import { debounce } from "@/utils/debounce";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import {
  ColumnFiltersState,
  getCoreRowModel,
  getFilteredRowModel,
  PaginationState,
  useReactTable,
} from "@tanstack/react-table";
import { Button, Dialog, Input, Toast } from "gestora-lib";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import React, { useCallback, useState } from "react";
import { toast } from "sonner";

const Inventory = () => {
  const t = useTranslations("Inventory");
  const router = useRouter();
  const [openDialog, setOpenDialog] = useState(false);
  const [idProduct, setIdProduct] = useState("");
  const [loadingDelete, setLoadingDelete] = useState(false);
  const companyId = useAppSelector((state) => state.company.id);
  const [rowSelected, setRowSelected] = useState<Record<number, boolean>>({});
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });
  const [search, setSearch] = useState("");

  const { data, refetch, isLoading } = useQuery({
    queryKey: ["productsTable", pagination, search],
    queryFn: () =>
      getProductsTable(
        pagination.pageIndex + 1,
        pagination.pageSize,
        search,
        companyId,
      ),
    placeholderData: keepPreviousData,
    enabled: !!companyId,
  });
  const totalPages = data ? Math.ceil(data.total / pagination.pageSize) : 0;
  const { columns } = useInventoryColumns({
    setIdProduct,
    setOpenDialog,
  });
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

  const handleInputChange = useCallback(
    debounce((value: string) => {
      const hg = table
        .getHeaderGroups()[0]
        .headers.find((h) => h.id === "name");
      hg?.column.setFilterValue(value);
      setSearch(value);
      setPagination({
        pageSize: 10,
        pageIndex: 0,
      });
    }, 500),
    [],
  );

  const handleDeleteProduct = async () => {
    try {
      setLoadingDelete(true);
      const r = toast.custom(
        () => <Toast text="Deleting product" type="loading" />,
        {
          duration: 1000 * 100,
        },
      );
      await deleteProduct(idProduct);
      toast.custom(() => <Toast text="Product deleted" type="success" />);
      toast.dismiss(r);
    } finally {
      setLoadingDelete(false);
      setOpenDialog(false);
      refetch();
    }
  };

  const setPage = (page: number) => {
    setPagination({
      pageSize: 10,
      pageIndex: page,
    });
  };
  if (isLoading)
    return <Loader className="h-[calc(100vh-148px)] static bg-bg-2 w-full" />;
  return (
    <>
      {(data?.total && data?.total > 0) ||
      (data?.generalCount && data?.generalCount > 0) ? (
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
                  onClick={() => router.push("/inventory/form")}
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
      ) : (
        <EmptyTable />
      )}
      <Dialog
        open={openDialog}
        setOpen={setOpenDialog}
        dialogClassName="flex flex-col gap-2 max-w-md w-11/12"
      >
        <h1 className="text-lg text-text-1 font-semibold">
          {t("deleteDialog.title")}
        </h1>
        <h2 className="text-sm text-text-2">{t("deleteDialog.description")}</h2>
        <div className="flex gap-4 self-end">
          <Button
            variant="ghost"
            onClick={() => setOpenDialog(false)}
            className="hover:bg-bg-1"
          >
            {t("deleteDialog.button.cancel")}
          </Button>
          <Button
            onClick={handleDeleteProduct}
            className="bg-danger font-semibold hover:bg-danger"
          >
            {loadingDelete && (
              <LoaderIcon className="animate-spin w-5 h-5 text-text-3 stroke-current" />
            )}
            {t("deleteDialog.button.delete")}
          </Button>
        </div>
      </Dialog>
    </>
  );
};

export default Inventory;
