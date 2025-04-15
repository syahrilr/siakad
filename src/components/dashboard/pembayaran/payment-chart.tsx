"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export function PaymentChart() {
  // Dummy data for the chart
  const data = [
    {
      name: "SPP",
      total: 5000000,
      color: "#2563eb",
    },
    {
      name: "Praktikum",
      total: 1500000,
      color: "#8b5cf6",
    },
    {
      name: "UTS",
      total: 500000,
      color: "#ec4899",
    },
    {
      name: "UAS",
      total: 500000,
      color: "#f97316",
    },
    {
      name: "Lainnya",
      total: 1000000,
      color: "#14b8a6",
    },
  ];

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={data}>
        <CartesianGrid
          strokeDasharray="3 3"
          vertical={false}
          className="stroke-muted"
        />
        <XAxis
          dataKey="name"
          tickLine={false}
          axisLine={false}
          className="text-muted-foreground text-xs font-medium"
        />
        <YAxis
          tickFormatter={(value) => `Rp${value / 1000000}jt`}
          tickLine={false}
          axisLine={false}
          className="text-muted-foreground text-xs font-medium"
        />
        <Tooltip
          content={({ active, payload }) => {
            if (active && payload && payload.length) {
              return (
                <div className="bg-background border-border rounded-lg border p-2 shadow-sm">
                  <div className="grid grid-cols-2 gap-2">
                    <div className="flex items-center gap-1">
                      <div
                        className="h-2 w-2 rounded-full"
                        style={{ backgroundColor: payload[0].payload.color }}
                      />
                      <span className="text-muted-foreground text-xs">
                        {payload[0].name}
                      </span>
                    </div>
                    <div className="text-right text-xs font-medium">
                      {formatCurrency(payload[0].value as number)}
                    </div>
                  </div>
                </div>
              );
            }
            return null;
          }}
        />
        <Bar
          dataKey="total"
          radius={[4, 4, 0, 0]}
          className="fill-primary"
          barSize={30}
          fill="url(#color)"
        />
      </BarChart>
    </ResponsiveContainer>
  );
}
