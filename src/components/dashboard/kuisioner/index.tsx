"use client";

import { useState } from "react";

import {
  Check,
  ChevronRight,
  ClipboardList,
  GraduationCap,
  Star,
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
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

import { DashboardHeader } from "../header";

export function KuisionerPage() {
  const [activeTab, setActiveTab] = useState("tersedia");

  // Dummy data for kuisioner
  const kuisionerTersedia = [
    {
      id: "K001",
      judul: "Evaluasi Pembelajaran Algoritma dan Pemrograman",
      dosen: "Dr. Budi Santoso, M.Kom",
      mataKuliah: "Algoritma dan Pemrograman",
      deadline: "30 April 2024",
      status: "belum",
      jumlahPertanyaan: 15,
      estimasiWaktu: "10 menit",
    },
    {
      id: "K002",
      judul: "Evaluasi Pembelajaran Basis Data",
      dosen: "Dr. Siti Aminah, M.Sc",
      mataKuliah: "Basis Data",
      deadline: "2 Mei 2024",
      status: "belum",
      jumlahPertanyaan: 12,
      estimasiWaktu: "8 menit",
    },
    {
      id: "K003",
      judul: "Evaluasi Pembelajaran Jaringan Komputer",
      dosen: "Prof. Ahmad Wijaya, Ph.D",
      mataKuliah: "Jaringan Komputer",
      deadline: "5 Mei 2024",
      status: "belum",
      jumlahPertanyaan: 10,
      estimasiWaktu: "7 menit",
    },
  ];

  const kuisionerSelesai = [
    {
      id: "K004",
      judul: "Evaluasi Pembelajaran Pemrograman Web",
      dosen: "Dr. Rudi Hartono, M.Kom",
      mataKuliah: "Pemrograman Web",
      tanggalPengisian: "10 Desember 2023",
      status: "selesai",
    },
    {
      id: "K005",
      judul: "Evaluasi Pembelajaran Pemrograman Mobile",
      dosen: "Dr. Dewi Sartika, M.Sc",
      mataKuliah: "Pemrograman Mobile",
      tanggalPengisian: "12 Desember 2023",
      status: "selesai",
    },
    {
      id: "K006",
      judul: "Evaluasi Pembelajaran Keamanan Informasi",
      dosen: "Prof. Bambang Sutejo, Ph.D",
      mataKuliah: "Keamanan Informasi",
      tanggalPengisian: "15 Desember 2023",
      status: "selesai",
    },
  ];

  // Sample questions for the kuisioner
  const pertanyaanKuisioner = [
    {
      id: "Q1",
      pertanyaan: "Dosen menyampaikan materi dengan jelas dan mudah dipahami",
      tipe: "rating",
    },
    {
      id: "Q2",
      pertanyaan:
        "Dosen memberikan contoh yang relevan dengan materi perkuliahan",
      tipe: "rating",
    },
    {
      id: "Q3",
      pertanyaan: "Dosen memberikan kesempatan untuk bertanya dan berdiskusi",
      tipe: "rating",
    },
    {
      id: "Q4",
      pertanyaan:
        "Dosen memberikan feedback yang konstruktif terhadap tugas dan ujian",
      tipe: "rating",
    },
    {
      id: "Q5",
      pertanyaan: "Materi perkuliahan sesuai dengan silabus yang diberikan",
      tipe: "rating",
    },
    {
      id: "Q6",
      pertanyaan: "Berikan saran atau masukan untuk perbaikan perkuliahan ini",
      tipe: "text",
    },
  ];

  const [selectedKuisioner, setSelectedKuisioner] = useState<string | null>(
    null
  );
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});

  const handleStartKuisioner = (id: string) => {
    setSelectedKuisioner(id);
    setCurrentStep(0);
    setAnswers({});
  };

  const handleNextStep = () => {
    if (currentStep < pertanyaanKuisioner.length - 1) {
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

  const handleSubmitKuisioner = () => {
    // In a real app, you would submit the answers to the server here
    console.log("Submitting answers:", answers);
    setSelectedKuisioner(null);
    setCurrentStep(0);
    setAnswers({});
    // Optionally, you could update the kuisionerTersedia and kuisionerSelesai lists
  };

  return (
    <div className="container mx-auto mt-10 space-y-8">
      <DashboardHeader
        heading="Kuisioner"
        text="Isi kuisioner untuk evaluasi pembelajaran"
        semester="Semester 8 - 2024/2025"
      />

      {selectedKuisioner ? (
        <Card className="border-none shadow-lg transition-all duration-300 hover:shadow-xl">
          <CardHeader>
            <CardTitle className="text-xl font-bold">
              {kuisionerTersedia.find((k) => k.id === selectedKuisioner)?.judul}
            </CardTitle>
            <CardDescription>
              {
                kuisionerTersedia.find((k) => k.id === selectedKuisioner)
                  ?.mataKuliah
              }{" "}
              -{" "}
              {kuisionerTersedia.find((k) => k.id === selectedKuisioner)?.dosen}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="mb-6">
              <div className="mb-2 flex items-center justify-between text-sm">
                <span>Progress</span>
                <span className="font-medium">
                  {Math.round(
                    ((currentStep + 1) / pertanyaanKuisioner.length) * 100
                  )}
                  %
                </span>
              </div>
              <Progress
                value={((currentStep + 1) / pertanyaanKuisioner.length) * 100}
                className="h-2.5 rounded-full"
              />
            </div>

            <div className="space-y-6">
              <div className="rounded-lg border p-6 shadow-sm transition-all duration-300 hover:shadow-md">
                <h3 className="mb-4 text-lg font-medium">
                  Pertanyaan {currentStep + 1} dari {pertanyaanKuisioner.length}
                </h3>
                <p className="mb-6 text-lg">
                  {pertanyaanKuisioner[currentStep].pertanyaan}
                </p>

                {pertanyaanKuisioner[currentStep].tipe === "rating" ? (
                  <RadioGroup
                    value={answers[pertanyaanKuisioner[currentStep].id] || ""}
                    onValueChange={(value) =>
                      handleAnswerChange(
                        pertanyaanKuisioner[currentStep].id,
                        value
                      )
                    }
                    className="flex flex-wrap justify-between gap-2 md:flex-nowrap"
                  >
                    {[1, 2, 3, 4, 5].map((value) => (
                      <div key={value} className="flex flex-col items-center">
                        <RadioGroupItem
                          value={value.toString()}
                          id={`${pertanyaanKuisioner[currentStep].id}-${value}`}
                          className="sr-only"
                        />
                        <Label
                          htmlFor={`${pertanyaanKuisioner[currentStep].id}-${value}`}
                          className={cn(
                            "hover:bg-muted flex cursor-pointer flex-col items-center gap-2 rounded-md p-3 transition-all duration-300",
                            answers[pertanyaanKuisioner[currentStep].id] ===
                              value.toString()
                              ? "bg-primary/10 text-primary"
                              : ""
                          )}
                        >
                          <div className="relative">
                            <Star
                              className={cn(
                                "h-10 w-10 transition-all duration-300",
                                value <= 2
                                  ? "text-gray-300"
                                  : "fill-yellow-400 text-yellow-400"
                              )}
                            />
                            {answers[pertanyaanKuisioner[currentStep].id] ===
                              value.toString() && (
                              <div className="bg-primary absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full text-white">
                                <Check className="h-3 w-3" />
                              </div>
                            )}
                          </div>
                          <span className="text-center text-xs">
                            {value === 1
                              ? "Sangat Kurang"
                              : value === 2
                                ? "Kurang"
                                : value === 3
                                  ? "Cukup"
                                  : value === 4
                                    ? "Baik"
                                    : "Sangat Baik"}
                          </span>
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                ) : (
                  <div className="space-y-2">
                    <Label htmlFor="feedback">Masukan Anda</Label>
                    <Textarea
                      id="feedback"
                      placeholder="Tuliskan masukan atau saran Anda di sini..."
                      value={answers[pertanyaanKuisioner[currentStep].id] || ""}
                      onChange={(e) =>
                        handleAnswerChange(
                          pertanyaanKuisioner[currentStep].id,
                          e.target.value
                        )
                      }
                      rows={5}
                      className="focus:border-primary resize-none transition-all duration-300"
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
                  ? () => setSelectedKuisioner(null)
                  : handlePrevStep
              }
              className="hover:bg-muted cursor-pointer transition-all duration-300"
            >
              {currentStep === 0 ? "Batal" : "Sebelumnya"}
            </Button>
            <Button
              onClick={
                currentStep === pertanyaanKuisioner.length - 1
                  ? handleSubmitKuisioner
                  : handleNextStep
              }
              disabled={
                pertanyaanKuisioner[currentStep].tipe !== "text" &&
                !answers[pertanyaanKuisioner[currentStep].id]
              }
              className={cn("cursor-pointer transition-all duration-300")}
            >
              {currentStep === pertanyaanKuisioner.length - 1 ? (
                <>
                  <Check className="mr-2 h-4 w-4" />
                  Kirim Kuisioner
                </>
              ) : (
                <>
                  Selanjutnya
                  <ChevronRight className="ml-2 h-4 w-4" />
                </>
              )}
            </Button>
          </CardFooter>
        </Card>
      ) : (
        <Tabs
          defaultValue="tersedia"
          value={activeTab}
          onValueChange={setActiveTab}
          className="space-y-4"
        >
          <TabsList>
            <TabsTrigger value="tersedia" className="gap-2">
              <ClipboardList className="h-4 w-4" />
              <span className="hidden sm:inline">Kuisioner Tersedia</span>
              <span className="sm:hidden">Tersedia</span>
            </TabsTrigger>
            <TabsTrigger value="selesai" className="gap-2">
              <Check className="h-4 w-4" />
              <span className="hidden sm:inline">Kuisioner Selesai</span>
              <span className="sm:hidden">Selesai</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="tersedia" className="space-y-4">
            {kuisionerTersedia.length > 0 ? (
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {kuisionerTersedia.map((kuisioner) => (
                  <Card
                    key={kuisioner.id}
                    className="group border-none shadow-md transition-all duration-300 hover:shadow-lg"
                  >
                    <CardHeader className="pb-2">
                      <div className="flex items-center gap-2">
                        <div className="bg-primary/10 group-hover:bg-primary/20 rounded-full p-2 transition-all duration-300">
                          <ClipboardList className="text-primary h-4 w-4" />
                        </div>
                        <CardTitle className="line-clamp-1 text-lg">
                          {kuisioner.judul}
                        </CardTitle>
                      </div>
                      <CardDescription className="line-clamp-1">
                        {kuisioner.mataKuliah}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-muted-foreground text-sm">
                            Dosen
                          </span>
                          <span className="line-clamp-1 max-w-[180px] text-right text-sm font-medium">
                            {kuisioner.dosen}
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-muted-foreground text-sm">
                            Deadline
                          </span>
                          <span className="text-sm font-medium text-red-500">
                            {kuisioner.deadline}
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-muted-foreground text-sm">
                            Jumlah Pertanyaan
                          </span>
                          <span className="text-sm font-medium">
                            {kuisioner.jumlahPertanyaan}
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-muted-foreground text-sm">
                            Estimasi Waktu
                          </span>
                          <span className="text-sm font-medium">
                            {kuisioner.estimasiWaktu}
                          </span>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button
                        className="group-hover:bg-primary/90 w-full cursor-pointer transition-all duration-300"
                        onClick={() => handleStartKuisioner(kuisioner.id)}
                      >
                        Isi Kuisioner
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            ) : (
              <Card className="border-none shadow-lg">
                <CardContent className="flex flex-col items-center justify-center py-10">
                  <ClipboardList className="text-muted-foreground mb-4 h-12 w-12" />
                  <h3 className="mb-2 text-xl font-medium">
                    Tidak Ada Kuisioner Tersedia
                  </h3>
                  <p className="text-muted-foreground text-center">
                    Saat ini tidak ada kuisioner yang perlu diisi. Silakan
                    periksa kembali nanti.
                  </p>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="selesai" className="space-y-4">
            {kuisionerSelesai.length > 0 ? (
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {kuisionerSelesai.map((kuisioner) => (
                  <Card
                    key={kuisioner.id}
                    className="group border-none shadow-md transition-all duration-300 hover:shadow-lg"
                  >
                    <CardHeader className="pb-2">
                      <div className="flex items-center gap-2">
                        <div className="bg-primary/10 group-hover:bg-primary/20 rounded-full p-2 transition-all duration-300">
                          <Check className="text-primary h-4 w-4" />
                        </div>
                        <CardTitle className="line-clamp-1 text-lg">
                          {kuisioner.judul}
                        </CardTitle>
                      </div>
                      <CardDescription className="line-clamp-1">
                        {kuisioner.mataKuliah}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-muted-foreground text-sm">
                            Dosen
                          </span>
                          <span className="line-clamp-1 max-w-[180px] text-right text-sm font-medium">
                            {kuisioner.dosen}
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-muted-foreground text-sm">
                            Tanggal Pengisian
                          </span>
                          <span className="text-sm font-medium">
                            {kuisioner.tanggalPengisian}
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-muted-foreground text-sm">
                            Status
                          </span>
                          <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium">
                            Selesai
                          </span>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button
                        variant="outline"
                        className="w-full cursor-pointer transition-all duration-300"
                      >
                        Lihat Hasil
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            ) : (
              <Card className="border-none shadow-lg">
                <CardContent className="flex flex-col items-center justify-center py-10">
                  <GraduationCap className="text-muted-foreground mb-4 h-12 w-12" />
                  <h3 className="mb-2 text-xl font-medium">
                    Belum Ada Kuisioner Selesai
                  </h3>
                  <p className="text-muted-foreground text-center">
                    Anda belum mengisi kuisioner apapun. Kuisioner yang telah
                    diisi akan muncul di sini.
                  </p>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      )}
    </div>
  );
}
