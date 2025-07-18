import { ApiResponse } from "@/types/api/response";
import apiInstance from "../instance";

export type CategoryDB = {
  company_id: string;
  created_at: Date;
  description: string;
  id: string;
  image_url: string;
  is_active: boolean;
  is_deleted: boolean;
  name: string;
  updated_at: Date;
};

export const getCategoriesPerCompany = async (id: string) => {
  const r = await apiInstance.get<ApiResponse<CategoryDB[]>>(
    `/categories/getCategoriesPerCompany/${id}`,
  );
  return r.data.data;
};
