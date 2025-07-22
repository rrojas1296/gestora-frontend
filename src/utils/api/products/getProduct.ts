import { ApiResponse } from "@/types/api/response";
import apiInstance from "../instance";
import { ProductDB } from "@/types/api/inventory";

export const getProduct = async (id: string) => {
  const r = await apiInstance.get<ApiResponse<ProductDB>>(
    "/products/getProduct/" + id,
  );
  return r.data.data;
};
