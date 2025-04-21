"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import * as React from "react";

import { GraduationCap, Menu } from "lucide-react";

import { ModeToggle } from "@/components/globals/theme/theme-toggle";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

const navigationLinks = [
  { title: "Beranda", href: "/" },
  { title: "Fitur", href: "#features" },
  { title: "Panduan", href: "#guide" },
  { title: "FAQ", href: "#faq" },
  { title: "Kontak", href: "#contact" },
];

export function Navbar() {
  const pathname = usePathname();
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

        {/* Desktop Navigation */}
        {/* <nav className="hidden items-center gap-6 md:flex">
          {navigationLinks.map((item) => (
            <Link
              key={item.title}
              href={item.href}
              className={`hover:text-primary group relative text-sm font-medium transition-colors ${
                pathname === item.href
                  ? "text-primary"
                  : "text-muted-foreground"
              }`}
            >
              {item.title}
              <span
                className={`bg-primary absolute -bottom-1 left-0 h-0.5 transition-all duration-300 ${
                  pathname === item.href ? "w-full" : "w-0 group-hover:w-full"
                }`}
              ></span>
            </Link>
          ))}
        </nav> */}

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
