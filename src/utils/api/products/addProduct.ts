import { Status } from "@/types/api/inventory";
import { ApiResponse } from "@/types/api/response";
import apiInstance from "../instance";

type AddProductResponse = {
  id: string;
};

export type ProductBody = {
  name: string;
  category_id: string;
  sales_price: number;
  cost_price: number;
  quantity: number;
  status: Status;
  company_id: string;
  description?: string;
};

export const createProduct = async (data: ProductBody) => {
  const response = await apiInstance.post<ApiResponse<AddProductResponse>>(
    "/products/createProduct",
    data,
  );
  return response.data.data;
};
