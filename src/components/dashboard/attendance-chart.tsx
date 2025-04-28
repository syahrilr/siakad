"use client";

import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function AttendanceChart() {
  const data = [
    { name: "Hadir", value: 32, color: "#4f46e5" },
    { name: "Izin", value: 2, color: "#f59e0b" },
    { name: "Sakit", value: 1, color: "#10b981" },
    { name: "Alpa", value: 1, color: "#ef4444" },
  ];

  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
  }: {
    cx: number;
    cy: number;
    midAngle: number;
    innerRadius: number;
    outerRadius: number;
    percent: number;
  }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return percent > 0.05 ? (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
        fontSize={12}
        fontWeight="bold"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    ) : null;
  };

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-background rounded-lg border p-3 shadow-md">
          <p className="font-medium">{`${payload[0].name}: ${payload[0].value} pertemuan`}</p>
          <p className="text-muted-foreground text-sm">{`${((payload[0].value / 36) * 100).toFixed(1)}% dari total`}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <Card className="overflow-hidden border shadow-md transition-all duration-300 hover:shadow-lg dark:border-slate-800">
      <CardHeader className="bg-card pb-3">
        <CardTitle className="text-lg font-semibold">Rekap Kehadiran</CardTitle>
        <CardDescription>Total 36 pertemuan</CardDescription>
      </CardHeader>
      <CardContent className="p-6">
        <div className="h-[220px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={80}
                paddingAngle={3}
                dataKey="value"
                labelLine={false}
                label={renderCustomizedLabel}
                animationDuration={1000}
                animationBegin={200}
              >
                {data.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={entry.color}
                    strokeWidth={2}
                    className="transition-all duration-300 hover:opacity-80"
                  />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
              <Legend
                layout="horizontal"
                verticalAlign="bottom"
                align="center"
                iconSize={10}
                iconType="circle"
                formatter={(value) => (
                  <span className="text-sm font-medium">{value}</span>
                )}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
