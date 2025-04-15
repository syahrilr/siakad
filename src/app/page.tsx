import { CallToAction } from "@/components/globals/call-to-action";
import { Features } from "@/components/globals/features";
import { Footer } from "@/components/globals/footer";
import { HeroCarousel } from "@/components/globals/hero-section";
import { Navbar } from "@/components/globals/navbar";
import { Testimonials } from "@/components/globals/testimonials";


export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <HeroCarousel />
        <Features />
        <Testimonials />
        <CallToAction />
      </main>
      <Footer />
    </div>
  )
}
