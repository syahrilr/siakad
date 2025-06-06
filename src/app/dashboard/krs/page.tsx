import type { Metadata } from "next";

import { CalendarView } from "@/components/dashboard/calendar-view";
import { DashboardHeader } from "@/components/dashboard/header";
import { KRSForm } from "@/components/dashboard/krs/krs-form";
import { KRSSchedule } from "@/components/dashboard/krs/krs-schedule";
import { KRSStatus } from "@/components/dashboard/krs/krs-status";

export const metadata: Metadata = {
  title: "KRS | SIAKAD",
  description: "Kartu Rencana Studi",
};

export default function KRSPage() {
  return (
    <div className="container mx-auto mt-10 flex flex-col space-y-8">
      <DashboardHeader
        heading="Kartu Rencana Studi"
        text="Pengisian KRS Semester Genap 2023/2024"
        semester="Semester 8 - 2024/2025"
      />

      <div className="grid grid-cols-1 gap-6 md:grid-cols-7">
        <div className="space-y-6 md:col-span-5">
          <KRSForm />
          <CalendarView />
        </div>
        <div className="space-y-6 md:col-span-2">
          <KRSStatus />
          <KRSSchedule />
        </div>
      </div>
    </div>
  );
}
