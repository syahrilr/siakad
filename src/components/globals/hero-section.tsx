"use client";

import Image from "next/image";
import Link from "next/link";
import * as React from "react";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import { Button } from "@/components/ui/button";

const carouselItems = [
  {
    title: "Sistem Informasi Akademik Terpadu",
    description:
      "Kelola aktivitas akademik dengan mudah melalui platform digital yang terintegrasi untuk mahasiswa, dosen, dan staf.",
    image:
      "https://images.pexels.com/photos/270348/pexels-photo-270348.jpeg?auto=compress&cs=tinysrgb&w=600",
    cta: { text: "Masuk Sekarang", href: "/login" },
  },
  {
    title: "Akses Informasi Akademik Kapan Saja",
    description:
      "Lihat jadwal kuliah, nilai, dan transkrip akademik dari mana saja dan kapan saja dengan akses yang aman.",
    image:
      "https://images.pexels.com/photos/270408/pexels-photo-270408.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    cta: { text: "Lihat Fitur", href: "#features" },
  },
  {
    title: "Dipercaya oleh Institusi Pendidikan Terkemuka",
    description:
      "Bergabung dengan ribuan mahasiswa dan dosen yang telah menggunakan SIAKAD untuk meningkatkan efisiensi akademik.",
    image:
      "https://images.pexels.com/photos/136320/pexels-photo-136320.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    cta: { text: "Lihat Testimoni", href: "#testimonials" },
  },
];

export function HeroCarousel() {
  const navigationPrevRef = React.useRef<HTMLButtonElement>(null);
  const navigationNextRef = React.useRef<HTMLButtonElement>(null);

  return (
    <section className="relative w-full overflow-hidden">
      <Swiper
        modules={[Autoplay, Navigation, Pagination]}
        navigation={{
          prevEl: navigationPrevRef.current,
          nextEl: navigationNextRef.current,
        }}
        pagination={{ clickable: true }}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        loop={true}
        onBeforeInit={(swiper) => {
          if (
            swiper.params.navigation &&
            typeof swiper.params.navigation !== "boolean"
          ) {
            swiper.params.navigation.prevEl = navigationPrevRef.current;
            swiper.params.navigation.nextEl = navigationNextRef.current;
          }
        }}
        className="h-[600px] md:h-[700px]"
      >
        {carouselItems.map((item, index) => (
          <SwiperSlide key={index} className="relative">
            <div className="absolute inset-0 z-10 bg-black/40" />
            <Image
              src={item.image || "/placeholder.svg"}
              alt={item.title}
              fill
              className="object-cover"
              priority={index === 0}
            />
            <div className="absolute inset-0 z-20 flex items-center justify-center">
              <div className="container px-4 md:px-6">
                <div className="mx-auto max-w-3xl text-center">
                  <h1 className="mb-6 text-3xl font-bold tracking-tighter text-white sm:text-4xl md:text-5xl/tight">
                    {item.title}
                  </h1>
                  <p className="mb-8 text-lg text-white/90 md:text-xl">
                    {item.description}
                  </p>
                  <Button size="lg" asChild>
                    <Link href={item.cta.href}>{item.cta.text}</Link>
                  </Button>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
