import Link from "next/link";
import type React from "react";

import { KeyRound, UserRound } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

import AuthLayout from "../auth-layout";

export function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"form">) {
  return (
    <AuthLayout
      title="Masuk ke Akun"
      subtitle="Masukkan email dan password untuk mengakses akun Anda"
      image="https://images.pexels.com/photos/10643470/pexels-photo-10643470.jpeg?auto=compress&cs=tinysrgb&w=600"
      imageAlt="Campus Life"
    >
      <form className={cn("flex flex-col gap-6", className)} {...props}>
        <div className="grid gap-6">
          <div className="grid gap-2">
            <Label htmlFor="username">NIM/NIP</Label>
            <div className="relative">
              <UserRound className="text-muted-foreground absolute top-3 left-3 h-4 w-4" />
              <Input
                id="username"
                className="pl-9"
                placeholder="Masukkan NIM/NIP"
                required
              />
            </div>
          </div>
          <div className="grid gap-2">
            <div className="flex items-center">
              <Label htmlFor="password">Password</Label>
              <Link
                href="/forgot-password"
                className="ml-auto text-sm underline-offset-4 hover:underline"
              >
                Lupa password?
              </Link>
            </div>
            <div className="relative">
              <KeyRound className="text-muted-foreground absolute top-3 left-3 h-4 w-4" />
              <Input id="password" type="password" className="pl-9" required />
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="remember" />
            <Label htmlFor="remember" className="text-sm font-normal">
              Ingat saya
            </Label>
          </div>
          <Button type="submit" className="w-full">
            Masuk
          </Button>
        </div>
        <div className="text-center text-sm">
          Belum memiliki akun?{" "}
          <Link
            href="/register"
            className="font-medium underline underline-offset-4"
          >
            Daftar
          </Link>
        </div>
      </form>
    </AuthLayout>
  );
}
