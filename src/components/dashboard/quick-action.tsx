import Link from "next/link";

import {
  BookOpen,
  Calendar,
  Clock,
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

export function QuickActions() {
  const actions = [
    { icon: BookOpen, label: "KRS", href: "/krs", color: "text-blue-500" },
    {
      icon: FileText,
      label: "Transkrip",
      href: "/transkrip",
      color: "text-purple-500",
    },
    {
      icon: Calendar,
      label: "Jadwal",
      href: "/jadwal",
      color: "text-emerald-500",
    },
    {
      icon: Clock,
      label: "Presensi",
      href: "/presensi",
      color: "text-amber-500",
    },
    { icon: User, label: "Profil", href: "/profil", color: "text-red-500" },
    {
      icon: Settings,
      label: "Pengaturan",
      href: "/pengaturan",
      color: "text-sky-500",
    },
  ];

  return (
    <Card className="border-none shadow-lg">
      <CardHeader className="pb-3">
        <CardTitle>Akses Cepat</CardTitle>
        <CardDescription>Menu yang sering diakses</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-3 gap-4">
          {actions.map((action, index) => (
            <Button
              key={index}
              variant="outline"
              className="hover:bg-accent flex h-24 w-full flex-col items-center justify-center gap-2 rounded-lg border transition-all hover:shadow-md"
              asChild
            >
              <Link href={action.href}>
                <action.icon className={`h-6 w-6 ${action.color}`} />
                <span>{action.label}</span>
              </Link>
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
