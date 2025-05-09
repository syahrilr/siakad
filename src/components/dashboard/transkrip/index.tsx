"use client";

import { useRef, useState } from "react";

import {
  CalendarRange,
  Download,
  FileText,
  Filter,
  GraduationCap,
  LineChart,
  Printer,
  Search,
} from "lucide-react";
import { useReactToPrint } from "react-to-print";
import { toast } from "sonner";

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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
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

import { DashboardHeader } from "../header";
import { TranskripFullPrintContent } from "./print-full-content";
import { TranskripSemesterPrintContent } from "./print-semester-content";
import { transkripPrintStyles } from "./print-style";

export function TranskripPage() {
  const [activeTab, setActiveTab] = useState("lengkap");
  const [searchQuery, setSearchQuery] = useState("");
  const [isPrinting, setIsPrinting] = useState(false);
  const [selectedSemester, setSelectedSemester] = useState<string | null>(null);

  // Refs for printing
  const fullTranskripRef = useRef<HTMLDivElement>(null);
  const semesterTranskripRef = useRef<HTMLDivElement>(null);

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
      sks: 22,
      mataKuliah: [
        {
          kode: "MD1001",
          nama: "Anatomi Dasar",
          sks: 4,
          nilai: "A",
          bobot: 4.0,
        },
        {
          kode: "MD1002",
          nama: "Biokimia Medis",
          sks: 3,
          nilai: "B+",
          bobot: 3.5,
        },
        { kode: "MD1003", nama: "Histologi", sks: 2, nilai: "A-", bobot: 3.7 },
        {
          kode: "MD1004",
          nama: "Etika Kedokteran",
          sks: 3,
          nilai: "B",
          bobot: 3.0,
        },
        {
          kode: "MD1005",
          nama: "Bahasa Inggris Medis",
          sks: 2,
          nilai: "A",
          bobot: 4.0,
        },
        {
          kode: "MD1006",
          nama: "Ilmu Sosial dan Kesehatan",
          sks: 3,
          nilai: "B+",
          bobot: 3.5,
        },
        {
          kode: "MD1007",
          nama: "Filsafat Ilmu Kedokteran",
          sks: 3,
          nilai: "A-",
          bobot: 3.7,
        },
        {
          kode: "MD1008",
          nama: "Pengantar Ilmu Kesehatan",
          sks: 2,
          nilai: "A",
          bobot: 4.0,
        },
      ],
    },
    {
      semester: "Genap 2021/2022",
      ip: 3.8,
      sks: 22,
      mataKuliah: [
        {
          kode: "MD1009",
          nama: "Fisiologi Dasar",
          sks: 4,
          nilai: "A",
          bobot: 4.0,
        },
        {
          kode: "MD1010",
          nama: "Parasitologi",
          sks: 3,
          nilai: "A-",
          bobot: 3.7,
        },
        {
          kode: "MD1011",
          nama: "Mikrobiologi Medis",
          sks: 3,
          nilai: "B+",
          bobot: 3.5,
        },
        {
          kode: "MD1012",
          nama: "Komunikasi Efektif dalam Praktik Klinik",
          sks: 4,
          nilai: "A",
          bobot: 4.0,
        },
        {
          kode: "MD1013",
          nama: "Genetika Medis",
          sks: 3,
          nilai: "A-",
          bobot: 3.7,
        },
        {
          kode: "MD1014",
          nama: "Bahasa Indonesia Ilmiah",
          sks: 3,
          nilai: "A",
          bobot: 4.0,
        },
        {
          kode: "MD1015",
          nama: "Pendidikan Kedokteran Berbasis Masalah",
          sks: 2,
          nilai: "A",
          bobot: 4.0,
        },
        {
          kode: "MD1016",
          nama: "Biologi Sel Medis",
          sks: 2,
          nilai: "A-",
          bobot: 3.7,
        },
      ],
    },
    {
      semester: "Ganjil 2022/2023",
      ip: 3.7,
      sks: 22,
      mataKuliah: [
        { kode: "MD2001", nama: "Imunologi", sks: 4, nilai: "A-", bobot: 3.7 },
        {
          kode: "MD2002",
          nama: "Farmakologi Dasar",
          sks: 4,
          nilai: "A",
          bobot: 4.0,
        },
        {
          kode: "MD2003",
          nama: "Patologi Anatomi",
          sks: 3,
          nilai: "B+",
          bobot: 3.5,
        },
        {
          kode: "MD2004",
          nama: "Patofisiologi",
          sks: 3,
          nilai: "A-",
          bobot: 3.7,
        },
        {
          kode: "MD2005",
          nama: "Dasar-Dasar Ilmu Bedah",
          sks: 3,
          nilai: "A",
          bobot: 4.0,
        },
        {
          kode: "MD2006",
          nama: "Dasar-Dasar Ilmu Penyakit Dalam",
          sks: 3,
          nilai: "B+",
          bobot: 3.5,
        },
        {
          kode: "MD2007",
          nama: "Psikologi Kesehatan",
          sks: 1,
          nilai: "A",
          bobot: 4.0,
        },
        {
          kode: "MD2008",
          nama: "Gizi dan Metabolisme",
          sks: 1,
          nilai: "B+",
          bobot: 3.5,
        },
      ],
    },
    {
      semester: "Genap 2022/2023",
      ip: 3.85,
      sks: 22,
      mataKuliah: [
        {
          kode: "MD2009",
          nama: "Ilmu Penyakit Infeksi",
          sks: 3,
          nilai: "A",
          bobot: 4.0,
        },
        {
          kode: "MD2010",
          nama: "Ilmu Kesehatan Masyarakat",
          sks: 3,
          nilai: "A",
          bobot: 4.0,
        },
        {
          kode: "MD2011",
          nama: "Ilmu Penyakit Paru",
          sks: 3,
          nilai: "A-",
          bobot: 3.7,
        },
        {
          kode: "MD2012",
          nama: "Ilmu Kebidanan dan Kandungan",
          sks: 3,
          nilai: "A",
          bobot: 4.0,
        },
        {
          kode: "MD2013",
          nama: "Ilmu Kardiologi",
          sks: 4,
          nilai: "A-",
          bobot: 3.7,
        },
        {
          kode: "MD2014",
          nama: "Ilmu Saraf Dasar",
          sks: 4,
          nilai: "B+",
          bobot: 3.5,
        },
        {
          kode: "MD2015",
          nama: "Ilmu Forensik",
          sks: 1,
          nilai: "A",
          bobot: 4.0,
        },
        {
          kode: "MD2016",
          nama: "Ilmu Rehabilitasi Medik",
          sks: 1,
          nilai: "A-",
          bobot: 3.7,
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

  // Filter courses based on search query
  const filteredCourses = nilaiPerSemester.flatMap((semester) =>
    semester.mataKuliah
      .filter(
        (mk) =>
          mk.nama.toLowerCase().includes(searchQuery.toLowerCase()) ||
          mk.kode.toLowerCase().includes(searchQuery.toLowerCase())
      )
      .map((mk) => ({ ...mk, semester: semester.semester }))
  );

  // Handle printing full transcript
  const handlePrintFullTranskrip = useReactToPrint({
    contentRef: fullTranskripRef,
    documentTitle: `Transkrip Nilai - ${transkripInfo.nama}`,
    pageStyle: transkripPrintStyles,
    onBeforePrint: () => {
      setIsPrinting(true);
      return Promise.resolve();
    },
    onAfterPrint: () => {
      setIsPrinting(false);
      toast.success("Transkrip berhasil diunduh", {
        richColors: true,
        duration: 1300,
      });
    },
  });

  // Handle printing semester transcript
  const handlePrintSemesterTranskrip = useReactToPrint({
    contentRef: semesterTranskripRef,
    documentTitle: `Transkrip Nilai ${selectedSemester} - ${transkripInfo.nama}`,
    pageStyle: transkripPrintStyles,
    onBeforePrint: () => {
      setIsPrinting(true);
      return Promise.resolve();
    },
    onAfterPrint: () => {
      setIsPrinting(false);
      toast.success("Transkrip semester berhasil diunduh", {
        richColors: true,
        duration: 1300,
      });
    },
  });

  // Handle printing specific semester
  const printSemesterTranskrip = (semester: string) => {
    setSelectedSemester(semester);
    setTimeout(() => {
      handlePrintSemesterTranskrip();
    }, 100);
  };

  return (
    <div className="container mx-auto mt-10 space-y-8">
      <style>{transkripPrintStyles}</style>

      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <DashboardHeader
          heading="Transkrip Nilai"
          text="Lihat dan unduh transkrip nilai Anda"
          semester="Semester 8 - 2024/2025"
        />
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Filter className="mr-2 h-4 w-4" />
            Filter
          </Button>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm">
                <Printer className="mr-2 h-4 w-4" />
                Cetak Transkrip
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Unduh Transkrip</DialogTitle>
                <DialogDescription>
                  Pilih jenis transkrip yang ingin diunduh
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <Button
                  onClick={handlePrintFullTranskrip}
                  className="w-full"
                  disabled={isPrinting}
                >
                  <FileText className="mr-2 h-4 w-4" />
                  Transkrip Lengkap
                </Button>
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-background text-muted-foreground px-2">
                      Atau pilih semester
                    </span>
                  </div>
                </div>
                <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                  {nilaiPerSemester.map((semester) => (
                    <Button
                      key={semester.semester}
                      variant="outline"
                      onClick={() => printSemesterTranskrip(semester.semester)}
                      disabled={isPrinting}
                    >
                      <CalendarRange className="mr-2 h-4 w-4" />
                      {semester.semester}
                    </Button>
                  ))}
                </div>
              </div>
            </DialogContent>
          </Dialog>
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
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
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
                  {searchQuery
                    ? filteredCourses.map((mk) => (
                        <TableRow key={`${mk.kode}-${mk.semester}`}>
                          <TableCell className="font-medium">
                            {mk.kode}
                          </TableCell>
                          <TableCell>{mk.nama}</TableCell>
                          <TableCell>{mk.sks}</TableCell>
                          <TableCell className={getNilaiColor(mk.nilai)}>
                            {mk.nilai}
                          </TableCell>
                          <TableCell>{mk.bobot.toFixed(1)}</TableCell>
                          <TableCell>{mk.semester}</TableCell>
                        </TableRow>
                      ))
                    : nilaiPerSemester.flatMap((semester) =>
                        semester.mataKuliah.map((mk) => (
                          <TableRow key={`${mk.kode}-${semester.semester}`}>
                            <TableCell className="font-medium">
                              {mk.kode}
                            </TableCell>
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
              <Button
                variant="outline"
                size="sm"
                className="cursor-pointer"
                onClick={handlePrintFullTranskrip}
                disabled={isPrinting}
              >
                <Download className="mr-2 h-4 w-4" />
                Unduh Transkrip
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="persemester" className="space-y-4">
          {nilaiPerSemester.map((semester) => (
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
                <Button
                  variant="outline"
                  size="sm"
                  className="cursor-pointer"
                  onClick={() => printSemesterTranskrip(semester.semester)}
                  disabled={isPrinting}
                >
                  <Download className="mr-2 h-4 w-4" />
                  Unduh
                </Button>
              </CardFooter>
            </Card>
          ))}
        </TabsContent>
      </Tabs>

      {/* Hidden printable content for full transcript */}
      <div className="hidden">
        <div ref={fullTranskripRef}>
          <TranskripFullPrintContent
            transkripInfo={transkripInfo}
            nilaiPerSemester={nilaiPerSemester}
          />
        </div>
      </div>

      {/* Hidden printable content for semester transcript */}
      <div className="hidden">
        <div ref={semesterTranskripRef}>
          <TranskripSemesterPrintContent
            transkripInfo={transkripInfo}
            nilaiPerSemester={nilaiPerSemester}
            selectedSemester={selectedSemester}
          />
        </div>
      </div>
    </div>
  );
}
