import { ApiResponse } from "@/types/api/response";
import { UserDB } from "@/types/api/users";
import apiInstance from "../instance";

export const getAuthUser = async () => {
  const { data } =
    await apiInstance.get<ApiResponse<UserDB>>("/users/getAuthUser");
  return data.data;
};
