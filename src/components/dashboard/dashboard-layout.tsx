"use client";

import { usePathname } from "next/navigation";
import React, { useMemo } from "react";

import { Search } from "lucide-react";

import { ModeToggle } from "@/components/globals/theme/theme-toggle";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";

import { DashboardSidebar } from "./dashboard-sidebar";
import { UserButton } from "./user-button";

const user = {
  name: "shadcn",
  email: "m@example.com",
  avatar: "https://github.com/shadcn.png",
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  // Generate dynamic breadcrumbs based on the current path
  const breadcrumbs = useMemo(() => {
    const segments = pathname.split("/").filter(Boolean);

    // Return array of segments with href and label
    return segments.map((segment, index) => {
      const href = `/${segments.slice(0, index + 1).join("/")}`;
      // Format the segment to be more readable (capitalize, replace hyphens with spaces)
      const label = segment
        .split("-")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");

      return { href, label };
    });
  }, [pathname]);

  return (
    <SidebarProvider>
      <DashboardSidebar />
      <SidebarInset>
        <header className="sticky top-0 z-50 flex h-16 shrink-0 items-center justify-between px-4 backdrop-blur-md">
          <div className="flex items-center gap-2">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Breadcrumb>
              <BreadcrumbList>
                {breadcrumbs.length > 0 && (
                  <>
                    {/* Render all segments except the last one as links */}
                    {breadcrumbs.slice(0, -1).map((breadcrumb, index) => (
                      <React.Fragment key={breadcrumb.href}>
                        <BreadcrumbItem>
                          <BreadcrumbLink href={breadcrumb.href}>
                            {breadcrumb.label}
                          </BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                      </React.Fragment>
                    ))}

                    {/* Render the last segment as the current page */}
                    <BreadcrumbItem>
                      <BreadcrumbPage>
                        {breadcrumbs[breadcrumbs.length - 1]?.label ||
                          "Dashboard"}
                      </BreadcrumbPage>
                    </BreadcrumbItem>
                  </>
                )}
              </BreadcrumbList>
            </Breadcrumb>
          </div>

          {/* Search and Mode Toggle */}
          <div className="flex items-center gap-3">
            <div className="relative hidden w-full max-w-sm items-center md:flex">
              <Search className="text-muted-foreground absolute top-2.5 left-2.5 h-4 w-4" />
              <Input
                type="search"
                placeholder="Search..."
                className="bg-muted w-[200px] rounded-full pl-8 lg:w-[240px]"
              />
            </div>
            <ModeToggle />
            <UserButton user={user} />
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
}
