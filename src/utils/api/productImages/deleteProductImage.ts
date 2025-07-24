import { ApiResponse } from "@/types/api/response";
import apiInstance from "../instance";

export const deleteProductImage = async (id: string) => {
  const res = await apiInstance.delete<ApiResponse<{ id: string }>>(
    "/product-images/deleteProductImage/" + id,
  );
  return res.data.data.id;
};
