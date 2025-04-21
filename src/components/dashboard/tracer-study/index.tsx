"use client";

import Image from "next/image";
import { useState } from "react";

import {
  BarChart3,
  Briefcase,
  Building2,
  ClipboardList,
  Filter,
  GraduationCap,
  LayoutDashboard,
  MessageSquareText,
  Search,
  User,
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
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";

export function TracerStudyPage() {
  const [activeTab, setActiveTab] = useState("overview");

  // Dummy data for tracer study
  const tracerStudyInfo = {
    status: "Belum Diisi",
    deadline: "30 Juni 2024",
    jumlahPertanyaan: 25,
    estimasiWaktu: "15 menit",
  };

  const statistikAlumni = {
    totalAlumni: 1250,
    bekerja: 950,
    wirausaha: 150,
    melanjutkanStudi: 100,
    mencariKerja: 50,
    bidangPekerjaan: [
      { bidang: "Teknologi Informasi", persentase: 45 },
      { bidang: "Perbankan & Keuangan", persentase: 20 },
      { bidang: "Konsultan", persentase: 15 },
      { bidang: "Pendidikan", persentase: 10 },
      { bidang: "Lainnya", persentase: 10 },
    ],
    waktuTunggu: [
      { waktu: "< 3 bulan", persentase: 60 },
      { waktu: "3-6 bulan", persentase: 25 },
      { waktu: "6-12 bulan", persentase: 10 },
      { waktu: "> 12 bulan", persentase: 5 },
    ],
  };

  const testimoniAlumni = [
    {
      nama: "Ahmad Rizky",
      angkatan: "2018",
      pekerjaan: "Software Engineer",
      perusahaan: "Google Indonesia",
      testimoni:
        "Ilmu yang saya dapatkan selama kuliah sangat membantu dalam karir saya sebagai Software Engineer. Dosen-dosen yang kompeten dan kurikulum yang up-to-date membuat saya siap menghadapi dunia kerja.",
      foto: "https://images.pexels.com/photos/14940646/pexels-photo-14940646.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
    {
      nama: "Siti Nurhaliza",
      angkatan: "2017",
      pekerjaan: "Data Scientist",
      perusahaan: "Tokopedia",
      testimoni:
        "Saya sangat berterima kasih atas pendidikan yang saya terima. Mata kuliah seperti Machine Learning dan Data Mining sangat relevan dengan pekerjaan saya sekarang sebagai Data Scientist.",
      foto: "https://images.pexels.com/photos/14940646/pexels-photo-14940646.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
    {
      nama: "Budi Santoso",
      angkatan: "2016",
      pekerjaan: "CTO & Co-Founder",
      perusahaan: "TechStart Indonesia",
      testimoni:
        "Berkat pengalaman dan networking selama kuliah, saya bisa membangun startup teknologi yang kini telah berkembang pesat. Kegiatan kemahasiswaan juga sangat membantu mengembangkan soft skill saya.",
      foto: "https://images.pexels.com/photos/14940646/pexels-photo-14940646.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
  ];

  // Sample questions for the tracer study
  const pertanyaanTracerStudy = [
    {
      id: "Q1",
      pertanyaan:
        "Berapa lama waktu yang Anda butuhkan untuk mendapatkan pekerjaan pertama setelah lulus?",
      tipe: "radio",
      opsi: [
        "Kurang dari 3 bulan",
        "3-6 bulan",
        "6-12 bulan",
        "Lebih dari 12 bulan",
        "Belum bekerja",
      ],
    },
    {
      id: "Q2",
      pertanyaan:
        "Apakah pekerjaan Anda saat ini sesuai dengan bidang studi yang Anda pelajari?",
      tipe: "radio",
      opsi: [
        "Sangat sesuai",
        "Sesuai",
        "Cukup sesuai",
        "Kurang sesuai",
        "Tidak sesuai",
      ],
    },
    {
      id: "Q3",
      pertanyaan: "Berapa gaji/pendapatan Anda per bulan saat ini?",
      tipe: "radio",
      opsi: [
        "Kurang dari Rp 5 juta",
        "Rp 5 juta - Rp 10 juta",
        "Rp 10 juta - Rp 15 juta",
        "Rp 15 juta - Rp 20 juta",
        "Lebih dari Rp 20 juta",
      ],
    },
    {
      id: "Q4",
      pertanyaan: "Apa status pekerjaan Anda saat ini?",
      tipe: "radio",
      opsi: [
        "Bekerja (full-time)",
        "Bekerja (part-time)",
        "Wirausaha",
        "Melanjutkan studi",
        "Belum bekerja",
      ],
    },
    {
      id: "Q5",
      pertanyaan:
        "Menurut Anda, aspek apa dari kurikulum yang perlu ditingkatkan untuk mempersiapkan mahasiswa menghadapi dunia kerja?",
      tipe: "text",
    },
  ];

  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [isFillingTracerStudy, setIsFillingTracerStudy] = useState(false);

  const handleStartTracerStudy = () => {
    setIsFillingTracerStudy(true);
    setCurrentStep(0);
    setAnswers({});
  };

  const handleNextStep = () => {
    if (currentStep < pertanyaanTracerStudy.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleAnswerChange = (questionId: string, value: string) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: value,
    }));
  };

  const handleSubmitTracerStudy = () => {
    // In a real app, you would submit the answers to the server here
    console.log("Submitting answers:", answers);
    setIsFillingTracerStudy(false);
    setCurrentStep(0);
    setAnswers({});
    // Optionally, you could update the tracerStudyInfo
  };

  return (
    <div className="container mx-auto mt-10 space-y-8">
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Tracer Study</h2>
          <p className="text-muted-foreground">
            Penelusuran dan pendataan alumni
          </p>
        </div>
        <div className="flex items-center gap-2">
          <div className="relative w-full md:w-auto">
            <Search className="text-muted-foreground absolute top-2.5 left-2.5 h-4 w-4" />
            <Input
              type="search"
              placeholder="Cari alumni..."
              className="w-full pl-8 md:w-[200px] lg:w-[300px]"
            />
          </div>
          <Button variant="outline" size="sm">
            <Filter className="mr-2 h-4 w-4" />
            Filter
          </Button>
        </div>
      </div>

      {isFillingTracerStudy ? (
        <Card>
          <CardHeader>
            <CardTitle>Tracer Study Alumni</CardTitle>
            <CardDescription>
              Bantu kami meningkatkan kualitas pendidikan dengan mengisi tracer
              study ini
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="mb-6">
              <div className="mb-2 flex items-center justify-between text-sm">
                <span>Progress</span>
                <span className="font-medium">
                  {Math.round(
                    ((currentStep + 1) / pertanyaanTracerStudy.length) * 100
                  )}
                  %
                </span>
              </div>
              <Progress
                value={((currentStep + 1) / pertanyaanTracerStudy.length) * 100}
                className="h-2"
              />
            </div>

            <div className="space-y-6">
              <div className="rounded-lg border p-4">
                <h3 className="mb-4 text-lg font-medium">
                  Pertanyaan {currentStep + 1} dari{" "}
                  {pertanyaanTracerStudy.length}
                </h3>
                <p className="mb-4">
                  {pertanyaanTracerStudy[currentStep].pertanyaan}
                </p>

                {pertanyaanTracerStudy[currentStep].tipe === "radio" ? (
                  <RadioGroup
                    value={answers[pertanyaanTracerStudy[currentStep].id] || ""}
                    onValueChange={(value) =>
                      handleAnswerChange(
                        pertanyaanTracerStudy[currentStep].id,
                        value
                      )
                    }
                    className="space-y-3"
                  >
                    {pertanyaanTracerStudy[currentStep].opsi?.map(
                      (opsi, index) => (
                        <div
                          key={index}
                          className="flex items-center space-x-2"
                        >
                          <RadioGroupItem
                            value={opsi}
                            id={`${pertanyaanTracerStudy[currentStep].id}-${index}`}
                          />
                          <Label
                            htmlFor={`${pertanyaanTracerStudy[currentStep].id}-${index}`}
                          >
                            {opsi}
                          </Label>
                        </div>
                      )
                    )}
                  </RadioGroup>
                ) : (
                  <div className="space-y-2">
                    <Label htmlFor="feedback">Jawaban Anda</Label>
                    <Textarea
                      id="feedback"
                      placeholder="Tuliskan jawaban Anda di sini..."
                      value={
                        answers[pertanyaanTracerStudy[currentStep].id] || ""
                      }
                      onChange={(e) =>
                        handleAnswerChange(
                          pertanyaanTracerStudy[currentStep].id,
                          e.target.value
                        )
                      }
                      rows={5}
                    />
                  </div>
                )}
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button
              variant="outline"
              onClick={
                currentStep === 0
                  ? () => setIsFillingTracerStudy(false)
                  : handlePrevStep
              }
            >
              {currentStep === 0 ? "Batal" : "Sebelumnya"}
            </Button>
            <Button
              onClick={
                currentStep === pertanyaanTracerStudy.length - 1
                  ? handleSubmitTracerStudy
                  : handleNextStep
              }
              disabled={
                pertanyaanTracerStudy[currentStep].tipe !== "text" &&
                !answers[pertanyaanTracerStudy[currentStep].id]
              }
            >
              {currentStep === pertanyaanTracerStudy.length - 1
                ? "Kirim"
                : "Selanjutnya"}
            </Button>
          </CardFooter>
        </Card>
      ) : (
        <Tabs
          defaultValue="overview"
          value={activeTab}
          onValueChange={setActiveTab}
          className="space-y-4"
        >
          <TabsList>
            <TabsTrigger value="overview" className="gap-2">
              <LayoutDashboard className="size-4" />
              <span className="hidden sm:inline">Ringkasan</span>
            </TabsTrigger>
            <TabsTrigger value="statistik" className="gap-2">
              <BarChart3 className="size-4" />
              <span className="hidden sm:inline">Statistik Alumni</span>
            </TabsTrigger>
            <TabsTrigger value="testimoni" className="gap-2">
              <MessageSquareText className="size-4" />
              <span className="hidden sm:inline">Testimoni Alumni</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Status Tracer Study
                  </CardTitle>
                  <ClipboardList className="text-primary h-4 w-4" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {tracerStudyInfo.status}
                  </div>
                  <p className="text-muted-foreground text-xs">
                    Deadline: {tracerStudyInfo.deadline}
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Jumlah Pertanyaan
                  </CardTitle>
                  <GraduationCap className="h-4 w-4 text-blue-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {tracerStudyInfo.jumlahPertanyaan}
                  </div>
                  <p className="text-muted-foreground text-xs">
                    Estimasi waktu: {tracerStudyInfo.estimasiWaktu}
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Total Alumni
                  </CardTitle>
                  <User className="h-4 w-4 text-green-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {statistikAlumni.totalAlumni}
                  </div>
                  <p className="text-muted-foreground text-xs">
                    Dari berbagai angkatan
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Tingkat Penyerapan
                  </CardTitle>
                  <Briefcase className="h-4 w-4 text-orange-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {Math.round(
                      (statistikAlumni.bekerja / statistikAlumni.totalAlumni) *
                        100
                    )}
                    %
                  </div>
                  <p className="text-muted-foreground text-xs">
                    Alumni yang sudah bekerja
                  </p>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Tracer Study Alumni</CardTitle>
                <CardDescription>
                  Bantu kami meningkatkan kualitas pendidikan dengan mengisi
                  tracer study
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="rounded-lg border p-4">
                    <h3 className="mb-2 text-lg font-medium">
                      Apa itu Tracer Study?
                    </h3>
                    <p className="text-muted-foreground">
                      Tracer Study adalah studi pelacakan jejak lulusan/alumni
                      yang dilakukan untuk mengetahui outcome pendidikan dalam
                      bentuk transisi dari dunia pendidikan tinggi ke dunia
                      kerja, situasi kerja terakhir, dan aplikasi kompetensi di
                      dunia kerja.
                    </p>
                  </div>

                  <div className="rounded-lg border p-4">
                    <h3 className="mb-2 text-lg font-medium">
                      Mengapa Tracer Study Penting?
                    </h3>
                    <p className="text-muted-foreground">
                      Hasil Tracer Study digunakan untuk meningkatkan kualitas
                      layanan pendidikan, menyesuaikan kurikulum dengan
                      kebutuhan dunia kerja, dan memberikan informasi kepada
                      calon mahasiswa tentang prospek karir setelah lulus.
                    </p>
                  </div>

                  <div className="rounded-lg border p-4">
                    <h3 className="mb-2 text-lg font-medium">
                      Informasi yang Dikumpulkan
                    </h3>
                    <ul className="text-muted-foreground ml-5 list-disc space-y-1">
                      <li>Waktu tunggu mendapatkan pekerjaan pertama</li>
                      <li>Kesesuaian pekerjaan dengan bidang studi</li>
                      <li>Gaji/pendapatan</li>
                      <li>Kompetensi yang dibutuhkan di dunia kerja</li>
                      <li>Saran untuk pengembangan kurikulum</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full" onClick={handleStartTracerStudy}>
                  Isi Tracer Study Sekarang
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="statistik" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Statistik Alumni</CardTitle>
                <CardDescription>
                  Data statistik alumni berdasarkan hasil tracer study
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <h3 className="mb-3 text-lg font-medium">Status Alumni</h3>
                    <div className="space-y-3">
                      <div>
                        <div className="mb-1 flex items-center justify-between text-sm">
                          <span>Bekerja</span>
                          <span className="font-medium">
                            {Math.round(
                              (statistikAlumni.bekerja /
                                statistikAlumni.totalAlumni) *
                                100
                            )}
                            %
                          </span>
                        </div>
                        <Progress
                          value={
                            (statistikAlumni.bekerja /
                              statistikAlumni.totalAlumni) *
                            100
                          }
                          className="h-2"
                        />
                      </div>
                      <div>
                        <div className="mb-1 flex items-center justify-between text-sm">
                          <span>Wirausaha</span>
                          <span className="font-medium">
                            {Math.round(
                              (statistikAlumni.wirausaha /
                                statistikAlumni.totalAlumni) *
                                100
                            )}
                            %
                          </span>
                        </div>
                        <Progress
                          value={
                            (statistikAlumni.wirausaha /
                              statistikAlumni.totalAlumni) *
                            100
                          }
                          className="h-2"
                        />
                      </div>
                      <div>
                        <div className="mb-1 flex items-center justify-between text-sm">
                          <span>Melanjutkan Studi</span>
                          <span className="font-medium">
                            {Math.round(
                              (statistikAlumni.melanjutkanStudi /
                                statistikAlumni.totalAlumni) *
                                100
                            )}
                            %
                          </span>
                        </div>
                        <Progress
                          value={
                            (statistikAlumni.melanjutkanStudi /
                              statistikAlumni.totalAlumni) *
                            100
                          }
                          className="h-2"
                        />
                      </div>
                      <div>
                        <div className="mb-1 flex items-center justify-between text-sm">
                          <span>Mencari Kerja</span>
                          <span className="font-medium">
                            {Math.round(
                              (statistikAlumni.mencariKerja /
                                statistikAlumni.totalAlumni) *
                                100
                            )}
                            %
                          </span>
                        </div>
                        <Progress
                          value={
                            (statistikAlumni.mencariKerja /
                              statistikAlumni.totalAlumni) *
                            100
                          }
                          className="h-2"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="mb-3 text-lg font-medium">
                      Bidang Pekerjaan
                    </h3>
                    <div className="space-y-3">
                      {statistikAlumni.bidangPekerjaan.map((bidang, index) => (
                        <div key={index}>
                          <div className="mb-1 flex items-center justify-between text-sm">
                            <span>{bidang.bidang}</span>
                            <span className="font-medium">
                              {bidang.persentase}%
                            </span>
                          </div>
                          <Progress value={bidang.persentase} className="h-2" />
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="mb-3 text-lg font-medium">
                      Waktu Tunggu Mendapatkan Pekerjaan
                    </h3>
                    <div className="space-y-3">
                      {statistikAlumni.waktuTunggu.map((waktu, index) => (
                        <div key={index}>
                          <div className="mb-1 flex items-center justify-between text-sm">
                            <span>{waktu.waktu}</span>
                            <span className="font-medium">
                              {waktu.persentase}%
                            </span>
                          </div>
                          <Progress value={waktu.persentase} className="h-2" />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="testimoni" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {testimoniAlumni.map((alumni, index) => (
                <Card key={index}>
                  <CardHeader>
                    <div className="flex items-center gap-4">
                      <Image
                        src={alumni.foto || "/placeholder.svg"}
                        alt={alumni.nama}
                        width={64}
                        height={64}
                        className="h-16 w-16 rounded-full object-cover"
                      />
                      <div>
                        <CardTitle className="text-lg">{alumni.nama}</CardTitle>
                        <CardDescription>
                          Angkatan {alumni.angkatan}
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Briefcase className="text-primary h-4 w-4" />
                        <span className="text-sm">{alumni.pekerjaan}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Building2 className="text-primary h-4 w-4" />
                        <span className="text-sm">{alumni.perusahaan}</span>
                      </div>
                      <p className="text-muted-foreground mt-2 text-sm">
                        "{alumni.testimoni}"
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Bagikan Pengalaman Anda</CardTitle>
                <CardDescription>
                  Bantu calon mahasiswa dan mahasiswa saat ini dengan berbagi
                  pengalaman Anda
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="pekerjaan">Pekerjaan Saat Ini</Label>
                      <Input
                        id="pekerjaan"
                        placeholder="Contoh: Software Engineer"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="perusahaan">Perusahaan/Institusi</Label>
                      <Input
                        id="perusahaan"
                        placeholder="Contoh: Google Indonesia"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="testimoni">Testimoni</Label>
                    <Textarea
                      id="testimoni"
                      placeholder="Bagikan pengalaman dan kesan Anda selama kuliah dan bagaimana hal tersebut membantu karir Anda..."
                      rows={5}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="foto">Foto Profil</Label>
                    <Input id="foto" type="file" />
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full">Kirim Testimoni</Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      )}
    </div>
  );
}
