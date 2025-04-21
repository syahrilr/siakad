"use client";

import { useEffect, useState } from "react";

import { CalendarIcon, ChevronLeft, ChevronRight, Info } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

interface CalendarEvent {
  id: string;
  date: Date;
  type: "class" | "deadline" | "exam" | "event";
  title: string;
  description?: string;
  time?: string;
  location?: string;
}

export function CalendarView() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [month, setMonth] = useState<Date>(new Date());
  const [selectedEvents, setSelectedEvents] = useState<CalendarEvent[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Example events for the calendar
  const events: CalendarEvent[] = [
    {
      id: "1",
      date: new Date(2025, 3, 15),
      type: "class",
      title: "Algoritma dan Pemrograman",
      description: "Materi: Algoritma Sorting dan Searching",
      time: "08:00 - 10:30",
      location: "Ruang Lab Komputer 3",
    },
    {
      id: "2",
      date: new Date(2025, 3, 15),
      type: "deadline",
      title: "Deadline Tugas Struktur Data",
      description: "Implementasi Binary Search Tree",
      time: "23:59",
    },
    {
      id: "3",
      date: new Date(2025, 3, 17),
      type: "deadline",
      title: "Deadline Tugas Basis Data",
      description: "Normalisasi Database dan ERD",
      time: "23:59",
    },
    {
      id: "4",
      date: new Date(2025, 3, 20),
      type: "exam",
      title: "UTS Jaringan Komputer",
      description: "Materi: OSI Layer, TCP/IP, dan Routing",
      time: "13:00 - 15:00",
      location: "Gedung Teknik Lt. 3",
    },
    {
      id: "5",
      date: new Date(2025, 3, 25),
      type: "event",
      title: "Seminar Teknologi",
      description: "Tema: Artificial Intelligence dan Machine Learning",
      time: "09:00 - 12:00",
      location: "Auditorium Utama",
    },
    {
      id: "6",
      date: new Date(2025, 3, 27),
      type: "class",
      title: "Pemrograman Web",
      description: "Materi: React dan Next.js",
      time: "13:00 - 15:30",
      location: "Ruang Lab Komputer 2",
    },
    {
      id: "7",
      date: new Date(2025, 3, 28),
      type: "event",
      title: "Workshop UI/UX Design",
      description: "Pembicara: Designer dari Google Indonesia",
      time: "10:00 - 16:00",
      location: "Gedung Multimedia",
    },
  ];

  // Simulate loading state
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  // Update selected events when date changes
  useEffect(() => {
    if (date) {
      const eventsOnSelectedDate = events.filter(
        (event) =>
          event.date.getDate() === date.getDate() &&
          event.date.getMonth() === date.getMonth() &&
          event.date.getFullYear() === date.getFullYear()
      );
      setSelectedEvents(eventsOnSelectedDate);
    } else {
      setSelectedEvents([]);
    }
  }, [date]);

  // Function to check if a date has an event
  const hasEvent = (day: Date) => {
    return events.some(
      (event) =>
        event.date.getDate() === day.getDate() &&
        event.date.getMonth() === day.getMonth() &&
        event.date.getFullYear() === day.getFullYear()
    );
  };

  // Function to get events for a date
  const getEventsForDate = (day: Date) => {
    return events.filter(
      (event) =>
        event.date.getDate() === day.getDate() &&
        event.date.getMonth() === day.getMonth() &&
        event.date.getFullYear() === day.getFullYear()
    );
  };

  // Function to get event type counts for a date
  const getEventTypeCounts = (day: Date) => {
    const eventsOnDay = getEventsForDate(day);
    const counts = {
      class: 0,
      deadline: 0,
      exam: 0,
      event: 0,
    };

    eventsOnDay.forEach((event) => {
      counts[event.type]++;
    });

    return counts;
  };

  // Function to navigate to previous month
  const previousMonth = () => {
    const prevMonth = new Date(month);
    prevMonth.setMonth(prevMonth.getMonth() - 1);
    setMonth(prevMonth);
  };

  // Function to navigate to next month
  const nextMonth = () => {
    const nextMonth = new Date(month);
    nextMonth.setMonth(nextMonth.getMonth() + 1);
    setMonth(nextMonth);
  };

  // Function to navigate to current month
  const currentMonth = () => {
    setMonth(new Date());
    setDate(new Date());
  };

  // Get event type color
  const getEventTypeColor = (type: string) => {
    switch (type) {
      case "class":
        return "bg-blue-500";
      case "deadline":
        return "bg-amber-500";
      case "exam":
        return "bg-red-500";
      case "event":
        return "bg-emerald-500";
      default:
        return "bg-gray-500";
    }
  };

  // Get event type text color
  const getEventTypeTextColor = (type: string) => {
    switch (type) {
      case "class":
        return "text-blue-700 dark:text-blue-400";
      case "deadline":
        return "text-amber-700 dark:text-amber-400";
      case "exam":
        return "text-red-700 dark:text-red-400";
      case "event":
        return "text-emerald-700 dark:text-emerald-400";
      default:
        return "text-gray-700 dark:text-gray-400";
    }
  };

  // Get event type background color
  const getEventTypeBgColor = (type: string) => {
    switch (type) {
      case "class":
        return "bg-blue-500/10";
      case "deadline":
        return "bg-amber-500/10";
      case "exam":
        return "bg-red-500/10";
      case "event":
        return "bg-emerald-500/10";
      default:
        return "bg-gray-500/10";
    }
  };

  // Get event type label
  const getEventTypeLabel = (type: string) => {
    switch (type) {
      case "class":
        return "Perkuliahan";
      case "deadline":
        return "Deadline Tugas";
      case "exam":
        return "Ujian";
      case "event":
        return "Acara Kampus";
      default:
        return "Lainnya";
    }
  };

  return (
    <Card className="border shadow-lg transition-all duration-300 hover:shadow-xl">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <CalendarIcon className="text-primary h-5 w-5" />
              Kalender Akademik
            </CardTitle>
            <CardDescription>Jadwal dan kegiatan penting</CardDescription>
          </div>
          <div className="flex items-center gap-1">
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8"
              onClick={previousMonth}
            >
              <ChevronLeft className="h-4 w-4" />
              <span className="sr-only">Bulan sebelumnya</span>
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="h-8"
              onClick={currentMonth}
            >
              Hari ini
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8"
              onClick={nextMonth}
            >
              <ChevronRight className="h-4 w-4" />
              <span className="sr-only">Bulan berikutnya</span>
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="flex h-[350px] items-center justify-center">
            <div className="border-primary h-8 w-8 animate-spin rounded-full border-4 border-t-transparent"></div>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-[1fr_300px]">
            <div>
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                month={month}
                onMonthChange={setMonth}
                className="rounded-md border p-3"
                classNames={{
                  day_today: "bg-primary/10 font-bold text-primary",
                  day_selected:
                    "bg-primary !text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
                  day_outside: "text-muted-foreground opacity-50",
                }}
                components={{
                  DayContent: ({ date: dayDate, ...props }) => {
                    const dayEvents = getEventsForDate(dayDate);
                    const hasEvents = dayEvents.length > 0;
                    const eventCounts = getEventTypeCounts(dayDate);

                    return (
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <div
                              className={cn(
                                "relative flex h-9 w-9 items-center justify-center rounded-md p-0 text-sm transition-colors",
                                hasEvents && "font-medium",
                                hasEvents &&
                                  !props.activeModifiers.selected &&
                                  "hover:bg-muted"
                              )}
                            >
                              <span>{dayDate.getDate()}</span>
                              {hasEvents && (
                                <div className="absolute -bottom-1 flex gap-0.5">
                                  {eventCounts.class > 0 && (
                                    <div className="h-1.5 w-1.5 rounded-full bg-blue-500" />
                                  )}
                                  {eventCounts.deadline > 0 && (
                                    <div className="h-1.5 w-1.5 rounded-full bg-amber-500" />
                                  )}
                                  {eventCounts.exam > 0 && (
                                    <div className="h-1.5 w-1.5 rounded-full bg-red-500" />
                                  )}
                                  {eventCounts.event > 0 && (
                                    <div className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                                  )}
                                </div>
                              )}
                            </div>
                          </TooltipTrigger>
                          {hasEvents && (
                            <TooltipContent
                              side="bottom"
                              align="center"
                              className="max-w-[250px] p-0"
                            >
                              <div className="space-y-1 p-2">
                                <p className="font-medium">
                                  {dayDate.toLocaleDateString("id-ID", {
                                    weekday: "long",
                                    day: "numeric",
                                    month: "long",
                                  })}
                                </p>
                                <div className="max-h-[150px] space-y-1 overflow-auto">
                                  {dayEvents.map((event) => (
                                    <div
                                      key={event.id}
                                      className={cn(
                                        "rounded-sm px-1.5 py-0.5 text-xs",
                                        getEventTypeBgColor(event.type),
                                        getEventTypeTextColor(event.type)
                                      )}
                                    >
                                      {event.time && (
                                        <span>{event.time} - </span>
                                      )}
                                      {event.title}
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </TooltipContent>
                          )}
                        </Tooltip>
                      </TooltipProvider>
                    );
                  },
                }}
              />
            </div>

            <div className="flex flex-col gap-4">
              <div className="bg-card text-card-foreground rounded-lg border shadow-sm">
                <div className="flex flex-col space-y-1.5 p-4 pb-2">
                  <h3 className="text-sm leading-none font-medium">
                    {date
                      ? date.toLocaleDateString("id-ID", {
                          weekday: "long",
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        })
                      : "Pilih tanggal"}
                  </h3>
                </div>
                <div className="p-4 pt-0">
                  {selectedEvents.length > 0 ? (
                    <div className="space-y-3">
                      {selectedEvents.map((event) => (
                        <div
                          key={event.id}
                          className={cn(
                            "rounded-md border p-3 transition-all duration-200 hover:shadow-md",
                            getEventTypeBgColor(event.type)
                          )}
                        >
                          <div className="flex items-center justify-between">
                            <Badge
                              variant="outline"
                              className={cn(
                                "font-medium",
                                getEventTypeBgColor(event.type),
                                getEventTypeTextColor(event.type)
                              )}
                            >
                              {getEventTypeLabel(event.type)}
                            </Badge>
                            {event.time && (
                              <span className="text-muted-foreground text-xs">
                                {event.time}
                              </span>
                            )}
                          </div>
                          <h4 className="mt-2 font-medium">{event.title}</h4>
                          {event.description && (
                            <p className="text-muted-foreground mt-1 text-sm">
                              {event.description}
                            </p>
                          )}
                          {event.location && (
                            <div className="text-muted-foreground mt-2 flex items-center text-xs">
                              <Info className="mr-1 h-3 w-3" />
                              {event.location}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center py-6 text-center">
                      <div className="bg-muted rounded-full p-3">
                        <Calendar className="text-muted-foreground h-6 w-6" />
                      </div>
                      <h3 className="mt-3 text-sm font-medium">
                        Tidak ada kegiatan
                      </h3>
                      <p className="text-muted-foreground mt-1 text-xs">
                        Tidak ada kegiatan terjadwal pada tanggal ini.
                      </p>
                    </div>
                  )}
                </div>
              </div>

              <div className="rounded-lg border p-3">
                <h3 className="mb-2 text-sm font-medium">Keterangan</h3>
                <div className="flex flex-wrap gap-2">
                  <Badge
                    variant="outline"
                    className="bg-blue-500/10 text-blue-700 dark:text-blue-400"
                  >
                    <div className="mr-1.5 h-2 w-2 rounded-full bg-blue-500"></div>
                    Perkuliahan
                  </Badge>
                  <Badge
                    variant="outline"
                    className="bg-amber-500/10 text-amber-700 dark:text-amber-400"
                  >
                    <div className="mr-1.5 h-2 w-2 rounded-full bg-amber-500"></div>
                    Deadline Tugas
                  </Badge>
                  <Badge
                    variant="outline"
                    className="bg-red-500/10 text-red-700 dark:text-red-400"
                  >
                    <div className="mr-1.5 h-2 w-2 rounded-full bg-red-500"></div>
                    Ujian
                  </Badge>
                  <Badge
                    variant="outline"
                    className="bg-emerald-500/10 text-emerald-700 dark:text-emerald-400"
                  >
                    <div className="mr-1.5 h-2 w-2 rounded-full bg-emerald-500"></div>
                    Acara Kampus
                  </Badge>
                </div>
              </div>
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter className="text-muted-foreground flex justify-between border-t p-4 text-xs">
        <div>Semester Genap 2024/2025</div>
        <Button variant="link" size="sm" className="h-auto p-0">
          Lihat Kalender Lengkap
        </Button>
      </CardFooter>
    </Card>
  );
}
