import type { Metadata } from "next";

import { DashboardHeader } from "@/components/dashboard/header";
import { CalendarSchedule } from "@/components/dashboard/jadwal-kuliah/calendar-schedule";

export const metadata: Metadata = {
  title: "Jadwal Kuliah | SIAKAD",
  description: "Jadwal Kuliah",
};

export default function JadwalKuliahPage() {
  return (
    <div className="container mx-auto mt-10 flex flex-col space-y-8">
      <DashboardHeader
        heading="Jadwal Kuliah"
        text="Jadwal Kuliah Semester Genap 2024/2025"
        semester="Semester 8 - 2024/2025"
      />
      <CalendarSchedule />
    </div>
  );
}
