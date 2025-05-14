"use client";

import Link from "next/link";
import { useState } from "react";

import {
  AlertCircle,
  Calendar,
  CheckCircle,
  ChevronDown,
  ChevronUp,
  Clock,
  FileText,
  XCircle,
} from "lucide-react";

import { DashboardHeader } from "@/components/dashboard/header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
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

// Define the Assignment type based on the provided data structure
interface Assignment {
  id: string;
  title: string;
  description: string;
  course: string;
  courseId: string;
  lecturerId: string;
  createdAt: string;
  dueDate: string;
  isSubmitted: boolean;
  submissionId?: string;
  grade?: number;
  weight?: number;
  feedback?: string;
  attachments: string[];
}

// Use the provided assignment data
export const assignments: Assignment[] = [
  {
    id: "assignment-1",
    title: "Laporan Kasus Hipertensi",
    description:
      "Buatlah laporan kasus pasien hipertensi yang Anda temui selama rotasi di departemen Penyakit Dalam. Laporan harus mencakup anamnesis, pemeriksaan fisik, pemeriksaan penunjang, diagnosis, dan rencana tatalaksana.",
    course: "Ilmu Penyakit Dalam",
    courseId: "course-1",
    lecturerId: "user-1",
    createdAt: "2025-04-10T08:00:00Z",
    dueDate: "2025-04-25T23:59:59Z",
    isSubmitted: true,
    submissionId: "submission-1",
    grade: 85,
    weight: 25,
    feedback:
      "Laporan kasus sangat komprehensif dan analisis diagnostik sangat baik. Pertimbangkan untuk menambahkan lebih banyak literatur terkini untuk mendukung rencana tatalaksana yang Anda usulkan.",
    attachments: ["Panduan_Laporan_Kasus.pdf", "Template_Laporan.docx"],
  },
  {
    id: "assignment-2",
    title: "Presentasi Kasus Bedah Digestif",
    description:
      "Siapkan presentasi kasus bedah digestif untuk diskusi kelompok. Pilih satu kasus menarik yang Anda temui selama rotasi di departemen Bedah. Presentasi harus mencakup gambaran klinis, pendekatan diagnostik, teknik operasi, dan follow-up pasca operasi.",
    course: "Ilmu Bedah",
    courseId: "course-2",
    lecturerId: "user-2",
    createdAt: "2025-04-15T10:00:00Z",
    dueDate: "2025-06-01T23:59:59Z",
    isSubmitted: true,
    submissionId: "submission-2",
    grade: 78,
    weight: 25,
    feedback:
      "Presentasi kasus cukup baik, namun perlu penjelasan lebih detail mengenai teknik operasi yang dipilih. Diskusi mengenai alternatif tindakan dan evidence-based medicine perlu diperdalam.",
    attachments: ["Panduan_Presentasi_Kasus.pdf"],
  },
  {
    id: "assignment-3",
    title: "Refleksi Etika Kedokteran",
    description:
      "Tuliskan refleksi pribadi mengenai dilema etika yang Anda hadapi selama praktik klinik. Bahas prinsip-prinsip etika yang terlibat, alternatif tindakan, dan justifikasi keputusan yang diambil.",
    course: "Etika Kedokteran",
    courseId: "course-3",
    lecturerId: "user-1",
    createdAt: "2025-04-20T09:00:00Z",
    dueDate: "2025-06-10T23:59:59Z",
    isSubmitted: false,
    attachments: ["Panduan_Refleksi_Etika.pdf"],
  },
  {
    id: "assignment-4",
    title: "Laporan Praktikum Farmakologi",
    description:
      "Buatlah laporan praktikum farmakologi tentang uji efek obat pada hewan coba. Laporan harus mencakup metodologi, hasil pengamatan, analisis data, dan diskusi.",
    course: "Farmakologi Klinik",
    courseId: "course-4",
    lecturerId: "user-2",
    createdAt: "2025-04-25T11:00:00Z",
    dueDate: "2025-06-15T23:59:59Z",
    isSubmitted: false,
    attachments: [
      "Panduan_Praktikum_Farmakologi.pdf",
      "Template_Laporan_Praktikum.docx",
    ],
  },
  {
    id: "assignment-5",
    title: "Jurnal Baca Kardiologi",
    description:
      "Pilih satu artikel penelitian terbaru (maksimal 2 tahun terakhir) dari jurnal kardiologi bereputasi. Buatlah ringkasan dan analisis kritis terhadap metodologi, hasil, dan implikasi klinis dari penelitian tersebut.",
    course: "Kardiologi",
    courseId: "course-5",
    lecturerId: "user-1",
    createdAt: "2025-06-01T08:30:00Z",
    dueDate: "2025-06-20T23:59:59Z",
    isSubmitted: false,
    attachments: ["Panduan_Jurnal_Baca.pdf"],
  },
  {
    id: "assignment-6",
    title: "Laporan Kasus Bedah",
    description:
      "Buatlah laporan kasus bedah yang Anda temui selama rotasi di departemen Bedah. Laporan harus mencakup anamnesis, pemeriksaan fisik, pemeriksaan penunjang, diagnosis, dan rencana tatalaksana bedah.",
    course: "Ilmu Bedah",
    courseId: "course-2",
    lecturerId: "user-2",
    createdAt: "2025-06-04T10:00:00Z",
    dueDate: "2025-06-25T23:59:59Z",
    isSubmitted: false,
    attachments: [
      "Panduan_Laporan_Kasus_Bedah.pdf",
      "Template_Laporan_Bedah.docx",
    ],
  },
];

