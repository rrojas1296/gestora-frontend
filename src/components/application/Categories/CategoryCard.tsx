import OpenEyeIcon from "@/components/Icons/OpenEyeIcon";
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
  const { id, name, description, image_url } = category;
  return (
    <div
      key={id}
      className="text-text-1 group flex flex-col overflow-hidden cursor-pointer hover:shadow-shadow-1 hover:shadow-md transition-all border border-border-2 rounded-xl"
    >
      <div className="relative">
        <Image
          className="w-full object-cover block rounded-t-xl h-48"
          src={image_url}
          alt={name}
          width={300}
          height={200}
        />
        <div className="absolute opacity-0 transition-opacity group-hover:opacity-100 top-0 left-0 bg-bg-3 flex justify-center items-center w-full h-full gap-4">
          <Button variant="icon" className="hover:bg-primary w-fit h-fit p-2">
            <OpenEyeIcon className="text-text-3 w-8 h-8 stroke-current" />
          </Button>
          <Button
            variant="icon"
            className="hover:bg-primary w-fit h-fit p-2"
            onClick={() => openDialog()}
          >
            <TrashIcon className="text-text-3 w-8 h-8 stroke-current" />
          </Button>
        </div>
      </div>

      <div className="flex flex-col gap-2 p-4 bg-bg-2 flex-1 rounded-b-xl">
        <p className="text-text-1 font-semibold text-lg">{name}</p>
        <p className="text-text-2 text-sm">{description}</p>
      </div>
    </div>
  );
};

export default CategoryCard;
