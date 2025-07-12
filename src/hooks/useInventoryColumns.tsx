import Badge from "@/components/shared/Badge";
import CheckBox from "@/components/shared/CheckBox";
import { IMG_PRODUCT_DEFAULT } from "@/config/constants";
import { AddProductSchemaType } from "@/schemas/addProductSchema";
import { ProductDB } from "@/types/api/inventory";
import { capitalize } from "@/utils/capitalize";
import { ColumnDef } from "@tanstack/react-table";
import moment from "moment";
import Image from "next/image";
import { UseFormReset } from "react-hook-form";
import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "gestora-lib";
import TrashIcon from "@/components/Icons/TrashIcon";
import OpenEyeIcon from "@/components/Icons/OpenEyeIcon";
import EditIcon from "@/components/Icons/EditIcon";
import DotsIcon from "@/components/Icons/DotsIcon";
import { useTranslations } from "next-intl";

type Props = {
  setOpenSidebar: (val: boolean) => void;
  setOpenDialog: (val: boolean) => void;
  setIdProduct: (val: string) => void;
  reset: UseFormReset<AddProductSchemaType>;
};

const useInventoryColumns = ({
  setIdProduct,
  setOpenDialog,
  setOpenSidebar,
  reset,
}: Props) => {
  const t = useTranslations("Inventory");
  const columns: ColumnDef<ProductDB>[] = [
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
        console.log({ id });
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
                    sales_price: String(other.sales_price),
                    description: String(other.description),
                    name: other.name,
                    quantity: String(other.quantity),
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
                className="text-red-500 focus:text-red-500"
              >
                <TrashIcon className="w-5 h-5 text-red-500 stroke-current" />
                {t("table.menu.delete")}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];
  return { columns };
};

export default useInventoryColumns;
