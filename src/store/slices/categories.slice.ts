import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CategoriesState {
  id: string;
  name: string;
  description: string;
  company_id: string;
  image_url: string;
}

const initialState: CategoriesState[] = [];

const categorieSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    setCategories(_, action: PayloadAction<CategoriesState[]>) {
      return action.payload;
    },
  },
});

export const { setCategories } = categorieSlice.actions;
export default categorieSlice.reducer;
