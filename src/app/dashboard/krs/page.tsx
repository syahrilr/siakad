import type { Metadata } from "next";

import { DashboardHeader } from "@/components/dashboard/header";
import { KRSForm } from "@/components/dashboard/krs/krs-form";
import { KRSSchedule } from "@/components/dashboard/krs/krs-schedule";
import { KRSStatus } from "@/components/dashboard/krs/krs-status";
import { DashboardShell } from "@/components/dashboard/shell";

export const metadata: Metadata = {
  title: "KRS | SIAKAD",
  description: "Kartu Rencana Studi",
};

export default function KRSPage() {
  return (
    <DashboardShell>
      <div className="flex flex-col space-y-8">
        <DashboardHeader
          heading="Kartu Rencana Studi"
          text="Pengisian KRS Semester Genap 2023/2024"
          semester="Semester 6 - 2023/2024"
        />

        <div className="grid gap-6 md:grid-cols-7">
          <div className="space-y-6 md:col-span-5">
            <KRSForm />
          </div>
          <div className="space-y-6 md:col-span-2">
            <KRSStatus />
            <KRSSchedule />
          </div>
        </div>
      </div>
    </DashboardShell>
  );
}
