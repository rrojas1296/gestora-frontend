import { UserDB } from "@/types/api/users";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type User = Partial<
  Omit<UserDB, "created_at" | "updated_at" | "companies" | "is_deleted"> & {
    companies: { id: string; name: string; current: boolean }[];
  }
>;
const initialState: User = {};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => ({
      ...state,
      ...action.payload,
    }),
  },
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;
