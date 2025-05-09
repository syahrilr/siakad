import { Briefcase, ClipboardList, GraduationCap, User } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface TracerStudyInfoCardsProps {
  tracerStudyInfo: {
    status: string;
    deadline: string;
    jumlahPertanyaan: number;
    estimasiWaktu: string;
  };
  statistikAlumni: {
    totalAlumni: number;
    bekerja: number;
  };
}

export function TracerStudyInfoCards({
  tracerStudyInfo,
  statistikAlumni,
}: TracerStudyInfoCardsProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Status Tracer Study
          </CardTitle>
          <ClipboardList className="text-primary h-4 w-4" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{tracerStudyInfo.status}</div>
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
          <CardTitle className="text-sm font-medium">Total Alumni</CardTitle>
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
              (statistikAlumni.bekerja / statistikAlumni.totalAlumni) * 100
            )}
            %
          </div>
          <p className="text-muted-foreground text-xs">
            Alumni yang sudah bekerja
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
