import { ApiResponse } from "@/types/api/response";
import apiInstance from "../instance";

interface CategoryBody {
  name: string;
  description: string;
  is_active: boolean;
  company_id: string;
  image_url: string;
}
export const createCategory = async (data: CategoryBody) => {
  const r = await apiInstance.post<ApiResponse<string>>(
    "/categories/createCategory",
    data,
  );
  return r.data.data;
};
