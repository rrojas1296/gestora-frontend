import type { Metadata } from "next";
import "../styles/index.css";

export const metadata: Metadata = {
  title: "Gestora",
  description: "Sales administration app",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
