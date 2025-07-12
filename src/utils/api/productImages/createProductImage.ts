import { ApiResponse } from "@/types/api/response";
import apiInstance from "../instance";

interface AddProductImageResponse {
  id: string;
  product_id: string;
  url: string;
  created_at: Date;
  updated_at: Date;
}

export interface CreateProductImage {
  product_id: string;
  is_deleted: boolean;
  is_primary: boolean;
  url: string;
}

export const createProductImage = async (data: CreateProductImage) => {
  const response = await apiInstance.post<ApiResponse<AddProductImageResponse>>(
    "/product-images/create",
    data,
  );
  return response.data.data;
};
