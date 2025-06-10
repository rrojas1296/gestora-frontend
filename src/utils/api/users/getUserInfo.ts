import type { UserInfo } from "@/types/api/users/getUserInfo";
import { apiInstance } from "../instance";
import { createClient } from "@/utils/supabase/client";

export const getUserInfo = async () => {
  const {
    data: { user: userSupabase },
  } = await createClient().auth.getUser();
  if (!userSupabase) return;
  const userId = userSupabase?.id;
  const { data } = await apiInstance.get<UserInfo>(
    `/users/getUserById/${userId}`,
  );
  return data;
};
