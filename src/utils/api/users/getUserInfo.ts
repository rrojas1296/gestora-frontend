import type { UserInfo } from "@/types/api/users/getUserInfo";
import { apiInstance } from "../instance";

export const getUserInfo = async (id?: string) => {
  if (!id) return null;
  const { data } = await apiInstance.get<UserInfo>(`/users/getUserById/${id}`);
  return data;
};
