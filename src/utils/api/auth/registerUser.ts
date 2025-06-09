import { apiInstance } from "../instance";

export type AuthProvider = "google" | "email";

interface RegisterUserData {
  email: string;
  first_name: string;
  last_name: string;
  id: string;
  provider: AuthProvider;
}
export const registerUser = async (data: RegisterUserData) => {
  try {
    const response = await apiInstance.post("/users/createUser", data);
    return response;
  } catch (err) {
    return { err };
  }
};
