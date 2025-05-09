"use client";

import { useRef, useState } from "react";

import { Printer } from "lucide-react";
import { useReactToPrint } from "react-to-print";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { JadwalPrintContent } from "./schedule-print-content";
import { jadwalPrintStyles } from "./schedule-print-style";

// Sample data
const courses = [
  {
    id: "MED101",
    title: "Anatomi Manusia",
    day: "Senin",
    startHour: 8,
    endHour: 9.67, // 9:40
    location: "Lab Anatomi 1",
    lecturer: "Dr. Surya Wijaya",
    lecturerInitials: "SW",
    type: "lecture",
    credits: 3,
  },
  {
    id: "MED105",
    title: "Praktikum Anatomi",
    day: "Senin",
    startHour: 13,
    endHour: 14.67, // 14:40
    location: "Lab Anatomi 2",
    lecturer: "Dr. Surya Wijaya",
    lecturerInitials: "SW",
    type: "lab",
    credits: 1,
  },
  {
    id: "MED102",
    title: "Fisiologi Sistem Tubuh",
    day: "Selasa",
    startHour: 10,
    endHour: 11.67, // 11:40
    location: "Ruang 2.3",
    lecturer: "Prof. Ratna Dewi",
    lecturerInitials: "RD",
    type: "lecture",
    credits: 4,
  },
  {
    id: "MED103",
    title: "Patologi Umum",
    day: "Kamis",
    startHour: 13,
    endHour: 14.67, // 14:40
    location: "Lab Patologi",
    lecturer: "Dr. Hendra Santoso",
    lecturerInitials: "HS",
    type: "lecture",
    credits: 3,
  },
];

const studentInfo = {
  name: "John Doe",
  nim: "12345678",
  program: "Kedokteran",
  faculty: "Fakultas Kedokteran",
  semester: "Semester Genap",
  academicYear: "2024/2025",
};

export function PrintScheduleComponent() {
  const printRef = useRef<HTMLDivElement>(null);
  const [printFormat, setPrintFormat] = useState("weekly");

  const handlePrint = useReactToPrint({
    contentRef: printRef,
    documentTitle: `Jadwal Kuliah ${studentInfo.name}`,
    pageStyle: jadwalPrintStyles,

    onAfterPrint: () => {
      toast.success("Jadwal Kuliah berhasil diunduh", {
        richColors: true,
        duration: 1300,
      });
    },
  });

  return (
    <>
      {/* Add print styles to the document */}
      <style
        type="text/css"
        dangerouslySetInnerHTML={{ __html: jadwalPrintStyles }}
      />

      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline" size="sm" className="gap-1.5">
            <Printer className="h-4 w-4" />
            <span>Cetak Jadwal</span>
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Cetak Jadwal Kuliah</DialogTitle>
            <DialogDescription>
              Pilih format cetak dan pratinjau jadwal kuliah Anda sebelum
              mencetak.
            </DialogDescription>
          </DialogHeader>

          <div className="my-4 flex items-center justify-between">
            <Select value={printFormat} onValueChange={setPrintFormat}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Pilih Format" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="weekly">Format Mingguan</SelectItem>
                <SelectItem value="list">Format Daftar</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="max-h-[60vh] overflow-y-auto rounded-md border p-4">
            <div ref={printRef}>
              <JadwalPrintContent
                studentInfo={studentInfo}
                courses={courses}
                printFormat={printFormat}
              />
            </div>
          </div>

          <DialogFooter className="flex items-center justify-between">
            <div className="text-muted-foreground text-sm">
              Tip: Gunakan pengaturan cetak landscape untuk hasil terbaik.
            </div>
            <Button onClick={handlePrint}>Cetak Sekarang</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
