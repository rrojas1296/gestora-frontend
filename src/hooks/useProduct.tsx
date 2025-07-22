import { getProduct } from "@/utils/api/products/getProduct";
import { useQuery } from "@tanstack/react-query";

const useProduct = (productId?: string) => {
  const { data, isLoading } = useQuery({
    queryKey: ["product", productId],
    queryFn: async () => {
      if (productId) return getProduct(productId);
    },
    enabled: !!productId,
  });
  return { product: data, isLoading };
};

export default useProduct;
