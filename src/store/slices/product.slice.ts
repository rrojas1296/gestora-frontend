import { Status } from "@/types/api/inventory";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ProductState {
  newProduct: {
    name: string;
    description: string;
    sales_price: string;
    cost_price: string;
    quantity: string;
    status: Status;
    images: File[];
  };
}

const initialState: ProductState = {
  newProduct: {
    cost_price: "",
    description: "",
    status: "active",
    images: [],
    name: "",
    quantity: "",
    sales_price: "",
  },
};

const productSLice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setNewProduct(state, action: PayloadAction<ProductState>) {
      const { newProduct } = action.payload;
      return {
        ...state,
        newProduct,
      };
    },
  },
});

export const { setNewProduct } = productSLice.actions;
export default productSLice.reducer;
