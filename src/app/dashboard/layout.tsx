import type { Metadata } from "next";
import { Inter } from "next/font/google";
import type React from "react";

import "@/app/globals.css";
import DashboardLayout from "@/components/dashboard/dashboard-layout";

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
    <html lang="en">
      <body className={inter.className}>
        <DashboardLayout>{children}</DashboardLayout>
      </body>
    </html>
  );
}
