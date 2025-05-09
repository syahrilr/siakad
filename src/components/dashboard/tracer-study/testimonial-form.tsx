import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export function TestimonialForm() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Bagikan Pengalaman Anda</CardTitle>
        <CardDescription>
          Bantu calon mahasiswa dan mahasiswa saat ini dengan berbagi pengalaman
          Anda
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="pekerjaan">Pekerjaan Saat Ini</Label>
              <Input id="pekerjaan" placeholder="Contoh: Software Engineer" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="perusahaan">Perusahaan/Institusi</Label>
              <Input id="perusahaan" placeholder="Contoh: Google Indonesia" />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="testimoni">Testimoni</Label>
            <Textarea
              id="testimoni"
              placeholder="Bagikan pengalaman dan kesan Anda selama kuliah dan bagaimana hal tersebut membantu karir Anda..."
              rows={5}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="foto">Foto Profil</Label>
            <Input id="foto" type="file" />
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full">Kirim Testimoni</Button>
      </CardFooter>
    </Card>
  );
}
