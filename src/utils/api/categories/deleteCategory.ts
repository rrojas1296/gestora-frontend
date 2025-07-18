import { ApiResponse } from "@/types/api/response";
import apiInstance from "../instance";

export const deleteCategory = async (id: string) => {
  const r = await apiInstance.delete<ApiResponse<string>>(
    `/categories/deleteCategory/${id}`,
  );
  return r.data.data;
};
