"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type * as React from "react";

import {
  BarChart3,
  Book,
  ClipboardList,
  Command,
  CreditCard,
  FileText,
  Laptop,
  LayoutDashboard,
  Settings,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";

import { Separator } from "../ui/separator";
import { NavMain } from "./nav-main";

const data = {
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: LayoutDashboard,
    },
  ],
  settings: {
    title: "Settings",
    url: "/dashboard/settings",
    icon: Settings,
  },
  navContents: [
    {
      title: "KRS",
      url: "/dashboard/krs",
      icon: Book,
    },
    {
      title: "Transkrip",
      url: "/dashboard/transkrip",
      icon: FileText,
    },
    {
      title: "Pembayaran",
      url: "/dashboard/pembayaran",
      icon: CreditCard,
    },
    {
      title: "E-learning",
      url: "/dashboard/e-learning",
      icon: Laptop,
    },
    {
      title: "Kuisioner",
      url: "/dashboard/kuisioner",
      icon: ClipboardList,
    },
    {
      title: "Tracer Study",
      url: "/dashboard/tracer-study",
      icon: BarChart3,
    },
  ],
};

export function DashboardSidebar({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname();

  return (
    <Sidebar variant="floating" {...props} collapsible="icon">
      <SidebarHeader className="pb-6">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild tooltip="SIAKAD">
              <Link href="/dashboard">
                <div className="bg-primary text-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                  <Command className="size-4" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">SIAKAD</span>
                  <span className="truncate text-xs">
                    Sistem Informasi Akademik
                  </span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <Separator />
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain contents={data.navMain} pathname={pathname} />
        <NavMain
          contents={data.navContents}
          label="Management Akademik"
          pathname={pathname}
        />
        <NavMain
          contents={[data.settings]}
          label="Sistem"
          pathname={pathname}
        />
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
