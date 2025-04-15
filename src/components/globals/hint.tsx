"use client";

import * as React from "react";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface HintProps {
  label: string;
  children: React.ReactNode;
  side?: "top" | "bottom" | "left" | "right";
  align?: "start" | "center" | "end";
  variant?: "default" | "delete" | "copy";
  className?: string;
}

export const Hint = ({
  label,
  children,
  side = "top",
  align = "center",
  variant = "default",
  className,
}: HintProps) => {
  const getVariantStyles = () => {
    switch (variant) {
      case "delete":
        return "bg-destructive border-destructive text-white";
      case "copy":
        return "bg-blue-500 border-blue-500 text-blue-600 text-white";
      default:
        return "bg-primary border-primary text-primary-foreground";
    }
  };

  return (
    <TooltipProvider>
      <Tooltip delayDuration={0}>
        <TooltipTrigger asChild>{children}</TooltipTrigger>
        <TooltipContent
          side={side}
          align={align}
          className={`z-50 rounded-md border-[1px] ${getVariantStyles()}, ${className}`}
        >
          <p className="text-xs font-medium">{label}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
