import { apiInstance } from "../instance";

type Response = {
  email: string;
  id: string;
};

export const emailInUse = async (email: string) => {
  const { data } = await apiInstance.get<Response>(
    `/users/getUserByEmail/${email}`,
  );
  return data ? true : false;
};
