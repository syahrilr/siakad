"use client";

import { format } from "date-fns";
import { id } from "date-fns/locale";
import { BookOpen, Clock, MapPin, Microscope } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

const upcomingClasses = [
  {
    id: "MED101",
    title: "Anatomi Manusia",
    start: new Date(new Date(new Date().setHours(10, 0, 0, 0))),
    end: new Date(new Date(new Date().setHours(11, 40, 0, 0))),
    location: "Lab Anatomi 1",
    lecturer: "Dr. Surya Wijaya, Sp.B",
    lecturerAvatar: "/placeholder.svg?height=40&width=40",
    lecturerInitials: "SW",
    type: "lecture",
  },
  {
    id: "MED105",
    title: "Praktikum Anatomi",
    start: new Date(new Date().setHours(13, 0, 0, 0)),
    end: new Date(new Date().setHours(14, 40, 0, 0)),
    location: "Lab Anatomi 2",
    lecturer: "Dr. Surya Wijaya, Sp.B",
    lecturerAvatar: "/placeholder.svg?height=40&width=40",
    lecturerInitials: "SW",
    type: "lab",
  },
  {
    id: "MED102",
    title: "Fisiologi Sistem Tubuh",
    start: new Date(
      new Date(new Date().setDate(new Date().getDate() + 1)).setHours(
        8,
        0,
        0,
        0
      )
    ),
    end: new Date(
      new Date(new Date().setDate(new Date().getDate() + 1)).setHours(
        9,
        40,
        0,
        0
      )
    ),
    location: "Ruang 2.3",
    lecturer: "Prof. Ratna Dewi, Ph.D",
    lecturerAvatar: "/placeholder.svg?height=40&width=40",
    lecturerInitials: "RD",
    type: "lecture",
  },
];

export function UpcomingClasses() {
  const getEventTypeIcon = (type: string) => {
    switch (type) {
      case "lecture":
        return <BookOpen className="h-4 w-4" />;
      case "lab":
        return <Microscope className="h-4 w-4" />;
      default:
        return <BookOpen className="h-4 w-4" />;
    }
  };

  const getEventTypeLabel = (type: string) => {
    switch (type) {
      case "lecture":
        return "Kuliah";
      case "lab":
        return "Praktikum";
      default:
        return "Lainnya";
    }
  };

  const isToday = (date: Date) => {
    const today = new Date();
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  };

  return (
    <Card className="h-full border shadow-sm">
      <CardHeader className="pb-2">
        <CardTitle>Kelas Mendatang</CardTitle>
        <CardDescription>
          Jadwal kelas yang akan datang dalam 48 jam
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[400px] pr-4">
          <div className="space-y-4">
            {upcomingClasses.map((course) => (
              <Card
                key={course.id}
                className="overflow-hidden border shadow-sm"
              >
                <CardHeader className="bg-muted/30 p-3 pb-2">
                  <div className="flex items-center justify-between">
                    <Badge
                      variant="outline"
                      className={`flex items-center gap-1 font-medium ${
                        course.type === "lecture"
                          ? "border-blue-200 bg-blue-100 text-blue-700 dark:border-blue-800 dark:bg-blue-950/50 dark:text-blue-400"
                          : "border-violet-200 bg-violet-100 text-violet-700 dark:border-violet-800 dark:bg-violet-950/50 dark:text-violet-400"
                      }`}
                    >
                      {getEventTypeIcon(course.type)}
                      {getEventTypeLabel(course.type)}
                    </Badge>
                    <Badge
                      variant={isToday(course.start) ? "default" : "outline"}
                      className={
                        isToday(course.start)
                          ? "bg-green-500 hover:bg-green-500/90"
                          : ""
                      }
                    >
                      {isToday(course.start) ? "Hari Ini" : "Besok"}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="p-4">
                  <h4 className="mb-2 text-lg font-medium">{course.title}</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <Clock className="text-muted-foreground h-4 w-4" />
                      <span>
                        {format(course.start, "EEEE", { locale: id })},{" "}
                        {format(course.start, "HH:mm")} -{" "}
                        {format(course.end, "HH:mm")}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="text-muted-foreground h-4 w-4" />
                      <span>{course.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Avatar className="h-6 w-6">
                        <AvatarImage
                          src={course.lecturerAvatar || "/placeholder.svg"}
                          alt={course.lecturer}
                        />
                        <AvatarFallback>
                          {course.lecturerInitials}
                        </AvatarFallback>
                      </Avatar>
                      <span>{course.lecturer}</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="bg-muted/20 border-t p-3">
                  <Button variant="outline" size="sm" className="w-full">
                    Lihat Detail
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
