"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

export function AcademicProgress() {
  const courses = [
    {
      id: 1,
      name: "Algoritma dan Pemrograman",
      progress: 75,
      color: "bg-blue-600 dark:bg-blue-500",
    },
    {
      id: 2,
      name: "Basis Data Lanjut",
      progress: 60,
      color: "bg-violet-600 dark:bg-violet-500",
    },
    {
      id: 3,
      name: "Jaringan Komputer",
      progress: 85,
      color: "bg-emerald-600 dark:bg-emerald-500",
    },
    {
      id: 4,
      name: "Interaksi Manusia dan Komputer",
      progress: 70,
      color: "bg-amber-600 dark:bg-amber-500",
    },
  ];

  return (
    <Card className="overflow-hidden border shadow-md transition-all duration-300 hover:shadow-lg dark:border-slate-800">
      <CardHeader className="bg-card pb-3">
        <CardTitle className="text-lg font-semibold">
          Progress Perkuliahan
        </CardTitle>
        <CardDescription>Semester 5 - 2023/2024</CardDescription>
      </CardHeader>
      <CardContent className="p-6">
        <div className="space-y-5">
          {courses.map((course) => (
            <div key={course.id} className="space-y-2">
              <div className="flex items-center justify-between">
                <p className="text-sm leading-none font-medium">
                  {course.name}
                </p>
                <div className="flex items-center gap-1.5">
                  <div className={cn("h-2 w-2 rounded-full", course.color)} />
                  <p className="text-muted-foreground text-sm font-medium">
                    {course.progress}%
                  </p>
                </div>
              </div>
              <div className="h-2 w-full overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800">
                <Progress
                  value={course.progress}
                  className={cn(
                    "h-full transition-all duration-500",
                    course.color
                  )}
                  style={{ transform: "translateX(0)" }}
                />
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
