import Link from "next/link";

import { CalendarDays, FileText, Users } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { DashboardHeader } from "../header";

export default function ReportContent() {
  return (
    <div className="container mx-auto mt-10 space-y-8">
      <DashboardHeader
        heading="Pelaporan Penilaian Akademik"
        text="Lihat dan kelola laporan penilaian akademik Anda."
      />

      <main className="flex flex-1 flex-col gap-4 md:gap-8 md:p-8">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Card className="border-l-4 border-l-teal-500">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Mata Kuliah
              </CardTitle>
              <FileText className="h-4 w-4 text-teal-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">5</div>
              <p className="text-muted-foreground text-xs">
                Semester Genap 2023/2024
              </p>
            </CardContent>
          </Card>
          <Card className="border-l-4 border-l-amber-500">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Tugas Selesai
              </CardTitle>
              <Users className="h-4 w-4 text-amber-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">2/6</div>
              <p className="text-muted-foreground text-xs">
                Tugas sudah dikumpulkan
              </p>
            </CardContent>
          </Card>
          <Card className="border-l-4 border-l-blue-500">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Klarifikasi Aktif
              </CardTitle>
              <CalendarDays className="h-4 w-4 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">2</div>
              <p className="text-muted-foreground text-xs">
                Menunggu respon dosen
              </p>
            </CardContent>
          </Card>
        </div>
        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList className="bg-white">
            <TabsTrigger value="overview">Ringkasan</TabsTrigger>
            <TabsTrigger value="clarifications">Klarifikasi Nilai</TabsTrigger>
            <TabsTrigger value="announcements">Pengumuman</TabsTrigger>
          </TabsList>
          <TabsContent value="overview" className="space-y-4">
            <Card className="bg-white">
              <CardHeader>
                <CardTitle>Ringkasan Akademik</CardTitle>
                <CardDescription>
                  Lihat ringkasan nilai dan status akademik Anda semester ini.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="space-y-2">
                  <div className="grid grid-cols-3 gap-4">
                    <div className="space-y-1">
                      <p className="text-sm leading-none font-medium">
                        Mata Kuliah Aktif
                      </p>
                      <p className="text-muted-foreground text-sm">
                        5 Mata Kuliah
                      </p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm leading-none font-medium">
                        Total SKS
                      </p>
                      <p className="text-muted-foreground text-sm">15 SKS</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm leading-none font-medium">Status</p>
                      <p className="text-muted-foreground text-sm">Aktif</p>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button asChild className="bg-teal-600 hover:bg-teal-700">
                  <Link href="/dashboard/pelaporan/grades">
                    Lihat Daftar Nilai
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
          <TabsContent value="clarifications" className="space-y-4">
            <Card className="bg-white">
              <CardHeader>
                <CardTitle>Klarifikasi Nilai Terbaru</CardTitle>
                <CardDescription>
                  Daftar permintaan klarifikasi nilai yang Anda ajukan.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="rounded-md border p-4 transition-colors hover:bg-gray-50">
                  <div className="flex items-center justify-between">
                    <div className="grid gap-1">
                      <div className="font-semibold">Ilmu Penyakit Dalam</div>
                      <div className="text-muted-foreground text-sm">
                        Laporan Kasus Hipertensi
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="rounded-full bg-yellow-100 px-2 py-1 text-xs font-medium text-yellow-800">
                        Sedang Ditinjau
                      </div>
                      <Button asChild variant="ghost" size="sm">
                        <Link href="/clarifications/clarification-1">
                          Detail
                        </Link>
                      </Button>
                    </div>
                  </div>
                  <div className="mt-2 text-sm text-gray-600">
                    <span className="font-medium">Nilai saat ini:</span> 85 •{" "}
                    <span className="font-medium">Diharapkan:</span> 90
                  </div>
                  <div className="mt-1 text-xs text-gray-500">
                    Diajukan pada 1 Mei 2023
                  </div>
                </div>
                <div className="rounded-md border p-4 transition-colors hover:bg-gray-50">
                  <div className="flex items-center justify-between">
                    <div className="grid gap-1">
                      <div className="font-semibold">Ilmu Bedah</div>
                      <div className="text-muted-foreground text-sm">
                        Presentasi Kasus Bedah Digestif
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="rounded-full bg-blue-100 px-2 py-1 text-xs font-medium text-blue-800">
                        Menunggu Respon
                      </div>
                      <Button asChild variant="ghost" size="sm">
                        <Link href="/clarifications/clarification-2">
                          Detail
                        </Link>
                      </Button>
                    </div>
                  </div>
                  <div className="mt-2 text-sm text-gray-600">
                    <span className="font-medium">Nilai saat ini:</span> 78 •{" "}
                    <span className="font-medium">Diharapkan:</span> 85
                  </div>
                  <div className="mt-1 text-xs text-gray-500">
                    Diajukan pada 5 Mei 2023
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button asChild variant="outline">
                  <Link href="/clarifications">Lihat Semua Klarifikasi</Link>
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
          <TabsContent value="announcements" className="space-y-4">
            <Card className="bg-white">
              <CardHeader>
                <CardTitle>Pengumuman Akademik</CardTitle>
                <CardDescription>
                  Informasi terbaru dari fakultas dan dosen pengajar.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="rounded-md border p-4 transition-colors hover:bg-gray-50">
                  <h3 className="font-semibold text-teal-700">
                    Jadwal Ujian Akhir Semester Genap 2023/2024
                  </h3>
                  <p className="text-muted-foreground mt-1 text-sm">
                    Jadwal ujian akhir semester telah dirilis dan dapat diakses
                    melalui portal akademik. Pastikan tidak ada jadwal yang
                    bentrok.
                  </p>
                  <p className="text-muted-foreground mt-2 text-xs">
                    10 Mei 2023
                  </p>
                </div>
                <div className="rounded-md border p-4 transition-colors hover:bg-gray-50">
                  <h3 className="font-semibold text-teal-700">
                    Pengumpulan Laporan Kasus Bedah
                  </h3>
                  <p className="text-muted-foreground mt-1 text-sm">
                    Batas waktu pengumpulan laporan kasus bedah diperpanjang
                    hingga 30 Juni 2023.
                  </p>
                  <p className="text-muted-foreground mt-2 text-xs">
                    5 Mei 2023
                  </p>
                </div>
                <div className="rounded-md border p-4 transition-colors hover:bg-gray-50">
                  <h3 className="font-semibold text-teal-700">
                    Seminar Kardiologi Terkini
                  </h3>
                  <p className="text-muted-foreground mt-1 text-sm">
                    Departemen Kardiologi akan mengadakan seminar dengan tema
                    {"Perkembangan Terbaru dalam Penanganan Gagal Jantung"} pada
                    tanggal 15 Juni 2023. Mahasiswa diharapkan untuk menghadiri
                    seminar ini.
                  </p>
                  <p className="text-muted-foreground mt-2 text-xs">
                    2 Mei 2023
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
