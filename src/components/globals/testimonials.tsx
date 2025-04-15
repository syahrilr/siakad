"use client";

import Image from "next/image";

import "swiper/css";
import "swiper/css/pagination";
import { Autoplay, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import { Card, CardContent, CardHeader } from "@/components/ui/card";

const testimonials = [
  {
    quote:
      "SIAKAD sangat membantu saya dalam memantau perkembangan akademik mahasiswa. Fitur-fiturnya intuitif dan dukungan teknisnya luar biasa.",
    author: "Dr. Budi Santoso",
    role: "Dosen Fakultas Teknik",
    avatar:
      "https://images.pexels.com/photos/678783/pexels-photo-678783.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    quote:
      "Sejak menggunakan SIAKAD, efisiensi pengisian KRS dan akses nilai menjadi jauh lebih cepat. Sangat membantu aktivitas perkuliahan saya.",
    author: "Anita Wijaya",
    role: "Mahasiswa Semester 5",
    avatar:
      "https://images.pexels.com/photos/1499327/pexels-photo-1499327.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    quote:
      "Fitur laporan akademik sangat bermanfaat untuk evaluasi program studi. Kami sekarang memiliki data yang lebih akurat untuk pengambilan keputusan.",
    author: "Prof. Siti Rahayu",
    role: "Ketua Program Studi",
    avatar:
      "https://images.pexels.com/photos/4065187/pexels-photo-4065187.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    quote:
      "SIAKAD memudahkan kami dalam mengelola administrasi akademik. Proses yang dulu memakan waktu berhari-hari kini bisa selesai dalam hitungan jam.",
    author: "Ahmad Fauzi",
    role: "Staf Administrasi Akademik",
    avatar:
      "https://images.pexels.com/photos/573299/pexels-photo-573299.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
];

export function Testimonials() {
  return (
    <section id="testimonials" className="py-24">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mb-16 text-center">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            Dipercaya oleh Civitas Akademika
          </h2>
          <p className="text-muted-foreground mx-auto mt-4 max-w-3xl text-lg">
            Lihat apa yang dikatakan pengguna SIAKAD tentang pengalaman mereka
            menggunakan sistem kami.
          </p>
        </div>
        <Swiper
          modules={[Autoplay, Pagination]}
          pagination={{ clickable: true }}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          breakpoints={{
            640: { slidesPerView: 1, spaceBetween: 20 },
            768: { slidesPerView: 2, spaceBetween: 30 },
            1024: { slidesPerView: 3, spaceBetween: 40 },
          }}
          className="pb-12"
        >
          {testimonials.map((testimonial, index) => (
            <SwiperSlide key={index}>
              <Card className="h-full">
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <div className="relative h-12 w-12 overflow-hidden rounded-full">
                      <Image
                        src={testimonial.avatar || "/placeholder.svg"}
                        alt={testimonial.author}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="font-semibold">{testimonial.author}</h3>
                      <p className="text-muted-foreground text-sm">
                        {testimonial.role}
                      </p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="italic">"{testimonial.quote}"</p>
                </CardContent>
              </Card>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
