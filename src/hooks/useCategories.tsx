import { getCategoriesPerCompany } from "@/utils/api/categories/getCategoriesPerCompany";
import { useQuery } from "@tanstack/react-query";

const useCategories = (companyId?: string) => {
  const {
    data: categories,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["categories", companyId],
    queryFn: async () => {
      if (companyId) return await getCategoriesPerCompany(companyId);
    },
    enabled: !!companyId,
  });
  return { categories, isLoading, error, refetch };
};

export default useCategories;
