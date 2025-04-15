import { AlertCircle, CheckCircle2, Clock } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

export function KRSStatus() {
  return (
    <Card className="border-none shadow-lg">
      <CardHeader className="pb-3">
        <CardTitle>Status KRS</CardTitle>
        <CardDescription>Semester Genap 2023/2024</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-amber-500" />
              <span className="font-medium">Status Pengisian</span>
            </div>
            <Badge
              variant="outline"
              className="bg-amber-500/10 text-amber-700 dark:text-amber-400"
            >
              Dalam Proses
            </Badge>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-red-500" />
              <span className="font-medium">Persetujuan Dosen PA</span>
            </div>
            <Badge
              variant="outline"
              className="bg-red-500/10 text-red-700 dark:text-red-400"
            >
              Belum Disetujui
            </Badge>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-emerald-500" />
              <span className="font-medium">Pembayaran UKT</span>
            </div>
            <Badge
              variant="outline"
              className="bg-emerald-500/10 text-emerald-700 dark:text-emerald-400"
            >
              Lunas
            </Badge>
          </div>
          <div className="pt-2">
            <div className="mb-2 flex items-center justify-between">
              <span className="text-sm font-medium">Progres Pengisian KRS</span>
              <span className="text-sm font-medium">75%</span>
            </div>
            <Progress value={75} className="bg-muted h-2" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
