import { ApiResponse } from "@/types/api/response";
import apiInstance from "../instance";

export const deleteProduct = async (id: string) => {
  const response = await apiInstance.delete<ApiResponse<string>>(
    `/products/deleteProduct/${id}`,
  );
  return response.data.data;
};
