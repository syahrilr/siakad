import Link from "next/link";

import {
  BookOpen,
  Calendar,
  Clock,
  DollarSign,
  FileText,
  Settings,
  User,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";

export function QuickActions() {
  const actions = [
    {
      icon: BookOpen,
      label: "KRS",
      href: "/dashboard/krs",
      color: "text-blue-600 dark:text-blue-400",
      bgColor: "bg-blue-50 dark:bg-blue-950/50",
      borderColor:
        "group-hover:border-blue-300 dark:group-hover:border-blue-800",
    },
    {
      icon: FileText,
      label: "Transkrip",
      href: "/dashboard/transkrip",
      color: "text-violet-600 dark:text-violet-400",
      bgColor: "bg-violet-50 dark:bg-violet-950/50",
      borderColor:
        "group-hover:border-violet-300 dark:group-hover:border-violet-800",
    },
    {
      icon: Calendar,
      label: "Jadwal Kuliah",
      href: "/dashboard/jadwal-kuliah",
      color: "text-emerald-600 dark:text-emerald-400",
      bgColor: "bg-emerald-50 dark:bg-emerald-950/50",
      borderColor:
        "group-hover:border-emerald-300 dark:group-hover:border-emerald-800",
    },
    {
      icon: DollarSign,
      label: "Pembayaran",
      href: "/dashboard/pembayaran",
      color: "text-amber-600 dark:text-amber-400",
      bgColor: "bg-amber-50 dark:bg-amber-950/50",
      borderColor:
        "group-hover:border-amber-300 dark:group-hover:border-amber-800",
    },
    {
      icon: User,
      label: "Profil",
      href: "/dashboard/profil",
      color: "text-red-600 dark:text-red-400",
      bgColor: "bg-red-50 dark:bg-red-950/50",
      borderColor: "group-hover:border-red-300 dark:group-hover:border-red-800",
    },
    {
      icon: Settings,
      label: "Pengaturan",
      href: "/dashboard/pengaturan",
      color: "text-sky-600 dark:text-sky-400",
      bgColor: "bg-sky-50 dark:bg-sky-950/50",
      borderColor: "group-hover:border-sky-300 dark:group-hover:border-sky-800",
    },
  ];

  return (
    <Card className="overflow-hidden border shadow-md transition-all duration-300 hover:shadow-lg dark:border-slate-800">
      <CardHeader className="bg-card pb-3">
        <CardTitle className="text-lg font-semibold">Akses Cepat</CardTitle>
        <CardDescription>Menu yang sering diakses</CardDescription>
      </CardHeader>
      <CardContent className="p-6">
        <div className="grid grid-cols-3 gap-4">
          {actions.map((action, index) => (
            <Button
              key={index}
              variant="outline"
              className={cn(
                "group flex h-24 w-full flex-col items-center justify-center gap-2 rounded-lg border transition-all hover:shadow-md",
                action.borderColor
              )}
              asChild
            >
              <Link href={action.href}>
                <div className={cn("rounded-full p-2", action.bgColor)}>
                  <action.icon className={cn("h-5 w-5", action.color)} />
                </div>
                <span className="font-medium">{action.label}</span>
              </Link>
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
