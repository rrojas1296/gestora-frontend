import { hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import TranslationProvider from "@/providers/TranslationProvider";
import ReactQueryProvider from "@/providers/ReactQueryProvider";
import StoreProvider from "@/providers/StoreProvider";
import ThemeProvider from "@/providers/ThemeProvider";
import { Toaster } from "sonner";
import { Raleway } from "next/font/google";
const font = Raleway({
  subsets: ["latin"],
});

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  // Ensure that the incoming `locale` is valid
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  return (
    <html lang={locale} className={font.className}>
      <body>
        <TranslationProvider>
          <ReactQueryProvider>
            <StoreProvider>
              <ThemeProvider>
                {children}
                <Toaster position="bottom-center" />
              </ThemeProvider>
            </StoreProvider>
          </ReactQueryProvider>
        </TranslationProvider>
      </body>
    </html>
  );
}
