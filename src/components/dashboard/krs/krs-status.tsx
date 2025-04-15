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
    <Card className="border-none shadow-lg transition-all duration-300 hover:shadow-xl">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-xl font-bold">Status KRS</CardTitle>
            <CardDescription>Semester Genap 2023/2024</CardDescription>
          </div>
          <div className="hidden rounded-full bg-amber-500/10 p-2 md:flex">
            <Clock className="h-5 w-5 text-amber-500" />
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-5">
          <div className="group flex items-center justify-between rounded-lg border p-3 transition-all duration-300 hover:bg-amber-50 dark:hover:bg-amber-950/20">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400">
                <Clock className="h-5 w-5" />
              </div>
              <span className="font-medium">Status Pengisian</span>
            </div>
            <Badge
              variant="outline"
              className="bg-amber-500/10 text-amber-700 transition-all duration-300 group-hover:bg-amber-500/20 dark:text-amber-400"
            >
              Dalam Proses
            </Badge>
          </div>

          <div className="group flex items-center justify-between rounded-lg border p-3 transition-all duration-300 hover:bg-red-50 dark:hover:bg-red-950/20">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400">
                <AlertCircle className="h-5 w-5" />
              </div>
              <span className="font-medium">Persetujuan Dosen PA</span>
            </div>
            <Badge
              variant="outline"
              className="bg-red-500/10 text-red-700 transition-all duration-300 group-hover:bg-red-500/20 dark:text-red-400"
            >
              Belum Disetujui
            </Badge>
          </div>

          <div className="group flex items-center justify-between rounded-lg border p-3 transition-all duration-300 hover:bg-emerald-50 dark:hover:bg-emerald-950/20">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400">
                <CheckCircle2 className="h-5 w-5" />
              </div>
              <span className="font-medium">Pembayaran UKT</span>
            </div>
            <Badge
              variant="outline"
              className="bg-emerald-500/10 text-emerald-700 transition-all duration-300 group-hover:bg-emerald-500/20 dark:text-emerald-400"
            >
              Lunas
            </Badge>
          </div>

          <div className="mt-4 space-y-2 pt-2">
            <div className="mb-2 flex items-center justify-between">
              <span className="text-sm font-medium">Progres Pengisian KRS</span>
              <div className="flex items-center gap-2">
                <div className="bg-primary h-2.5 w-2.5 rounded-full"></div>
                <span className="text-sm font-medium">75%</span>
              </div>
            </div>
            <Progress value={75} className="bg-muted h-2.5 rounded-full" />
            <p className="text-muted-foreground text-xs">
              Lengkapi semua tahapan untuk menyelesaikan proses KRS
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
