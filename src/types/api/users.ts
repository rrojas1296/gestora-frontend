type UserRole = "owner" | "admin" | "staff";
type UserPlan = "free" | "pro" | "enterprise";

export interface UserDB {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  photo_url: string;
  provider: string;
  user_role: UserRole;
  is_deleted: boolean;
  plan: UserPlan;
  company_id: string;
  companies: { id: string; name: string; sector: string }[];
  created_at: string | Date;
  updated_at: string | Date;
}
