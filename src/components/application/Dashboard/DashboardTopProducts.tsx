import { cn } from "@/utils/cn";
import { useTranslations } from "next-intl";
import Image from "next/image";
import React from "react";

const PRODUCT_IMAGE =
  "https://images.unsplash.com/photo-1553456558-aff63285bdd1?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

const data = [
  {
    id: "57c0f9f5-6240-4ddc-b479-330ebc5a9a97",
    name: "Product 1",
    image_url: PRODUCT_IMAGE,
    sales: 200,
    price: 30.0,
    currency: "USD",
    category: "Electronics",
  },
  {
    id: "a1b2c3d4-e5f6-7g8h-9i0j-k1l2m3n4o5p6",
    name: "Product 2",
    image_url: PRODUCT_IMAGE,
    sales: 150,
    price: 45.0,
    currency: "USD",
    category: "Books",
  },
  {
    id: "d7e8f9g0-h1i2j3k4-l5m6n7o8-p9q0r1s2t3u4",
    name: "Product 3",
    image_url: PRODUCT_IMAGE,
    sales: 300,
    price: 20.0,
    currency: "USD",
    category: "Clothing",
  },
  {
    id: "v5w6x7y8-z9a0b1c2-d3e4f5g6-h7i8j9k0l1m2",
    name: "Product 4",
    image_url: PRODUCT_IMAGE,
    sales: 100,
    price: 60.0,
    currency: "USD",
    category: "Home & Kitchen",
  },
  {
    id: "n3o4p5q6-r7s8t9u0-v1w2x3y4-z5a6b7c8d9e0",
    name: "Product 5",
    image_url: PRODUCT_IMAGE,
    sales: 250,
    price: 15.0,
    currency: "USD",
    category: "Toys",
  },
];

interface Props {
  data?: any[];
}

const DashboardTopProducts: React.FC<Props> = () => {
  const t = useTranslations("Dashboard");
  return (
    <div>
      {data.map((product, index) => {
        const { name, id, price, sales, category, currency, image_url } =
          product;
        return (
          <div
            key={id}
            className={cn(
              "grid grid-cols-7 items-center",
              index !== data.length - 1 && "pb-3",
            )}
          >
            <div className="flex gap-3 items-start col-start-1 col-end-4">
              <Image
                src={image_url}
                alt={name}
                width={50}
                height={50}
                className="rounded-full w-12 h-12 object-cover"
              />
              <div className="grid gap-2">
                <h2 className="font-bold text-sm text-text-1">{name}</h2>
                <p className="text-xs text-text-2">{category}</p>
              </div>
            </div>
            <p className="text-sm text-text-1 justify-self-center col-start-4 col-end-6">
              {sales} {t("topProducts.data.units")}
            </p>
            <p className="text-text-1 justify-self-end text-sm col-start-6 col-end-8">
              {price} {currency}
            </p>
          </div>
        );
      })}
    </div>
  );
};

export default DashboardTopProducts;
