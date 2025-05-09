import type React from "react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

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

interface PrintContentProps {
  studentData: {
    name: string;
    id: string;
    faculty: string;
    program: string;
    semester: string;
    academicYear: string;
  };
  selectedCourses: Course[];
  totalSKS: number;
}

export const PrintContent: React.FC<PrintContentProps> = ({
  studentData,
  selectedCourses,
  totalSKS,
}) => {
  const getStatusBadge = (status?: string) => {
    if (status === "wajib") {
      return (
        <span className="badge-print border-blue-200 bg-blue-50 text-blue-800">
          Wajib
        </span>
      );
    }
    if (status === "pilihan") {
      return (
        <span className="badge-print border-purple-200 bg-purple-50 text-purple-800">
          Pilihan
        </span>
      );
    }
    return null;
  };

  const currentDate = new Date();
  const formattedDate = currentDate.toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div id="print-content" className="p-8 font-sans">
      {/* University Header */}
      <div className="print-header mb-8 flex items-center justify-between border-b-2 border-black pb-4">
        <div className="flex items-center gap-4">
          <div className="logo-circle flex h-16 w-16 items-center justify-center rounded-full bg-gray-100 text-2xl font-bold">
            U
          </div>
          <div>
            <h1 className="university-name mb-1 text-lg font-bold">
              UNIVERSITAS KESEHATAN
            </h1>
            <p className="faculty-name text-sm text-gray-600">
              {studentData.faculty}
            </p>
            <p className="program-name text-sm text-gray-600">
              Program Studi {studentData.program}
            </p>
          </div>
        </div>
        <div className="text-right">
          <h2 className="document-title mb-1 text-lg font-bold">
            KARTU RENCANA STUDI (KRS)
          </h2>
          <p className="semester-info text-sm text-gray-600">
            Semester {studentData.semester}
            <br />
            Tahun Akademik {studentData.academicYear}
          </p>
        </div>
      </div>

      {/* Student Information */}
      <div className="student-info mb-6 grid grid-cols-2 gap-4">
        <div className="student-info-item">
          <div className="student-info-label text-xs font-medium text-gray-500">
            Nama Mahasiswa
          </div>
          <div className="student-info-value text-sm font-semibold">
            {studentData.name}
          </div>
        </div>
        <div className="student-info-item">
          <div className="student-info-label text-xs font-medium text-gray-500">
            Nomor Induk Mahasiswa
          </div>
          <div className="student-info-value text-sm font-semibold">
            {studentData.id}
          </div>
        </div>
      </div>

      {/* Courses Table */}
      <Table className="mb-4 border">
        <TableHeader className="bg-gray-50">
          <TableRow>
            <TableHead className="w-[100px] border p-2 text-xs font-medium">
              Kode
            </TableHead>
            <TableHead className="border p-2 text-xs font-medium">
              Mata Kuliah
            </TableHead>
            <TableHead className="w-[60px] border p-2 text-center text-xs font-medium">
              SKS
            </TableHead>
            <TableHead className="w-[100px] border p-2 text-xs font-medium">
              Status
            </TableHead>
            <TableHead className="w-[150px] border p-2 text-xs font-medium">
              Jadwal
            </TableHead>
            <TableHead className="w-[120px] border p-2 text-xs font-medium">
              Ruang
            </TableHead>
            <TableHead className="border p-2 text-xs font-medium">
              Dosen Pengampu
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {selectedCourses.map((course) => (
            <TableRow key={course.id} className="hover:bg-transparent">
              <TableCell className="border p-2 text-sm font-medium">
                {course.id}
              </TableCell>
              <TableCell className="border p-2 text-sm">
                {course.name}
              </TableCell>
              <TableCell className="border p-2 text-center text-sm">
                {course.sks}
              </TableCell>
              <TableCell className="border p-2 text-sm">
                {getStatusBadge(course.status)}
              </TableCell>
              <TableCell className="border p-2 text-sm">
                {course.day}, {course.time}
              </TableCell>
              <TableCell className="border p-2 text-sm">
                {course.room}
              </TableCell>
              <TableCell className="border p-2 text-sm">
                {course.lecturer}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Summary Section */}
      <div className="print-summary mb-8 flex justify-end">
        <div className="w-64 border-t-2 border-black pt-2">
          <div className="flex justify-between">
            <span className="text-sm font-medium">Total Mata Kuliah:</span>
            <span className="text-sm font-semibold">
              {selectedCourses.length}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm font-medium">Total SKS:</span>
            <span className="text-sm font-semibold">{totalSKS}</span>
          </div>
        </div>
      </div>

      {/* Signature Section */}
      <div className="print-footer">
        <div className="signature-section flex justify-end">
          <div className="signature-container w-64 text-center">
            <div className="signature-place-date mb-4 text-sm">
              Ascent, {formattedDate}
            </div>
            <div className="signature-space mb-2 h-20 border-b-2 border-black"></div>
            <div className="signature-name text-sm font-semibold">
              Dr. Muhammad Arifin, M.Kom.
            </div>
            <div className="signature-nip text-xs text-gray-600">
              NIP. 197003101995121002
            </div>
            <div className="signature-role mt-1 text-xs text-gray-600">
              Dosen Pembimbing Akademik
            </div>
          </div>
        </div>
      </div>

      {/* Print Timestamp */}
      <div className="print-timestamp mt-8 text-right text-xs text-gray-500">
        Dicetak pada: {currentDate.toLocaleString("id-ID")}
      </div>
    </div>
  );
};
