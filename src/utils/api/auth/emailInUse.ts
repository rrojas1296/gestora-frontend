import { ApiResponse } from "@/types/api/response";
import apiInstance from "../instance";

type Response = {
  inUse: boolean;
};

export const emailInUse = async (email: string) => {
  const { data } = await apiInstance.get<ApiResponse<Response>>(
    `/register/emailInUse/${email}`,
  );
  return data.data.inUse;
};
