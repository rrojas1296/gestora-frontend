import { ApiResponse } from "@/types/api/response";
import apiInstance from "../instance";
import { SchemaType } from "@/schemas/addProductSchema";

type AddProductResponse = {
  id: string;
};

export type ProductBody = Omit<SchemaType, "images" | "category"> & {
  category_id: string;
  company_id?: string;
};
export const createProduct = async (data: ProductBody) => {
  const response = await apiInstance.post<ApiResponse<AddProductResponse>>(
    "/products/createProduct",
    data,
  );
  return response.data.data;
};
