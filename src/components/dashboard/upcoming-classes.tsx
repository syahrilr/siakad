import { Clock, MapPin, Users } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";

export function UpcomingClasses() {
  const classes = [
    {
      id: 1,
      subject: "Algoritma dan Pemrograman",
      time: "08:00 - 09:40",
      location: "Ruang Lab Komputer 3",
      lecturer: "Dr. Budi Santoso",
      lecturerAvatar: "/placeholder.svg?height=40&width=40",
      lecturerInitials: "BS",
      status: "upcoming",
      minutesUntil: 45,
      color: "blue",
    },
    {
      id: 2,
      subject: "Basis Data Lanjut",
      time: "10:00 - 11:40",
      location: "Ruang 2.3",
      lecturer: "Prof. Siti Rahayu",
      lecturerAvatar: "/placeholder.svg?height=40&width=40",
      lecturerInitials: "SR",
      status: "upcoming",
      minutesUntil: 165,
      color: "violet",
    },
    {
      id: 3,
      subject: "Jaringan Komputer",
      time: "13:00 - 14:40",
      location: "Ruang Lab Jaringan",
      lecturer: "Dr. Ahmad Fauzi",
      lecturerAvatar: "/placeholder.svg?height=40&width=40",
      lecturerInitials: "AF",
      status: "upcoming",
      minutesUntil: 285,
      color: "emerald",
    },
  ];

  const getColorClasses = (color: string) => {
    const colorMap: Record<
      string,
      { border: string; bg: string; text: string; badge: string }
    > = {
      blue: {
        border: "border-l-blue-600 dark:border-l-blue-500",
        bg: "bg-blue-50 dark:bg-blue-950/50",
        text: "text-blue-700 dark:text-blue-300",
        badge:
          "border-blue-200 bg-blue-100 text-blue-700 dark:border-blue-800 dark:bg-blue-900/30 dark:text-blue-300",
      },
      violet: {
        border: "border-l-violet-600 dark:border-l-violet-500",
        bg: "bg-violet-50 dark:bg-violet-950/50",
        text: "text-violet-700 dark:text-violet-300",
        badge:
          "border-violet-200 bg-violet-100 text-violet-700 dark:border-violet-800 dark:bg-violet-900/30 dark:text-violet-300",
      },
      emerald: {
        border: "border-l-emerald-600 dark:border-l-emerald-500",
        bg: "bg-emerald-50 dark:bg-emerald-950/50",
        text: "text-emerald-700 dark:text-emerald-300",
        badge:
          "border-emerald-200 bg-emerald-100 text-emerald-700 dark:border-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300",
      },
    };

    return colorMap[color] || colorMap.blue;
  };

  return (
    <Card className="overflow-hidden border shadow-md transition-all duration-300 hover:shadow-lg dark:border-slate-800">
      <CardHeader className="bg-card pb-3">
        <CardTitle className="text-lg font-semibold">
          Jadwal Kuliah Hari Ini
        </CardTitle>
        <CardDescription>Senin, 15 April 2025</CardDescription>
      </CardHeader>
      <CardContent className="p-6">
        <div className="space-y-5">
          {classes.map((classItem) => {
            const colorClasses = getColorClasses(classItem.color);

            return (
              <div
                key={classItem.id}
                className="group relative flex flex-col overflow-hidden rounded-xl border border-l-4 p-4 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md md:flex-row md:items-center"
                style={{ borderLeftColor: `var(--${classItem.color}-600)` }}
              >
                <div className="space-y-1 pr-2">
                  <p className="text-base font-medium">{classItem.subject}</p>
                  <div className="text-muted-foreground flex flex-wrap gap-x-4 gap-y-1 text-sm">
                    <div className="flex items-center">
                      <Clock className="mr-1 h-4 w-4" />
                      <span>{classItem.time}</span>
                    </div>
                    <div className="flex items-center">
                      <MapPin className="mr-1 h-4 w-4" />
                      <span>{classItem.location}</span>
                    </div>
                    <div className="flex items-center">
                      <Users className="mr-1 h-4 w-4" />
                      <span>Dosen: {classItem.lecturer}</span>
                    </div>
                  </div>
                </div>
                <div className="mt-3 flex items-center gap-3 md:mt-0 md:ml-auto">
                  <Avatar className="border-background hidden h-9 w-9 border-2 md:flex">
                    <AvatarImage
                      src={classItem.lecturerAvatar || "/placeholder.svg"}
                      alt={classItem.lecturer}
                    />
                    <AvatarFallback
                      className={cn(colorClasses.bg, colorClasses.text)}
                    >
                      {classItem.lecturerInitials}
                    </AvatarFallback>
                  </Avatar>
                  <Badge
                    variant="outline"
                    className={cn(colorClasses.badge, "px-2.5 py-0.5")}
                  >
                    {classItem.minutesUntil} menit lagi
                  </Badge>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
