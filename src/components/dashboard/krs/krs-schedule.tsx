import { Calendar } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

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
    <Card className="border-none shadow-lg">
      <CardHeader className="pb-3">
        <CardTitle>Jadwal KRS</CardTitle>
        <CardDescription>Semester Genap 2023/2024</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {schedule.map((item, index) => (
            <div
              key={index}
              className="relative flex items-center gap-4 rounded-lg border p-3 shadow-sm"
            >
              <div
                className={`absolute top-0 left-0 h-full w-1 rounded-l-lg ${
                  item.status === "active"
                    ? "bg-blue-500"
                    : item.status === "upcoming"
                      ? "bg-gray-300"
                      : "bg-emerald-500"
                }`}
              />
              <div className="bg-primary/10 flex h-9 w-9 items-center justify-center rounded-full">
                <Calendar className="text-primary h-5 w-5" />
              </div>
              <div className="flex-1">
                <p className="font-medium">{item.title}</p>
                <p className="text-muted-foreground text-sm">{item.date}</p>
              </div>
              <Badge
                variant="outline"
                className={
                  item.status === "active"
                    ? "bg-blue-500/10 text-blue-700 dark:text-blue-400"
                    : item.status === "upcoming"
                      ? "bg-gray-200 text-gray-700 dark:bg-gray-800 dark:text-gray-400"
                      : "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400"
                }
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
