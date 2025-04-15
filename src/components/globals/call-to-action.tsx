import Link from "next/link";

import { Button } from "@/components/ui/button";

export function CallToAction() {
  return (
    <section className="bg-primary text-primary-foreground py-24">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            Siap Menggunakan SIAKAD?
          </h2>
          <p className="text-primary-foreground/90 mt-4 max-w-2xl text-lg">
            Bergabunglah dengan ribuan mahasiswa dan dosen yang telah merasakan
            kemudahan mengelola aktivitas akademik melalui SIAKAD.
          </p>
          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <Button size="lg" variant="secondary" asChild>
              <Link href="#features">Pelajari Lebih Lanjut</Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="text-primary-foreground border-primary-foreground hover:bg-primary-foreground hover:text-primary bg-transparent"
              asChild
            >
              <Link href="/login">Masuk Sekarang</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
