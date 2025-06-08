"use client";
import React, { ReactNode, useEffect } from "react";
import { I18nextProvider } from "react-i18next";
import es from "@/assets/locales/es/index.json";
import en from "@/assets/locales/en/index.json";
import i18n from "i18next";

export const LANGUAGE_KEY = "language_app";

i18n.init({
  fallbackLng: "en",
  debug: true,
  resources: {
    en: {
      translation: en,
    },
    es: {
      translation: es,
    },
  },
});
type Props = {
  children: ReactNode;
};

const TranslationProvider = ({ children }: Props) => {
  useEffect(() => {}, []);
  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
};

export default TranslationProvider;
