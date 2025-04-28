import { Bell } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";

export function RecentAnnouncements() {
  const announcements = [
    {
      id: 1,
      title: "Jadwal UTS Semester Ganjil 2023/2024",
      date: "12 April 2025",
      description:
        "Jadwal UTS untuk semester ganjil telah dirilis. Silakan cek jadwal Anda di menu Jadwal Ujian.",
      category: "Akademik",
      isNew: true,
      color: "blue",
    },
    {
      id: 2,
      title: "Pengisian KRS Semester Genap",
      date: "10 April 2025",
      description:
        "Pengisian KRS untuk semester genap akan dibuka pada tanggal 20 April 2025. Harap konsultasikan dengan dosen pembimbing Anda.",
      category: "Pengumuman",
      isNew: true,
      color: "violet",
    },
    {
      id: 3,
      title: "Seminar Nasional Teknologi Informasi",
      date: "5 April 2025",
      description:
        "Fakultas Ilmu Komputer akan mengadakan seminar nasional pada tanggal 25 April 2025. Pendaftaran dibuka untuk seluruh mahasiswa.",
      category: "Acara",
      isNew: false,
      color: "emerald",
    },
  ];

  const getColorClasses = (color: string) => {
    const colorMap: Record<
      string,
      { bg: string; text: string; badge: string }
    > = {
      blue: {
        bg: "bg-blue-50 dark:bg-blue-950/50",
        text: "text-blue-700 dark:text-blue-300",
        badge:
          "border-blue-200 bg-blue-100 text-blue-700 dark:border-blue-800 dark:bg-blue-900/30 dark:text-blue-300",
      },
      violet: {
        bg: "bg-violet-50 dark:bg-violet-950/50",
        text: "text-violet-700 dark:text-violet-300",
        badge:
          "border-violet-200 bg-violet-100 text-violet-700 dark:border-violet-800 dark:bg-violet-900/30 dark:text-violet-300",
      },
      emerald: {
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
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold">
            Pengumuman Terbaru
          </CardTitle>
          <div className="relative">
            <Bell className="text-primary h-5 w-5" />
            <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white">
              2
            </span>
          </div>
        </div>
        <CardDescription>Informasi dan pengumuman penting</CardDescription>
      </CardHeader>
      <CardContent className="p-6">
        <div className="space-y-5">
          {announcements.map((announcement) => {
            const colorClasses = getColorClasses(announcement.color);

            return (
              <div
                key={announcement.id}
                className={cn(
                  "group relative overflow-hidden rounded-xl border p-5 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md",
                  announcement.isNew && "ring-primary/10 ring-2"
                )}
              >
                <div
                  className={cn(
                    "absolute top-0 right-0 h-24 w-24 translate-x-8 -translate-y-8 transform rounded-full opacity-20",
                    `bg-${announcement.color}-500`
                  )}
                />
                <div className="flex items-center justify-between">
                  <h3 className="line-clamp-1 text-base font-semibold">
                    {announcement.title}
                  </h3>
                  {announcement.isNew && (
                    <Badge className="bg-primary text-primary-foreground animate-pulse">
                      Baru
                    </Badge>
                  )}
                </div>
                <div className="text-muted-foreground mt-1.5 flex items-center gap-2 text-sm">
                  <span>{announcement.date}</span>
                  <span>•</span>
                  <span className={colorClasses.text}>
                    {announcement.category}
                  </span>
                </div>
                <p className="mt-3 line-clamp-2 text-sm">
                  {announcement.description}
                </p>
                <div className="mt-4 flex justify-end">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-primary -mr-2 h-8 px-2 font-medium"
                  >
                    Baca Selengkapnya
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
