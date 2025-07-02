export const statusOptions = [
  "active",
  "inactive",
  "out_of_stock",
  "discontinued",
] as const;

export type Status = (typeof statusOptions)[number];

export interface ProductImage {
  url: string;
  id: string;
}

export interface IProduct {
  id: string;
  currency: string;
  name: string;
  price: number;
  sales_price: number;
  cost_price: number;
  category: string;
  status: Status;
  created_at: Date;
  updated_at: Date;
  images: ProductImage[];
}
