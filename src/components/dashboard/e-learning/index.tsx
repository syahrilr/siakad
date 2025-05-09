"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import {
  BookOpen,
  Calendar,
  CalendarClock,
  ClipboardList,
  Clock,
  FileText,
  Laptop,
  MoreHorizontal,
  Play,
  Video,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { DashboardHeader } from "../header";

export function ELearningPage() {
  const [activeTab, setActiveTab] = useState("matakuliah");

  // Dummy data for e-learning
  const mataKuliahAktif = [
    {
      kode: "IF2001",
      nama: "Algoritma dan Pemrograman",
      dosen: "Dr. Budi Santoso, M.Kom",
      progress: 75,
      lastAccessed: "2 jam yang lalu",
      image:
        "https://images.pexels.com/photos/46274/pexels-photo-46274.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
    {
      kode: "IF2002",
      nama: "Basis Data",
      dosen: "Dr. Siti Aminah, M.Sc",
      progress: 60,
      lastAccessed: "Kemarin",
      image:
        "https://images.pexels.com/photos/46274/pexels-photo-46274.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
    {
      kode: "IF2003",
      nama: "Jaringan Komputer",
      dosen: "Prof. Ahmad Wijaya, Ph.D",
      progress: 40,
      lastAccessed: "3 hari yang lalu",
      image:
        "https://images.pexels.com/photos/46274/pexels-photo-46274.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
    {
      kode: "IF2004",
      nama: "Sistem Operasi",
      dosen: "Dr. Rina Fitriani, M.Kom",
      progress: 30,
      lastAccessed: "1 minggu yang lalu",
      image:
        "https://images.pexels.com/photos/46274/pexels-photo-46274.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
    {
      kode: "IF2005",
      nama: "Interaksi Manusia dan Komputer",
      dosen: "Dr. Hendra Wijaya, M.Sc",
      progress: 50,
      lastAccessed: "2 hari yang lalu",
      image:
        "https://images.pexels.com/photos/46274/pexels-photo-46274.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
    {
      kode: "IF2006",
      nama: "Kecerdasan Buatan",
      dosen: "Prof. Maya Indah, Ph.D",
      progress: 25,
      lastAccessed: "4 hari yang lalu",
      image:
        "https://images.pexels.com/photos/46274/pexels-photo-46274.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
  ];

  const jadwalKuliah = [
    {
      hari: "Senin",
      mataKuliah: [
        {
          kode: "IF2001",
          nama: "Algoritma dan Pemrograman",
          waktu: "08:00 - 09:40",
          ruang: "Lab Komputer 1",
          dosen: "Dr. Budi Santoso, M.Kom",
          tipe: "Praktikum",
        },
        {
          kode: "IF2006",
          nama: "Kecerdasan Buatan",
          waktu: "13:00 - 14:40",
          ruang: "Ruang 303",
          dosen: "Prof. Maya Indah, Ph.D",
          tipe: "Teori",
        },
      ],
    },
    {
      hari: "Selasa",
      mataKuliah: [
        {
          kode: "IF2002",
          nama: "Basis Data",
          waktu: "10:00 - 11:40",
          ruang: "Lab Komputer 2",
          dosen: "Dr. Siti Aminah, M.Sc",
          tipe: "Praktikum",
        },
      ],
    },
    {
      hari: "Rabu",
      mataKuliah: [
        {
          kode: "IF2003",
          nama: "Jaringan Komputer",
          waktu: "13:00 - 14:40",
          ruang: "Lab Jaringan",
          dosen: "Prof. Ahmad Wijaya, Ph.D",
          tipe: "Praktikum",
        },
      ],
    },
    {
      hari: "Kamis",
      mataKuliah: [
        {
          kode: "IF2004",
          nama: "Sistem Operasi",
          waktu: "08:00 - 09:40",
          ruang: "Ruang 301",
          dosen: "Dr. Rina Fitriani, M.Kom",
          tipe: "Teori",
        },
      ],
    },
    {
      hari: "Jumat",
      mataKuliah: [
        {
          kode: "IF2005",
          nama: "Interaksi Manusia dan Komputer",
          waktu: "10:00 - 11:40",
          ruang: "Ruang 302",
          dosen: "Dr. Hendra Wijaya, M.Sc",
          tipe: "Teori",
        },
      ],
    },
  ];

  const tugasTerbaru = [
    {
      id: "T001",
      mataKuliah: "Algoritma dan Pemrograman",
      judul: "Implementasi Algoritma Sorting",
      deadline: "25 April 2024, 23:59",
      status: "belum",
      deskripsi:
        "Implementasikan algoritma sorting (Bubble Sort, Selection Sort, dan Insertion Sort) dalam bahasa pemrograman Java.",
    },
    {
      id: "T002",
      mataKuliah: "Basis Data",
      judul: "Perancangan Database E-Commerce",
      deadline: "28 April 2024, 23:59",
      status: "belum",
      deskripsi:
        "Buatlah perancangan database untuk sistem e-commerce, termasuk ERD dan implementasi SQL.",
    },
    {
      id: "T003",
      mataKuliah: "Jaringan Komputer",
      judul: "Konfigurasi Router",
      deadline: "30 April 2024, 23:59",
      status: "belum",
      deskripsi:
        "Lakukan konfigurasi router menggunakan Cisco Packet Tracer dan dokumentasikan langkah-langkahnya.",
    },
    {
      id: "T004",
      mataKuliah: "Kecerdasan Buatan",
      judul: "Implementasi Algoritma A*",
      deadline: "22 April 2024, 23:59",
      status: "selesai",
      deskripsi:
        "Implementasikan algoritma A* untuk mencari jalur terpendek dalam sebuah maze.",
    },
  ];

  return (
    <div className="container mx-auto mt-10 space-y-8">
      <DashboardHeader
        heading="E-learning"
        text="Selamat datang kembali, Ahmad Fauzi"
        semester="Semester 8 - 2024/2025"
      />

      <Tabs
        defaultValue="matakuliah"
        value={activeTab}
        onValueChange={setActiveTab}
        className="space-y-4"
      >
        <TabsList>
          <TabsList>
            <TabsTrigger value="matakuliah" className="gap-2">
              <BookOpen className="size-4" />
              <span className="hidden sm:inline">Mata Kuliah</span>
            </TabsTrigger>
            <TabsTrigger value="jadwal" className="gap-2">
              <CalendarClock className="size-4" />
              <span className="hidden sm:inline">Jadwal Kuliah</span>
            </TabsTrigger>
            <TabsTrigger value="tugas" className="gap-2">
              <ClipboardList className="size-4" />
              <span className="hidden sm:inline">Tugas</span>
            </TabsTrigger>
            <TabsTrigger value="materi" className="gap-2">
              <FileText className="size-4" />
              <span className="hidden sm:inline">Materi</span>
            </TabsTrigger>
          </TabsList>
        </TabsList>

        <TabsContent value="matakuliah" className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {mataKuliahAktif.map((mk) => (
              <Card key={mk.kode} className="overflow-hidden">
                <Image
                  src={
                    mk.image ||
                    "https://images.pexels.com/photos/46274/pexels-photo-46274.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" ||
                    "/placeholder.svg"
                  }
                  alt={mk.nama}
                  width={800}
                  height={450}
                  className="aspect-video w-full object-cover"
                />
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{mk.nama}</CardTitle>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>Lihat Detail</DropdownMenuItem>
                        <DropdownMenuItem>Unduh Materi</DropdownMenuItem>
                        <DropdownMenuItem>Tandai Selesai</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                  <CardDescription>{mk.dosen}</CardDescription>
                </CardHeader>
                <CardContent className="pb-2">
                  <div className="mb-2 flex items-center justify-between text-sm">
                    <span>Progress</span>
                    <span className="font-medium">{mk.progress}%</span>
                  </div>
                  <Progress value={mk.progress} className="h-2" />
                </CardContent>
                <CardFooter className="flex items-center justify-between pt-2">
                  <div className="text-muted-foreground flex items-center text-xs">
                    <Clock className="mr-1 h-3 w-3" />
                    {mk.lastAccessed}
                  </div>
                  <Button size="sm" asChild>
                    <Link href={`/dashboard/e-learning/course/${mk.kode}`}>
                      Lanjutkan
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="jadwal" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
                <div>
                  <CardTitle>Jadwal Kuliah</CardTitle>
                  <CardDescription>
                    Jadwal perkuliahan semester ini
                  </CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <Select defaultValue="minggu-ini">
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Pilih periode" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="minggu-ini">Minggu Ini</SelectItem>
                      <SelectItem value="minggu-depan">Minggu Depan</SelectItem>
                      <SelectItem value="semua">Semua Jadwal</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {jadwalKuliah.map((jadwal) => (
                  <div key={jadwal.hari}>
                    <h3 className="mb-4 font-semibold">{jadwal.hari}</h3>
                    <div className="space-y-3">
                      {jadwal.mataKuliah.map((mk) => (
                        <Card key={`${jadwal.hari}-${mk.kode}`}>
                          <CardContent className="p-4">
                            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                              <div className="flex items-start gap-4">
                                <div
                                  className={`rounded-lg p-2 ${
                                    mk.tipe === "Praktikum"
                                      ? "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400"
                                      : "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400"
                                  }`}
                                >
                                  {mk.tipe === "Praktikum" ? (
                                    <Laptop className="h-5 w-5" />
                                  ) : (
                                    <BookOpen className="h-5 w-5" />
                                  )}
                                </div>
                                <div>
                                  <h4 className="font-medium">{mk.nama}</h4>
                                  <p className="text-muted-foreground text-sm">
                                    {mk.dosen}
                                  </p>
                                  <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm">
                                    <span className="text-muted-foreground flex items-center">
                                      <Clock className="mr-1 h-3 w-3" />
                                      {mk.waktu}
                                    </span>
                                    <span className="text-muted-foreground flex items-center">
                                      <Calendar className="mr-1 h-3 w-3" />
                                      {mk.ruang}
                                    </span>
                                  </div>
                                </div>
                              </div>
                              <div className="flex gap-2">
                                <Button variant="outline" size="sm">
                                  Materi
                                </Button>
                                <Button size="sm" asChild>
                                  <Link
                                    href={`/dashboard/e-learning/course/${mk.kode}`}
                                  >
                                    Masuk Kelas
                                  </Link>
                                </Button>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                      {jadwal.mataKuliah.length === 0 && (
                        <div className="text-muted-foreground rounded-lg border border-dashed p-4 text-center">
                          Tidak ada jadwal kuliah
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="tugas" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
                <div>
                  <CardTitle>Daftar Tugas</CardTitle>
                  <CardDescription>
                    Tugas-tugas yang perlu diselesaikan
                  </CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <Select defaultValue="semua">
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Filter status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="semua">Semua Tugas</SelectItem>
                      <SelectItem value="belum">Belum Dikerjakan</SelectItem>
                      <SelectItem value="selesai">Sudah Selesai</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {tugasTerbaru.map((tugas) => (
                  <Card key={tugas.id}>
                    <CardContent className="p-4">
                      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                        <div className="flex items-start gap-4">
                          <div
                            className={`rounded-lg p-2 ${
                              tugas.status === "belum"
                                ? "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400"
                                : "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                            }`}
                          >
                            <FileText className="h-5 w-5" />
                          </div>
                          <div>
                            <h4 className="font-medium">{tugas.judul}</h4>
                            <p className="text-muted-foreground text-sm">
                              {tugas.mataKuliah}
                            </p>
                            <p className="text-muted-foreground mt-1 text-sm">
                              {tugas.deskripsi}
                            </p>
                            <div className="mt-2 flex items-center gap-2">
                              <span
                                className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                                  tugas.status === "belum"
                                    ? "bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-300"
                                    : "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300"
                                }`}
                              >
                                {tugas.status === "belum"
                                  ? "Belum Dikerjakan"
                                  : "Sudah Selesai"}
                              </span>
                              <span className="text-muted-foreground flex items-center text-xs">
                                <Clock className="mr-1 h-3 w-3" />
                                Deadline: {tugas.deadline}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          {tugas.status === "belum" ? (
                            <Button size="sm">Kerjakan</Button>
                          ) : (
                            <Button variant="outline" size="sm">
                              Lihat Nilai
                            </Button>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="materi" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
                <div>
                  <CardTitle>Materi Pembelajaran</CardTitle>
                  <CardDescription>Materi dan sumber belajar</CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <Select defaultValue="algoritma">
                    <SelectTrigger className="w-[220px]">
                      <SelectValue placeholder="Pilih mata kuliah" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="algoritma">
                        Algoritma dan Pemrograman
                      </SelectItem>
                      <SelectItem value="basis-data">Basis Data</SelectItem>
                      <SelectItem value="jaringan">
                        Jaringan Komputer
                      </SelectItem>
                      <SelectItem value="sistem-operasi">
                        Sistem Operasi
                      </SelectItem>
                      <SelectItem value="imk">
                        Interaksi Manusia dan Komputer
                      </SelectItem>
                      <SelectItem value="ai">Kecerdasan Buatan</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="rounded-lg border p-4">
                  <h3 className="mb-3 text-lg font-medium">
                    Modul 1: Pengantar Algoritma
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between rounded-lg border p-3">
                      <div className="flex items-center gap-3">
                        <FileText className="text-primary h-5 w-5" />
                        <div>
                          <p className="font-medium">
                            Slide Pengantar Algoritma.pdf
                          </p>
                          <p className="text-muted-foreground text-xs">
                            PDF • 2.5 MB
                          </p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        Unduh
                      </Button>
                    </div>
                    <div className="flex items-center justify-between rounded-lg border p-3">
                      <div className="flex items-center gap-3">
                        <Video className="text-primary h-5 w-5" />
                        <div>
                          <p className="font-medium">
                            Rekaman Kuliah Pengantar Algoritma
                          </p>
                          <p className="text-muted-foreground text-xs">
                            MP4 • 45 menit
                          </p>
                        </div>
                      </div>
                      <Button size="sm">
                        <Play className="mr-2 h-4 w-4" />
                        Putar
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="rounded-lg border p-4">
                  <h3 className="mb-3 text-lg font-medium">
                    Modul 2: Algoritma Dasar
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between rounded-lg border p-3">
                      <div className="flex items-center gap-3">
                        <FileText className="text-primary h-5 w-5" />
                        <div>
                          <p className="font-medium">
                            Slide Algoritma Dasar.pdf
                          </p>
                          <p className="text-muted-foreground text-xs">
                            PDF • 3.2 MB
                          </p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        Unduh
                      </Button>
                    </div>
                    <div className="flex items-center justify-between rounded-lg border p-3">
                      <div className="flex items-center gap-3">
                        <Video className="text-primary h-5 w-5" />
                        <div>
                          <p className="font-medium">
                            Rekaman Kuliah Algoritma Dasar
                          </p>
                          <p className="text-muted-foreground text-xs">
                            MP4 • 50 menit
                          </p>
                        </div>
                      </div>
                      <Button size="sm">
                        <Play className="mr-2 h-4 w-4" />
                        Putar
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="rounded-lg border p-4">
                  <h3 className="mb-3 text-lg font-medium">
                    Modul 3: Struktur Kontrol
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between rounded-lg border p-3">
                      <div className="flex items-center gap-3">
                        <FileText className="text-primary h-5 w-5" />
                        <div>
                          <p className="font-medium">
                            Slide Struktur Kontrol.pdf
                          </p>
                          <p className="text-muted-foreground text-xs">
                            PDF • 2.8 MB
                          </p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        Unduh
                      </Button>
                    </div>
                    <div className="flex items-center justify-between rounded-lg border p-3">
                      <div className="flex items-center gap-3">
                        <Video className="text-primary h-5 w-5" />
                        <div>
                          <p className="font-medium">
                            Rekaman Kuliah Struktur Kontrol
                          </p>
                          <p className="text-muted-foreground text-xs">
                            MP4 • 55 menit
                          </p>
                        </div>
                      </div>
                      <Button size="sm">
                        <Play className="mr-2 h-4 w-4" />
                        Putar
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
