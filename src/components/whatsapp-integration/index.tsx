"use client";

import type React from "react";
import { useEffect, useState } from "react";

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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getWhatsAppVerification } from "@/lib/db/whatsapp-db";
import { whatsappCommands } from "@/lib/db/whatsapp-db";

import { WhatsappLogo } from "./whatsapp-logo";

interface WhatsAppIntegrationProps {
  threadId?: string;
  categoryId?: string;
  userId?: string;
}

export function WhatsAppIntegration({
  threadId,
  categoryId,
  userId = "user-3",
}: WhatsAppIntegrationProps) {
  const [open, setOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("setup");
  const [groupLink, setGroupLink] = useState("");
  const [groupName, setGroupName] = useState("");
  const [notifyNewThreads, setNotifyNewThreads] = useState(true);
  const [notifyNewComments, setNotifyNewComments] = useState(true);
  const [notifyMentions, setNotifyMentions] = useState(true);
  const [digestFrequency, setDigestFrequency] = useState<
    "none" | "daily" | "weekly"
  >("none");
  const [digestTime, setDigestTime] = useState("18:00");
  const [digestDay, setDigestDay] = useState<number>(1); // Monday
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [showVerificationInput, setShowVerificationInput] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);

  // Check if user has verified WhatsApp
  useEffect(() => {
    const checkVerification = async () => {
      try {
        const verification = await getWhatsAppVerification(userId);
        if (verification) {
          setIsVerified(verification.isVerified);
          setPhoneNumber(verification.phoneNumber);
        }
      } catch (error) {
        console.error("Error checking verification:", error);
      }
    };

    checkVerification();
  }, [userId]);

  const handleVerifyPhone = async () => {
    if (!phoneNumber) {
      toast.error("Nomor telepon diperlukan", {
        description: "Silakan masukkan nomor telepon WhatsApp Anda",
        richColors: true,
      });
      return;
    }

    setIsVerifying(true);

    try {
      // In a real implementation, this would call the API to send a verification code
      await new Promise((resolve) => setTimeout(resolve, 1500));

      setShowVerificationInput(true);

      toast.success("Kode verifikasi terkirim", {
        description: "Silakan periksa WhatsApp Anda untuk kode verifikasi",
        richColors: true,
      });
    } catch (error) {
      toast.error("Gagal mengirim kode verifikasi", {
        description: "Terjadi kesalahan saat mengirim kode verifikasi",
        richColors: true,
      });
    } finally {
      setIsVerifying(false);
    }
  };

  const handleSubmitVerification = async () => {
    if (!verificationCode) {
      toast.error("Kode verifikasi diperlukan", {
        description:
          "Silakan masukkan kode verifikasi yang dikirim ke WhatsApp Anda",
        richColors: true,
      });
      return;
    }

    setIsVerifying(true);

    try {
      // In a real implementation, this would call the API to verify the code
      await new Promise((resolve) => setTimeout(resolve, 1500));

      setIsVerified(true);
      setShowVerificationInput(false);

      toast.success("Verifikasi berhasil", {
        description: "Nomor WhatsApp Anda telah berhasil diverifikasi",
        richColors: true,
      });
    } catch (error) {
      toast.error("Verifikasi gagal", {
        description: "Kode verifikasi tidak valid atau telah kedaluwarsa",
        richColors: true,
      });
    } finally {
      setIsVerifying(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!groupLink) {
      toast.error("Link grup diperlukan", {
        description: "Silakan masukkan link grup WhatsApp",
        richColors: true,
      });
      return;
    }

    // Validate WhatsApp group link format
    if (!groupLink.includes("chat.whatsapp.com/")) {
      toast.error("Format link tidak valid", {
        description:
          "Masukkan link grup WhatsApp yang valid (https://chat.whatsapp.com/...)",
        richColors: true,
      });
      return;
    }

    if (!groupName) {
      toast.error("Nama grup diperlukan", {
        description: "Silakan masukkan nama grup WhatsApp",
        richColors: true,
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // In a real implementation, this would call an API endpoint to save the integration
      await new Promise((resolve) => setTimeout(resolve, 1500)); // Simulate API call

      // Create the configuration object
      const config = {
        type: threadId ? "thread" : "category",
        targetId: threadId || categoryId,
        groupId: groupLink.split("/").pop() || "",
        groupName,
        groupLink,
        createdBy: userId,
        settings: {
          notifyNewThreads,
          notifyNewComments,
          notifyMentions,
          digestFrequency,
          digestDay: digestFrequency === "weekly" ? digestDay : undefined,
          digestTime: digestFrequency !== "none" ? digestTime : undefined,
        },
      };

      console.log("Saving WhatsApp integration:", config);

      toast.success("Integrasi berhasil", {
        description: threadId
          ? "Diskusi ini akan dihubungkan dengan grup WhatsApp"
          : "Kategori ini akan dihubungkan dengan grup WhatsApp",
        richColors: true,
      });

      setOpen(false);
    } catch (error) {
      toast.error("Gagal menyimpan integrasi", {
        description: "Terjadi kesalahan saat menyimpan integrasi WhatsApp",
        richColors: true,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          <WhatsappLogo className="h-4 w-4 text-green-600" />
          <span>Hubungkan ke WhatsApp</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Integrasi WhatsApp</DialogTitle>
          <DialogDescription>
            Hubungkan {threadId ? "diskusi" : "kategori"} ini dengan grup
            WhatsApp untuk mendapatkan notifikasi secara real-time.
          </DialogDescription>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-4">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="setup">Pengaturan</TabsTrigger>
            <TabsTrigger value="commands">Perintah WhatsApp</TabsTrigger>
          </TabsList>

          <TabsContent value="setup" className="space-y-4 py-4">
            {!isVerified ? (
              <div className="space-y-4">
                <div className="rounded-md bg-amber-50 p-4">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <WhatsappLogo className="h-5 w-5 text-amber-400" />
                    </div>
                    <div className="ml-3">
                      <h3 className="text-sm font-medium text-amber-800">
                        Verifikasi Diperlukan
                      </h3>
                      <div className="mt-2 text-sm text-amber-700">
                        <p>
                          Anda perlu memverifikasi nomor WhatsApp Anda sebelum
                          dapat menggunakan fitur integrasi ini.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone-number">Nomor Telepon WhatsApp</Label>
                  <div className="flex gap-2">
                    <Input
                      id="phone-number"
                      placeholder="+628123456789"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                    />
                    <Button
                      onClick={handleVerifyPhone}
                      disabled={isVerifying || !phoneNumber}
                    >
                      {isVerifying ? "Mengirim..." : "Verifikasi"}
                    </Button>
                  </div>
                  <p className="text-muted-foreground text-xs">
                    Masukkan nomor telepon WhatsApp Anda dengan format
                    internasional
                  </p>
                </div>

                {showVerificationInput && (
                  <div className="space-y-2">
                    <Label htmlFor="verification-code">Kode Verifikasi</Label>
                    <div className="flex gap-2">
                      <Input
                        id="verification-code"
                        placeholder="123456"
                        value={verificationCode}
                        onChange={(e) => setVerificationCode(e.target.value)}
                      />
                      <Button
                        onClick={handleSubmitVerification}
                        disabled={isVerifying || !verificationCode}
                      >
                        {isVerifying ? "Memverifikasi..." : "Kirim"}
                      </Button>
                    </div>
                    <p className="text-muted-foreground text-xs">
                      Masukkan kode 6 digit yang dikirim ke WhatsApp Anda
                    </p>
                  </div>
                )}
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="space-y-4">
                  <div className="grid gap-2">
                    <Label htmlFor="group-name">Nama Grup WhatsApp</Label>
                    <Input
                      id="group-name"
                      placeholder="Diskusi Medscholar"
                      value={groupName}
                      onChange={(e) => setGroupName(e.target.value)}
                    />
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="group-link">Link Grup WhatsApp</Label>
                    <Input
                      id="group-link"
                      placeholder="https://chat.whatsapp.com/..."
                      value={groupLink}
                      onChange={(e) => setGroupLink(e.target.value)}
                    />
                    <p className="text-muted-foreground text-xs">
                      Masukkan link undangan grup WhatsApp yang ingin
                      dihubungkan
                    </p>
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <h3 className="text-sm font-medium">
                      Pengaturan Notifikasi
                    </h3>

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="notify-threads">
                          Notifikasi Diskusi Baru
                        </Label>
                        <p className="text-muted-foreground text-xs">
                          Kirim notifikasi ke grup saat ada diskusi baru
                        </p>
                      </div>
                      <Switch
                        id="notify-threads"
                        checked={notifyNewThreads}
                        onCheckedChange={setNotifyNewThreads}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="notify-comments">
                          Notifikasi Komentar Baru
                        </Label>
                        <p className="text-muted-foreground text-xs">
                          Kirim notifikasi ke grup saat ada komentar baru
                        </p>
                      </div>
                      <Switch
                        id="notify-comments"
                        checked={notifyNewComments}
                        onCheckedChange={setNotifyNewComments}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="notify-mentions">
                          Notifikasi Mention
                        </Label>
                        <p className="text-muted-foreground text-xs">
                          Kirim notifikasi ke grup saat ada yang menyebut nama
                          Anda
                        </p>
                      </div>
                      <Switch
                        id="notify-mentions"
                        checked={notifyMentions}
                        onCheckedChange={setNotifyMentions}
                      />
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <h3 className="text-sm font-medium">
                      Pengaturan Ringkasan
                    </h3>

                    <div className="space-y-2">
                      <Label>Frekuensi Ringkasan</Label>
                      <RadioGroup
                        value={digestFrequency}
                        onValueChange={(value: "none" | "daily" | "weekly") =>
                          setDigestFrequency(value)
                        }
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="none" id="none" />
                          <Label htmlFor="none">Tidak ada</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="daily" id="daily" />
                          <Label htmlFor="daily">Harian</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="weekly" id="weekly" />
                          <Label htmlFor="weekly">Mingguan</Label>
                        </div>
                      </RadioGroup>
                    </div>

                    {digestFrequency === "weekly" && (
                      <div className="space-y-2">
                        <Label htmlFor="digest-day">Hari Ringkasan</Label>
                        <Select
                          value={digestDay.toString()}
                          onValueChange={(value) =>
                            setDigestDay(Number.parseInt(value))
                          }
                        >
                          <SelectTrigger id="digest-day">
                            <SelectValue placeholder="Pilih hari" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="1">Senin</SelectItem>
                            <SelectItem value="2">Selasa</SelectItem>
                            <SelectItem value="3">Rabu</SelectItem>
                            <SelectItem value="4">Kamis</SelectItem>
                            <SelectItem value="5">Jumat</SelectItem>
                            <SelectItem value="6">Sabtu</SelectItem>
                            <SelectItem value="0">Minggu</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    )}

                    {digestFrequency !== "none" && (
                      <div className="space-y-2">
                        <Label htmlFor="digest-time">Waktu Ringkasan</Label>
                        <Input
                          id="digest-time"
                          type="time"
                          value={digestTime}
                          onChange={(e) => setDigestTime(e.target.value)}
                        />
                      </div>
                    )}
                  </div>
                </div>

                <DialogFooter className="mt-6">
                  <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? "Menyimpan..." : "Simpan Integrasi"}
                  </Button>
                </DialogFooter>
              </form>
            )}
          </TabsContent>

          <TabsContent value="commands" className="space-y-4 py-4">
            <div className="bg-muted rounded-md p-4">
              <h3 className="mb-2 text-sm font-medium">Perintah WhatsApp</h3>
              <p className="text-muted-foreground mb-4 text-sm">
                Gunakan perintah berikut di grup WhatsApp untuk berinteraksi
                dengan forum diskusi Medscholar.
              </p>

              <div className="space-y-4">
                {whatsappCommands.map((cmd) => (
                  <div key={cmd.command} className="space-y-1">
                    <p className="font-mono text-sm">{cmd.command}</p>
                    <p className="text-muted-foreground text-xs">
                      {cmd.description}
                    </p>
                    <p className="text-muted-foreground text-xs">
                      Contoh: <span className="font-mono">{cmd.example}</span>
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-md bg-green-50 p-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <WhatsappLogo className="h-5 w-5 text-green-600" />
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-green-800">
                    Tip Penggunaan
                  </h3>
                  <div className="mt-2 text-sm text-green-700">
                    <p>
                      Setelah grup WhatsApp terhubung, Anda dapat mengirim
                      perintah langsung ke grup untuk mendapatkan informasi dari
                      forum diskusi Medscholar tanpa perlu membuka aplikasi.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