// Map of lecturer IDs to names (since they're not in the data)
const lecturerMap: Record<string, string> = {
  "user-1": "Dr. Anita Wijaya, Sp.PD",
  "user-2": "Dr. Budi Santoso, Sp.B",
};

// Group assignments by course
const courseAssignments = assignments.reduce(
  (acc, assignment) => {
    if (!acc[assignment.course]) {
      acc[assignment.course] = [];
    }
    acc[assignment.course].push(assignment);
    return acc;
  },
  {} as Record<string, Assignment[]>
);

export default function GradesPage() {
  // State to track expanded courses
  const [expandedCourses, setExpandedCourses] = useState<
    Record<string, boolean>
  >(() => {
    // Initialize all courses as expanded
    return Object.keys(courseAssignments).reduce(
      (acc, course) => {
        acc[course] = true;
        return acc;
      },
      {} as Record<string, boolean>
    );
  });

  // Toggle course expansion
  const toggleCourseExpansion = (course: string) => {
    setExpandedCourses((prev) => ({
      ...prev,
      [course]: !prev[course],
    }));
  };

  // Format date to readable format
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(date);
  };

  // Calculate days remaining or days overdue
  const getDaysStatus = (dueDate: string) => {
    const today = new Date();
    const due = new Date(dueDate);
    const diffTime = due.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays > 0) {
      return {
        text: `${diffDays} hari tersisa`,
        status: "remaining",
      };
    } else if (diffDays === 0) {
      return {
        text: "Tenggat hari ini",
        status: "today",
      };
    } else {
      return {
        text: `Terlambat ${Math.abs(diffDays)} hari`,
        status: "overdue",
      };
    }
  };

  // Get status badge for assignment
  const getStatusBadge = (assignment: Assignment) => {
    if (assignment.isSubmitted && assignment.grade) {
      return (
        <Badge className="border-emerald-200 bg-emerald-50 text-emerald-700 hover:bg-emerald-100">
          <CheckCircle className="mr-1 h-3 w-3" />
          Dinilai
        </Badge>
      );
    } else if (assignment.isSubmitted) {
      return (
        <Badge className="border-indigo-200 bg-indigo-50 text-indigo-700 hover:bg-indigo-100">
          <Clock className="mr-1 h-3 w-3" />
          Menunggu Penilaian
        </Badge>
      );
    } else {
      const daysStatus = getDaysStatus(assignment.dueDate);
      if (daysStatus.status === "overdue") {
        return (
          <Badge className="border-rose-200 bg-rose-50 text-rose-700 hover:bg-rose-100">
            <XCircle className="mr-1 h-3 w-3" />
            Belum Dikumpulkan
          </Badge>
        );
      } else {
        return (
          <Badge className="border-amber-200 bg-amber-50 text-amber-700 hover:bg-amber-100">
            <AlertCircle className="mr-1 h-3 w-3" />
            Belum Dikumpulkan
          </Badge>
        );
      }
    }
  };

  return (
    <div className="min-h-screen">
      <main className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-center">
          <DashboardHeader
            heading="Tugas dan Penilaian"
            text="Lihat dan kelola tugas serta penilaian Anda di sini."
          />
        </div>

        <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-3">
          <Card className="col-span-1 md:col-span-2">
            <CardHeader className="bg-gradient-to-r from-indigo-50 to-white pb-2">
              <CardTitle className="text-lg text-indigo-900">
                Ringkasan Tugas
              </CardTitle>
              <CardDescription>
                Status pengumpulan tugas semester ini
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Total Tugas</span>
                    <span className="text-sm font-medium">
                      {assignments.length} Tugas
                    </span>
                  </div>
                  <Progress
                    value={
                      (assignments.filter((a) => a.isSubmitted).length /
                        assignments.length) *
                      100
                    }
                    className="h-2"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4 pt-2 md:grid-cols-4">
                  <div className="rounded-lg border border-emerald-100 bg-gradient-to-br from-emerald-50 to-white p-3 shadow-sm">
                    <div className="text-xl font-semibold text-emerald-700">
                      {
                        assignments.filter((a) => a.isSubmitted && a.grade)
                          .length
                      }
                    </div>
                    <div className="text-xs text-emerald-600">
                      Sudah Dinilai
                    </div>
                  </div>
                  <div className="rounded-lg border border-indigo-100 bg-gradient-to-br from-indigo-50 to-white p-3 shadow-sm">
                    <div className="text-xl font-semibold text-indigo-700">
                      {
                        assignments.filter((a) => a.isSubmitted && !a.grade)
                          .length
                      }
                    </div>
                    <div className="text-xs text-indigo-600">
                      Menunggu Penilaian
                    </div>
                  </div>
                  <div className="rounded-lg border border-amber-100 bg-gradient-to-br from-amber-50 to-white p-3 shadow-sm">
                    <div className="text-xl font-semibold text-amber-700">
                      {
                        assignments.filter(
                          (a) =>
                            !a.isSubmitted &&
                            getDaysStatus(a.dueDate).status !== "overdue"
                        ).length
                      }
                    </div>
                    <div className="text-xs text-amber-600">
                      Belum Dikumpulkan
                    </div>
                  </div>
                  <div className="rounded-lg border border-rose-100 bg-gradient-to-br from-rose-50 to-white p-3 shadow-sm">
                    <div className="text-xl font-semibold text-rose-700">
                      {
                        assignments.filter(
                          (a) =>
                            !a.isSubmitted &&
                            getDaysStatus(a.dueDate).status === "overdue"
                        ).length
                      }
                    </div>
                    <div className="text-xs text-rose-600">Terlambat</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="bg-gradient-to-r from-amber-50 to-white pb-2">
              <CardTitle className="text-lg text-amber-900">
                Tenggat Terdekat
              </CardTitle>
              <CardDescription>
                Tugas yang harus segera dikumpulkan
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-4">
                {assignments
                  .filter((a) => !a.isSubmitted)
                  .sort(
                    (a, b) =>
                      new Date(a.dueDate).getTime() -
                      new Date(b.dueDate).getTime()
                  )
                  .slice(0, 2)
                  .map((assignment) => (
                    <div
                      key={assignment.id}
                      className="space-y-2 rounded-lg border p-3 shadow-sm transition-colors hover:bg-slate-50"
                    >
                      <div className="line-clamp-1 text-sm font-medium">
                        {assignment.title}
                      </div>
                      <div className="text-xs text-slate-500">
                        {assignment.course}
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="text-xs font-medium">
                          {formatDate(assignment.dueDate)}
                        </div>
                        <Badge
                          variant="outline"
                          className={
                            getDaysStatus(assignment.dueDate).status ===
                            "overdue"
                              ? "border-rose-200 bg-rose-50 text-rose-700"
                              : getDaysStatus(assignment.dueDate).status ===
                                  "today"
                                ? "border-amber-200 bg-amber-50 text-amber-700"
                                : "border-indigo-200 bg-indigo-50 text-indigo-700"
                          }
                        >
                          {getDaysStatus(assignment.dueDate).text}
                        </Badge>
                      </div>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-8">
          {Object.entries(courseAssignments).map(
            ([course, courseAssignments]) => (
              <Card key={course} className="overflow-hidden">
                <CardHeader
                  className={`cursor-pointer bg-gradient-to-r from-indigo-50 to-white transition-colors hover:from-indigo-100`}
                  onClick={() => toggleCourseExpansion(course)}
                >
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2 text-indigo-900">
                      <span>{course}</span>
                      <Badge variant="outline" className="ml-2 bg-white">
                        {courseAssignments.length} Tugas
                      </Badge>
                    </CardTitle>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-slate-500">
                        Dosen:{" "}
                        {lecturerMap[courseAssignments[0].lecturerId] ||
                          "Tidak diketahui"}
                      </span>
                      {expandedCourses[course] ? (
                        <ChevronUp className="h-5 w-5 text-indigo-600" />
                      ) : (
                        <ChevronDown className="h-5 w-5 text-indigo-600" />
                      )}
                    </div>
                  </div>
                </CardHeader>
                {expandedCourses[course] && (
                  <CardContent className="p-0">
                    <div className="overflow-x-auto">
                      <Table>
                        <TableHeader className="bg-slate-50">
                          <TableRow>
                            <TableHead className="w-[250px] py-4">
                              Tugas
                            </TableHead>
                            <TableHead className="py-4">Tenggat</TableHead>
                            <TableHead className="py-4">Status</TableHead>
                            <TableHead className="py-4">Bobot</TableHead>
                            <TableHead className="py-4">Nilai</TableHead>
                            <TableHead className="w-[250px] py-4">
                              Komentar Dosen
                            </TableHead>
                            <TableHead className="py-4 text-right">
                              Aksi
                            </TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {courseAssignments.map((assignment, index) => (
                            <TableRow
                              key={assignment.id}
                              className={`group transition-colors hover:bg-indigo-50/30 ${index % 2 === 0 ? "bg-white" : "bg-slate-50/50"} `}
                            >
                              <TableCell className="border-b border-slate-100 py-4 font-medium">
                                <div>
                                  <div className="font-medium">
                                    {assignment.title}
                                  </div>
                                  <TooltipProvider>
                                    <Tooltip>
                                      <TooltipTrigger asChild>
                                        <div className="mt-1 line-clamp-2 max-w-[230px] cursor-help text-xs text-slate-500">
                                          {assignment.description}
                                        </div>
                                      </TooltipTrigger>
                                      <TooltipContent className="max-w-sm">
                                        <p>{assignment.description}</p>
                                      </TooltipContent>
                                    </Tooltip>
                                  </TooltipProvider>
                                </div>
                              </TableCell>
                              <TableCell className="border-b border-slate-100 py-4">
                                <div className="space-y-1">
                                  <div className="text-sm">
                                    {formatDate(assignment.dueDate)}
                                  </div>
                                  <div
                                    className={`text-xs ${
                                      getDaysStatus(assignment.dueDate)
                                        .status === "overdue"
                                        ? "text-rose-600"
                                        : getDaysStatus(assignment.dueDate)
                                              .status === "today"
                                          ? "text-amber-600"
                                          : "text-indigo-600"
                                    }`}
                                  >
                                    {getDaysStatus(assignment.dueDate).text}
                                  </div>
                                </div>
                              </TableCell>
                              <TableCell className="border-b border-slate-100 py-4">
                                {getStatusBadge(assignment)}
                              </TableCell>
                              <TableCell className="border-b border-slate-100 py-4">
                                {assignment.weight ? (
                                  <div className="flex items-center gap-1">
                                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-100 text-xs font-medium text-indigo-700">
                                      {assignment.weight}%
                                    </div>
                                  </div>
                                ) : (
                                  <span className="text-slate-400">-</span>
                                )}
                              </TableCell>
                              <TableCell className="border-b border-slate-100 py-4 font-medium">
                                {assignment.grade ? (
                                  <div className="flex items-center gap-2">
                                    <div
                                      className={`flex h-10 w-10 items-center justify-center rounded-full text-sm font-medium ${
                                        assignment.grade >= 85
                                          ? "bg-emerald-100 text-emerald-700"
                                          : assignment.grade >= 70
                                            ? "bg-indigo-100 text-indigo-700"
                                            : "bg-rose-100 text-rose-700"
                                      }`}
                                    >
                                      {assignment.grade}
                                    </div>
                                    <div className="h-2 w-16 rounded-full bg-slate-100">
                                      <div
                                        className={`h-2 rounded-full ${
                                          assignment.grade >= 85
                                            ? "bg-emerald-500"
                                            : assignment.grade >= 70
                                              ? "bg-indigo-500"
                                              : "bg-rose-500"
                                        }`}
                                        style={{
                                          width: `${assignment.grade}%`,
                                        }}
                                      ></div>
                                    </div>
                                  </div>
                                ) : (
                                  <span className="text-slate-400">-</span>
                                )}
                              </TableCell>
                              <TableCell className="border-b border-slate-100 py-4">
                                {assignment.feedback ? (
                                  <TooltipProvider>
                                    <Tooltip>
                                      <TooltipTrigger asChild>
                                        <div className="line-clamp-2 max-w-[230px] cursor-help text-sm text-slate-700">
                                          {assignment.feedback}
                                        </div>
                                      </TooltipTrigger>
                                      <TooltipContent className="max-w-sm">
                                        <p>{assignment.feedback}</p>
                                      </TooltipContent>
                                    </Tooltip>
                                  </TooltipProvider>
                                ) : (
                                  <span className="text-sm text-slate-400">
                                    -
                                  </span>
                                )}
                              </TableCell>
                              <TableCell className="border-b border-slate-100 py-4 text-right">
                                <div className="flex justify-end gap-2">
                                  {assignment.isSubmitted ? (
                                    <Button
                                      asChild
                                      variant="outline"
                                      size="sm"
                                      className="h-8 text-xs opacity-80 transition-opacity group-hover:opacity-100"
                                    >
                                      <Link
                                        href={`/dashboard/pelaporan/submissions/${assignment.submissionId}`}
                                      >
                                        Lihat Pengumpulan
                                      </Link>
                                    </Button>
                                  ) : (
                                    <Button
                                      asChild
                                      variant="outline"
                                      size="sm"
                                      className="h-8 text-xs opacity-80 transition-opacity group-hover:opacity-100"
                                    >
                                      <Link
                                        href={`/assignments/${assignment.id}/submit`}
                                      >
                                        Kumpulkan
                                      </Link>
                                    </Button>
                                  )}
                                  {assignment.grade ? (
                                    <Button
                                      asChild
                                      variant="default"
                                      size="sm"
                                      className="h-8 bg-indigo-600 text-xs opacity-80 transition-opacity group-hover:opacity-100 hover:bg-indigo-700"
                                    >
                                      <Link
                                        href={`/dashboard/pelaporan/grades/${assignment.id}/clarification`}
                                      >
                                        Ajukan Klarifikasi
                                      </Link>
                                    </Button>
                                  ) : (
                                    <Button
                                      disabled
                                      variant="default"
                                      size="sm"
                                      className="h-8 text-xs opacity-50 transition-opacity group-hover:opacity-70"
                                    >
                                      Ajukan Klarifikasi
                                    </Button>
                                  )}
                                </div>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  </CardContent>
                )}
              </Card>
            )
          )}
        </div>
      </main>
    </div>
  );
}
