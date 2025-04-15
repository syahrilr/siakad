import type { Metadata } from "next";

import { TranskripPage } from "@/components/dashboard/transkrip";

export const metadata: Metadata = {
  title: "Transkrip - Nilai Akademik",
  description: "Transkrip nilai dan riwayat akademik mahasiswa",
};

export default function Transkrip() {
  return <TranskripPage />;
}
