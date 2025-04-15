import Link from "next/link";

import {
  Facebook,
  GraduationCap,
  Instagram,
  Mail,
  MapPin,
  Phone,
  Twitter,
} from "lucide-react";

import { Button } from "@/components/ui/button";

export function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-200">
      <div className="container mx-auto px-4 py-16 md:px-6">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <GraduationCap className="h-8 w-8" />
              <span className="text-xl font-bold text-white">SIAKAD</span>
            </Link>
            <p className="text-slate-400">
              Sistem Informasi Akademik terpadu untuk pengelolaan data dan
              aktivitas akademik.
            </p>
            <div className="flex space-x-4">
              <Button
                variant="ghost"
                size="icon"
                className="text-slate-400 hover:text-white"
              >
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="text-slate-400 hover:text-white"
              >
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="text-slate-400 hover:text-white"
              >
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </Button>
            </div>
          </div>
          <div>
            <h3 className="mb-4 text-lg font-semibold text-white">
              Tautan Cepat
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/login"
                  className="text-slate-400 transition-colors hover:text-white"
                >
                  Login SIAKAD
                </Link>
              </li>
              <li>
                <Link
                  href="#features"
                  className="text-slate-400 transition-colors hover:text-white"
                >
                  Fitur
                </Link>
              </li>
              <li>
                <Link
                  href="#guide"
                  className="text-slate-400 transition-colors hover:text-white"
                >
                  Panduan Pengguna
                </Link>
              </li>
              <li>
                <Link
                  href="#faq"
                  className="text-slate-400 transition-colors hover:text-white"
                >
                  FAQ
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="mb-4 text-lg font-semibold text-white">Informasi</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/academic-calendar"
                  className="text-slate-400 transition-colors hover:text-white"
                >
                  Kalender Akademik
                </Link>
              </li>
              <li>
                <Link
                  href="/announcements"
                  className="text-slate-400 transition-colors hover:text-white"
                >
                  Pengumuman
                </Link>
              </li>
              <li>
                <Link
                  href="/help"
                  className="text-slate-400 transition-colors hover:text-white"
                >
                  Bantuan
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-slate-400 transition-colors hover:text-white"
                >
                  Kontak
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="mb-4 text-lg font-semibold text-white">Kontak</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <MapPin className="text-primary mt-0.5 h-5 w-5 shrink-0" />
                <span className="text-slate-400">
                  Jl. Kelapa Kompleks PKG, Gowa, Sulawesi Selatan 72321
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="text-primary h-5 w-5 shrink-0" />
                <span className="text-slate-400">(022) 2013163</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="text-primary h-5 w-5 shrink-0" />
                <span className="text-slate-400">siakad@hehe.edu</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-16 border-t border-slate-800 pt-8 text-center text-slate-400">
          <p>© {new Date().getFullYear()} Siakad. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
