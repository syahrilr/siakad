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
        <div className="space-y-1.5">
          <h1 className="font-heading text-3xl font-bold tracking-tight md:text-4xl">
            {heading}
          </h1>
          {text && (
            <p className="text-muted-foreground max-w-3xl text-lg">{text}</p>
          )}
        </div>
        {children}
      </div>
      {semester && (
        <div className="text-primary bg-primary/5 flex w-fit items-center gap-2 rounded-full px-3 py-1.5 text-sm font-medium">
          <GraduationCap className="h-4 w-4" />
          <span>{semester}</span>
        </div>
      )}
    </div>
  );
}
