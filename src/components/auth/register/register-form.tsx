import Link from "next/link";
import type React from "react";

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

export function RegisterForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"form">) {
  return (
    <form className={cn("flex flex-col gap-6", className)} {...props}>
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Pendaftaran Akun SIAKAD</h1>
        <p className="text-muted-foreground text-sm text-balance">
          Lengkapi data berikut untuk membuat akun baru
        </p>
      </div>
      <div className="grid gap-6">
        <div className="grid gap-2">
          <Label htmlFor="fullname">Nama Lengkap</Label>
          <div className="relative">
            <UserRound className="text-muted-foreground absolute top-3 left-3 h-4 w-4" />
            <Input
              id="fullname"
              className="pl-9"
              placeholder="Masukkan nama lengkap"
              required
            />
          </div>
        </div>
        <div className="grid gap-2">
          <Label htmlFor="nim">NIM/NIP</Label>
          <div className="relative">
            <BookOpen className="text-muted-foreground absolute top-3 left-3 h-4 w-4" />
            <Input
              id="nim"
              className="pl-9"
              placeholder="Masukkan NIM/NIP"
              required
            />
          </div>
        </div>
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <div className="relative">
            <Mail className="text-muted-foreground absolute top-3 left-3 h-4 w-4" />
            <Input
              id="email"
              type="email"
              className="pl-9"
              placeholder="nama@example.com"
              required
            />
          </div>
        </div>
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
        <div className="grid gap-2">
          <Label htmlFor="password">Password</Label>
          <div className="relative">
            <KeyRound className="text-muted-foreground absolute top-3 left-3 h-4 w-4" />
            <Input id="password" type="password" className="pl-9" required />
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
  );
}
