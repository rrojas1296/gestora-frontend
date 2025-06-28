import CheckBox from "@/components/shared/CheckBox";
import { IProduct, Status } from "@/types/api/inventory";
import { ColumnDef, PaginationState } from "@tanstack/react-table";
import Image from "next/image";
import { capitalize } from "../capitalize";
import { v4 as uuidv4 } from "uuid";
import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "housy-lib";
import DotsIcon from "@/components/Icons/DotsIcon";
import Badge from "@/components/shared/Badge";
import TrashIcon from "@/components/Icons/TrashIcon";
import OpenEyeIcon from "@/components/Icons/OpenEyeIcon";
import EditIcon from "@/components/Icons/EditIcon";

type TranslatorFunction = (key: string) => string;

export const generateInvetoryColumns = (
  t: TranslatorFunction,
): ColumnDef<IProduct>[] => {
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
        const { name, image_url } = info.row.original;
        return (
          <div className="flex items-center gap-4 w-fit">
            <Image
              src={image_url}
              alt={name}
              width={50}
              height={50}
              className="rounded-full object-cover w-10 h-10"
            />
            <span className="text-sm">{name}</span>
          </div>
        );
      },
    },
    {
      header: t("table.columns.sales.header"),
      cell: (info) => info.getValue(),
      accessorKey: "sales",
    },
    {
      header: t("table.columns.price.header"),
      cell: (info) => info.getValue(),
      accessorKey: "price",
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
      id: "actions",
      header: "",
      cell: (info) => {
        const { id } = info.row.original;
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
            <DropdownMenuContent className="w-36">
              <DropdownMenuItem onClick={() => console.log(id)}>
                <EditIcon className="w-5 h-5 text-text-1 stroke-current" />
                {t("table.menu.edit")}
              </DropdownMenuItem>
              <DropdownMenuItem>
                <OpenEyeIcon className="w-5 h-5 text-text-1 stroke-current" />
                {t("table.menu.view")}
              </DropdownMenuItem>
              <DropdownMenuItem className="text-red-500 focus:text-red-500">
                <TrashIcon className="w-5 h-5 text-red-500 stroke-current" />
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

const categories = ["Electronics", "Home", "Toys", "Books", "Fashion"];
const productNames = [
  'Tv 55" Samsung OLED',
  "PlayStation 5",
  'MacBook Pro 14"',
  "iPhone 15 Pro",
  "Kindle Paperwhite",
  "Dyson V15 Vacuum",
  "GoPro Hero 12",
  "Xiaomi Smartwatch",
  "Echo Dot 5",
  "Nintendo Switch OLED",
  "PlayStation 4",
  "MacBook Air 13",
  "iPhone 14 Pro",
  "Kindle Oasis",
  "Huawei Mate 40 Pro",
  "GoPro Hero 10",
  "Xiaomi Redmi Note 11",
  "Echo Dot 4",
  "Nintendo Switch",
  "PlayStation 3",
  "MacBook Pro 16",
  "iPhone 13 Pro",
  "Kindle Paperwhite 2",
  "Huawei Mate 30 Pro",
];

const statuses: Status[] = [
  "active",
  "inactive",
  "out_of_stock",
  "discontinued",
];
const imageUrl =
  "https://images.unsplash.com/photo-1553456558-aff63285bdd1?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
export const generateProduct = () => {
  const name = productNames[Math.floor(Math.random() * productNames.length)];
  const status = statuses[Math.floor(Math.random() * statuses.length)];
  const price = Math.floor(Math.random() * 3000 + 100);
  const salesPrice = price + Math.floor(Math.random() * 1000);
  return {
    id: uuidv4(),
    name,
    price,
    salesPrice,
    currency: "USD",
    category: categories[Math.floor(Math.random() * categories.length)],
    image_url: imageUrl,
    sales: Math.floor(Math.random() * 1000),
    status,
    created_at: new Date(),
  } as IProduct;
};

function generateProducts(count = 20) {
  return Array.from({ length: count }, generateProduct);
}

export const inventoryData = generateProducts(100);
