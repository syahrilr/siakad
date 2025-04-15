import type React from "react";

import { GraduationCap } from "lucide-react";

import { cn } from "@/lib/utils";

interface DashboardHeaderProps {
  heading: string;
  text?: string;
  semester?: string;
  children?: React.ReactNode;
  className?: string;
}

export function DashboardHeader({
  heading,
  text,
  semester,
  children,
  className,
}: DashboardHeaderProps) {
  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="space-y-1">
          <h1 className="font-heading text-3xl font-bold tracking-tight md:text-4xl">
            {heading}
          </h1>
          {text && <p className="text-muted-foreground text-lg">{text}</p>}
        </div>
        {children}
      </div>
      {semester && (
        <div className="text-primary flex items-center gap-2">
          <GraduationCap className="h-5 w-5" />
          <span className="font-medium">{semester}</span>
        </div>
      )}
    </div>
  );
}
