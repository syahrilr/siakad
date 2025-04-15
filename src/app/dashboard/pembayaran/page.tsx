import type { Metadata } from "next";

import { PembayaranPage } from "@/components/dashboard/pembayaran/payment-page";

export const metadata: Metadata = {
  title: "Pembayaran - Keuangan Mahasiswa",
  description: "Informasi pembayaran dan keuangan mahasiswa",
};

export default function Pembayaran() {
  return <PembayaranPage />;
}
