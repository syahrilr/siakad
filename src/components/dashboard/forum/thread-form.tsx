"use client";

import { useRouter } from "next/navigation";
import type React from "react";
import { useState } from "react";

import { toast } from "sonner";

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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { WhatsAppIntegration } from "@/components/whatsapp-integration";
import { notifyNewThread } from "@/lib/services/whatsapp-service";

interface ThreadFormProps {
  categories: { value: string; label: string }[];
  onCancel?: () => void;
}

export function ThreadForm({ categories, onCancel }: ThreadFormProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    tags: "",
    content: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSelectChange = (value: string) => {
    setFormData((prev) => ({ ...prev, category: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Validate form
    if (!formData.title || !formData.category || !formData.content) {
      toast.error("Form tidak lengkap", {
        description: "Silakan lengkapi semua field yang diperlukan.",
        richColors: true,
      });
      setIsSubmitting(false);
      return;
    }

    try {
      // Simulate form submission
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Create a mock thread object for the notification
      const mockThread = {
        id: `thread-${Date.now()}`,
        title: formData.title,
        content: formData.content,
        authorId: "user-3", // Assuming current user
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        category: formData.category,
        tags: formData.tags.split(",").map((tag) => tag.trim()),
        viewCount: 0,
        isLocked: false,
        isPinned: false,
      };

      // Send WhatsApp notification if integration exists
      await notifyNewThread(mockThread);

      toast.success("Diskusi berhasil dibuat", {
        description: "Diskusi Anda telah berhasil dipublikasikan.",
        richColors: true,
      });

      router.push("/forum");
    } catch (error) {
      toast.error("Gagal membuat diskusi", {
        description: "Terjadi kesalahan saat membuat diskusi.",
        richColors: true,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Buat Diskusi Baru</CardTitle>
            <CardDescription>
              Bagikan pertanyaan atau pengetahuan Anda dengan komunitas
              Medscholar
            </CardDescription>
          </div>
          <WhatsAppIntegration categoryId={formData.category || undefined} />
        </div>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="title">Judul</Label>
            <Input
              id="title"
              placeholder="Masukkan judul diskusi"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="category">Kategori</Label>
            <Select
              value={formData.category}
              onValueChange={handleSelectChange}
              required
            >
              <SelectTrigger id="category">
                <SelectValue placeholder="Pilih kategori" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category.value} value={category.value}>
                    {category.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="tags">Tag (pisahkan dengan koma)</Label>
            <Input
              id="tags"
              placeholder="Contoh: hipertensi, diabetes, geriatri"
              value={formData.tags}
              onChange={handleChange}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="content">Konten</Label>
            <Textarea
              id="content"
              placeholder="Tulis pertanyaan atau diskusi Anda secara detail"
              className="min-h-[200px]"
              value={formData.content}
              onChange={handleChange}
              required
            />
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button
            type="button"
            variant="outline"
            onClick={onCancel || (() => router.push("/forum"))}
          >
            Batal
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Memproses..." : "Publikasikan"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
