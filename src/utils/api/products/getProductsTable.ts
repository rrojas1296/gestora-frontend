import { ApiResponse } from "@/types/api/response";
import apiInstance from "../instance";
import { ProductDB } from "@/types/api/inventory";

type Data = {
  products: ProductDB[];
  total: number;
  generalCount: number;
};

export const getProductsTable = async (
  page: number,
  limit: number,
  search: string,
  companyId?: string,
) => {
  const { data } = await apiInstance.get<ApiResponse<Data>>(
    "/products/get-products-table",
    {
      params: {
        page,
        limit,
        search,
        companyId,
      },
    },
  );
  return data.data;
};
