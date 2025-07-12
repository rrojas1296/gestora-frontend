import { getCategoriesPerCompany } from "@/utils/api/categories/getCategoriesPerCompany";
import { useQuery } from "@tanstack/react-query";

const useCategories = (companyId?: string) => {
  const {
    data: categories,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["categories", companyId],
    queryFn: () => {
      if (companyId) return getCategoriesPerCompany(companyId);
    },
    enabled: !!companyId,
  });
  return { categories, isLoading, error };
};

export default useCategories;
