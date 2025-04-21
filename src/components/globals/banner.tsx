import type React from "react";

import { cn } from "@/lib/utils";

interface BannerProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  subtitle?: string;
  image?: string;
  gradient?:
    | "blue"
    | "purple"
    | "green"
    | "orange"
    | "red"
    | "teal"
    | "pink"
    | "yellow"
    | "gray";
  alignment?: "left" | "center" | "right";
  size?: "sm" | "md" | "lg";
}

export function Banner({
  title,
  subtitle,
  image,
  gradient = "blue",
  alignment = "left",
  size = "md",
  className,
  children,
  ...props
}: BannerProps) {
  const gradientStyles = {
    blue: "from-primary/80 to-blue-600/80",
    purple: "from-purple-500/80 to-purple-800/80",
    green: "from-green-500/80 to-emerald-700/80",
    orange: "from-orange-500/80 to-red-600/80",
    red: "from-red-500/80 to-rose-700/80",
    teal: "from-teal-400/80 to-cyan-600/80",
    pink: "from-pink-400/80 to-fuchsia-600/80",
    yellow: "from-yellow-400/80 to-amber-600/80",
    gray: "from-gray-600/80 to-gray-900/80",
  };

  const sizeStyles = {
    sm: "py-8 md:py-10",
    md: "py-12 md:py-16",
    lg: "py-16 md:py-24",
  };

  const alignmentStyles = {
    left: "text-left",
    center: "text-center mx-auto",
    right: "text-right ml-auto",
  };

  return (
    <div
      className={cn(
        "relative w-full overflow-hidden",
        sizeStyles[size],
        className
      )}
      {...props}
    >
      {/* Background Image with Overlay */}
      {image && (
        <div className="absolute inset-0 z-0">
          <div
            className={`absolute inset-0 bg-gradient-to-r ${gradientStyles[gradient]} mix-blend-multiply`}
          />
          <img src={image} alt={title} className="h-full w-full object-cover" />
        </div>
      )}

      {/* Gradient Background (if no image) */}
      {!image && (
        <div
          className={`absolute inset-0 bg-gradient-to-r ${gradientStyles[gradient]}`}
        />
      )}

      {/* Content */}
      <div className="relative z-10 container mx-auto">
        <div className={cn("max-w-3xl space-y-4", alignmentStyles[alignment])}>
          <h1 className="text-3xl font-bold text-white md:text-4xl lg:text-5xl">
            {title}
          </h1>
          {subtitle && (
            <p className="text-lg text-white/90 md:text-xl">{subtitle}</p>
          )}
          {children}
        </div>
      </div>
    </div>
  );
}
