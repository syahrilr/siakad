import type { Metadata } from "next";
import type React from "react";

import "@/app/globals.css";
import DashboardLayout from "@/components/dashboard/dashboard-layout";

export const metadata: Metadata = {
  title: "SIAKAD - Sistem Informasi Akademik",
  description:
    "Sistem Informasi Akademik untuk pengelolaan data dan aktivitas akademik",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <DashboardLayout>{children}</DashboardLayout>;
}
