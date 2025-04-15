import { Award, BookOpen, Calendar, Clock } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function OverviewStats() {
  const stats = [
    {
      title: "SKS Semester Ini",
      value: "18/24",
      description: "SKS diambil dari total",
      icon: BookOpen,
      trend: "up",
    },
    {
      title: "IPK Kumulatif",
      value: "3.78",
      description: "Dari 4.00",
      icon: Award,
      trend: "up",
    },
    {
      title: "Mata Kuliah",
      value: "6",
      description: "Mata kuliah semester ini",
      icon: Calendar,
      trend: "neutral",
    },
    {
      title: "Kehadiran",
      value: "92%",
      description: "Rata-rata kehadiran",
      icon: Clock,
      trend: "down",
    },
  ];

  return (
    <>
      {stats.map((stat, index) => (
        <Card key={index} className="overflow-hidden border-none shadow-lg">
          <div className="p1">
            <CardHeader className="bg-card flex flex-row items-center justify-between space-y-0 rounded-t-sm pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
              <stat.icon className="text-primary h-4 w-4" />
            </CardHeader>
            <CardContent className="bg-card pt-4">
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-muted-foreground text-xs">
                {stat.description}
              </p>
            </CardContent>
          </div>
        </Card>
      ))}
    </>
  );
}
