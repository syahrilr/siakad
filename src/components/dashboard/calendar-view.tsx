"use client";

import { useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Calendar } from "@/components/ui/calendar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function CalendarView() {
  const [date, setDate] = useState<Date | undefined>(new Date());

  // Example events for the calendar
  const events = [
    {
      date: new Date(2025, 3, 15),
      type: "class",
      title: "Algoritma dan Pemrograman",
    },
    {
      date: new Date(2025, 3, 17),
      type: "deadline",
      title: "Deadline Tugas Basis Data",
    },
    {
      date: new Date(2025, 3, 20),
      type: "exam",
      title: "UTS Jaringan Komputer",
    },
    { date: new Date(2025, 3, 25), type: "event", title: "Seminar Teknologi" },
  ];

  // Function to check if a date has an event
  const hasEvent = (day: Date) => {
    return events.some(
      (event) =>
        event.date.getDate() === day.getDate() &&
        event.date.getMonth() === day.getMonth() &&
        event.date.getFullYear() === day.getFullYear()
    );
  };

  // Function to get event type for a date
  const getEventType = (day: Date) => {
    const event = events.find(
      (event) =>
        event.date.getDate() === day.getDate() &&
        event.date.getMonth() === day.getMonth() &&
        event.date.getFullYear() === day.getFullYear()
    );
    return event?.type;
  };

  // Function to get event title for a date
  const getEventTitle = (day: Date) => {
    const event = events.find(
      (event) =>
        event.date.getDate() === day.getDate() &&
        event.date.getMonth() === day.getMonth() &&
        event.date.getFullYear() === day.getFullYear()
    );
    return event?.title;
  };

  return (
    <Card className="border-none shadow-lg">
      <CardHeader className="pb-3">
        <CardTitle>Kalender Akademik</CardTitle>
        <CardDescription>Jadwal dan kegiatan penting</CardDescription>
      </CardHeader>
      <CardContent>
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          className="rounded-md border"
          components={{
            DayContent: ({ date }) => {
              const eventType = getEventType(date);
              return (
                <div className="relative h-full w-full p-2">
                  <span>{date.getDate()}</span>
                  {hasEvent(date) && (
                    <div className="absolute bottom-1 left-1/2 -translate-x-1/2">
                      <div
                        className={`h-1.5 w-1.5 rounded-full ${
                          eventType === "class"
                            ? "bg-blue-500"
                            : eventType === "deadline"
                              ? "bg-amber-500"
                              : eventType === "exam"
                                ? "bg-red-500"
                                : "bg-emerald-500"
                        }`}
                      />
                    </div>
                  )}
                </div>
              );
            },
          }}
        />

        {date && hasEvent(date) && (
          <div className="mt-4 rounded-lg border p-3">
            <p className="font-medium">
              Event pada {date.toLocaleDateString("id-ID")}
            </p>
            <p className="text-muted-foreground text-sm">
              {getEventTitle(date)}
            </p>
          </div>
        )}

        <div className="mt-4 flex flex-wrap gap-2">
          <Badge
            variant="outline"
            className="bg-blue-500/10 text-blue-700 dark:text-blue-400"
          >
            Perkuliahan
          </Badge>
          <Badge
            variant="outline"
            className="bg-amber-500/10 text-amber-700 dark:text-amber-400"
          >
            Deadline Tugas
          </Badge>
          <Badge
            variant="outline"
            className="bg-red-500/10 text-red-700 dark:text-red-400"
          >
            Ujian
          </Badge>
          <Badge
            variant="outline"
            className="bg-emerald-500/10 text-emerald-700 dark:text-emerald-400"
          >
            Acara Kampus
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
}
