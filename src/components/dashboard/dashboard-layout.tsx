"use client";

import { usePathname } from "next/navigation";
import React, { Suspense, useMemo } from "react";

import { ModeToggle } from "@/components/globals/theme/theme-toggle";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { getThreadById } from "@/lib/data";
import { cn } from "@/lib/utils";

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

    // Check if we're on a thread detail page
    const isThreadDetailPage =
      segments.length >= 3 &&
      segments[0] === "dashboard" &&
      segments[1] === "forum-diskusi" &&
      segments[2].startsWith("thread-");

    // Return array of segments with href and label
    return segments.map((segment, index) => {
      const href = `/${segments.slice(0, index + 1).join("/")}`;

      // Special case for thread detail page - last segment
      if (isThreadDetailPage && index === segments.length - 1) {
        // Get thread title from the thread ID
        const threadId = segment;
        const thread = getThreadById(threadId);

        // Use thread title if available, otherwise fallback to formatted segment
        if (thread) {
          return { href, label: thread.title };
        }
      }

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
        <header
          className={cn(
            "bg-sidebar/80 sticky top-2 z-40 mx-4 flex h-14 shrink-0 items-center justify-between rounded-lg border px-4 shadow-sm backdrop-blur-md",
            pathname.startsWith("/dashboard/e-learning/course") && "hidden"
          )}
        >
          <div className="flex items-center gap-2">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Breadcrumb>
              <BreadcrumbList>
                {breadcrumbs.length > 0 && (
                  <>
                    {/* Render all segments except the last one as links */}
                    {breadcrumbs.slice(0, -1).map((breadcrumb) => (
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
                      <BreadcrumbPage className="max-w-[300px] truncate">
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
            <ModeToggle />
            <UserButton user={user} />
          </div>
        </header>
        <div className="relative z-10 flex flex-1 flex-col gap-4 p-4 pt-0">
          <Suspense>{children}</Suspense>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
