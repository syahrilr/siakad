import type { Metadata } from "next";

import { KuisionerPage } from "@/components/dashboard/kuisioner";

export const metadata: Metadata = {
  title: "Kuisioner - Evaluasi Pembelajaran",
  description: "Pengisian kuisioner evaluasi pembelajaran dan dosen",
};

export default function Kuisioner() {
  return <KuisionerPage />;
}
