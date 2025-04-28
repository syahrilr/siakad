import { Award, BookOpen, Calendar, Clock } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export function OverviewStats() {
  const stats = [
    {
      title: "SKS Semester Ini",
      value: "18/24",
      description: "SKS diambil dari total",
      icon: BookOpen,
      trend: "up",
      color: "bg-blue-50 dark:bg-blue-950",
      iconColor: "text-blue-600 dark:text-blue-400",
      valueColor: "text-blue-700 dark:text-blue-300",
    },
    {
      title: "IPK Kumulatif",
      value: "3.78",
      description: "Dari 4.00",
      icon: Award,
      trend: "up",
      color: "bg-violet-50 dark:bg-violet-950",
      iconColor: "text-violet-600 dark:text-violet-400",
      valueColor: "text-violet-700 dark:text-violet-300",
    },
    {
      title: "Mata Kuliah",
      value: "6",
      description: "Mata kuliah semester ini",
      icon: Calendar,
      trend: "neutral",
      color: "bg-emerald-50 dark:bg-emerald-950",
      iconColor: "text-emerald-600 dark:text-emerald-400",
      valueColor: "text-emerald-700 dark:text-emerald-300",
    },
    {
      title: "Kehadiran",
      value: "92%",
      description: "Rata-rata kehadiran",
      icon: Clock,
      trend: "down",
      color: "bg-amber-50 dark:bg-amber-950",
      iconColor: "text-amber-600 dark:text-amber-400",
      valueColor: "text-amber-700 dark:text-amber-300",
    },
  ];

  return (
    <>
      {stats.map((stat, index) => (
        <Card
          key={index}
          className={cn(
            "overflow-hidden border shadow-md transition-all duration-300 hover:shadow-lg dark:border-slate-800",
            stat.color
          )}
        >
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
            <stat.icon className={cn("h-4 w-4", stat.iconColor)} />
          </CardHeader>
          <CardContent className="pt-4">
            <div className={cn("text-2xl font-bold", stat.valueColor)}>
              {stat.value}
            </div>
            <p className="text-muted-foreground mt-1 text-xs">
              {stat.description}
              {stat.trend === "up" && (
                <span className="ml-1 text-emerald-600 dark:text-emerald-400">
                  ↑
                </span>
              )}
              {stat.trend === "down" && (
                <span className="ml-1 text-red-600 dark:text-red-400">↓</span>
              )}
            </p>
          </CardContent>
        </Card>
      ))}
    </>
  );
}
