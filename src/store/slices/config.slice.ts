import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

export interface ConfigState {
  isDark?: boolean;
  sidebarOpen?: boolean;
  loader?: boolean;
}

export const THEME_KEY = "theme_app";

const initialState: ConfigState = {
  isDark: false,
  sidebarOpen: false,
  loader: false,
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    setTheme: (state, action: PayloadAction<ConfigState>) => {
      const { isDark } = action.payload;
      if (isDark === undefined) return;
      localStorage.setItem(THEME_KEY, isDark ? "dark" : "light");
      document.documentElement.classList.remove("dark");
      if (isDark) document.documentElement.classList.add("dark");
      return { ...state, isDark };
    },

    setSidebarOpen: (state, action: PayloadAction<ConfigState>) => {
      const { sidebarOpen } = action.payload;
      return { ...state, sidebarOpen };
    },
    setLoading: (state, action: PayloadAction<ConfigState>) => {
      const { loader } = action.payload;
      return { ...state, loader };
    },
  },
});

export const { setTheme, setSidebarOpen, setLoading } = themeSlice.actions;

export default themeSlice.reducer;
