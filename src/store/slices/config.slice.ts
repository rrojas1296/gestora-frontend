import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

export interface ConfigState {
  currentTheme?: "light" | "dark";
  sidebarOpen?: boolean;
  loader?: boolean;
}

export const THEME_KEY = "theme_app";

const initialState: ConfigState = {
  currentTheme: undefined,
  sidebarOpen: false,
  loader: false,
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    setTheme: (state, action: PayloadAction<ConfigState>) => {
      const { currentTheme } = action.payload;
      if (!currentTheme) return;
      localStorage.setItem(THEME_KEY, currentTheme);
      document.documentElement.classList.remove("light", "dark");
      document.documentElement.classList.add(currentTheme);
      state.currentTheme = currentTheme;
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

export const { setTheme, setSidebarOpen } = themeSlice.actions;

export default themeSlice.reducer;
