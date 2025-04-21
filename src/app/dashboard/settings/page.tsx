import type { Metadata } from "next";

import { SettingsPage } from "@/components/globals/settings";

export const metadata: Metadata = {
  title: "SIAKAD | Pengaturan",
  description: "Pengaturan SIAKAD",
};

export default function Settings() {
  return <SettingsPage />;
}
