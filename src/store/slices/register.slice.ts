import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface RegisterState {
  email?: string;
  firstName?: string;
  lastName?: string;
  password?: string;
  confirmPassword?: string;
}

const initialState: RegisterState = {
  email: "",
  firstName: "",
  lastName: "",
  password: "",
  confirmPassword: "",
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
