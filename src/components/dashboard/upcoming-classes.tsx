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
      color: "bg-blue-500",
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
      color: "bg-purple-500",
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
      color: "bg-emerald-500",
    },
  ];

  return (
    <Card className="border-none shadow-lg">
      <CardHeader className="pb-3">
        <CardTitle>Jadwal Kuliah Hari Ini</CardTitle>
        <CardDescription>Senin, 15 April 2025</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-5">
          {classes.map((classItem) => (
            <div
              key={classItem.id}
              className="group relative flex flex-col items-start justify-between rounded-xl border p-4 shadow-sm transition-all hover:shadow-md md:flex-row md:items-center"
            >
              <div
                className={`absolute top-0 left-0 h-full w-1 rounded-l-xl ${classItem.color}`}
              />
              <div className="space-y-1 pl-2">
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
              <div className="mt-3 flex items-center gap-3 md:mt-0">
                <Avatar className="border-background hidden h-9 w-9 border-2 md:flex">
                  <AvatarImage
                    src={classItem.lecturerAvatar || "/placeholder.svg"}
                    alt={classItem.lecturer}
                  />
                  <AvatarFallback>{classItem.lecturerInitials}</AvatarFallback>
                </Avatar>
                <Badge
                  variant="outline"
                  className={`bg-${classItem.color.split("-")[1]}-100 text-${
                    classItem.color.split("-")[1]
                  }-700 dark:bg-${classItem.color.split("-")[1]}-900/20 dark:text-${
                    classItem.color.split("-")[1]
                  }-400 px-2.5 py-0.5`}
                >
                  {classItem.minutesUntil} menit lagi
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
