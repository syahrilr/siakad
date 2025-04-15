import { BookOpen, Calendar, FileText, Users } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const features = [
  {
    icon: BookOpen,
    title: "Manajemen KRS & Perkuliahan",
    description:
      "Kelola KRS, lihat jadwal kuliah, dan akses materi perkuliahan dengan mudah dan cepat.",
  },
  {
    icon: FileText,
    title: "Transkrip & Nilai",
    description:
      "Akses nilai semester, transkrip akademik, dan rekam jejak prestasi akademik secara real-time.",
  },
  {
    icon: Calendar,
    title: "Kalender Akademik",
    description:
      "Informasi lengkap tentang jadwal akademik, ujian, dan kegiatan kampus dalam satu tampilan.",
  },
  {
    icon: Users,
    title: "Bimbingan Akademik",
    description:
      "Komunikasi dengan dosen pembimbing dan akses layanan konsultasi akademik secara online.",
  },
];

export function Features() {
  return (
    <section id="features" className="bg-slate-50 py-24 dark:bg-slate-950">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mb-16 text-center">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            Fitur Utama SIAKAD
          </h2>
          <p className="text-muted-foreground mx-auto mt-4 max-w-3xl text-lg">
            Sistem yang dirancang untuk memudahkan pengelolaan dan akses
            informasi akademik bagi seluruh civitas akademika.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => (
            <Card key={index} className="border-none shadow-lg">
              <CardHeader>
                <div className="bg-primary/10 mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg">
                  <feature.icon className="text-primary h-6 w-6" />
                </div>
                <CardTitle>{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>{feature.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
