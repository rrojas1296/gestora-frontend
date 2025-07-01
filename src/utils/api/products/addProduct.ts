import { Status } from "@/types/api/inventory";
import { apiInstance } from "../instance";
import { ApiResponse } from "@/types/api/response";

type AddProductResponse = {
  id: string;
  name: string;
  description: string;
  sales_price: number;
  cost_price: number;
  quantity: number;
  status: Status;
  created_at: Date;
  updated_at: Date;
};

export type ProductBody = {
  name: string;
  description: string;
  sales_price: number;
  cost_price: number;
  quantity: number;
  status: Status;
};

export const createProduct = async (data: ProductBody) => {
  const response = await apiInstance.post<ApiResponse<AddProductResponse>>(
    "/products/createProduct",
    data,
  );
  return response.data.data;
};
