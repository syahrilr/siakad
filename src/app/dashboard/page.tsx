import type { Metadata } from "next";

import { AcademicProgress } from "@/components/dashboard/academic-progress";
import { AttendanceChart } from "@/components/dashboard/attendance-chart";
import { CalendarView } from "@/components/dashboard/calendar-view";
import { GradeDistribution } from "@/components/dashboard/grade-distribution";
import { DashboardHeader } from "@/components/dashboard/header";
import { OverviewStats } from "@/components/dashboard/overview-stats";
import { QuickActions } from "@/components/dashboard/quick-action";
import { RecentAnnouncements } from "@/components/dashboard/recent-announcements";
import { DashboardShell } from "@/components/dashboard/shell";
import { UpcomingClasses } from "@/components/dashboard/upcoming-classes";
import { Separator } from "@/components/ui/separator";

export const metadata: Metadata = {
  title: "Dashboard | SIAKAD",
  description: "Dashboard Sistem Informasi Akademik",
};

export default function DashboardPage() {
  return (
    <div className="flex flex-col space-y-8">
      <DashboardHeader
        heading="Dashboard Mahasiswa"
        text="Selamat datang kembali, Ahmad Fauzi"
        semester="Semester 5 - 2023/2024"
      />

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <OverviewStats />
      </div>

      <div>
        <h2 className="mb-6 text-2xl font-bold tracking-tight">
          Aktivitas Akademik
        </h2>
        <Separator className="mb-6" />
        <div className="grid gap-6 md:gap-8 lg:grid-cols-7">
          <div className="col-span-full space-y-6 lg:col-span-4">
            <UpcomingClasses />
            <div className="grid gap-6 md:grid-cols-2">
              <AcademicProgress />
              <AttendanceChart />
            </div>
          </div>
          <div className="col-span-full space-y-6 lg:col-span-3">
            <QuickActions />
            <RecentAnnouncements />
          </div>
        </div>
      </div>

      <div>
        <h2 className="mb-6 text-2xl font-bold tracking-tight">
          Performa & Jadwal
        </h2>
        <Separator className="mb-6" />
        <div className="grid gap-6 md:gap-8 lg:grid-cols-2">
          <GradeDistribution />
          <CalendarView />
        </div>
      </div>
    </div>
  );
}
