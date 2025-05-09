"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { TracerStudyInfoCards } from "./tracer-studi-info-cards";

interface TracerStudyOverviewProps {
  tracerStudyInfo: {
    status: string;
    deadline: string;
    jumlahPertanyaan: number;
    estimasiWaktu: string;
  };
  statistikAlumni: {
    totalAlumni: number;
    bekerja: number;
    wirausaha: number;
    melanjutkanStudi: number;
    mencariKerja: number;
    bidangPekerjaan: Array<{ bidang: string; persentase: number }>;
    waktuTunggu: Array<{ waktu: string; persentase: number }>;
  };
  onStartTracerStudy: () => void;
}

export function TracerStudyOverview({
  tracerStudyInfo,
  statistikAlumni,
  onStartTracerStudy,
}: TracerStudyOverviewProps) {
  return (
    <div className="space-y-4">
      <TracerStudyInfoCards
        tracerStudyInfo={tracerStudyInfo}
        statistikAlumni={statistikAlumni}
      />

      <Card>
        <CardHeader>
          <CardTitle>Tracer Study Alumni</CardTitle>
          <CardDescription>
            Bantu kami meningkatkan kualitas pendidikan dengan mengisi tracer
            study
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="rounded-lg border p-4">
              <h3 className="mb-2 text-lg font-medium">
                Apa itu Tracer Study?
              </h3>
              <p className="text-muted-foreground">
                Tracer Study adalah studi pelacakan jejak lulusan/alumni yang
                dilakukan untuk mengetahui outcome pendidikan dalam bentuk
                transisi dari dunia pendidikan tinggi ke dunia kerja, situasi
                kerja terakhir, dan aplikasi kompetensi di dunia kerja.
              </p>
            </div>

            <div className="rounded-lg border p-4">
              <h3 className="mb-2 text-lg font-medium">
                Mengapa Tracer Study Penting?
              </h3>
              <p className="text-muted-foreground">
                Hasil Tracer Study digunakan untuk meningkatkan kualitas layanan
                pendidikan, menyesuaikan kurikulum dengan kebutuhan dunia kerja,
                dan memberikan informasi kepada calon mahasiswa tentang prospek
                karir setelah lulus.
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
          <Button className="w-full" onClick={onStartTracerStudy}>
            Isi Tracer Study Sekarang
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
