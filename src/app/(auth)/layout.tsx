import Image from "next/image";
import Link from "next/link";
import type React from "react";

import { ArrowLeft, GraduationCap } from "lucide-react";

import { ModeToggle } from "@/components/globals/theme/theme-toggle";
import { Button } from "@/components/ui/button";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="grid min-h-svh xl:grid-cols-2">
      {/* Left Column - Form */}
      <div className="flex flex-col p-6 md:p-10">
        <div className="flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-2 transition-transform hover:scale-105"
          >
            <GraduationCap className="size-8" />
            <span className="text-xl font-bold">SIAKAD</span>
          </Link>
          <div className="flex items-center gap-3">
            <ModeToggle />
          </div>
        </div>

        <div className="mt-8 flex flex-1 items-center justify-center md:mt-12">
          <div className="w-full max-w-md">{children}</div>
        </div>

        <div className="text-muted-foreground mt-8 text-center text-sm">
          © {new Date().getFullYear()} Siakad. All rights reserved.
        </div>
      </div>

      {/* Right Column - Image */}
      <div className="bg-muted relative hidden xl:block">
        <div className="from-primary/30 to-background/10 absolute inset-0 z-10 bg-gradient-to-br" />
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center p-12">
          <div className="max-w-md text-center text-white">
            <h1 className="mb-4 text-4xl font-bold drop-shadow-md">SIAKAD</h1>
            <p className="text-lg opacity-90 drop-shadow-md">
              Sistem Informasi Akademik terpadu untuk mahasiswa, dosen, dan staf
              akademik.
            </p>
          </div>
        </div>
        <Image
          src="https://images.pexels.com/photos/31586033/pexels-photo-31586033/free-photo-of-historic-architecture-at-harrow-school.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load"
          alt="Gedung Universitas"
          fill
          priority
          className="absolute inset-0 h-full w-full object-cover"
        />
      </div>
    </div>
  );
};

export default AuthLayout;
