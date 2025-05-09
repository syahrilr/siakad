"use client";

import { useEffect, useState } from "react";

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
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  getWhatsAppConfigsByUser,
  getWhatsAppVerification,
  whatsappCommands,
} from "@/lib/db/whatsapp-db";
import type { WhatsAppConfig } from "@/lib/types/whatsapp-service";

import { WhatsappLogo } from "./whatsapp-logo";

export function WhatsAppSettings() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isVerified, setIsVerified] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [verificationCode, setVerificationCode] = useState("");
  const [showVerificationInput, setShowVerificationInput] = useState(false);
  const [enableNotifications, setEnableNotifications] = useState(true);
  const [activeTab, setActiveTab] = useState("account");
  const [configurations, setConfigurations] = useState<WhatsAppConfig[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Mock user ID - in a real app, this would come from authentication
  const userId = "user-3";

  // Load user's WhatsApp verification and configurations
  useEffect(() => {
    const loadData = async () => {
      try {
        setIsLoading(true);

        // Get verification status
        const verification = await getWhatsAppVerification(userId);
        if (verification) {
          setIsVerified(verification.isVerified);
          setPhoneNumber(verification.phoneNumber);
        }

        // Get configurations
        const configs = await getWhatsAppConfigsByUser(userId);
        setConfigurations(configs);
      } catch (error) {
        console.error("Error loading WhatsApp data:", error);
        toast.error("Gagal memuat data", {
          description: "Terjadi kesalahan saat memuat data WhatsApp",
          richColors: true,
        });
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
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
      // In a real implementation, this would call an API to send a verification code
      await new Promise((resolve) => setTimeout(resolve, 1500));

      setShowVerificationInput(true);

      toast("Kode verifikasi terkirim", {
        description: "Silakan periksa WhatsApp Anda untuk kode verifikasi",
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
      toast("Kode verifikasi diperlukan", {
        description:
          "Silakan masukkan kode verifikasi yang dikirim ke WhatsApp Anda",
        richColors: true,
      });
      return;
    }

    setIsVerifying(true);

    try {
      // In a real implementation, this would call an API to verify the code
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

  const handleSaveSettings = async () => {
    try {
      // In a real implementation, this would call an API to save the settings
      await new Promise((resolve) => setTimeout(resolve, 1000));

      toast.success("Pengaturan disimpan", {
        description: "Pengaturan WhatsApp Anda telah berhasil disimpan",
      });
    } catch (error) {
      toast.error("Gagal menyimpan pengaturan", {
        description: "Terjadi kesalahan saat menyimpan pengaturan",
        richColors: true,
      });
    }
  };

  const handleDeleteConfig = async (configId: string) => {
    try {
      // In a real implementation, this would call an API to delete the configuration
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Update the local state
      setConfigurations((prev) =>
        prev.filter((config) => config.id !== configId)
      );

      toast.success("Integrasi dihapus", {
        description: "Integrasi WhatsApp telah berhasil dihapus",
        richColors: true,
      });
    } catch (error) {
      toast.error("Gagal menghapus integrasi", {
        description: "Terjadi kesalahan saat menghapus integrasi WhatsApp",
        richColors: true,
      });
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <WhatsappLogo className="h-5 w-5 text-green-600" />
          <CardTitle>Integrasi WhatsApp</CardTitle>
        </div>
        <CardDescription>
          Hubungkan akun WhatsApp Anda untuk menerima notifikasi dan
          berinteraksi dengan forum diskusi
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-4">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="account">Akun</TabsTrigger>
            <TabsTrigger value="integrations">Integrasi</TabsTrigger>
            <TabsTrigger value="commands">Perintah</TabsTrigger>
          </TabsList>

          <TabsContent value="account" className="space-y-4 py-4">
            <div className="space-y-4">
              {!isVerified ? (
                <>
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
                </>
              ) : (
                <>
                  <div className="rounded-md bg-green-50 p-4">
                    <div className="flex">
                      <div className="flex-shrink-0">
                        <WhatsappLogo className="h-5 w-5 text-green-600" />
                      </div>
                      <div className="ml-3">
                        <h3 className="text-sm font-medium text-green-800">
                          Nomor WhatsApp Terverifikasi
                        </h3>
                        <div className="mt-2 text-sm text-green-700">
                          <p>
                            Nomor WhatsApp Anda ({phoneNumber}) telah
                            terverifikasi dan siap digunakan untuk integrasi.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="notifications">
                          Notifikasi WhatsApp
                        </Label>
                        <p className="text-muted-foreground text-xs">
                          Terima notifikasi tentang diskusi dan komentar baru
                          melalui WhatsApp
                        </p>
                      </div>
                      <Switch
                        id="notifications"
                        checked={enableNotifications}
                        onCheckedChange={setEnableNotifications}
                      />
                    </div>

                    <Separator />

                    <div className="space-y-2">
                      <Button
                        variant="outline"
                        onClick={() => setIsVerified(false)}
                      >
                        Ubah Nomor WhatsApp
                      </Button>
                    </div>
                  </div>
                </>
              )}
            </div>
          </TabsContent>

          <TabsContent value="integrations" className="space-y-4 py-4">
            {!isVerified ? (
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
                        Anda perlu memverifikasi nomor WhatsApp Anda terlebih
                        dahulu di tab Akun sebelum dapat mengelola integrasi.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ) : isLoading ? (
              <div className="py-8 text-center">
                <p className="text-muted-foreground">Memuat integrasi...</p>
              </div>
            ) : configurations.length === 0 ? (
              <div className="bg-muted rounded-md p-8 text-center">
                <WhatsappLogo className="text-muted-foreground mx-auto mb-4 h-10 w-10" />
                <h3 className="mb-2 text-lg font-medium">
                  Belum Ada Integrasi
                </h3>
                <p className="text-muted-foreground mb-4 text-sm">
                  Anda belum menghubungkan grup WhatsApp dengan forum diskusi
                  Medscholar.
                </p>
                <p className="text-muted-foreground text-sm">
                  Untuk menambahkan integrasi, klik tombol "Hubungkan ke
                  WhatsApp" pada halaman diskusi atau kategori.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                <h3 className="text-sm font-medium">Integrasi Aktif</h3>

                {configurations.map((config) => (
                  <div key={config.id} className="rounded-md border p-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="text-sm font-medium">
                          {config.groupName}
                        </h4>
                        <p className="text-muted-foreground text-xs">
                          {config.type === "thread" ? "Diskusi" : "Kategori"}:{" "}
                          {config.targetId}
                        </p>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-destructive hover:text-destructive/90"
                        onClick={() => handleDeleteConfig(config.id)}
                      >
                        Hapus
                      </Button>
                    </div>

                    <div className="mt-2 text-xs">
                      <p className="text-muted-foreground">Notifikasi:</p>
                      <ul className="mt-1 space-y-1">
                        {config.settings.notifyNewThreads && (
                          <li>✓ Diskusi baru</li>
                        )}
                        {config.settings.notifyNewComments && (
                          <li>✓ Komentar baru</li>
                        )}
                        {config.settings.notifyMentions && <li>✓ Mention</li>}
                        {config.settings.digestFrequency !== "none" && (
                          <li>
                            ✓ Ringkasan{" "}
                            {config.settings.digestFrequency === "daily"
                              ? "harian"
                              : "mingguan"}
                            {config.settings.digestTime &&
                              ` (${config.settings.digestTime})`}
                          </li>
                        )}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
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
          </TabsContent>
        </Tabs>
      </CardContent>
      {isVerified && activeTab === "account" && (
        <CardFooter>
          <Button onClick={handleSaveSettings}>Simpan Pengaturan</Button>
        </CardFooter>
      )}
    </Card>
  );
}
