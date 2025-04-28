"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  TooltipProps,
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
import { cn } from "@/lib/utils";

export function GradeDistribution() {
  const data = [
    { name: "Algoritma", nilai: 85, color: "#4f46e5" },
    { name: "Basis Data", nilai: 90, color: "#8b5cf6" },
    { name: "Jaringan", nilai: 78, color: "#10b981" },
    { name: "IMK", nilai: 88, color: "#f59e0b" },
    { name: "Statistika", nilai: 75, color: "#ef4444" },
    { name: "Etika Profesi", nilai: 95, color: "#06b6d4" },
  ];

  const getGradeColor = (grade: number) => {
    if (grade >= 90) return "text-emerald-600 dark:text-emerald-400";
    if (grade >= 80) return "text-blue-600 dark:text-blue-400";
    if (grade >= 70) return "text-amber-600 dark:text-amber-400";
    if (grade >= 60) return "text-orange-600 dark:text-orange-400";
    return "text-red-600 dark:text-red-400";
  };

  const getGradeLetter = (grade: number) => {
    if (grade >= 90) return "A";
    if (grade >= 80) return "B";
    if (grade >= 70) return "C";
    if (grade >= 60) return "D";
    return "E";
  };

  const CustomTooltip = ({ active, payload }: TooltipProps<number, string>) => {
    if (active && payload && payload.length) {
      const grade = payload[0].value as number;
      const letterGrade = getGradeLetter(grade);
      const colorClass = getGradeColor(grade);

      return (
        <div className="bg-background rounded-lg border p-3 shadow-md">
          <p className="font-medium">{`${payload[0].payload.name}: ${grade}`}</p>
          <p className={cn("text-sm font-semibold", colorClass)}>
            {`Grade: ${letterGrade}`}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <Card className="overflow-hidden border shadow-md transition-all duration-300 hover:shadow-lg dark:border-slate-800">
      <CardHeader className="bg-card pb-3">
        <CardTitle className="text-lg font-semibold">
          Distribusi Nilai
        </CardTitle>
        <CardDescription>Nilai mata kuliah semester ini</CardDescription>
      </CardHeader>
      <CardContent className="p-6">
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              margin={{ top: 20, right: 10, left: 0, bottom: 20 }}
              barGap={8}
              barCategoryGap={16}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                stroke="var(--border)"
                opacity={0.4}
              />
              <XAxis
                dataKey="name"
                tick={{ fontSize: 12 }}
                axisLine={false}
                tickLine={false}
                dy={8}
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
              <ReferenceLine
                y={70}
                stroke="#f43f5e"
                strokeDasharray="3 3"
                strokeWidth={2}
                label={{
                  value: "Min",
                  position: "right",
                  fill: "#f43f5e",
                  fontSize: 12,
                }}
              />
              <Bar
                dataKey="nilai"
                radius={[4, 4, 0, 0]}
                barSize={30}
                animationDuration={1500}
                label={{
                  position: "top",
                  fontSize: 11,
                  fill: "var(--muted-foreground)",
                  formatter: (value: number) => value,
                }}
              >
                {data.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={entry.color}
                    className="transition-all duration-300 hover:opacity-80 hover:brightness-110"
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
