"use client";

import { useState } from "react";

import { Calendar, ChevronDown, ChevronUp } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

interface ScheduleItem {
  title: string;
  date: string;
  status: "completed" | "active" | "upcoming";
  description?: string;
}

export function KRSSchedule() {
  const [isOpen, setIsOpen] = useState(true);

  const schedule: ScheduleItem[] = [
    {
      title: "Pengisian KRS",
      date: "15 - 20 April 2025",
      status: "active",
      description:
        "Mahasiswa dapat memilih mata kuliah yang akan diambil pada semester ini.",
    },
    {
      title: "Persetujuan Dosen PA",
      date: "21 - 25 April 2025",
      status: "upcoming",
      description:
        "Dosen Pembimbing Akademik menyetujui KRS yang telah diisi mahasiswa.",
    },
    {
      title: "Masa Perubahan KRS",
      date: "26 - 30 April 2025",
      status: "upcoming",
      description:
        "Mahasiswa dapat melakukan perubahan pada KRS yang telah diisi.",
    },
    {
      title: "Cetak KRS",
      date: "1 - 5 Mei 2025",
      status: "upcoming",
      description: "Mahasiswa dapat mencetak KRS yang telah disetujui.",
    },
  ];

  // Calculate progress
  const totalSteps = schedule.length;
  const completedSteps = schedule.filter(
    (item) => item.status === "completed"
  ).length;
  const activeStep = schedule.findIndex((item) => item.status === "active");
  const progressPercentage =
    ((completedSteps + (activeStep !== -1 ? 0.5 : 0)) / totalSteps) * 100;

  return (
    <Card className="overflow-hidden border shadow-md transition-all duration-300 hover:shadow-lg dark:border-slate-800">
      <CardHeader className="bg-card pb-3">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-lg font-semibold">Jadwal KRS</CardTitle>
            <CardDescription>Semester Genap 2023/2024</CardDescription>
          </div>
          <div className="bg-primary/10 hidden rounded-full p-2 md:flex">
            <Calendar className="text-primary h-5 w-5" />
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-6">
        <Collapsible
          open={isOpen}
          onOpenChange={setIsOpen}
          className="space-y-4"
        >
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <Progress value={progressPercentage} className="h-2 w-32" />
                <span className="text-sm font-medium">
                  {Math.round(progressPercentage)}%
                </span>
              </div>
              <p className="text-muted-foreground text-xs">
                Progres jadwal KRS
              </p>
            </div>
            <CollapsibleTrigger asChild>
              <div className="bg-muted/50 hover:bg-muted flex h-8 w-8 cursor-pointer items-center justify-center rounded-full transition-colors">
                {isOpen ? (
                  <ChevronUp className="h-4 w-4" />
                ) : (
                  <ChevronDown className="h-4 w-4" />
                )}
              </div>
            </CollapsibleTrigger>
          </div>
          <CollapsibleContent className="space-y-4">
            <div className="before:bg-muted relative ml-3 pl-4 before:absolute before:top-0 before:left-0 before:h-full before:w-0.5">
              {schedule.map((item, index) => (
                <div
                  key={index}
                  className={cn(
                    "group relative mb-6 flex items-start gap-4 last:mb-0",
                    item.status === "completed" && "text-muted-foreground"
                  )}
                >
                  <div
                    className={cn(
                      "bg-background absolute -left-7 flex h-6 w-6 items-center justify-center rounded-full border-2",
                      item.status === "completed"
                        ? "border-emerald-500 bg-emerald-500/10"
                        : item.status === "active"
                          ? "border-primary bg-primary/10"
                          : "border-muted-foreground/30"
                    )}
                  >
                    {item.status === "completed" && (
                      <div className="h-2 w-2 rounded-full bg-emerald-500" />
                    )}
                    {item.status === "active" && (
                      <div className="bg-primary h-2 w-2 rounded-full" />
                    )}
                  </div>
                  <div
                    className={cn(
                      "group relative flex items-center gap-4 overflow-hidden rounded-lg border p-3 shadow-sm transition-all duration-300 hover:shadow-md",
                      item.status === "active" &&
                        "bg-primary/5 border-primary/20"
                    )}
                  >
                    <div
                      className={cn(
                        "flex h-10 w-10 items-center justify-center rounded-full transition-all duration-300",
                        item.status === "active"
                          ? "bg-primary/10"
                          : item.status === "completed"
                            ? "bg-emerald-500/10"
                            : "bg-muted"
                      )}
                    >
                      <Calendar
                        className={cn(
                          "h-5 w-5 transition-all duration-300",
                          item.status === "active"
                            ? "text-primary"
                            : item.status === "completed"
                              ? "text-emerald-500"
                              : "text-muted-foreground"
                        )}
                      />
                    </div>
                    <div className="flex-1">
                      <p
                        className={cn(
                          "font-medium transition-all duration-300",
                          item.status === "active" && "text-primary",
                          item.status === "completed" &&
                            "text-emerald-600 dark:text-emerald-400"
                        )}
                      >
                        {item.title}
                      </p>
                      <p className="text-muted-foreground text-sm">
                        {item.date}
                      </p>
                      {item.description && (
                        <p className="text-muted-foreground mt-1 text-xs">
                          {item.description}
                        </p>
                      )}
                    </div>
                    <Badge
                      variant="outline"
                      className={cn(
                        "transition-all duration-300",
                        item.status === "active"
                          ? "bg-primary/10 text-primary"
                          : item.status === "completed"
                            ? "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400"
                            : "bg-muted text-muted-foreground"
                      )}
                    >
                      {item.status === "active"
                        ? "Aktif"
                        : item.status === "completed"
                          ? "Selesai"
                          : "Mendatang"}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CollapsibleContent>
        </Collapsible>
      </CardContent>
    </Card>
  );
}
