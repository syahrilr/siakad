"use client";

import { BookOpen, Clock, Microscope } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

const scheduleSummary = {
  days: [
    { name: "Senin", classes: 3, hours: 4.5 },
    { name: "Selasa", classes: 2, hours: 3 },
    { name: "Rabu", classes: 1, hours: 1.5 },
    { name: "Kamis", classes: 2, hours: 3 },
    { name: "Jumat", classes: 0, hours: 0 },
    { name: "Sabtu", classes: 0, hours: 0 },
  ],
  types: [
    { name: "Kuliah", count: 6, icon: BookOpen },
    { name: "Praktikum", count: 2, icon: Microscope },
  ],
  totalHours: 12,
  maxHoursPerDay: 6,
};

export function ScheduleSummary() {
  return (
    <Card className="h-full border shadow-sm">
      <CardHeader className="pb-2">
        <CardTitle>Ringkasan Jadwal</CardTitle>
        <CardDescription>Distribusi kelas per hari</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="font-medium">Distribusi Harian</span>
              <span className="text-muted-foreground">
                {scheduleSummary.totalHours} jam/minggu
              </span>
            </div>

            <div className="space-y-3">
              {scheduleSummary.days.map((day) => (
                <div key={day.name} className="space-y-1">
                  <div className="flex items-center justify-between text-sm">
                    <span>{day.name}</span>
                    <span className="text-muted-foreground">
                      {day.classes} kelas ({day.hours} jam)
                    </span>
                  </div>
                  <Progress
                    value={(day.hours / scheduleSummary.maxHoursPerDay) * 100}
                    className="h-2"
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="font-medium">Jenis Kelas</span>
              <span className="text-muted-foreground">8 kelas</span>
            </div>

            <div className="space-y-3">
              {scheduleSummary.types.map((type) => (
                <div
                  key={type.name}
                  className="flex items-center justify-between"
                >
                  <div className="flex items-center gap-2">
                    <type.icon className="text-muted-foreground h-4 w-4" />
                    <span>{type.name}</span>
                  </div>
                  <span className="font-medium">{type.count}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-muted/30 rounded-lg border p-3">
            <div className="flex items-center gap-2">
              <Clock className="text-muted-foreground h-5 w-5" />
              <div>
                <h4 className="font-medium">Jam Sibuk</h4>
                <p className="text-muted-foreground text-sm">
                  Senin, 10:00 - 14:00
                </p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
