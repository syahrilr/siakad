import type { Metadata } from "next";
import { Inter } from "next/font/google";

import { ThemeProvider as NextThemesProvider } from "next-themes";

import { ThemeProvider } from "@/components/globals/theme/theme-provider";

import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "SIAKAD - Sistem Informasi Akademik",
  description:
    "Sistem Informasi Akademik untuk pengelolaan data dan aktivitas akademik",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} antialiased`}>
        <NextThemesProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
        >
          <ThemeProvider>{children}</ThemeProvider>
        </NextThemesProvider>
      </body>
    </html>
  );
}
