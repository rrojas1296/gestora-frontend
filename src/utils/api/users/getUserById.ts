import { ApiResponse } from "@/types/api/response";
import { UserInfo } from "@/types/api/users";
import apiInstance from "../instance";

export const getUserById = async (userId?: string) => {
  if (!userId) return null;
  const { data } = await apiInstance.get<ApiResponse<UserInfo>>(
    "/users/getUserById/" + userId,
  );
  return data.data || null;
};
