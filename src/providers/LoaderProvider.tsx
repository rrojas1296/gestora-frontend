"use client";
import Loader from "@/components/shared/Loader";
import { useAppSelector } from "@/store/hooks";
import React from "react";

interface Props {
  children: React.ReactNode;
}

const LoaderProvider = ({ children }: Props) => {
  const isLoading = useAppSelector((state) => state.config.loader);
  return (
    <>
      {children}
      {isLoading && <Loader />}
    </>
  );
};

export default LoaderProvider;
