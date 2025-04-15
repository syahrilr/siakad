"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

export function AcademicProgress() {
  const courses = [
    {
      id: 1,
      name: "Algoritma dan Pemrograman",
      progress: 75,
      color: "bg-blue-500",
    },
    { id: 2, name: "Basis Data Lanjut", progress: 60, color: "bg-purple-500" },
    { id: 3, name: "Jaringan Komputer", progress: 85, color: "bg-emerald-500" },
    {
      id: 4,
      name: "Interaksi Manusia dan Komputer",
      progress: 70,
      color: "bg-amber-500",
    },
  ];

  return (
    <Card className="border-none shadow-lg">
      <CardHeader className="pb-3">
        <CardTitle>Progress Perkuliahan</CardTitle>
        <CardDescription>Semester 5 - 2023/2024</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-5">
          {courses.map((course) => (
            <div key={course.id} className="space-y-2">
              <div className="flex items-center justify-between">
                <p className="text-sm leading-none font-medium">
                  {course.name}
                </p>
                <p className="text-muted-foreground text-sm font-medium">
                  {course.progress}%
                </p>
              </div>
              <Progress
                value={course.progress}
                className={`h-2 ${course.color}`}
              />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
