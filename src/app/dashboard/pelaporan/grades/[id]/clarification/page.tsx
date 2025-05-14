import Link from "next/link";

import {
  AlertCircle,
  ArrowLeft,
  CheckCircle,
  Download,
  FileText,
  Info,
  Upload,
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
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";

export const metadata = {
  title: "Ajukan Klarifikasi Nilai | SIAKAD",
  description: "Halaman ajukan klarifikasi nilai",
};

// Data from the provided assignments
const assignments = [
  {
    id: "assignment-1",
    title: "Laporan Kasus Hipertensi",
    description:
      "Buatlah laporan kasus pasien hipertensi yang Anda temui selama rotasi di departemen Penyakit Dalam. Laporan harus mencakup anamnesis, pemeriksaan fisik, pemeriksaan penunjang, diagnosis, dan rencana tatalaksana.",
    course: "Ilmu Penyakit Dalam",
    courseId: "course-1",
    lecturerId: "user-1",
    lecturer: "Dr. Anita Wijaya, Sp.PD",
    createdAt: "2023-04-10T08:00:00Z",
    dueDate: "2023-04-25T23:59:59Z",
    isSubmitted: true,
    submissionId: "submission-1",
    submittedAt: "2023-04-24T15:30:00Z",
    grade: 85,
    maxGrade: 100,
    weight: 25,
    feedback:
      "Laporan kasus sangat komprehensif dan analisis diagnostik sangat baik. Pertimbangkan untuk menambahkan lebih banyak literatur terkini untuk mendukung rencana tatalaksana yang Anda usulkan.",
    attachments: ["Panduan_Laporan_Kasus.pdf", "Template_Laporan.docx"],
    status: "graded",
    rubric: [
      { criteria: "Kelengkapan anamnesis", weight: 20, score: 18 },
      { criteria: "Ketepatan pemeriksaan fisik", weight: 20, score: 17 },
      { criteria: "Analisis pemeriksaan penunjang", weight: 20, score: 18 },
      { criteria: "Ketepatan diagnosis", weight: 20, score: 17 },
      { criteria: "Rencana tatalaksana", weight: 20, score: 15 },
    ],
  },
  {
    id: "assignment-2",
    title: "Presentasi Kasus Bedah Digestif",
    description:
      "Siapkan presentasi kasus bedah digestif untuk diskusi kelompok. Pilih satu kasus menarik yang Anda temui selama rotasi di departemen Bedah. Presentasi harus mencakup gambaran klinis, pendekatan diagnostik, teknik operasi, dan follow-up pasca operasi.",
    course: "Ilmu Bedah",
    courseId: "course-2",
    lecturerId: "user-2",
    lecturer: "Dr. Budi Santoso, Sp.B",
    createdAt: "2023-04-15T10:00:00Z",
    dueDate: "2023-06-01T23:59:59Z",
    isSubmitted: true,
    submissionId: "submission-2",
    submittedAt: "2023-04-30T14:45:00Z",
    grade: 78,
    maxGrade: 100,
    weight: 30,
    feedback:
      "Presentasi kasus cukup baik, namun perlu penjelasan lebih detail mengenai teknik operasi yang dipilih. Diskusi mengenai alternatif tindakan dan evidence-based medicine perlu diperdalam.",
    attachments: ["Panduan_Presentasi_Kasus.pdf"],
    status: "graded",
    rubric: [
      { criteria: "Pemilihan kasus", weight: 10, score: 9 },
      { criteria: "Gambaran klinis", weight: 20, score: 16 },
      { criteria: "Pendekatan diagnostik", weight: 20, score: 17 },
      { criteria: "Teknik operasi", weight: 30, score: 20 },
      { criteria: "Follow-up pasca operasi", weight: 20, score: 16 },
    ],
  },
];

// Define the correct params type for Next.js App Router
interface PageParams {
  id: string;
}

export default function ClarificationRequestPage({
  params,
}: {
  params: PageParams;
}) {
  // Find the assignment based on the ID
  const assignment =
    assignments.find((a) => a.id === params.id) || assignments[0];

  // Format date to readable format
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(date);
  };

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
                Ajukan Klarifikasi Nilai
              </h1>
            </div>
            <p className="mt-1 text-slate-500">
              {assignment.course} - {assignment.title}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <div className="space-y-8 md:col-span-2">
            <Card className="border-0 shadow-md">
              <CardHeader className="bg-gradient-to-r from-indigo-50 to-white">
                <CardTitle className="text-indigo-900">
                  Form Klarifikasi Nilai
                </CardTitle>
                <CardDescription>
                  Gunakan form ini untuk mengajukan klarifikasi nilai jika Anda
                  merasa ada ketidaksesuaian.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6 pt-6">
                <Tabs defaultValue="form" className="w-full">
                  <TabsList className="mb-4 border bg-white shadow-sm">
                    <TabsTrigger
                      value="form"
                      className="data-[state=active]:bg-indigo-50 data-[state=active]:text-indigo-900"
                    >
                      Form Klarifikasi
                    </TabsTrigger>
                    <TabsTrigger
                      value="rubric"
                      className="data-[state=active]:bg-indigo-50 data-[state=active]:text-indigo-900"
                    >
                      Rubrik Penilaian
                    </TabsTrigger>
                    <TabsTrigger
                      value="submission"
                      className="data-[state=active]:bg-indigo-50 data-[state=active]:text-indigo-900"
                    >
                      Pengumpulan Anda
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="form" className="space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="course" className="text-slate-700">
                          Mata Kuliah
                        </Label>
                        <Input
                          id="course"
                          value={assignment.course}
                          readOnly
                          className="border-slate-200 bg-slate-50"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lecturer" className="text-slate-700">
                          Dosen Pengampu
                        </Label>
                        <Input
                          id="lecturer"
                          value={assignment.lecturer}
                          readOnly
                          className="border-slate-200 bg-slate-50"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="component" className="text-slate-700">
                          Komponen Nilai
                        </Label>
                        <Input
                          id="component"
                          value={assignment.title}
                          readOnly
                          className="border-slate-200 bg-slate-50"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label
                          htmlFor="submission-date"
                          className="text-slate-700"
                        >
                          Tanggal Pengumpulan
                        </Label>
                        <Input
                          id="submission-date"
                          value={formatDate(assignment.submittedAt)}
                          readOnly
                          className="border-slate-200 bg-slate-50"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label
                          htmlFor="current-grade"
                          className="text-slate-700"
                        >
                          Nilai Saat Ini
                        </Label>
                        <div className="relative">
                          <Input
                            id="current-grade"
                            value={`${assignment.grade}`}
                            readOnly
                            className="border-slate-200 bg-slate-50 pr-16"
                          />
                          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 text-sm text-slate-500">
                            / {assignment.maxGrade}
                          </div>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label
                          htmlFor="expected-grade"
                          className="text-slate-700"
                        >
                          Nilai yang Diharapkan
                        </Label>
                        <div className="relative">
                          <Input
                            id="expected-grade"
                            placeholder="Masukkan nilai"
                            className="border-indigo-200 pr-16 focus:border-indigo-400"
                          />
                          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 text-sm text-slate-500">
                            / {assignment.maxGrade}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="reason" className="text-slate-700">
                        Alasan Klarifikasi
                      </Label>
                      <Textarea
                        id="reason"
                        placeholder="Jelaskan alasan Anda mengajukan klarifikasi nilai ini. Berikan detail spesifik tentang bagian mana dari penilaian yang menurut Anda perlu ditinjau kembali."
                        rows={5}
                        className="resize-none border-indigo-200 focus:border-indigo-400"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-slate-700">Bukti Pendukung</Label>
                      <div className="rounded-lg border border-dashed border-indigo-200 bg-indigo-50/30 p-4 transition-colors hover:bg-indigo-50">
                        <div className="flex flex-col items-center justify-center gap-2 py-6">
                          <div className="rounded-full bg-indigo-100 p-3">
                            <Upload className="h-6 w-6 text-indigo-600" />
                          </div>
                          <p className="text-sm font-medium text-slate-700">
                            Seret dan lepas file di sini atau klik untuk memilih
                            file
                          </p>
                          <p className="max-w-md text-center text-xs text-slate-500">
                            Unggah bukti pendukung seperti screenshot tugas,
                            referensi tambahan, atau dokumen lain yang mendukung
                            klarifikasi Anda
                          </p>
                          <Button
                            variant="outline"
                            size="sm"
                            className="mt-2 border-indigo-200 text-indigo-700 hover:bg-indigo-50"
                          >
                            Pilih File
                          </Button>
                        </div>
                      </div>
                      <p className="text-xs text-slate-500">
                        Format yang didukung: PDF, JPG, PNG, DOCX, PPTX. Ukuran
                        maksimum: 10MB.
                      </p>
                    </div>
                  </TabsContent>

                  <TabsContent value="rubric">
                    <div className="space-y-4">
                      <div className="flex gap-3 rounded-lg border border-indigo-100 bg-indigo-50 p-4">
                        <Info className="mt-0.5 h-5 w-5 flex-shrink-0 text-indigo-600" />
                        <div>
                          <p className="text-sm font-medium text-indigo-800">
                            Informasi Rubrik Penilaian
                          </p>
                          <p className="mt-1 text-xs text-indigo-700">
                            Berikut adalah rubrik penilaian yang digunakan untuk
                            menilai tugas Anda. Gunakan informasi ini untuk
                            memahami dasar penilaian dan mengajukan klarifikasi
                            yang lebih spesifik.
                          </p>
                        </div>
                      </div>

                      <div className="overflow-hidden rounded-lg border shadow-sm">
                        <table className="w-full">
                          <thead>
                            <tr className="border-b bg-slate-50">
                              <th className="px-4 py-3 text-left text-sm font-medium text-slate-600">
                                Kriteria
                              </th>
                              <th className="px-4 py-3 text-center text-sm font-medium text-slate-600">
                                Bobot
                              </th>
                              <th className="px-4 py-3 text-center text-sm font-medium text-slate-600">
                                Nilai
                              </th>
                              <th className="px-4 py-3 text-center text-sm font-medium text-slate-600">
                                Skor
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {assignment.rubric.map((item, index) => (
                              <tr
                                key={index}
                                className={`${
                                  index % 2 === 0 ? "bg-white" : "bg-slate-50"
                                } transition-colors hover:bg-indigo-50/30`}
                              >
                                <td className="px-4 py-3 text-sm">
                                  {item.criteria}
                                </td>
                                <td className="px-4 py-3 text-center text-sm">
                                  {item.weight}%
                                </td>
                                <td className="px-4 py-3 text-center text-sm">
                                  {item.score}/{item.weight}
                                </td>
                                <td className="px-4 py-3 text-center">
                                  <div className="h-2 w-full rounded-full bg-slate-200">
                                    <div
                                      className={`h-2 rounded-full ${
                                        item.score / item.weight >= 0.9
                                          ? "bg-emerald-500"
                                          : item.score / item.weight >= 0.7
                                            ? "bg-indigo-500"
                                            : "bg-amber-500"
                                      }`}
                                      style={{
                                        width: `${(item.score / item.weight) * 100}%`,
                                      }}
                                    ></div>
                                  </div>
                                </td>
                              </tr>
                            ))}
                            <tr className="border-t bg-indigo-50">
                              <td className="px-4 py-3 text-sm font-medium">
                                Total
                              </td>
                              <td className="px-4 py-3 text-center text-sm font-medium">
                                100%
                              </td>
                              <td className="px-4 py-3 text-center text-sm font-medium">
                                {assignment.grade}/100
                              </td>
                              <td className="px-4 py-3 text-center">
                                <div className="h-2 w-full rounded-full bg-slate-200">
                                  <div
                                    className={`h-2 rounded-full ${
                                      assignment.grade >= 85
                                        ? "bg-emerald-500"
                                        : assignment.grade >= 70
                                          ? "bg-indigo-500"
                                          : "bg-amber-500"
                                    }`}
                                    style={{ width: `${assignment.grade}%` }}
                                  ></div>
                                </div>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="submission">
                    <div className="space-y-4">
                      <div className="flex gap-3 rounded-lg border border-indigo-100 bg-indigo-50 p-4">
                        <Info className="mt-0.5 h-5 w-5 flex-shrink-0 text-indigo-600" />
                        <div>
                          <p className="text-sm font-medium text-indigo-800">
                            Informasi Pengumpulan
                          </p>
                          <p className="mt-1 text-xs text-indigo-700">
                            Berikut adalah detail pengumpulan tugas Anda. Anda
                            dapat melihat file yang telah dikumpulkan dan
                            catatan yang Anda berikan saat pengumpulan.
                          </p>
                        </div>
                      </div>

                      <div className="space-y-4 rounded-lg border p-4 shadow-sm">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm font-medium text-slate-700">
                              File Pengumpulan
                            </p>
                            <p className="text-xs text-slate-500">
                              Dikumpulkan pada{" "}
                              {formatDate(assignment.submittedAt)}
                            </p>
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

                        <div className="flex items-center gap-3 rounded-lg border bg-slate-50 p-3 transition-colors hover:bg-white">
                          <div className="rounded border bg-white p-2 shadow-sm">
                            <FileText className="h-5 w-5 text-indigo-600" />
                          </div>
                          <div className="flex-grow">
                            <p className="text-sm font-medium">
                              {assignment.id === "assignment-1"
                                ? "Laporan_Kasus_Hipertensi_Citra.pdf"
                                : "Presentasi_Kasus_Bedah_Digestif_Citra.pptx"}
                            </p>
                            <p className="text-xs text-slate-500">
                              {assignment.id === "assignment-1"
                                ? "2.4 MB"
                                : "5.7 MB"}
                            </p>
                          </div>
                        </div>

                        <div>
                          <p className="text-sm font-medium text-slate-700">
                            Catatan Pengumpulan
                          </p>
                          <div className="mt-2 rounded-lg border bg-white p-3 text-sm text-slate-700 shadow-sm">
                            {assignment.id === "assignment-1"
                              ? "Saya melampirkan laporan kasus pasien hipertensi dengan komplikasi gagal ginjal kronik. Terima kasih."
                              : "Presentasi kasus kolesistitis akut dengan pendekatan laparoskopi."}
                          </div>
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
              <CardFooter className="flex justify-between border-t bg-slate-50 p-6">
                <Button
                  variant="outline"
                  className="border-slate-200 text-slate-700 hover:bg-slate-100"
                >
                  Batal
                </Button>
                <Button className="bg-indigo-600 hover:bg-indigo-700">
                  Kirim Klarifikasi
                </Button>
              </CardFooter>
            </Card>
          </div>

          <div className="space-y-6">
            <Card className="border-0 shadow-md">
              <CardHeader className="bg-gradient-to-r from-amber-50 to-white pb-3">
                <CardTitle className="text-lg text-amber-900">
                  Informasi Tugas
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm font-medium text-slate-500">
                    Judul Tugas
                  </p>
                  <p className="text-sm text-slate-700">{assignment.title}</p>
                </div>
                <Separator className="bg-slate-100" />
                <div>
                  <p className="text-sm font-medium text-slate-500">
                    Deskripsi
                  </p>
                  <p className="text-sm text-slate-700">
                    {assignment.description}
                  </p>
                </div>
                <Separator className="bg-slate-100" />
                <div>
                  <p className="text-sm font-medium text-slate-500">
                    Tenggat Waktu
                  </p>
                  <p className="text-sm text-slate-700">
                    {formatDate(assignment.dueDate)}
                  </p>
                </div>
                <Separator className="bg-slate-100" />
                <div>
                  <p className="text-sm font-medium text-slate-500">
                    Bobot Nilai
                  </p>
                  <p className="text-sm text-slate-700">
                    {assignment.weight}% dari nilai akhir
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-md">
              <CardHeader className="bg-gradient-to-r from-emerald-50 to-white pb-3">
                <CardTitle className="text-lg text-emerald-900">
                  Komentar Dosen
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="rounded-lg border border-emerald-100 bg-emerald-50 p-4 text-sm text-slate-700 shadow-sm">
                  {assignment.feedback}
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-md">
              <CardHeader className="bg-gradient-to-r from-indigo-50 to-white pb-3">
                <CardTitle className="text-lg text-indigo-900">
                  Panduan Klarifikasi
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-2">
                  <AlertCircle className="h-5 w-5 flex-shrink-0 text-indigo-600" />
                  <p className="text-sm text-slate-700">
                    Klarifikasi hanya dapat diajukan dalam 14 hari setelah nilai
                    diumumkan.
                  </p>
                </div>
                <div className="flex gap-2">
                  <AlertCircle className="h-5 w-5 flex-shrink-0 text-indigo-600" />
                  <p className="text-sm text-slate-700">
                    Berikan alasan yang jelas dan spesifik untuk mendukung
                    klarifikasi Anda.
                  </p>
                </div>
                <div className="flex gap-2">
                  <AlertCircle className="h-5 w-5 flex-shrink-0 text-indigo-600" />
                  <p className="text-sm text-slate-700">
                    Lampirkan bukti pendukung yang relevan untuk memperkuat
                    argumen Anda.
                  </p>
                </div>
                <div className="flex gap-2">
                  <CheckCircle className="h-5 w-5 flex-shrink-0 text-emerald-600" />
                  <p className="text-sm text-slate-700">
                    Klarifikasi akan ditinjau dalam waktu 3-5 hari kerja.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
