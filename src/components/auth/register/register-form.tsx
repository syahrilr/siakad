"use client";

import Link from "next/link";
import React, { useState } from "react";

import { BookOpen, KeyRound, Mail, UserRound } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

import AuthLayout from "../auth-layout";

export function RegisterForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"form">) {
  const [fullname, setFullname] = useState("");
  const [nim, setNim] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <AuthLayout
      title="Pendaftaran Akun Baru"
      subtitle="Lengkapi data diri Anda untuk membuat akun baru"
      image="/images/auth-image.svg"
      imageAlt="Student Life"
      imagePosition="right"
    >
      <form className={cn("flex flex-col gap-6", className)} {...props}>
        <div className="grid gap-6">
          {/* Nama Lengkap */}
          <div className="grid gap-2">
            <Label htmlFor="fullname">Nama Lengkap</Label>
            <div className="relative flex items-center gap-2">
              <div className="relative w-full">
                <UserRound className="text-muted-foreground absolute top-3 left-3 h-4 w-4" />
                <Input
                  id="fullname"
                  className="pl-9"
                  placeholder="Masukkan nama lengkap"
                  value={fullname}
                  onChange={(e) => setFullname(e.target.value)}
                  required
                />
              </div>
            </div>
          </div>

          {/* NIM/NIP */}
          <div className="grid gap-2">
            <Label htmlFor="nim">NIM/NIP</Label>
            <div className="relative flex items-center gap-2">
              <div className="relative w-full">
                <BookOpen className="text-muted-foreground absolute top-3 left-3 h-4 w-4" />
                <Input
                  id="nim"
                  className="pl-9"
                  placeholder="Masukkan NIM/NIP"
                  value={nim}
                  onChange={(e) => setNim(e.target.value)}
                  required
                />
              </div>
            </div>
          </div>

          {/* Email */}
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <div className="relative flex items-center gap-2">
              <div className="relative w-full">
                <Mail className="text-muted-foreground absolute top-3 left-3 h-4 w-4" />
                <Input
                  id="email"
                  type="email"
                  className="pl-9"
                  placeholder="nama@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>
          </div>

          {/* Peran */}
          <div className="grid gap-2">
            <Label htmlFor="role">Peran</Label>
            <Select required>
              <SelectTrigger>
                <SelectValue placeholder="Pilih peran" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="mahasiswa">Mahasiswa</SelectItem>
                <SelectItem value="dosen">Dosen</SelectItem>
                <SelectItem value="staff">Staf Akademik</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Password */}
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <div className="relative flex items-center gap-2">
              <div className="relative w-full">
                <KeyRound className="text-muted-foreground absolute top-3 left-3 h-4 w-4" />
                <Input
                  id="password"
                  type="text"
                  className="pl-9"
                  placeholder="Masukkan password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>
          </div>

          <Button type="submit" className="w-full">
            Daftar
          </Button>
        </div>

        <div className="text-center text-sm">
          Sudah memiliki akun?{" "}
          <Link
            href="/login"
            className="font-medium underline underline-offset-4"
          >
            Masuk
          </Link>
        </div>
      </form>
    </AuthLayout>
  );
}
