"use client";

import { useState } from "react";

import { FileText, Plus, Save, Search, Trash2 } from "lucide-react";

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

  const filteredCourses = availableCourses.filter(
    (course) =>
      course.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      (selectedSemester === "all" ||
        course.semester.toString() === selectedSemester)
  );

  const addCourse = (course: any) => {
    setSelectedCourses([...selectedCourses, course]);
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

  return (
    <>
      <Card className="border-none shadow-lg">
        <CardHeader className="pb-3">
          <CardTitle>Mata Kuliah Terpilih</CardTitle>
          <CardDescription>
            Total SKS: {totalSKS}/24 (Maksimal SKS yang dapat diambil)
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Kode</TableHead>
                <TableHead>Mata Kuliah</TableHead>
                <TableHead className="text-center">SKS</TableHead>
                <TableHead className="hidden md:table-cell">Jadwal</TableHead>
                <TableHead className="hidden md:table-cell">Ruang</TableHead>
                <TableHead className="hidden lg:table-cell">Dosen</TableHead>
                <TableHead className="text-right">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {selectedCourses.map((course) => (
                <TableRow key={course.id}>
                  <TableCell className="font-medium">{course.id}</TableCell>
                  <TableCell>{course.name}</TableCell>
                  <TableCell className="text-center">{course.sks}</TableCell>
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
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-red-500 hover:bg-red-100 hover:text-red-700"
                      onClick={() => removeCourse(course.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                      <span className="sr-only">Hapus</span>
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
              {selectedCourses.length === 0 && (
                <TableRow>
                  <TableCell
                    colSpan={7}
                    className="text-muted-foreground py-6 text-center"
                  >
                    Belum ada mata kuliah yang dipilih
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
        <CardFooter className="flex justify-between border-t p-4">
          <div className="flex items-center gap-2">
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" className="gap-2">
                  <Plus className="h-4 w-4" />
                  Tambah Mata Kuliah
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
                      <SelectTrigger className="w-[180px]">
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
                          <TableRow key={course.id}>
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
                            <TableCell className="font-medium">
                              {course.id}
                            </TableCell>
                            <TableCell>
                              <Label htmlFor={`select-${course.id}`}>
                                {course.name}
                              </Label>
                            </TableCell>
                            <TableCell className="text-center">
                              {course.sks}
                            </TableCell>
                            <TableCell className="hidden md:table-cell">
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
                  <Button type="submit">Simpan Perubahan</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="gap-2">
              <FileText className="h-4 w-4" />
              Cetak KRS
            </Button>
            <Button className="gap-2">
              <Save className="h-4 w-4" />
              Simpan KRS
            </Button>
          </div>
        </CardFooter>
      </Card>
    </>
  );
}
