"use client";

import { useState } from "react";

import {
  ArrowRight,
  Calendar,
  CreditCard,
  Download,
  FileText,
  Filter,
  History,
  LayoutDashboard,
  Plus,
  Receipt,
  Wallet,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { PaymentChart } from "./payment-chart";

export function PembayaranPage() {
  const [activeTab, setActiveTab] = useState("overview");

  // Dummy data for the dashboard
  const ringkasanData = {
    totalTagihan: 12500000,
    sudahDibayar: 7500000,
    sisaPembayaran: 5000000,
    jatuhTempo: "15 Mei 2024",
    semester: "Genap 2023/2024",
  };

  const tagihanTerbaru = [
    {
      id: "INV-001",
      nama: "SPP Semester Genap 2023/2024",
      jumlah: 5000000,
      status: "belum-bayar",
      jatuhTempo: "15 Mei 2024",
    },
    {
      id: "INV-002",
      nama: "Praktikum Semester Genap",
      jumlah: 1500000,
      status: "belum-bayar",
      jatuhTempo: "20 Mei 2024",
    },
  ];

  const riwayatPembayaran = [
    {
      id: "TRX-001",
      nama: "SPP Semester Ganjil 2023/2024",
      jumlah: 5000000,
      tanggal: "10 September 2023",
      metode: "Bank Transfer",
      status: "sukses",
    },
    {
      id: "TRX-002",
      nama: "Praktikum Semester Ganjil",
      jumlah: 1500000,
      tanggal: "15 September 2023",
      metode: "QRIS",
      status: "sukses",
    },
    {
      id: "TRX-003",
      nama: "Biaya Ujian Tengah Semester",
      jumlah: 500000,
      tanggal: "20 Oktober 2023",
      metode: "Bank Transfer",
      status: "sukses",
    },
    {
      id: "TRX-004",
      nama: "Biaya Ujian Akhir Semester",
      jumlah: 500000,
      tanggal: "15 Desember 2023",
      metode: "Virtual Account",
      status: "sukses",
    },
  ];

  return (
    <div className="container mx-auto mt-10 space-y-8">
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Pembayaran</h2>
          <p className="text-muted-foreground">
            Kelola pembayaran dan keuangan Anda
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Filter className="mr-2 h-4 w-4" />
            Filter
          </Button>
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" />
            Unduh Laporan
          </Button>
          <Button size="sm">
            <Plus className="mr-2 h-4 w-4" />
            Bayar Tagihan
          </Button>
        </div>
      </div>

      <Tabs
        defaultValue="overview"
        value={activeTab}
        onValueChange={setActiveTab}
        className="space-y-4"
      >
        <TabsList>
          <TabsTrigger value="overview" className="gap-2">
            <LayoutDashboard className="size-4" />
            <span className="hidden sm:inline">Ringkasan</span>
          </TabsTrigger>
          <TabsTrigger value="tagihan" className="gap-2">
            <Receipt className="size-4" />
            <span className="hidden sm:inline">Tagihan</span>
          </TabsTrigger>
          <TabsTrigger value="riwayat" className="gap-2">
            <History className="size-4" />
            <span className="hidden sm:inline">Riwayat Pembayaran</span>
          </TabsTrigger>
          <TabsTrigger value="metode" className="gap-2">
            <CreditCard className="size-4" />
            <span className="hidden sm:inline">Metode Pembayaran</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Tagihan
                </CardTitle>
                <Wallet className="text-primary h-4 w-4" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {new Intl.NumberFormat("id-ID", {
                    style: "currency",
                    currency: "IDR",
                  }).format(ringkasanData.totalTagihan)}
                </div>
                <p className="text-muted-foreground text-xs">
                  Semester {ringkasanData.semester}
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Sudah Dibayar
                </CardTitle>
                <Receipt className="h-4 w-4 text-green-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {new Intl.NumberFormat("id-ID", {
                    style: "currency",
                    currency: "IDR",
                  }).format(ringkasanData.sudahDibayar)}
                </div>
                <p className="text-muted-foreground text-xs">
                  {Math.round(
                    (ringkasanData.sudahDibayar / ringkasanData.totalTagihan) *
                      100
                  )}
                  % dari total
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Sisa Pembayaran
                </CardTitle>
                <CreditCard className="h-4 w-4 text-orange-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {new Intl.NumberFormat("id-ID", {
                    style: "currency",
                    currency: "IDR",
                  }).format(ringkasanData.sisaPembayaran)}
                </div>
                <p className="text-muted-foreground text-xs">
                  Jatuh tempo {ringkasanData.jatuhTempo}
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Semester Aktif
                </CardTitle>
                <Calendar className="h-4 w-4 text-blue-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {ringkasanData.semester}
                </div>
                <p className="text-muted-foreground text-xs">
                  Tahun Akademik 2023/2024
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 md:grid-cols-7">
            <Card className="md:col-span-4">
              <CardHeader>
                <CardTitle>Ringkasan Pembayaran</CardTitle>
                <CardDescription>
                  Distribusi pembayaran semester ini
                </CardDescription>
              </CardHeader>
              <CardContent className="pl-2">
                <PaymentChart />
              </CardContent>
            </Card>
            <Card className="md:col-span-3">
              <CardHeader>
                <CardTitle>Tagihan Terbaru</CardTitle>
                <CardDescription>Tagihan yang perlu dibayar</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {tagihanTerbaru.map((tagihan) => (
                    <div key={tagihan.id} className="flex items-center">
                      <div className="bg-primary/10 mr-4 rounded-full p-2">
                        <FileText className="text-primary h-4 w-4" />
                      </div>
                      <div className="flex-1 space-y-1">
                        <p className="text-sm leading-none font-medium">
                          {tagihan.nama}
                        </p>
                        <p className="text-muted-foreground text-xs">
                          Jatuh tempo {tagihan.jatuhTempo}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium">
                          {new Intl.NumberFormat("id-ID", {
                            style: "currency",
                            currency: "IDR",
                          }).format(tagihan.jumlah)}
                        </p>
                        <p
                          className={`text-xs ${
                            tagihan.status === "belum-bayar"
                              ? "text-orange-500"
                              : "text-green-500"
                          }`}
                        >
                          {tagihan.status === "belum-bayar"
                            ? "Belum Bayar"
                            : "Lunas"}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Button
                  variant="ghost"
                  className="w-full"
                  onClick={() => {
                    setActiveTab("tagihan");
                  }}
                >
                  Lihat Semua Tagihan
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
          </div>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Riwayat Pembayaran Terakhir</CardTitle>
                <CardDescription>
                  Transaksi pembayaran yang telah dilakukan
                </CardDescription>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setActiveTab("riwayat");
                }}
              >
                <History className="mr-2 h-4 w-4" />
                Lihat Semua
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {riwayatPembayaran.slice(0, 3).map((pembayaran) => (
                  <div key={pembayaran.id} className="flex items-center">
                    <div
                      className={`mr-4 rounded-full p-2 ${
                        pembayaran.status === "sukses"
                          ? "bg-green-100 dark:bg-green-900/20"
                          : "bg-orange-100"
                      }`}
                    >
                      <Receipt
                        className={`h-4 w-4 ${pembayaran.status === "sukses" ? "text-green-500" : "text-orange-500"}`}
                      />
                    </div>
                    <div className="flex-1 space-y-1">
                      <p className="text-sm leading-none font-medium">
                        {pembayaran.nama}
                      </p>
                      <p className="text-muted-foreground text-xs">
                        {pembayaran.tanggal} • {pembayaran.metode}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium">
                        {new Intl.NumberFormat("id-ID", {
                          style: "currency",
                          currency: "IDR",
                        }).format(pembayaran.jumlah)}
                      </p>
                      <p
                        className={`text-xs ${pembayaran.status === "sukses" ? "text-green-500" : "text-orange-500"}`}
                      >
                        {pembayaran.status === "sukses"
                          ? "Berhasil"
                          : "Pending"}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="tagihan">
          <Card>
            <CardHeader>
              <CardTitle>Daftar Tagihan</CardTitle>
              <CardDescription>
                Tagihan yang perlu dibayar semester ini
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {tagihanTerbaru.map((tagihan) => (
                  <div
                    key={tagihan.id}
                    className="flex items-center justify-between border-b pb-4"
                  >
                    <div className="flex items-center">
                      <div className="bg-primary/10 mr-4 rounded-full p-2">
                        <FileText className="text-primary h-4 w-4" />
                      </div>
                      <div>
                        <h4 className="font-medium">{tagihan.nama}</h4>
                        <p className="text-muted-foreground text-sm">
                          ID: {tagihan.id}
                        </p>
                        <p className="text-muted-foreground text-sm">
                          Jatuh tempo: {tagihan.jatuhTempo}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold">
                        {new Intl.NumberFormat("id-ID", {
                          style: "currency",
                          currency: "IDR",
                        }).format(tagihan.jumlah)}
                      </p>
                      <Button size="sm" className="mt-2">
                        Bayar Sekarang
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <div className="flex w-full items-center justify-between">
                <p className="text-muted-foreground text-sm">
                  Total tagihan: {tagihanTerbaru.length} item
                </p>
                <p className="font-bold">
                  Total:{" "}
                  {new Intl.NumberFormat("id-ID", {
                    style: "currency",
                    currency: "IDR",
                  }).format(
                    tagihanTerbaru.reduce((acc, item) => acc + item.jumlah, 0)
                  )}
                </p>
              </div>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="riwayat">
          <Card>
            <CardHeader>
              <CardTitle>Riwayat Pembayaran</CardTitle>
              <CardDescription>
                Transaksi pembayaran yang telah dilakukan
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {riwayatPembayaran.map((pembayaran) => (
                  <div
                    key={pembayaran.id}
                    className="flex items-center justify-between border-b pb-4"
                  >
                    <div className="flex items-center">
                      <div
                        className={`mr-4 rounded-full p-2 ${
                          pembayaran.status === "sukses"
                            ? "bg-green-100 dark:bg-green-900/20"
                            : "bg-orange-100"
                        }`}
                      >
                        <Receipt
                          className={`h-4 w-4 ${pembayaran.status === "sukses" ? "text-green-500" : "text-orange-500"}`}
                        />
                      </div>
                      <div>
                        <h4 className="font-medium">{pembayaran.nama}</h4>
                        <p className="text-muted-foreground text-sm">
                          ID: {pembayaran.id}
                        </p>
                        <p className="text-muted-foreground text-sm">
                          Tanggal: {pembayaran.tanggal} • Metode:{" "}
                          {pembayaran.metode}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold">
                        {new Intl.NumberFormat("id-ID", {
                          style: "currency",
                          currency: "IDR",
                        }).format(pembayaran.jumlah)}
                      </p>
                      <p
                        className={`text-sm ${pembayaran.status === "sukses" ? "text-green-500" : "text-orange-500"}`}
                      >
                        {pembayaran.status === "sukses"
                          ? "Berhasil"
                          : "Pending"}
                      </p>
                      <Button variant="outline" size="sm" className="mt-2">
                        <Receipt className="mr-2 h-4 w-4" />
                        Lihat Kwitansi
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <div className="flex w-full items-center justify-between">
                <p className="text-muted-foreground text-sm">
                  Total transaksi: {riwayatPembayaran.length} item
                </p>
                <Button variant="outline" size="sm">
                  <Download className="mr-2 h-4 w-4" />
                  Unduh Laporan
                </Button>
              </div>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="metode">
          <Card>
            <CardHeader>
              <CardTitle>Metode Pembayaran</CardTitle>
              <CardDescription>Kelola metode pembayaran Anda</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">Bank BNI</CardTitle>
                    <CardDescription>Virtual Account</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground text-sm">
                      <span className="font-medium">Nomor VA:</span> 8888 1234
                      5678 9012
                    </p>
                    <p className="text-muted-foreground text-sm">
                      <span className="font-medium">Atas Nama:</span> Ahmad
                      Fauzi
                    </p>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" size="sm" className="w-full">
                      Salin Nomor VA
                    </Button>
                  </CardFooter>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">QRIS</CardTitle>
                    <CardDescription>Scan untuk pembayaran</CardDescription>
                  </CardHeader>
                  <CardContent className="flex justify-center">
                    <div className="bg-muted aspect-square h-32 w-32 rounded-lg"></div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" size="sm" className="w-full">
                      Unduh QRIS
                    </Button>
                  </CardFooter>
                </Card>
                <Card className="border-dashed">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">
                      Tambah Metode Baru
                    </CardTitle>
                    <CardDescription>
                      Tambahkan metode pembayaran lainnya
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="flex h-32 items-center justify-center">
                    <Button variant="outline">
                      <Plus className="mr-2 h-4 w-4" />
                      Tambah Metode Pembayaran
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
