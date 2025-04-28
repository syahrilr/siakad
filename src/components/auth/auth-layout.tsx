import Image from "next/image";
import Link from "next/link";
import type React from "react";

import { GraduationCap } from "lucide-react";

import { cn } from "@/lib/utils";

interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle: string;
  image: string;
  imageAlt: string;
  imagePosition?: "left" | "right";
  showLogo?: boolean;
  className?: string;
}

export default function AuthLayout({
  children,
  title,
  subtitle,
  image,
  imageAlt,
  imagePosition = "left",
  showLogo = true,
  className,
}: AuthLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col md:flex-row">
      {/* Image Section - Hidden on mobile */}
      <div
        className={cn(
          "bg-muted relative hidden h-screen md:flex md:w-1/2",
          imagePosition === "right" && "md:order-last"
        )}
      >
        <Image
          src={image || "/placeholder.svg"}
          alt={imageAlt}
          fill
          className="object-cover object-center"
          priority
          quality={100}
        />
        <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-gray-900/80 to-gray-900/30 p-10">
          <div className="max-w-md space-y-4 text-white">
            <GraduationCap className="h-10 w-10 text-white/90" />
            <h2 className="text-4xl font-bold tracking-tight">SIAKAD</h2>
            <p className="text-lg leading-relaxed text-white/85">
              Sistem Informasi Akademik terpadu untuk mahasiswa, dosen, dan staf
              akademik.
            </p>
          </div>
        </div>
      </div>

      {/* Form Section */}
      <div
        className={cn(
          "flex w-full flex-col items-center justify-center p-6 md:w-1/2 md:p-10 lg:p-16",
          className
        )}
      >
        <div className="w-full max-w-md">
          {showLogo && (
            <Link href="/" className="mb-8 flex items-center gap-2">
              <div className="bg-primary text-primary-foreground rounded-full p-1.5">
                <GraduationCap className="h-5 w-5" />
              </div>
              <span className="from-primary bg-gradient-to-r to-blue-600 bg-clip-text text-xl font-bold text-transparent">
                SIAKAD
              </span>
            </Link>
          )}

          <div className="mb-8">
            <h1 className="mb-2 text-2xl font-bold tracking-tight md:text-3xl">
              {title}
            </h1>
            <p className="text-muted-foreground">{subtitle}</p>
          </div>

          {children}
        </div>
      </div>
    </div>
  );
}
