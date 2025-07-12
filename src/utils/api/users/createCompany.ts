import { ApiResponse } from "@/types/api/response";
import apiInstance from "../instance";

interface CompanyBody {
  name: string;
  sector: string;
}

interface CompanyResponse {
  id: string;
  name: string;
  sector: string;
}

export const createCompany = async (data: CompanyBody) => {
  try {
    const response = await apiInstance.post<ApiResponse<CompanyResponse>>(
      "/companies/createCompany",
      data,
    );
    return response.data;
  } catch {
    return null;
  }
};
