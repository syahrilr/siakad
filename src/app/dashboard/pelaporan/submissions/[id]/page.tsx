import Link from "next/link";

import {
  ArrowLeft,
  Calendar,
  CheckCircle,
  Clock,
  Download,
  FileText,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export const metadata = {
  title: "Detail Pengumpulan | SIAKAD",
  description: "Halaman detail pengumpulan tugas",
};

// Mock submission data based on the assignments
const submissions = [
  {
    id: "submission-1",
    assignmentId: "assignment-1",
    title: "Laporan Kasus Hipertensi",
    course: "Ilmu Penyakit Dalam",
    submittedAt: "2023-04-24T15:30:00Z",
    dueDate: "2023-04-25T23:59:59Z",
    status: "graded",
    grade: 85,
    maxGrade: 100,
    weight: 25,
    feedback:
      "Laporan kasus sangat komprehensif dan analisis diagnostik sangat baik. Pertimbangkan untuk menambahkan lebih banyak literatur terkini untuk mendukung rencana tatalaksana yang Anda usulkan.",
    files: [
      {
        name: "Laporan_Kasus_Hipertensi_Citra.pdf",
        size: "2.4 MB",
        type: "application/pdf",
      },
    ],
    notes:
      "Saya melampirkan laporan kasus pasien hipertensi dengan komplikasi gagal ginjal kronik. Terima kasih.",
    timeline: [
      {
        date: "24 April 2023, 15:30",
        action: "Tugas dikumpulkan",
        icon: <FileText className="h-5 w-5 text-indigo-600" />,
      },
      {
        date: "25 April 2023, 09:15",
        action: "Tugas diterima oleh dosen",
        icon: <CheckCircle className="h-5 w-5 text-emerald-600" />,
      },
      {
        date: "28 April 2023, 14:20",
        action: "Tugas dinilai",
        icon: <CheckCircle className="h-5 w-5 text-emerald-600" />,
      },
    ],
  },
  {
    id: "submission-2",
    assignmentId: "assignment-2",
    title: "Presentasi Kasus Bedah Digestif",
    course: "Ilmu Bedah",
    submittedAt: "2023-04-30T14:45:00Z",
    dueDate: "2023-06-01T23:59:59Z",
    status: "graded",
    grade: 78,
    maxGrade: 100,
    weight: 25,
    feedback:
      "Presentasi kasus cukup baik, namun perlu penjelasan lebih detail mengenai teknik operasi yang dipilih. Diskusi mengenai alternatif tindakan dan evidence-based medicine perlu diperdalam.",
    files: [
      {
        name: "Presentasi_Kasus_Bedah_Digestif_Citra.pptx",
        size: "5.7 MB",
        type: "application/vnd.openxmlformats-officedocument.presentationml.presentation",
      },
    ],
    notes: "Presentasi kasus kolesistitis akut dengan pendekatan laparoskopi.",
    timeline: [
      {
        date: "30 April 2023, 14:45",
        action: "Tugas dikumpulkan",
        icon: <FileText className="h-5 w-5 text-indigo-600" />,
      },
      {
        date: "2 Mei 2023, 10:30",
        action: "Tugas diterima oleh dosen",
        icon: <CheckCircle className="h-5 w-5 text-emerald-600" />,
      },
      {
        date: "5 Mei 2023, 16:15",
        action: "Tugas dinilai",
        icon: <CheckCircle className="h-5 w-5 text-emerald-600" />,
      },
    ],
  },
];

// Helper functions
const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
};

const getFileIcon = (fileType: string) => {
  if (fileType.includes("pdf")) {
    return <FileText className="h-5 w-5 text-rose-600" />;
  } else if (fileType.includes("presentation")) {
    return <FileText className="h-5 w-5 text-orange-600" />;
  } else if (fileType.includes("word")) {
    return <FileText className="h-5 w-5 text-blue-600" />;
  } else {
    return <FileText className="h-5 w-5 text-slate-600" />;
  }
};

// Define the props type for the page component

