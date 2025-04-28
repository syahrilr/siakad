"use client";

import { useState } from "react";

import { FileText, Info, Plus, Save, Search, Trash2 } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
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
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

interface Course {
  id: string;
  name: string;
  sks: number;
  semester: number;
  day: string;
  time: string;
  room: string;
  lecturer: string;
  description?: string;
  status?: "wajib" | "pilihan";
}

export function KRSForm() {
  const [selectedCourses, setSelectedCourses] = useState<Course[]>([
    {
      id: "CS101",
      name: "Algoritma dan Pemrograman Lanjut",
      sks: 3,
      semester: 6,
      day: "Senin",
      time: "08:00 - 09:40",
      room: "Lab Komputer 3",
      lecturer: "Dr. Budi Santoso",
      status: "wajib",
      description:
        "Mata kuliah ini membahas algoritma dan struktur data lanjutan serta implementasinya dalam pemrograman.",
    },
    {
      id: "CS102",
      name: "Basis Data Terdistribusi",
      sks: 3,
      semester: 6,
      day: "Selasa",
      time: "10:00 - 11:40",
      room: "Ruang 2.3",
      lecturer: "Prof. Siti Rahayu",
      status: "wajib",
      description:
        "Mata kuliah ini membahas konsep dan implementasi basis data terdistribusi.",
    },
    {
      id: "CS103",
      name: "Keamanan Jaringan",
      sks: 3,
      semester: 6,
      day: "Rabu",
      time: "13:00 - 14:40",
      room: "Lab Jaringan",
      lecturer: "Dr. Ahmad Fauzi",
      status: "wajib",
      description:
        "Mata kuliah ini membahas konsep dan implementasi keamanan jaringan komputer.",
    },
  ]);

  const availableCourses: Course[] = [
    {
      id: "CS104",
      name: "Kecerdasan Buatan",
      sks: 3,
      semester: 6,
      day: "Kamis",
      time: "08:00 - 09:40",
      room: "Ruang 3.2",
      lecturer: "Dr. Rina Wijaya",
      status: "pilihan",
      description:
        "Mata kuliah ini membahas konsep dasar kecerdasan buatan dan aplikasinya.",
    },
    {
      id: "CS105",
      name: "Pengembangan Aplikasi Mobile",
      sks: 3,
      semester: 6,
      day: "Jumat",
      time: "10:00 - 11:40",
      room: "Lab Mobile",
      lecturer: "Dr. Hadi Santoso",
      status: "pilihan",
      description:
        "Mata kuliah ini membahas pengembangan aplikasi mobile untuk platform Android dan iOS.",
    },
    {
      id: "CS106",
      name: "Etika Profesi IT",
      sks: 2,
      semester: 6,
      day: "Kamis",
      time: "13:00 - 14:40",
      room: "Ruang 4.1",
      lecturer: "Prof. Dina Anggraini",
      status: "wajib",
      description:
        "Mata kuliah ini membahas etika profesi dalam bidang teknologi informasi.",
    },
    {
      id: "CS107",
      name: "Pemrograman Web Lanjut",
      sks: 3,
      semester: 6,
      day: "Senin",
      time: "13:00 - 14:40",
      room: "Lab Web",
      lecturer: "Dr. Rudi Hartono",
      status: "pilihan",
      description:
        "Mata kuliah ini membahas pengembangan aplikasi web dengan teknologi modern.",
    },
    {
      id: "CS108",
      name: "Sistem Terdistribusi",
      sks: 3,
      semester: 6,
      day: "Selasa",
      time: "13:00 - 14:40",
      room: "Ruang 3.1",
      lecturer: "Dr. Eko Prasetyo",
      status: "pilihan",
      description:
        "Mata kuliah ini membahas konsep dan implementasi sistem terdistribusi.",
    },
  ];

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSemester, setSelectedSemester] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [courseDetailsOpen, setCourseDetailsOpen] = useState<string | null>(
    null
  );

  const filteredCourses = availableCourses.filter(
    (course) =>
      course.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      (selectedSemester === "all" ||
        course.semester.toString() === selectedSemester) &&
      (selectedStatus === "all" || course.status === selectedStatus)
  );

  const addCourse = (course: Course) => {
    if (!selectedCourses.some((c) => c.id === course.id)) {
      setSelectedCourses([...selectedCourses, course]);
    }
  };

  const removeCourse = (courseId: string) => {
    setSelectedCourses(
      selectedCourses.filter((course) => course.id !== courseId)
    );
  };

  const totalSKS = selectedCourses.reduce(
    (total, course) => total + course.sks,
    0
  );
  const maxSKS = 24;
  const sksPercentage = (totalSKS / maxSKS) * 100;

  const getSKSStatusColor = () => {
    if (sksPercentage > 90) return "text-red-500";
    if (sksPercentage > 75) return "text-amber-500";
    return "text-primary";
  };

  const getStatusBadge = (status?: string) => {
    if (status === "wajib") {
      return (
        <Badge
          variant="outline"
          className="border-blue-200 bg-blue-100 text-blue-700 dark:border-blue-800 dark:bg-blue-950/50 dark:text-blue-400"
        >
          Wajib
        </Badge>
      );
    }
    if (status === "pilihan") {
      return (
        <Badge
          variant="outline"
          className="border-purple-200 bg-purple-100 text-purple-700 dark:border-purple-800 dark:bg-purple-950/50 dark:text-purple-400"
        >
          Pilihan
        </Badge>
      );
    }
    return null;
  };

  return (
    <>
      <Card className="overflow-hidden border shadow-md transition-all duration-300 hover:shadow-lg dark:border-slate-800">
        <CardHeader className="bg-card pb-3">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
            <div>
              <CardTitle className="text-xl font-bold">
                Mata Kuliah Terpilih
              </CardTitle>
              <CardDescription>
                <div className="mt-2 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Total SKS</span>
                    <span
                      className={cn("text-sm font-bold", getSKSStatusColor())}
                    >
                      {totalSKS}/{maxSKS} SKS
                    </span>
                  </div>
                  <Progress
                    value={sksPercentage}
                    className={cn(
                      "h-2 w-full bg-slate-200 dark:bg-slate-800",
                      sksPercentage > 90
                        ? "indicator-red"
                        : sksPercentage > 75
                          ? "indicator-amber"
                          : "indicator-primary"
                    )}
                  />
                  <p className="text-muted-foreground text-xs">
                    {sksPercentage > 90
                      ? "Peringatan: Jumlah SKS hampir mencapai batas maksimum"
                      : sksPercentage > 75
                        ? "Perhatian: Jumlah SKS sudah mencapai 75% dari batas maksimum"
                        : "Anda masih dapat menambahkan mata kuliah lainnya"}
                  </p>
                </div>
              </CardDescription>
            </div>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button className="cursor-pointer gap-2 sm:self-end">
                  <Plus className="h-4 w-4" />
                  <span className="hidden sm:inline">Tambah Mata Kuliah</span>
                  <span className="sm:hidden">Tambah</span>
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[800px]">
                <DialogHeader>
                  <DialogTitle>Tambah Mata Kuliah</DialogTitle>
                  <DialogDescription>
                    Pilih mata kuliah yang ingin ditambahkan ke KRS Anda.
                  </DialogDescription>
                </DialogHeader>
                <div className="flex flex-col gap-4 py-4">
                  <div className="flex flex-col gap-4 md:flex-row">
                    <div className="relative flex-1">
                      <Search className="text-muted-foreground absolute top-2.5 left-2.5 h-4 w-4" />
                      <Input
                        type="search"
                        placeholder="Cari mata kuliah..."
                        className="pl-8"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                    </div>
                    <div className="flex flex-1 gap-2">
                      <Select
                        value={selectedSemester}
                        onValueChange={setSelectedSemester}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Pilih semester" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">Semua Semester</SelectItem>
                          <SelectItem value="1">Semester 1</SelectItem>
                          <SelectItem value="2">Semester 2</SelectItem>
                          <SelectItem value="3">Semester 3</SelectItem>
                          <SelectItem value="4">Semester 4</SelectItem>
                          <SelectItem value="5">Semester 5</SelectItem>
                          <SelectItem value="6">Semester 6</SelectItem>
                          <SelectItem value="7">Semester 7</SelectItem>
                          <SelectItem value="8">Semester 8</SelectItem>
                        </SelectContent>
                      </Select>
                      <Select
                        value={selectedStatus}
                        onValueChange={setSelectedStatus}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">Semua Status</SelectItem>
                          <SelectItem value="wajib">
                            Mata Kuliah Wajib
                          </SelectItem>
                          <SelectItem value="pilihan">
                            Mata Kuliah Pilihan
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="max-h-[400px] overflow-auto rounded-md border">
                    <Table>
                      <TableHeader className="bg-background sticky top-0">
                        <TableRow>
                          <TableHead className="w-[50px]"></TableHead>
                          <TableHead className="w-[100px]">Kode</TableHead>
                          <TableHead>Mata Kuliah</TableHead>
                          <TableHead className="text-center">SKS</TableHead>
                          <TableHead className="hidden md:table-cell">
                            Status
                          </TableHead>
                          <TableHead className="hidden md:table-cell">
                            Jadwal
                          </TableHead>
                          <TableHead className="w-[50px]"></TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredCourses.map((course) => (
                          <TableRow
                            key={course.id}
                            className="group hover:bg-muted/50 cursor-pointer transition-colors"
                          >
                            <TableCell>
                              <Checkbox
                                id={`select-${course.id}`}
                                onCheckedChange={() => {
                                  if (
                                    selectedCourses.some(
                                      (c) => c.id === course.id
                                    )
                                  ) {
                                    removeCourse(course.id);
                                  } else {
                                    addCourse(course);
                                  }
                                }}
                                checked={selectedCourses.some(
                                  (c) => c.id === course.id
                                )}
                              />
                            </TableCell>
                            <TableCell
                              className="font-medium"
                              onClick={() => {
                                if (
                                  selectedCourses.some(
                                    (c) => c.id === course.id
                                  )
                                ) {
                                  removeCourse(course.id);
                                } else {
                                  addCourse(course);
                                }
                              }}
                            >
                              {course.id}
                            </TableCell>
                            <TableCell
                              onClick={() => {
                                if (
                                  selectedCourses.some(
                                    (c) => c.id === course.id
                                  )
                                ) {
                                  removeCourse(course.id);
                                } else {
                                  addCourse(course);
                                }
                              }}
                            >
                              <Label
                                htmlFor={`select-${course.id}`}
                                className="cursor-pointer"
                              >
                                {course.name}
                              </Label>
                            </TableCell>
                            <TableCell
                              className="text-center"
                              onClick={() => {
                                if (
                                  selectedCourses.some(
                                    (c) => c.id === course.id
                                  )
                                ) {
                                  removeCourse(course.id);
                                } else {
                                  addCourse(course);
                                }
                              }}
                            >
                              {course.sks}
                            </TableCell>
                            <TableCell
                              className="hidden md:table-cell"
                              onClick={() => {
                                if (
                                  selectedCourses.some(
                                    (c) => c.id === course.id
                                  )
                                ) {
                                  removeCourse(course.id);
                                } else {
                                  addCourse(course);
                                }
                              }}
                            >
                              {getStatusBadge(course.status)}
                            </TableCell>
                            <TableCell
                              className="hidden md:table-cell"
                              onClick={() => {
                                if (
                                  selectedCourses.some(
                                    (c) => c.id === course.id
                                  )
                                ) {
                                  removeCourse(course.id);
                                } else {
                                  addCourse(course);
                                }
                              }}
                            >
                              {course.day}, {course.time}
                            </TableCell>
                            <TableCell>
                              <TooltipProvider>
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <Button
                                      variant="ghost"
                                      size="icon"
                                      className="h-8 w-8"
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        setCourseDetailsOpen(course.id);
                                      }}
                                    >
                                      <Info className="h-4 w-4" />
                                      <span className="sr-only">Info</span>
                                    </Button>
                                  </TooltipTrigger>
                                  <TooltipContent side="left">
                                    <p>Lihat detail mata kuliah</p>
                                  </TooltipContent>
                                </Tooltip>
                              </TooltipProvider>
                            </TableCell>
                          </TableRow>
                        ))}
                        {filteredCourses.length === 0 && (
                          <TableRow>
                            <TableCell
                              colSpan={7}
                              className="text-muted-foreground py-6 text-center"
                            >
                              Tidak ada mata kuliah yang sesuai dengan pencarian
                            </TableCell>
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>
                  </div>
                </div>
                <DialogFooter className="flex flex-col gap-2 sm:flex-row sm:justify-between sm:gap-0">
                  <div className="text-muted-foreground flex items-center text-sm">
                    <Info className="mr-2 h-4 w-4" />
                    Mata kuliah yang sudah dipilih: {selectedCourses.length}
                  </div>
                  <Button
                    type="submit"
                    onClick={() => setIsDialogOpen(false)}
                    className="cursor-pointer"
                  >
                    Simpan Perubahan
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>

            {/* Course Details Dialog */}
            {courseDetailsOpen && (
              <Dialog
                open={!!courseDetailsOpen}
                onOpenChange={() => setCourseDetailsOpen(null)}
              >
                <DialogContent className="sm:max-w-[500px]">
                  <DialogHeader>
                    <DialogTitle>Detail Mata Kuliah</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    {(() => {
                      const course = [
                        ...availableCourses,
                        ...selectedCourses,
                      ].find((c) => c.id === courseDetailsOpen);
                      if (!course) return null;
                      return (
                        <>
                          <div className="flex items-center justify-between">
                            <Badge variant="outline" className="px-3 py-1">
                              {course.id}
                            </Badge>
                            {getStatusBadge(course.status)}
                          </div>
                          <h3 className="text-lg font-semibold">
                            {course.name}
                          </h3>
                          <p className="text-muted-foreground text-sm">
                            {course.description}
                          </p>
                          <div className="grid grid-cols-2 gap-4 rounded-lg border p-4">
                            <div>
                              <p className="text-muted-foreground text-xs">
                                SKS
                              </p>
                              <p className="font-medium">{course.sks}</p>
                            </div>
                            <div>
                              <p className="text-muted-foreground text-xs">
                                Semester
                              </p>
                              <p className="font-medium">{course.semester}</p>
                            </div>
                            <div>
                              <p className="text-muted-foreground text-xs">
                                Jadwal
                              </p>
                              <p className="font-medium">
                                {course.day}, {course.time}
                              </p>
                            </div>
                            <div>
                              <p className="text-muted-foreground text-xs">
                                Ruang
                              </p>
                              <p className="font-medium">{course.room}</p>
                            </div>
                            <div className="col-span-2">
                              <p className="text-muted-foreground text-xs">
                                Dosen
                              </p>
                              <p className="font-medium">{course.lecturer}</p>
                            </div>
                          </div>
                        </>
                      );
                    })()}
                  </div>
                  <DialogFooter>
                    <Button
                      onClick={() => {
                        const course = availableCourses.find(
                          (c) => c.id === courseDetailsOpen
                        );
                        if (course) {
                          if (selectedCourses.some((c) => c.id === course.id)) {
                            removeCourse(course.id);
                          } else {
                            addCourse(course);
                          }
                        }
                        setCourseDetailsOpen(null);
                      }}
                      className="cursor-pointer"
                    >
                      {selectedCourses.some((c) => c.id === courseDetailsOpen)
                        ? "Hapus dari KRS"
                        : "Tambahkan ke KRS"}
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            )}
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader className="bg-muted/50">
                <TableRow>
                  <TableHead className="w-[100px]">Kode</TableHead>
                  <TableHead>Mata Kuliah</TableHead>
                  <TableHead className="text-center">SKS</TableHead>
                  <TableHead className="hidden md:table-cell">Status</TableHead>
                  <TableHead className="hidden md:table-cell">Jadwal</TableHead>
                  <TableHead className="hidden md:table-cell">Ruang</TableHead>
                  <TableHead className="hidden lg:table-cell">Dosen</TableHead>
                  <TableHead className="text-right">Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {selectedCourses.map((course) => (
                  <TableRow key={course.id} className="group transition-colors">
                    <TableCell className="font-medium">{course.id}</TableCell>
                    <TableCell className="max-w-[200px] truncate sm:max-w-none">
                      <div className="flex items-center gap-2">
                        <span>{course.name}</span>
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-6 w-6 shrink-0"
                                onClick={() => setCourseDetailsOpen(course.id)}
                              >
                                <Info className="h-3.5 w-3.5" />
                                <span className="sr-only">Info</span>
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent side="top">
                              <p>Lihat detail mata kuliah</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                    </TableCell>
                    <TableCell className="text-center">{course.sks}</TableCell>
                    <TableCell className="hidden md:table-cell">
                      {getStatusBadge(course.status)}
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      {course.day}, {course.time}
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      {course.room}
                    </TableCell>
                    <TableCell className="hidden lg:table-cell">
                      {course.lecturer}
                    </TableCell>
                    <TableCell className="text-right">
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="cursor-pointer text-red-500 opacity-70 transition-opacity group-hover:opacity-100 hover:bg-red-100 hover:text-red-700 dark:hover:bg-red-900/30"
                              onClick={() => removeCourse(course.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                              <span className="sr-only">Hapus</span>
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent side="left">
                            <p>Hapus mata kuliah</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </TableCell>
                  </TableRow>
                ))}
                {selectedCourses.length === 0 && (
                  <TableRow>
                    <TableCell
                      colSpan={8}
                      className="text-muted-foreground py-10 text-center"
                    >
                      <div className="flex flex-col items-center justify-center gap-2">
                        <div className="bg-muted rounded-full p-3">
                          <Plus className="text-muted-foreground h-6 w-6" />
                        </div>
                        <p>Belum ada mata kuliah yang dipilih</p>
                        <Button
                          variant="outline"
                          size="sm"
                          className="mt-2 cursor-pointer"
                          onClick={() => setIsDialogOpen(true)}
                        >
                          Tambah Mata Kuliah
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col justify-between gap-3 border-t p-4 sm:flex-row">
          <div className="flex w-full justify-center sm:w-auto sm:justify-start">
            <Button
              variant="outline"
              className="w-full cursor-pointer gap-2 sm:w-auto"
              onClick={() => setIsDialogOpen(true)}
            >
              <Plus className="h-4 w-4" />
              Tambah Mata Kuliah
            </Button>
          </div>
          <div className="flex w-full gap-2 sm:w-auto">
            <Button
              variant="outline"
              className="flex-1 cursor-pointer gap-2 sm:flex-auto"
            >
              <FileText className="h-4 w-4" />
              <span className="hidden sm:inline">Cetak KRS</span>
              <span className="sm:hidden">Cetak</span>
            </Button>
            <Button className="flex-1 cursor-pointer gap-2 sm:flex-auto">
              <Save className="h-4 w-4" />
              <span className="hidden sm:inline">Simpan KRS</span>
              <span className="sm:hidden">Simpan</span>
            </Button>
          </div>
        </CardFooter>
      </Card>
    </>
  );
}
