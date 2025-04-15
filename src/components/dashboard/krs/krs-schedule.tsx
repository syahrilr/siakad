import { Calendar } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";

export function KRSSchedule() {
  const schedule = [
    {
      title: "Pengisian KRS",
      date: "15 - 20 April 2025",
      status: "active",
    },
    {
      title: "Persetujuan Dosen PA",
      date: "21 - 25 April 2025",
      status: "upcoming",
    },
    {
      title: "Masa Perubahan KRS",
      date: "26 - 30 April 2025",
      status: "upcoming",
    },
    {
      title: "Cetak KRS",
      date: "1 - 5 Mei 2025",
      status: "upcoming",
    },
  ];

  return (
    <Card className="border-none shadow-lg transition-all duration-300 hover:shadow-xl">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-xl font-bold">Jadwal KRS</CardTitle>
            <CardDescription>Semester Genap 2023/2024</CardDescription>
          </div>
          <div className="bg-primary/10 hidden rounded-full p-2 md:flex">
            <Calendar className="text-primary h-5 w-5" />
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {schedule.map((item, index) => (
            <div
              key={index}
              className={cn(
                "group relative flex items-center gap-4 overflow-hidden rounded-lg border p-3 shadow-sm transition-all duration-300",
                item.status === "active" && "bg-primary/5"
              )}
            >
              <div
                className={cn(
                  "absolute top-0 left-0 h-full w-1.5 rounded-l-lg transition-all duration-300 group-hover:w-2",
                  item.status === "active"
                    ? "bg-primary"
                    : item.status === "upcoming"
                      ? "bg-gray-300"
                      : "bg-emerald-500"
                )}
              />
              <div
                className={cn(
                  "flex h-10 w-10 items-center justify-center rounded-full transition-all duration-300",
                  item.status === "active"
                    ? "bg-primary/10"
                    : "bg-gray-100 dark:bg-gray-800"
                )}
              >
                <Calendar
                  className={cn(
                    "h-5 w-5 transition-all duration-300",
                    item.status === "active"
                      ? "text-primary"
                      : "text-gray-500 dark:text-gray-400"
                  )}
                />
              </div>
              <div className="flex-1">
                <p
                  className={cn(
                    "font-medium transition-all duration-300",
                    item.status === "active" && "text-primary"
                  )}
                >
                  {item.title}
                </p>
                <p className="text-muted-foreground text-sm">{item.date}</p>
              </div>
              <Badge
                variant="outline"
                className={cn(
                  "transition-all duration-300",
                  item.status === "active"
                    ? "bg-primary/10 text-primary"
                    : item.status === "upcoming"
                      ? "bg-gray-200 text-gray-700 dark:bg-gray-800 dark:text-gray-400"
                      : "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400"
                )}
              >
                {item.status === "active"
                  ? "Aktif"
                  : item.status === "upcoming"
                    ? "Mendatang"
                    : "Selesai"}
              </Badge>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
