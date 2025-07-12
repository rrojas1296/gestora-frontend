"use client";
import NoCategories from "@/components/application/categories/NoCategories";
import CardApp from "@/components/shared/CardApp";
import useCategories from "@/hooks/useCategories";
import { useAppSelector } from "@/store/hooks";
import Image from "next/image";
import React from "react";

const Category = () => {
  const company = useAppSelector((state) => state.company);
  const companyId = company.id;
  const { categories } = useCategories(companyId);
  return categories && categories.length ? (
    <CardApp>
      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {categories.map((category) => {
          const { id, name, image_url, description } = category;
          return (
            <div
              key={id}
              className="text-text-1 overflow-hidden rounded-xl h-48 relative cursor-pointer group"
            >
              <Image
                className="w-full h-full object-cover"
                src={image_url}
                alt={name}
                width={300}
                height={300}
              />

              <div className="bg-linear-to-b opacity-0 transition-opacity from-black/20 flex flex-col gap-2 group-hover:opacity-100 justify-end p-4 to-black/60 absolute top-0 left-0 w-full h-full">
                <p className="text-text-3 font-semibold text-lg">{name}</p>
                <p className="text-text-3 text-sm">{description}</p>
              </div>
            </div>
          );
        })}
      </div>
    </CardApp>
  ) : (
    <NoCategories />
  );
};

export default Category;
