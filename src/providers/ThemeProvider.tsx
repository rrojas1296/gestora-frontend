"use client";
import { useAppDispatch } from "@/store/hooks";
import { setTheme, THEME_KEY } from "@/store/slices/config.slice";
import React, { useEffect, useState } from "react";

interface Props {
  children: React.ReactNode;
}

const ThemeProvider = ({ children }: Props) => {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const localTheme = localStorage.getItem(THEME_KEY);
    const systemIsDark = window.matchMedia("(prefers-color-scheme: dark)");
    if (localTheme) {
      dispatch(setTheme({ isDark: localTheme === "dark" }));
    } else {
      // If no theme is set in localStorage, set the default theme
      dispatch(setTheme({ isDark: systemIsDark.matches }));
    }
    setLoading(false);
  }, [dispatch]);
  if (loading) return null;
  return <>{children}</>;
};

export default ThemeProvider;
