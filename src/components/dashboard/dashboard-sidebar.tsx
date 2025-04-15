"use client";

import Link from "next/link";
import * as React from "react";

import {
  BarChart3,
  Book,
  BookOpen,
  Bot,
  Calendar,
  CheckCircle,
  ClipboardList,
  Command,
  CreditCard,
  FileText,
  Frame,
  GraduationCap,
  Laptop,
  LayoutDashboard,
  LifeBuoy,
  Map,
  PieChart,
  Send,
  Settings,
  Settings2,
  SquareTerminal,
  icons,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

import { NavMain } from "./nav-main";
import { NavUser } from "./nav-user";

const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: LayoutDashboard,
    },
  ],
  settings: {
    title: "Settings",
    url: "/settings",
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
  return (
    <Sidebar variant="floating" {...props} collapsible="icon">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href="#">
                <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
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
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain contents={data.navMain} />
        <NavMain contents={data.navContents} label="Management Akademik" />
        <NavMain contents={[data.settings]} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  );
}
