import Image from "next/image";

import { Briefcase, Building2 } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface TestimonialCardProps {
  alumni: {
    nama: string;
    angkatan: string;
    pekerjaan: string;
    perusahaan: string;
    testimoni: string;
    foto: string;
  };
}

export function TestimonialCard({ alumni }: TestimonialCardProps) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-4">
          <Image
            src={alumni.foto || "/placeholder.svg"}
            alt={alumni.nama}
            width={64}
            height={64}
            className="h-16 w-16 rounded-full object-cover"
          />
          <div>
            <CardTitle className="text-lg">{alumni.nama}</CardTitle>
            <CardDescription>Angkatan {alumni.angkatan}</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Briefcase className="text-primary h-4 w-4" />
            <span className="text-sm">{alumni.pekerjaan}</span>
          </div>
          <div className="flex items-center gap-2">
            <Building2 className="text-primary h-4 w-4" />
            <span className="text-sm">{alumni.perusahaan}</span>
          </div>
          <p className="text-muted-foreground mt-2 text-sm">
            {alumni.testimoni}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
