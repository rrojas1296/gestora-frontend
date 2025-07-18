import CheckBox from "@/components/shared/CheckBox";
import { ProductDB } from "@/types/api/inventory";
import { ColumnDef, PaginationState } from "@tanstack/react-table";
import Image from "next/image";
import { capitalize } from "../capitalize";
import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "gestora-lib";
import DotsIcon from "@/components/Icons/DotsIcon";
import Badge from "@/components/shared/Badge";
import TrashIcon from "@/components/Icons/TrashIcon";
import OpenEyeIcon from "@/components/Icons/OpenEyeIcon";
import EditIcon from "@/components/Icons/EditIcon";
import moment from "moment";
import { UseFormReset } from "react-hook-form";
import { SchemaType } from "@/schemas/addProductSchema";
import { IMG_PRODUCT_DEFAULT } from "@/config/constants";

type TranslatorFunction = (key: string) => string;

export const generateInvetoryColumns = ({
  t,
  setOpenDialog,
  setIdProduct,
  reset,
  setOpenSidebar,
}: {
  t: TranslatorFunction;
  setOpenSidebar: (val: boolean) => void;
  setOpenDialog: (val: boolean) => void;
  setIdProduct: (val: string) => void;
  reset: UseFormReset<SchemaType>;
}): ColumnDef<ProductDB>[] => {
  return [
    {
      id: "select",
      header: ({ table }) => (
        <CheckBox
          checked={table.getIsAllPageRowsSelected()}
          onChange={table.getToggleAllPageRowsSelectedHandler()}
        />
      ),
      cell: ({ row }) => (
        <CheckBox
          checked={row.getIsSelected()}
          onChange={row.getToggleSelectedHandler()}
        />
      ),
    },
    {
      header: t("table.columns.name.header"),
      accessorKey: "name",
      cell: (info) => {
        const { name, images } = info.row.original;
        const image_url =
          images.find((i) => i.is_primary)?.url || IMG_PRODUCT_DEFAULT;
        return (
          <div className="flex items-center gap-4 w-fit">
            <Image
              src={image_url}
              alt={name}
              width={50}
              height={50}
              className="rounded-md object-cover w-10 h-10"
            />
            <span className="text-sm">{name}</span>
          </div>
        );
      },
    },
    {
      header: t("table.columns.sales_price.header"),
      cell: (info) => info.getValue(),
      accessorKey: "sales_price",
    },
    {
      header: t("table.columns.cost_price.header"),
      cell: (info) => info.getValue(),
      accessorKey: "cost_price",
    },
    {
      header: t("table.columns.quantity.header"),
      cell: (info) => info.getValue(),
      accessorKey: "quantity",
    },
    {
      header: t("table.columns.currency.header"),
      accessorKey: "currency",
      cell: (info) => info.getValue(),
    },
    {
      header: t("table.columns.status.header"),
      accessorKey: "status",
      cell: (info) => {
        const type = info.row.original.status;
        return (
          <Badge type={type}>{capitalize(info.getValue() as string)}</Badge>
        );
      },
    },
    {
      header: t("table.columns.created_at.header"),
      accessorKey: "created_at",
      cell: (info) => {
        return moment(info.getValue() as string).fromNow();
      },
    },
    {
      id: "actions",
      header: "",
      cell: (info) => {
        const { id, ...other } = info.row.original;
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="icon"
                className="p-0 flex place-items-center hover:bg-bg-1"
              >
                <DotsIcon className="w-5 h-5 text-text-1 stroke-current" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-40">
              <DropdownMenuItem
                onClick={() => {
                  setOpenSidebar(true);
                  reset({
                    cost_price: other.cost_price,
                    sales_price: other.sales_price,
                    description: other.description,
                    name: other.name,
                    quantity: other.quantity,
                    status: other.status,
                    images: [],
                  });
                }}
              >
                <EditIcon className="w-5 h-5 text-text-1 stroke-current" />
                {t("table.menu.edit")}
              </DropdownMenuItem>
              <DropdownMenuItem>
                <OpenEyeIcon className="w-5 h-5 text-text-1 stroke-current" />
                {t("table.menu.view")}
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => {
                  setOpenDialog(true);
                  setIdProduct(id);
                }}
                className="text-danger focus:text-danger"
              >
                <TrashIcon className="w-5 h-5 text-danger stroke-current" />
                {t("table.menu.delete")}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];
};
export const sliceArrayForPagination = (
  array: number[],
  pagination: PaginationState,
) => {
  const totalButtons = 5;
  const half = Math.floor(totalButtons / 2);

  let start = pagination.pageIndex - half;

  if (start < 0) start = 0;
  if (start + totalButtons > array.length) {
    start = Math.max(0, array.length - totalButtons);
  }

  const end = start + totalButtons;
  return array.slice(start, end);
};
