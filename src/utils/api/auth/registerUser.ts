import apiInstance from "../instance";

export type AuthProvider = "google" | "email";

export interface RegisterUserData {
  email: string;
  first_name: string;
  last_name: string;
  provider: AuthProvider;
  company_name: string;
  company_sector: string;
  user_id: string;
  photo_url?: string;
}
export const registerUser = async (data: RegisterUserData) => {
  try {
    const response = await apiInstance.post("/register/userAndCompany", data);
    return response;
  } catch (err) {
    return { err };
  }
};
