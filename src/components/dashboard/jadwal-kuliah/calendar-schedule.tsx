"use client";

import { useState } from "react";

import { Calendar, LayoutDashboard } from "lucide-react";

import { CalendarView } from "@/components/dashboard/calendar-view";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { UpcomingClasses } from "../upcoming-classes";
import { CourseStatistics } from "./course-statistic";
import { PrintScheduleComponent } from "./print-schedule";
import { ScheduleSummary } from "./schedule-summary";

export function CalendarSchedule() {
  const [activeTab, setActiveTab] = useState("dashboard");

  return (
    <div className="space-y-6">
      <div className="flex justify-end">
        <PrintScheduleComponent />
      </div>

      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="space-y-4"
      >
        <TabsList>
          <TabsTrigger value="dashboard" className="flex items-center gap-1.5">
            <LayoutDashboard className="h-4 w-4" />
            <span>Dashboard</span>
          </TabsTrigger>
          <TabsTrigger value="calendar" className="flex items-center gap-1.5">
            <Calendar className="h-4 w-4" />
            <span>Kalender</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="dashboard" className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <CourseStatistics />
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            <div className="md:col-span-2">
              <UpcomingClasses />
            </div>
            <div>
              <ScheduleSummary />
            </div>
          </div>
        </TabsContent>

        <TabsContent value="calendar" className="space-y-4">
          <CalendarView />
        </TabsContent>
      </Tabs>
    </div>
  );
}
