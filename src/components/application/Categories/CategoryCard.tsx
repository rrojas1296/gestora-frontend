import ItemsIcon from "@/components/Icons/ItemsIcon";
import SalesIcon from "@/components/Icons/SalesIcon";
import TrashIcon from "@/components/Icons/TrashIcon";
import { CategoryDB } from "@/utils/api/categories/getCategoriesPerCompany";
import { Button } from "gestora-lib";
import Image from "next/image";
import React from "react";

interface Props {
  category: CategoryDB;
  openDialog: () => void;
}

const CategoryCard = ({ category, openDialog }: Props) => {
  const { id, name, image_url } = category;
  return (
    <div
      key={id}
      className="text-text-1 flex gap-4 p-2 bg-bg-1 group shadow-shadow-1 shadow-md overflow-hidden cursor-pointer hover:bg-bg-2 transition-colors border border-border-2 rounded-lg"
    >
      <Image
        className="w-32 h-32 object-cover block rounded-lg"
        src={image_url}
        alt={name}
        width={130}
        height={130}
      />
      <div className="flex flex-col gap-6 flex-1 rounded-b-xl">
        <div className="flex justify-between">
          <div className="flex flex-col">
            <p className="text-text-1 font-semibold text-lg">{name}</p>
            <p className="text-text-2 text-sm">Iphones category</p>
          </div>
          <Button
            variant="icon"
            className="hover:bg-bg-1 hidden group-hover:flex shrink-0"
            onClick={openDialog}
          >
            <TrashIcon className="w-6 h-6 stroke-current text-danger " />
          </Button>
        </div>
        <div className="flex gap-4 text-sm">
          <div className="flex items-center gap-2">
            <ItemsIcon className="w-6 h-6 stroke-current text-text-2" />
            <span>22</span>
          </div>
          <div className="flex items-center gap-2">
            <SalesIcon className="w-6 h-6 stroke-current text-text-2" />
            <span>102</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryCard;
