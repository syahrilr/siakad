"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

import {
  BookOpen,
  Calendar,
  ChevronDown,
  ChevronRight,
  Clock,
  FileText,
  GraduationCap,
  LayoutDashboard,
  Menu,
  Settings,
  User,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

// Define RouteItem interface for type safety
interface RouteItem {
  title: string;
  href: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
}

// Define Route interface
interface Route {
  title: string;
  href?: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  variant?: string;
  items?: RouteItem[];
}

interface SidebarProps {
  className?: string;
}

export function Sidebar({ className }: SidebarProps) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [openGroups, setOpenGroups] = useState<Record<string, boolean>>({
    akademik: true,
  });

  const toggleGroup = (group: string) => {
    setOpenGroups((prev) => ({
      ...prev,
      [group]: !prev[group],
    }));
  };

  const routes: Route[] = [
    {
      title: "Dashboard",
      href: "/dashboard",
      icon: LayoutDashboard,
      variant: "default",
    },
    {
      title: "Akademik",
      icon: GraduationCap,
      variant: "ghost",
      items: [
        {
          title: "KRS",
          href: "/dashboard/krs",
          icon: BookOpen,
        },
        {
          title: "Transkrip",
          href: "/dashboard/transkrip",
          icon: FileText,
        },
        {
          title: "Jadwal",
          href: "/dashboard/jadwal",
          icon: Calendar,
        },
        {
          title: "Presensi",
          href: "/dashboard/presensi",
          icon: Clock,
        },
      ],
    },
    {
      title: "Profil",
      href: "/dashboard/profil",
      icon: User,
      variant: "ghost",
    },
    {
      title: "Pengaturan",
      href: "/dashboard/pengaturan",
      icon: Settings,
      variant: "ghost",
    },
  ];

  return (
    <>
      {/* Mobile Sidebar Trigger */}
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild className="md:hidden">
          <Button variant="outline" size="icon" className="rounded-full">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-72 p-0">
          <div className="border-b px-6 py-4">
            <Link
              href="/"
              className="flex items-center gap-2"
              onClick={() => setIsOpen(false)}
            >
              <div className="bg-primary/10 rounded-md p-1">
                <GraduationCap className="text-primary h-6 w-6" />
              </div>
              <span className="text-xl font-bold">SIAKAD</span>
            </Link>
          </div>
          <ScrollArea className="h-[calc(100vh-5rem)] pb-10">
            <div className="px-3 py-2">
              <MobileSidebarNav
                routes={routes}
                pathname={pathname}
                openGroups={openGroups}
                toggleGroup={toggleGroup}
                setIsOpen={setIsOpen}
              />
            </div>
          </ScrollArea>
        </SheetContent>
      </Sheet>

      {/* Desktop Sidebar */}
      <div
        className={cn(
          "bg-background/80 hidden border-r backdrop-blur-sm md:block",
          className
        )}
      >
        <div className="flex h-full flex-col">
          <div className="border-b px-6 py-4">
            <Link href="/" className="flex items-center gap-2">
              <div className="bg-primary/10 rounded-md p-1">
                <GraduationCap className="text-primary h-6 w-6" />
              </div>
              <span className="text-xl font-bold">SIAKAD</span>
            </Link>
          </div>
          <ScrollArea className="flex-1 py-2">
            <DesktopSidebarNav
              routes={routes}
              pathname={pathname}
              openGroups={openGroups}
              toggleGroup={toggleGroup}
            />
          </ScrollArea>
          <div className="border-t p-4">
            <div className="bg-muted rounded-md p-3">
              <div className="flex items-center gap-3">
                <div className="bg-primary/10 rounded-full p-2">
                  <User className="text-primary h-4 w-4" />
                </div>
                <div className="space-y-1">
                  <p className="text-sm leading-none font-medium">
                    Ahmad Fauzi
                  </p>
                  <p className="text-muted-foreground text-xs">1234567890</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

interface SidebarNavProps {
  routes: Route[];
  pathname: string;
  openGroups: Record<string, boolean>;
  toggleGroup: (group: string) => void;
  setIsOpen?: (open: boolean) => void;
}

function MobileSidebarNav({
  routes,
  pathname,
  openGroups,
  toggleGroup,
  setIsOpen,
}: SidebarNavProps) {
  return (
    <div className="grid gap-1">
      {routes.map((route, i) =>
        route.items ? (
          <Collapsible
            key={i}
            open={openGroups[route.title.toLowerCase()]}
            onOpenChange={() => toggleGroup(route.title.toLowerCase())}
          >
            <CollapsibleTrigger asChild>
              <Button
                variant="ghost"
                className="group hover:bg-muted flex w-full justify-between px-3"
              >
                <div className="flex items-center gap-3">
                  <route.icon className="h-5 w-5" />
                  <span>{route.title}</span>
                </div>
                <div>
                  {openGroups[route.title.toLowerCase()] ? (
                    <ChevronDown className="h-4 w-4" />
                  ) : (
                    <ChevronRight className="h-4 w-4" />
                  )}
                </div>
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent className="mt-1 ml-6 grid gap-1">
              {route.items.map((item: RouteItem, j: number) => (
                <Link
                  key={j}
                  href={item.href}
                  onClick={() => setIsOpen?.(false)}
                  className={cn(
                    "flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors",
                    pathname === item.href
                      ? "bg-primary/10 text-primary font-medium"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  )}
                >
                  <item.icon className="h-4 w-4" />
                  {item.title}
                </Link>
              ))}
            </CollapsibleContent>
          </Collapsible>
        ) : (
          <Link
            key={i}
            href={route.href || "#"}
            onClick={() => setIsOpen?.(false)}
            className={cn(
              "flex items-center gap-3 rounded-md px-3 py-2 transition-colors",
              pathname === route.href
                ? "bg-primary/10 text-primary font-medium"
                : "text-muted-foreground hover:bg-muted hover:text-foreground"
            )}
          >
            <route.icon className="h-5 w-5" />
            {route.title}
          </Link>
        )
      )}
    </div>
  );
}

function DesktopSidebarNav({
  routes,
  pathname,
  openGroups,
  toggleGroup,
}: SidebarNavProps) {
  return (
    <div className="grid gap-1 px-3">
      {routes.map((route, i) =>
        route.items ? (
          <Collapsible
            key={i}
            open={openGroups[route.title.toLowerCase()]}
            onOpenChange={() => toggleGroup(route.title.toLowerCase())}
          >
            <CollapsibleTrigger asChild>
              <Button
                variant="ghost"
                className="group hover:bg-muted flex w-full justify-between px-3"
              >
                <div className="flex items-center gap-3">
                  <route.icon className="h-5 w-5" />
                  <span>{route.title}</span>
                </div>
                <div>
                  {openGroups[route.title.toLowerCase()] ? (
                    <ChevronDown className="h-4 w-4" />
                  ) : (
                    <ChevronRight className="h-4 w-4" />
                  )}
                </div>
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent className="mt-1 ml-6 grid gap-1">
              {route.items.map((item: RouteItem, j: number) => (
                <Link
                  key={j}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors",
                    pathname === item.href
                      ? "bg-primary/10 text-primary font-medium"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  )}
                >
                  <item.icon className="h-4 w-4" />
                  {item.title}
                </Link>
              ))}
            </CollapsibleContent>
          </Collapsible>
        ) : (
          <Link
            key={i}
            href={route.href || "#"}
            className={cn(
              "flex items-center gap-3 rounded-md px-3 py-2 transition-colors",
              pathname === route.href
                ? "bg-primary/10 text-primary font-medium"
                : "text-muted-foreground hover:bg-muted hover:text-foreground"
            )}
          >
            <route.icon className="h-5 w-5" />
            {route.title}
          </Link>
        )
      )}
    </div>
  );
}
