import type { Metadata } from "next";

import { SettingsPage } from "@/components/globals/settings";

export const metadata: Metadata = {
  title: "Settings - Customize Your Experience",
  description: "Customize your application settings and preferences",
};

export default function Settings() {
  return <SettingsPage />;
}