export default async function SubmissionDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  // Find the submission based on the ID
  const submission = submissions.find((s) => s.id === id) || submissions[0];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <main className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-center">
          <div>
            <div className="mb-1 flex items-center gap-2">
              <Button asChild variant="ghost" size="sm" className="h-8 w-8 p-0">
                <Link href="/dashboard/pelaporan/grades">
                  <ArrowLeft className="h-4 w-4" />
                  <span className="sr-only">Kembali</span>
                </Link>
              </Button>
              <h1 className="text-3xl font-bold tracking-tight text-slate-900">
                Detail Pengumpulan
              </h1>
            </div>
            <p className="mt-1 text-slate-500">
              {submission.course} - {submission.title}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <div className="space-y-8 md:col-span-2">
            <Card className="border-0 shadow-md">
              <CardHeader className="bg-gradient-to-r from-indigo-50 to-white">
                <CardTitle className="text-indigo-900">
                  Informasi Pengumpulan
                </CardTitle>
                <CardDescription>Detail pengumpulan tugas Anda</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6 pt-6">
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm font-medium text-slate-500">
                        Tugas
                      </p>
                      <p className="text-base font-medium text-slate-900">
                        {submission.title}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-slate-500">
                        Mata Kuliah
                      </p>
                      <p className="text-base text-slate-900">
                        {submission.course}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-slate-500">
                        Waktu Pengumpulan
                      </p>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-indigo-600" />
                        <p className="text-base text-slate-900">
                          {formatDate(submission.submittedAt)}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm font-medium text-slate-500">
                        Status
                      </p>
                      <Badge className="mt-1 border-emerald-200 bg-emerald-50 text-emerald-700">
                        <CheckCircle className="mr-1 h-3 w-3" />
                        Sudah Dinilai
                      </Badge>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-slate-500">
                        Tenggat Waktu
                      </p>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-indigo-600" />
                        <p className="text-base text-slate-900">
                          {formatDate(submission.dueDate)}
                        </p>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-slate-500">
                        Bobot Nilai
                      </p>
                      <p className="text-base text-slate-900">
                        {submission.weight}% dari nilai akhir
                      </p>
                    </div>
                  </div>
                </div>

                <Separator className="bg-slate-100" />

                <div>
                  <p className="mb-3 text-sm font-medium text-slate-700">
                    File yang Dikumpulkan
                  </p>
                  <div className="space-y-3">
                    {submission.files.map((file, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between rounded-lg border bg-white p-3 shadow-sm transition-colors hover:bg-slate-50"
                      >
                        <div className="flex items-center gap-3">
                          <div className="rounded border bg-slate-50 p-2 shadow-sm">
                            {getFileIcon(file.type)}
                          </div>
                          <div>
                            <p className="text-sm font-medium">{file.name}</p>
                            <p className="text-xs text-slate-500">
                              {file.size}
                            </p>
                          </div>
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          className="flex items-center gap-1 border-indigo-200 text-indigo-700 hover:bg-indigo-50"
                        >
                          <Download className="h-4 w-4" />
                          <span>Unduh</span>
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>

                {submission.notes && (
                  <>
                    <Separator className="bg-slate-100" />
                    <div>
                      <p className="mb-3 text-sm font-medium text-slate-700">
                        Catatan Pengumpulan
                      </p>
                      <div className="rounded-lg border bg-white p-4 text-sm text-slate-700 shadow-sm">
                        {submission.notes}
                      </div>
                    </div>
                  </>
                )}

                <Separator className="bg-slate-100" />

                <div>
                  <p className="mb-3 text-sm font-medium text-slate-700">
                    Nilai dan Feedback
                  </p>
                  <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <div className="rounded-lg border bg-gradient-to-br from-slate-50 to-white p-4 shadow-sm">
                      <p className="mb-2 text-sm font-medium text-slate-700">
                        Nilai
                      </p>
                      <div className="flex items-center gap-3">
                        <div
                          className={`flex h-16 w-16 items-center justify-center rounded-full text-xl font-medium ${
                            submission.grade >= 85
                              ? "bg-emerald-100 text-emerald-700"
                              : submission.grade >= 70
                                ? "bg-indigo-100 text-indigo-700"
                                : "bg-rose-100 text-rose-700"
                          }`}
                        >
                          {submission.grade}
                        </div>
                        <div className="flex-1">
                          <div className="mb-1 flex justify-between text-xs text-slate-500">
                            <span>0</span>
                            <span>{submission.maxGrade}</span>
                          </div>
                          <div className="h-2 w-full rounded-full bg-slate-100">
                            <div
                              className={`h-2 rounded-full ${
                                submission.grade >= 85
                                  ? "bg-emerald-500"
                                  : submission.grade >= 70
                                    ? "bg-indigo-500"
                                    : "bg-rose-500"
                              }`}
                              style={{
                                width: `${(submission.grade / submission.maxGrade) * 100}%`,
                              }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="rounded-lg border bg-gradient-to-br from-indigo-50 to-white p-4 shadow-sm">
                      <p className="mb-2 text-sm font-medium text-slate-700">
                        Feedback Dosen
                      </p>
                      <p className="text-sm text-slate-700">
                        {submission.feedback}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card className="border-0 shadow-md">
              <CardHeader className="bg-gradient-to-r from-indigo-50 to-white pb-3">
                <CardTitle className="text-lg text-indigo-900">
                  Timeline Pengumpulan
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {submission.timeline.map((item, index) => (
                    <div key={index} className="flex gap-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full border bg-white shadow-sm">
                        {item.icon}
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm leading-none font-medium text-slate-900">
                          {item.action}
                        </p>
                        <p className="text-xs text-slate-500">{item.date}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-md">
              <CardHeader className="bg-gradient-to-r from-amber-50 to-white pb-3">
                <CardTitle className="text-lg text-amber-900">
                  Tindakan
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {submission.grade && (
                  <Button
                    asChild
                    className="w-full bg-indigo-600 hover:bg-indigo-700"
                  >
                    <Link
                      href={`/dashboard/pelaporan/grades/${submission.assignmentId}/clarification`}
                    >
                      Ajukan Klarifikasi Nilai
                    </Link>
                  </Button>
                )}
                <Button variant="outline" className="w-full">
                  Cetak Detail Pengumpulan
                </Button>
                <Button asChild variant="outline" className="w-full">
                  <Link href="/dashboard/pelaporan/grades">
                    Kembali ke Daftar Nilai
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
