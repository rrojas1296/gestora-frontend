import { statusOptions } from "@/schemas/addProductSchema";

export type Status = (typeof statusOptions)[number];

export interface ProductImage {
  url: string;
  id: string;
  name: string;
  is_primary: boolean;
  is_deleted: boolean;
}

enum Currency {
  USD = "USD",
  EUR = "EUR",
  PEN = "PEN",
}

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
  min_stock: number;
  category_id: string;
  created_by: string;
  is_deleted: boolean;
  brand: string;
  sku: string;
  category: string;
  created_at: Date;
  updated_at: Date;
  weight?: number;
  width?: number;
  height?: number;
  length?: number;
  color?: string;
  images: ProductImage[];
}
