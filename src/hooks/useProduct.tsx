import { getProduct } from "@/utils/api/products/getProduct";
import { useQuery } from "@tanstack/react-query";

const useProduct = (productId?: string) => {
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["product", productId],
    queryFn: async () => {
      if (productId) return await getProduct(productId);
    },
    enabled: !!productId,
  });
  return { product: data, isLoading, refetch };
};

export default useProduct;
