import { ApiResponse } from "@/types/api/response";
import apiInstance from "../instance";
import { SchemaType } from "@/schemas/addProductSchema";

export type ProductBody = Omit<SchemaType, "images"> & {
  company_id?: string;
};
export const updateProduct = async (data: ProductBody, id: string) => {
  const response = await apiInstance.put<ApiResponse<string>>(
    "/products/updateProduct/" + id,
    data,
  );
  return response.data.data;
};
