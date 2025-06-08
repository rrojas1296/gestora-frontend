"use client";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  setTheme,
  THEME_KEY,
  type ConfigState,
} from "@/store/slices/config.slice";
import React, { useEffect } from "react";

interface Props {
  children: React.ReactNode;
}

const ThemeProvider = ({ children }: Props) => {
  const dispatch = useAppDispatch();
  const { currentTheme } = useAppSelector((state) => state.config);

  useEffect(() => {
    const localTheme = localStorage.getItem(THEME_KEY);
    const isDark = window.matchMedia("(prefers-color-scheme: dark)");
    if (localTheme) {
      dispatch(
        setTheme({ currentTheme: localTheme as ConfigState["currentTheme"] }),
      );
    } else {
      // If no theme is set in localStorage, set the default theme
      dispatch(setTheme({ currentTheme: isDark ? "dark" : "light" }));
    }
  }, [dispatch]);
  if (!currentTheme) return null;
  return <>{children}</>;
};

export default ThemeProvider;
