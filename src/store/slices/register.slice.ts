import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface RegisterState {
  email?: string;
  first_name?: string;
  last_name?: string;
  password?: string;
  confirmPassword?: string;
  company_name?: string;
  company_sector?: string;
}

const initialState: RegisterState = {
  email: "",
  first_name: "",
  last_name: "",
  password: "",
  confirmPassword: "",
  company_name: "",
  company_sector: "",
};

const registerSlice = createSlice({
  name: "register",
  initialState,
  reducers: {
    setRegisterData: (state, action: PayloadAction<RegisterState>) => {
      return {
        ...state,
        ...action.payload,
      };
    },
  },
});

export const { setRegisterData } = registerSlice.actions;

export default registerSlice.reducer;
