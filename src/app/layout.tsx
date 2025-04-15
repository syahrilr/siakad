import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";

import { Navbar } from "@/components/globals/navbar";
import { ThemeProvider } from "@/components/provider/theme-provider";

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
        <ThemeProvider attribute="class" defaultTheme="light">
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
