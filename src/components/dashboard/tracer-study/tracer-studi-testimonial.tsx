import { TestimonialCard } from "./testimonial-card";
import { TestimonialForm } from "./testimonial-form";

interface TracerStudyTestimonialsProps {
  testimoniAlumni: Array<{
    nama: string;
    angkatan: string;
    pekerjaan: string;
    perusahaan: string;
    testimoni: string;
    foto: string;
  }>;
}

export function TracerStudyTestimonials({
  testimoniAlumni,
}: TracerStudyTestimonialsProps) {
  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {testimoniAlumni.map((alumni, index) => (
          <TestimonialCard key={index} alumni={alumni} />
        ))}
      </div>

      <TestimonialForm />
    </div>
  );
}
