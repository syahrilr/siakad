"use client";

import type React from "react";
import { useState } from "react";

import { Flag } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

import { ReportReasonOptions } from "./report-option";

interface ReportDialogProps {
  targetType?: "thread" | "comment" | "user";
  targetId?: string;
  className?: string;
  onSuccess?: () => void;
}

export function ReportDialog({ className, onSuccess }: ReportDialogProps) {
  const [open, setOpen] = useState(false);
  const [reason, setReason] = useState("");
  const [description, setDescription] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!reason) {
      toast.error("Alasan laporan diperlukan", {
        description: "Silakan pilih alasan pelaporan.",
        richColors: true,
      });
      return;
    }

    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      setOpen(false);
      setIsSubmitting(false);
      setReason("");
      setDescription("");

      toast.success("Laporan berhasil dikirim", {
        description:
          "Terima kasih atas laporan Anda. Tim kami akan segera meninjau laporan ini.",
        richColors: true,
      });

      if (onSuccess) {
        onSuccess();
      }
    }, 1000);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="sm" className={className}>
          <Flag className="h-4 w-4" />
          <span className="sr-only">Laporkan</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Laporkan Konten</DialogTitle>
          <DialogDescription>
            Bantu kami menjaga kualitas forum dengan melaporkan konten yang
            tidak sesuai dengan pedoman komunitas.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="reason">Alasan Pelaporan</Label>
              <ReportReasonOptions value={reason} onValueChange={setReason} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Deskripsi</Label>
              <Textarea
                id="description"
                placeholder="Berikan detail tambahan tentang laporan ini"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Mengirim..." : "Kirim Laporan"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
