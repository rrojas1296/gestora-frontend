import { getProductsTable } from "@/utils/api/products/getProductsTable";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

type Props = {
  page: number;
  limit: number;
  search: string;
};

const useProducts = ({ page, limit, search }: Props) => {
  return useQuery({
    queryKey: ["productsTable", page, search],
    queryFn: () => getProductsTable(page, limit, search),
    placeholderData: keepPreviousData,
  });
};

export default useProducts;
