"use client";
import { configureStore } from "@reduxjs/toolkit";
import ConfigSlice from "./slices/config.slice";
import RegisterSlice from "./slices/register.slice";
// ...

export const store = configureStore({
  reducer: {
    config: ConfigSlice,
    register: RegisterSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export type AppStore = typeof store;
