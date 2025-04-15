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
      color: "purple",
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

  return (
    <Card className="border-none shadow-lg">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle>Pengumuman Terbaru</CardTitle>
          <Bell className="text-primary h-5 w-5" />
        </div>
        <CardDescription>Informasi dan pengumuman penting</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-5">
          {announcements.map((announcement) => (
            <div
              key={announcement.id}
              className="group relative overflow-hidden rounded-xl border p-5 shadow-sm transition-all hover:shadow-md"
            >
              <div
                className={`absolute top-0 right-0 h-16 w-16 translate-x-1/2 -translate-y-1/2 transform rounded-full bg-${announcement.color}-500/10`}
              />
              <div className="flex items-center justify-between">
                <h3 className="text-base font-semibold">
                  {announcement.title}
                </h3>
                {announcement.isNew && (
                  <Badge className="bg-primary text-primary-foreground">
                    Baru
                  </Badge>
                )}
              </div>
              <div className="text-muted-foreground mt-1.5 flex items-center gap-2 text-sm">
                <span>{announcement.date}</span>
                <span>•</span>
                <span
                  className={`text-${announcement.color}-600 dark:text-${announcement.color}-400`}
                >
                  {announcement.category}
                </span>
              </div>
              <p className="mt-3 text-sm">{announcement.description}</p>
              <div className="mt-4 flex justify-end">
                <Button variant="ghost" size="sm" className="text-primary">
                  Baca Selengkapnya
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
