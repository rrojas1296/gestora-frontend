import React, { ReactNode } from "react";
import { NextIntlClientProvider } from "next-intl";

export const LANGUAGE_KEY = "language_app";

type Props = {
  children: ReactNode;
};

const TranslationProvider = async ({ children }: Props) => {
  return <NextIntlClientProvider>{children}</NextIntlClientProvider>;
};

export default TranslationProvider;
