"use client";

import { useState } from "react";

import {
  CalendarRange,
  Download,
  FileText,
  Filter,
  GraduationCap,
  LineChart,
  Search,
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
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function TranskripPage() {
  const [activeTab, setActiveTab] = useState("lengkap");

  // Dummy data for transkrip
  const transkripInfo = {
    nama: "Ahmad Fauzi",
    nim: "1234567890",
    program: "S1 Teknik Informatika",
    fakultas: "Fakultas Ilmu Komputer",
    angkatan: "2021",
    ipk: 3.75,
    totalSks: 80,
    targetSks: 144,
    semester: 4,
  };

  const nilaiPerSemester = [
    {
      semester: "Ganjil 2021/2022",
      ip: 3.65,
      sks: 20,
      mataKuliah: [
        {
          kode: "IF1001",
          nama: "Pemrograman Dasar",
          sks: 4,
          nilai: "A",
          bobot: 4.0,
        },
        {
          kode: "IF1002",
          nama: "Matematika Diskrit",
          sks: 3,
          nilai: "B+",
          bobot: 3.5,
        },
        {
          kode: "IF1003",
          nama: "Pengantar Teknologi Informasi",
          sks: 2,
          nilai: "A-",
          bobot: 3.7,
        },
        {
          kode: "IF1004",
          nama: "Kalkulus",
          sks: 3,
          nilai: "B",
          bobot: 3.0,
        },
        {
          kode: "IF1005",
          nama: "Bahasa Inggris",
          sks: 2,
          nilai: "A",
          bobot: 4.0,
        },
        {
          kode: "IF1006",
          nama: "Logika Informatika",
          sks: 3,
          nilai: "B+",
          bobot: 3.5,
        },
        {
          kode: "IF1007",
          nama: "Etika Profesi",
          sks: 3,
          nilai: "A-",
          bobot: 3.7,
        },
      ],
    },
    {
      semester: "Genap 2021/2022",
      ip: 3.8,
      sks: 20,
      mataKuliah: [
        {
          kode: "IF1008",
          nama: "Struktur Data",
          sks: 4,
          nilai: "A",
          bobot: 4.0,
        },
        {
          kode: "IF1009",
          nama: "Arsitektur Komputer",
          sks: 3,
          nilai: "A-",
          bobot: 3.7,
        },
        {
          kode: "IF1010",
          nama: "Aljabar Linear",
          sks: 3,
          nilai: "B+",
          bobot: 3.5,
        },
        {
          kode: "IF1011",
          nama: "Pemrograman Berorientasi Objek",
          sks: 4,
          nilai: "A",
          bobot: 4.0,
        },
        {
          kode: "IF1012",
          nama: "Statistika",
          sks: 3,
          nilai: "A-",
          bobot: 3.7,
        },
        {
          kode: "IF1013",
          nama: "Bahasa Indonesia",
          sks: 3,
          nilai: "A",
          bobot: 4.0,
        },
      ],
    },
    {
      semester: "Ganjil 2022/2023",
      ip: 3.7,
      sks: 20,
      mataKuliah: [
        {
          kode: "IF2001",
          nama: "Algoritma dan Pemrograman",
          sks: 4,
          nilai: "A-",
          bobot: 3.7,
        },
        {
          kode: "IF2002",
          nama: "Basis Data",
          sks: 4,
          nilai: "A",
          bobot: 4.0,
        },
        {
          kode: "IF2003",
          nama: "Jaringan Komputer",
          sks: 3,
          nilai: "B+",
          bobot: 3.5,
        },
        {
          kode: "IF2004",
          nama: "Sistem Operasi",
          sks: 3,
          nilai: "A-",
          bobot: 3.7,
        },
        {
          kode: "IF2005",
          nama: "Interaksi Manusia dan Komputer",
          sks: 3,
          nilai: "A",
          bobot: 4.0,
        },
        {
          kode: "IF2006",
          nama: "Kecerdasan Buatan",
          sks: 3,
          nilai: "B+",
          bobot: 3.5,
        },
      ],
    },
    {
      semester: "Genap 2022/2023",
      ip: 3.85,
      sks: 20,
      mataKuliah: [
        {
          kode: "IF2007",
          nama: "Pemrograman Web",
          sks: 3,
          nilai: "A",
          bobot: 4.0,
        },
        {
          kode: "IF2008",
          nama: "Pemrograman Mobile",
          sks: 3,
          nilai: "A",
          bobot: 4.0,
        },
        {
          kode: "IF2009",
          nama: "Keamanan Informasi",
          sks: 3,
          nilai: "A-",
          bobot: 3.7,
        },
        {
          kode: "IF2010",
          nama: "Data Mining",
          sks: 3,
          nilai: "A",
          bobot: 4.0,
        },
        {
          kode: "IF2011",
          nama: "Rekayasa Perangkat Lunak",
          sks: 4,
          nilai: "A-",
          bobot: 3.7,
        },
        {
          kode: "IF2012",
          nama: "Teori Bahasa dan Automata",
          sks: 4,
          nilai: "B+",
          bobot: 3.5,
        },
      ],
    },
  ];

  // Function to get nilai color
  const getNilaiColor = (nilai: string) => {
    switch (nilai) {
      case "A":
        return "text-green-600 dark:text-green-400";
      case "A-":
        return "text-green-500 dark:text-green-400";
      case "B+":
        return "text-blue-600 dark:text-blue-400";
      case "B":
        return "text-blue-500 dark:text-blue-400";
      case "B-":
        return "text-blue-400 dark:text-blue-300";
      case "C+":
        return "text-yellow-600 dark:text-yellow-400";
      case "C":
        return "text-yellow-500 dark:text-yellow-400";
      case "D":
        return "text-orange-500 dark:text-orange-400";
      case "E":
        return "text-red-500 dark:text-red-400";
      default:
        return "";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Transkrip Nilai</h2>
          <p className="text-muted-foreground">
            Riwayat nilai akademik dan transkrip
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Filter className="mr-2 h-4 w-4" />
            Filter
          </Button>
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" />
            Unduh Transkrip
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Indeks Prestasi Kumulatif
            </CardTitle>
            <GraduationCap className="text-primary h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {transkripInfo.ipk.toFixed(2)}
            </div>
            <div className="bg-muted mt-4 h-2 w-full rounded-full">
              <div
                className="bg-primary h-2 rounded-full"
                style={{ width: `${(transkripInfo.ipk / 4) * 100}%` }}
              />
            </div>
            <p className="text-muted-foreground mt-2 text-xs">Skala 4.00</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total SKS</CardTitle>
            <LineChart className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {transkripInfo.totalSks} / {transkripInfo.targetSks} SKS
            </div>
            <Progress
              value={(transkripInfo.totalSks / transkripInfo.targetSks) * 100}
              className="mt-4"
            />
            <p className="text-muted-foreground mt-2 text-xs">
              {(
                (transkripInfo.totalSks / transkripInfo.targetSks) *
                100
              ).toFixed(0)}
              % dari target
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Semester</CardTitle>
            <GraduationCap className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{transkripInfo.semester}</div>
            <p className="text-muted-foreground text-xs">
              Program Studi {transkripInfo.program}
              <br />
              Angkatan {transkripInfo.angkatan}
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs
        defaultValue="lengkap"
        value={activeTab}
        onValueChange={setActiveTab}
        className="space-y-4"
      >
        <TabsList>
          <TabsTrigger value="lengkap" className="gap-2">
            <FileText className="size-4" />
            <span className="hidden sm:inline">Transkrip Lengkap</span>
          </TabsTrigger>
          <TabsTrigger value="persemester" className="gap-2">
            <CalendarRange className="size-4" />
            <span className="hidden sm:inline">Per Semester</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="lengkap" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
                <div>
                  <CardTitle>Transkrip Nilai Lengkap</CardTitle>
                  <CardDescription>
                    Daftar nilai seluruh mata kuliah yang telah diambil
                  </CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <div className="relative w-full md:w-auto">
                    <Search className="text-muted-foreground absolute top-2.5 left-2.5 h-4 w-4" />
                    <Input
                      type="search"
                      placeholder="Cari mata kuliah..."
                      className="w-full pl-8 md:w-[200px] lg:w-[300px]"
                    />
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Kode</TableHead>
                    <TableHead>Mata Kuliah</TableHead>
                    <TableHead>SKS</TableHead>
                    <TableHead>Nilai</TableHead>
                    <TableHead>Bobot</TableHead>
                    <TableHead>Semester</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {nilaiPerSemester.flatMap((semester) =>
                    semester.mataKuliah.map((mk) => (
                      <TableRow key={`${mk.kode}-${semester.semester}`}>
                        <TableCell className="font-medium">{mk.kode}</TableCell>
                        <TableCell>{mk.nama}</TableCell>
                        <TableCell>{mk.sks}</TableCell>
                        <TableCell className={getNilaiColor(mk.nilai)}>
                          {mk.nilai}
                        </TableCell>
                        <TableCell>{mk.bobot.toFixed(1)}</TableCell>
                        <TableCell>{semester.semester}</TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </CardContent>
            <CardFooter className="flex justify-between">
              <div className="text-muted-foreground text-sm">
                Total:{" "}
                <span className="font-medium">
                  {transkripInfo.totalSks} SKS
                </span>{" "}
                | IPK:{" "}
                <span className="font-medium">
                  {transkripInfo.ipk.toFixed(2)}
                </span>
              </div>
              <Button variant="outline" size="sm" className="cursor-pointer">
                <Download className="mr-2 h-4 w-4" />
                Unduh Transkrip
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="persemester" className="space-y-4">
          {nilaiPerSemester.map((semester, index) => (
            <Card key={semester.semester}>
              <CardHeader>
                <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
                  <div>
                    <CardTitle>{semester.semester}</CardTitle>
                    <CardDescription>
                      IP Semester: {semester.ip.toFixed(2)} | Total SKS:{" "}
                      {semester.sks}
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Kode</TableHead>
                      <TableHead>Mata Kuliah</TableHead>
                      <TableHead>SKS</TableHead>
                      <TableHead>Nilai</TableHead>
                      <TableHead>Bobot</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {semester.mataKuliah.map((mk) => (
                      <TableRow key={mk.kode}>
                        <TableCell className="font-medium">{mk.kode}</TableCell>
                        <TableCell>{mk.nama}</TableCell>
                        <TableCell>{mk.sks}</TableCell>
                        <TableCell className={getNilaiColor(mk.nilai)}>
                          {mk.nilai}
                        </TableCell>
                        <TableCell>{mk.bobot.toFixed(1)}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
              <CardFooter className="flex justify-between">
                <div className="text-muted-foreground text-sm">
                  Total:{" "}
                  <span className="font-medium">
                    {semester.mataKuliah.length} Mata Kuliah
                  </span>{" "}
                  | <span className="font-medium">{semester.sks} SKS</span>
                </div>
                <Button variant="outline" size="sm" className="cursor-pointer">
                  <Download className="mr-2 h-4 w-4" />
                  Unduh
                </Button>
              </CardFooter>
            </Card>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
}
