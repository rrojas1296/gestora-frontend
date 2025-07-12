import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CompanyState {
  id?: string;
  name?: string;
  sector?: string;
}

const initialState: CompanyState = {};

const companySlice = createSlice({
  name: "company",
  initialState,
  reducers: {
    setCompany: (state, action: PayloadAction<CompanyState>) => ({
      ...state,
      ...action.payload,
    }),
  },
});

export const { setCompany } = companySlice.actions;

export default companySlice.reducer;
