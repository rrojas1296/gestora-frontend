export const statusOptions = [
  "active",
  "inactive",
  "out_of_stock",
  "discontinued",
] as const;

export type Status = (typeof statusOptions)[number];

export interface IProduct {
  id: string;
  name: string;
  price: number;
  salesPrice: number;
  currency: string;
  category: string;
  image_url: string;
  sales: number;
  status: Status;
  created_at: Date;
}
