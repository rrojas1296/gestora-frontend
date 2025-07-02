import { ApiResponse } from "@/types/api/response";
import apiInstance from "../instance";
import { IProduct } from "@/types/api/inventory";

type Data = {
  products: IProduct[];
  total: number;
};

export const getProductsTable = async (
  page: number,
  limit: number,
  search: string,
) => {
  const { data } = await apiInstance.get<ApiResponse<Data>>(
    "/products/get-products-table",
    {
      params: {
        page,
        limit,
        search,
      },
    },
  );
  console.log({ data });
  return data.data;
};
