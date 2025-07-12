"use client";
import { configureStore } from "@reduxjs/toolkit";
import ConfigSlice from "./slices/config.slice";
import RegisterSlice from "./slices/register.slice";
import ProductSlice from "./slices/product.slice";
import CompanySlice from "./slices/company.slice";
import UserSlice from "./slices/user.slice";
import CategorieSlice from "./slices/categories.slice";
// ...

export const store = configureStore({
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
  reducer: {
    config: ConfigSlice,
    register: RegisterSlice,
    company: CompanySlice,
    product: ProductSlice,
    user: UserSlice,
    categories: CategorieSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export type AppStore = typeof store;
