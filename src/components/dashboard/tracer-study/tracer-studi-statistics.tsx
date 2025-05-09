import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface TracerStudyStatisticsProps {
  statistikAlumni: {
    totalAlumni: number;
    bekerja: number;
    wirausaha: number;
    melanjutkanStudi: number;
    mencariKerja: number;
    bidangPekerjaan: Array<{ bidang: string; persentase: number }>;
    waktuTunggu: Array<{ waktu: string; persentase: number }>;
  };
}

export function TracerStudyStatistics({
  statistikAlumni,
}: TracerStudyStatisticsProps) {
  return (
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
                      (statistikAlumni.bekerja / statistikAlumni.totalAlumni) *
                        100
                    )}
                    %
                  </span>
                </div>
                <Progress
                  value={
                    (statistikAlumni.bekerja / statistikAlumni.totalAlumni) *
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
                    (statistikAlumni.wirausaha / statistikAlumni.totalAlumni) *
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
            <h3 className="mb-3 text-lg font-medium">Bidang Pekerjaan</h3>
            <div className="space-y-3">
              {statistikAlumni.bidangPekerjaan.map((bidang, index) => (
                <div key={index}>
                  <div className="mb-1 flex items-center justify-between text-sm">
                    <span>{bidang.bidang}</span>
                    <span className="font-medium">{bidang.persentase}%</span>
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
                    <span className="font-medium">{waktu.persentase}%</span>
                  </div>
                  <Progress value={waktu.persentase} className="h-2" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
