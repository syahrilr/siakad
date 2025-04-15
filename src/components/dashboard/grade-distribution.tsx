"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function GradeDistribution() {
  const data = [
    { name: "Algoritma", nilai: 85, color: "#4f46e5" },
    { name: "Basis Data", nilai: 90, color: "#8b5cf6" },
    { name: "Jaringan", nilai: 78, color: "#10b981" },
    { name: "IMK", nilai: 88, color: "#f59e0b" },
    { name: "Statistika", nilai: 75, color: "#ef4444" },
    { name: "Etika Profesi", nilai: 95, color: "#06b6d4" },
  ];

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const grade = payload[0].value;
      let letterGrade = "F";
      if (grade >= 90) letterGrade = "A";
      else if (grade >= 80) letterGrade = "B";
      else if (grade >= 70) letterGrade = "C";
      else if (grade >= 60) letterGrade = "D";

      return (
        <div className="bg-background rounded-lg border p-2 shadow-md">
          <p className="font-medium">{`${payload[0].payload.name}: ${grade}`}</p>
          <p className="text-muted-foreground text-sm">{`Grade: ${letterGrade}`}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <Card className="border-none shadow-lg">
      <CardHeader className="pb-3">
        <CardTitle>Distribusi Nilai</CardTitle>
        <CardDescription>Nilai mata kuliah semester ini</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              margin={{ top: 20, right: 10, left: 0, bottom: 20 }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                stroke="#f0f0f0"
              />
              <XAxis
                dataKey="name"
                tick={{ fontSize: 12 }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                domain={[0, 100]}
                tick={{ fontSize: 12 }}
                axisLine={false}
                tickLine={false}
                width={30}
              />
              <Tooltip
                content={<CustomTooltip />}
                cursor={{ fill: "rgba(0, 0, 0, 0.05)" }}
              />
              <ReferenceLine y={70} stroke="#f43f5e" strokeDasharray="3 3" />
              <Bar
                dataKey="nilai"
                radius={[4, 4, 0, 0]}
                barSize={30}
                label={{
                  position: "top",
                  fontSize: 11,
                  fill: "#6b7280",
                }}
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
