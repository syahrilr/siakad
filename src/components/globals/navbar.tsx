"use client";

import Link from "next/link";
import * as React from "react";

import { GraduationCap, Menu } from "lucide-react";

import { ModeToggle } from "@/components/globals/theme/theme-toggle";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const navigationLinks = [
  { title: "Beranda", href: "/" },
  { title: "Fitur", href: "#features" },
  { title: "Panduan", href: "#guide" },
  { title: "FAQ", href: "#faq" },
  { title: "Kontak", href: "#contact" },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        isScrolled
          ? "bg-background/95 shadow-sm backdrop-blur-md"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
        <Link href="/" className="flex items-center gap-2">
          <GraduationCap className="text-primary h-8 w-8" />
          <span className="text-xl font-bold">SIAKAD</span>
        </Link>
        <div className="hidden items-center gap-4 md:flex">
          <ModeToggle />
          <Button asChild>
            <Link href="/login">Masuk</Link>
          </Button>
        </div>

        {/* Mobile Navigation */}
        <Sheet>
          <div className="flex items-center gap-2 md:hidden">
            <ModeToggle />
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
          </div>
          <SheetContent side="right">
            <div className="flex flex-col gap-6 pt-6">
              <Link href="/" className="flex items-center gap-2">
                <GraduationCap className="text-primary h-8 w-8" />
                <span className="text-xl font-bold">SIAKAD</span>
              </Link>
              <nav className="flex flex-col gap-4">
                {navigationLinks.map((link) => (
                  <Link
                    key={link.title}
                    href={link.href}
                    className="hover:text-primary text-lg font-medium transition-colors"
                  >
                    {link.title}
                  </Link>
                ))}
              </nav>
              <div className="mt-auto flex flex-col gap-2">
                <Button asChild className="w-full">
                  <Link href="/login">Masuk</Link>
                </Button>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
