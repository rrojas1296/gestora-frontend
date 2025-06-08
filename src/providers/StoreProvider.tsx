"use client";
import { store } from "@/store/store";
import React, { ReactNode } from "react";
import { Provider } from "react-redux";

type Props = {
  children: ReactNode;
};

const StoreProvider = ({ children }: Props) => {
  return <Provider store={store}>{children}</Provider>;
};

export default StoreProvider;
