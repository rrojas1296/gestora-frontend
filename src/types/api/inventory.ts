import { statusOptions } from "@/schemas/addProductSchema";

export type Status = (typeof statusOptions)[number];

export interface ProductImage {
  url: string;
  id: string;
  is_primary: boolean;
  is_deleted: boolean;
}

export const currencies = ["USD", "EUR", "PEN"];

export type Currency = (typeof currencies)[number];

export interface ProductDB {
  id: string;
  name: string;
  description: string;
  sales_price: number;
  cost_price: number;
  company_id: string;
  quantity: number;
  status: Status;
  currency: Currency;
  category_id: string;
  created_by: string;
  is_deleted: boolean;
  category: string;
  created_at: Date;
  updated_at: Date;
  images: ProductImage[];
}
