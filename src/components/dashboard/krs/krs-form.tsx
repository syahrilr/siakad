"use client";

import { useState } from "react";

import { FileText, Plus, Save, Search, Trash2 } from "lucide-react";

import { Hint } from "@/components/globals/hint";
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
import { Tooltip } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

export function KRSForm() {
  const [selectedCourses, setSelectedCourses] = useState([
    {
      id: "CS101",
      name: "Algoritma dan Pemrograman Lanjut",
      sks: 3,
      semester: 6,
      day: "Senin",
      time: "08:00 - 09:40",
      room: "Lab Komputer 3",
      lecturer: "Dr. Budi Santoso",
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
    },
  ]);

  const availableCourses = [
    {
      id: "CS104",
      name: "Kecerdasan Buatan",
      sks: 3,
      semester: 6,
      day: "Kamis",
      time: "08:00 - 09:40",
      room: "Ruang 3.2",
      lecturer: "Dr. Rina Wijaya",
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
    },
  ];

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSemester, setSelectedSemester] = useState("all");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const filteredCourses = availableCourses.filter(
    (course) =>
      course.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      (selectedSemester === "all" ||
        course.semester.toString() === selectedSemester)
  );

  const addCourse = (course: any) => {
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

  return (
    <>
      <Card className="border-none shadow-lg transition-all duration-300 hover:shadow-xl">
        <CardHeader className="pb-3">
          <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
            <div>
              <CardTitle className="text-xl font-bold">
                Mata Kuliah Terpilih
              </CardTitle>
              <CardDescription>
                <div className="mt-1 flex items-center gap-2">
                  <div className="h-2 w-full max-w-[200px] overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
                    <div
                      className={cn(
                        "h-full rounded-full transition-all duration-500",
                        sksPercentage > 90
                          ? "bg-red-500"
                          : sksPercentage > 75
                            ? "bg-amber-500"
                            : "bg-primary"
                      )}
                      style={{ width: `${Math.min(sksPercentage, 100)}%` }}
                    ></div>
                  </div>
                  <span className="text-sm font-medium">
                    {totalSKS}/{maxSKS} SKS
                  </span>
                </div>
              </CardDescription>
            </div>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button
                  variant="outline"
                  className="cursor-pointer gap-2 sm:self-end"
                >
                  <Plus className="h-4 w-4" />
                  <span className="hidden sm:inline">Tambah Mata Kuliah</span>
                  <span className="sm:hidden">Tambah</span>
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[700px]">
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
                    <Select
                      value={selectedSemester}
                      onValueChange={setSelectedSemester}
                    >
                      <SelectTrigger className="w-full md:w-[180px]">
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
                  </div>
                  <div className="max-h-[300px] overflow-auto rounded-md border">
                    <Table>
                      <TableHeader className="bg-background sticky top-0">
                        <TableRow>
                          <TableHead className="w-[50px]"></TableHead>
                          <TableHead className="w-[100px]">Kode</TableHead>
                          <TableHead>Mata Kuliah</TableHead>
                          <TableHead className="text-center">SKS</TableHead>
                          <TableHead className="hidden md:table-cell">
                            Jadwal
                          </TableHead>
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
                              {course.day}, {course.time}
                            </TableCell>
                          </TableRow>
                        ))}
                        {filteredCourses.length === 0 && (
                          <TableRow>
                            <TableCell
                              colSpan={5}
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
                <DialogFooter>
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
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-lg border">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[100px]">Kode</TableHead>
                    <TableHead>Mata Kuliah</TableHead>
                    <TableHead className="text-center">SKS</TableHead>
                    <TableHead className="hidden md:table-cell">
                      Jadwal
                    </TableHead>
                    <TableHead className="hidden md:table-cell">
                      Ruang
                    </TableHead>
                    <TableHead className="hidden lg:table-cell">
                      Dosen
                    </TableHead>
                    <TableHead className="text-right">Aksi</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {selectedCourses.map((course) => (
                    <TableRow
                      key={course.id}
                      className="group transition-colors"
                    >
                      <TableCell className="font-medium">{course.id}</TableCell>
                      <TableCell className="max-w-[200px] truncate sm:max-w-none">
                        {course.name}
                      </TableCell>
                      <TableCell className="text-center">
                        {course.sks}
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
                        <Hint label="Hapus Mata Kuliah" variant="delete">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="cursor-pointer text-red-500 opacity-70 transition-opacity group-hover:opacity-100 hover:bg-red-100 hover:text-red-700 dark:hover:bg-red-900/30"
                            onClick={() => removeCourse(course.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                            <span className="sr-only">Hapus</span>
                          </Button>
                        </Hint>
                      </TableCell>
                    </TableRow>
                  ))}
                  {selectedCourses.length === 0 && (
                    <TableRow>
                      <TableCell
                        colSpan={7}
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
