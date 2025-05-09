"use client";

import { BookOpen, Clock, GraduationCap, Users } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function CourseStatistics() {
  return (
    <>
      <Card className="border shadow-sm transition-all duration-200 hover:shadow-md">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Total Mata Kuliah
          </CardTitle>
          <BookOpen className="text-muted-foreground h-4 w-4" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">8</div>
          <p className="text-muted-foreground text-xs">
            Semester Genap 2024/2025
          </p>
        </CardContent>
      </Card>

      <Card className="border shadow-sm transition-all duration-200 hover:shadow-md">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total SKS</CardTitle>
          <GraduationCap className="text-muted-foreground h-4 w-4" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">24</div>
          <p className="text-muted-foreground text-xs">Dari maksimal 24 SKS</p>
        </CardContent>
      </Card>

      <Card className="border shadow-sm transition-all duration-200 hover:shadow-md">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Jam Kuliah</CardTitle>
          <Clock className="text-muted-foreground h-4 w-4" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">16</div>
          <p className="text-muted-foreground text-xs">Jam per minggu</p>
        </CardContent>
      </Card>

      <Card className="border shadow-sm transition-all duration-200 hover:shadow-md">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Dosen</CardTitle>
          <Users className="text-muted-foreground h-4 w-4" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">6</div>
          <p className="text-muted-foreground text-xs">Pengajar semester ini</p>
        </CardContent>
      </Card>
    </>
  );
}
