"use client";

import type React from "react";

import {
  AlertCircle,
  CheckCircle2,
  Clock,
  HelpCircle,
  Info,
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
import { Progress } from "@/components/ui/progress";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

interface StatusItem {
  title: string;
  status: "completed" | "in-progress" | "pending" | "error";
  icon: React.ElementType;
  description: string;
  date?: string;
}

export function KRSStatus() {
  const statusItems: StatusItem[] = [
    {
      title: "Status Pengisian",
      status: "in-progress",
      icon: Clock,
      description:
        "Anda sedang dalam proses pengisian KRS. Silakan lengkapi semua mata kuliah yang ingin diambil.",
      date: "Terakhir diperbarui: 15 April 2025, 10:30 WIB",
    },
    {
      title: "Persetujuan Dosen PA",
      status: "pending",
      icon: AlertCircle,
      description:
        "KRS Anda belum disetujui oleh Dosen Pembimbing Akademik. Silakan hubungi dosen PA Anda.",
    },
    {
      title: "Pembayaran UKT",
      status: "completed",
      icon: CheckCircle2,
      description: "Pembayaran UKT untuk semester ini telah lunas.",
      date: "Dibayar pada: 10 April 2025",
    },
    {
      title: "Verifikasi Akademik",
      status: "error",
      icon: HelpCircle,
      description:
        "Terdapat masalah pada verifikasi akademik Anda. Silakan hubungi bagian akademik.",
    },
  ];

  // Calculate progress
  const totalSteps = statusItems.length;
  const completedSteps = statusItems.filter(
    (item) => item.status === "completed"
  ).length;
  const progressPercentage = (completedSteps / totalSteps) * 100;

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return {
          bg: "bg-emerald-100 dark:bg-emerald-900/30",
          text: "text-emerald-600 dark:text-emerald-400",
          hover: "hover:bg-emerald-50 dark:hover:bg-emerald-950/20",
          badge: "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400",
        };
      case "in-progress":
        return {
          bg: "bg-amber-100 dark:bg-amber-900/30",
          text: "text-amber-600 dark:text-amber-400",
          hover: "hover:bg-amber-50 dark:hover:bg-amber-950/20",
          badge: "bg-amber-500/10 text-amber-700 dark:text-amber-400",
        };
      case "pending":
        return {
          bg: "bg-blue-100 dark:bg-blue-900/30",
          text: "text-blue-600 dark:text-blue-400",
          hover: "hover:bg-blue-50 dark:hover:bg-blue-950/20",
          badge: "bg-blue-500/10 text-blue-700 dark:text-blue-400",
        };
      case "error":
        return {
          bg: "bg-red-100 dark:bg-red-900/30",
          text: "text-red-600 dark:text-red-400",
          hover: "hover:bg-red-50 dark:hover:bg-red-950/20",
          badge: "bg-red-500/10 text-red-700 dark:text-red-400",
        };
      default:
        return {
          bg: "bg-slate-100 dark:bg-slate-900/30",
          text: "text-slate-600 dark:text-slate-400",
          hover: "hover:bg-slate-50 dark:hover:bg-slate-950/20",
          badge: "bg-slate-500/10 text-slate-700 dark:text-slate-400",
        };
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "completed":
        return "Selesai";
      case "in-progress":
        return "Dalam Proses";
      case "pending":
        return "Menunggu";
      case "error":
        return "Perlu Perhatian";
      default:
        return "Tidak Diketahui";
    }
  };

  return (
    <Card className="overflow-hidden border shadow-md transition-all duration-300 hover:shadow-lg dark:border-slate-800">
      <CardHeader className="bg-card pb-3">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-lg font-semibold">Status KRS</CardTitle>
            <CardDescription>Semester Genap 2023/2024</CardDescription>
          </div>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <Info className="h-4 w-4" />
                  <span className="sr-only">Info</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent side="left" className="max-w-[300px]">
                <p>
                  Status KRS menunjukkan progres Anda dalam proses pengisian
                  KRS. Pastikan semua tahapan selesai sebelum batas waktu yang
                  ditentukan.
                </p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </CardHeader>
      <CardContent className="p-6">
        <div className="space-y-5">
          {statusItems.map((item, index) => {
            const colors = getStatusColor(item.status);
            return (
              <div
                key={index}
                className={cn(
                  "group flex items-center justify-between rounded-lg border p-3 transition-all duration-300",
                  colors.hover
                )}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={cn(
                      "flex h-9 w-9 items-center justify-center rounded-full",
                      colors.bg
                    )}
                  >
                    <item.icon className={cn("h-5 w-5", colors.text)} />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{item.title}</span>
                      {item.status === "error" && (
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Info className="h-4 w-4 text-red-500" />
                            </TooltipTrigger>
                            <TooltipContent side="top">
                              <p>Terdapat masalah yang perlu diselesaikan</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      )}
                    </div>
                    <p className="text-muted-foreground text-xs">
                      {item.description}
                    </p>
                    {item.date && (
                      <p className="text-muted-foreground mt-1 text-xs italic">
                        {item.date}
                      </p>
                    )}
                  </div>
                </div>
                <Badge
                  variant="outline"
                  className={cn("transition-all duration-300", colors.badge)}
                >
                  {getStatusText(item.status)}
                </Badge>
              </div>
            );
          })}

          <div className="mt-4 space-y-2 pt-2">
            <div className="mb-2 flex items-center justify-between">
              <span className="text-sm font-medium">Progres Pengisian KRS</span>
              <div className="flex items-center gap-2">
                <div className="bg-primary h-2.5 w-2.5 rounded-full"></div>
                <span className="text-sm font-medium">
                  {progressPercentage}%
                </span>
              </div>
            </div>
            <Progress
              value={progressPercentage}
              className="h-2.5 rounded-full bg-slate-200 dark:bg-slate-800"
            />
            <p className="text-muted-foreground text-xs">
              Lengkapi semua tahapan untuk menyelesaikan proses KRS
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
