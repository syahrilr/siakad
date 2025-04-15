"use client";

import { useState } from "react";

import { CalendarIcon, Download, Filter, Receipt, Search } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";

export function PaymentHistory() {
  const [date, setDate] = useState<Date>();

  // Dummy data for riwayat pembayaran
  const riwayatPembayaran = [
    {
      id: "TRX-001",
      nama: "SPP Semester Ganjil 2023/2024",
      kategori: "SPP",
      jumlah: 5000000,
      tanggal: "10 September 2023",
      metode: "Bank Transfer",
      status: "sukses",
    },
    {
      id: "TRX-002",
      nama: "Praktikum Semester Ganjil",
      kategori: "Praktikum",
      jumlah: 1500000,
      tanggal: "15 September 2023",
      metode: "QRIS",
      status: "sukses",
    },
    {
      id: "TRX-003",
      nama: "Biaya Ujian Tengah Semester",
      kategori: "UTS",
      jumlah: 500000,
      tanggal: "20 Oktober 2023",
      metode: "Bank Transfer",
      status: "sukses",
    },
    {
      id: "TRX-004",
      nama: "Biaya Ujian Akhir Semester",
      kategori: "UAS",
      jumlah: 500000,
      tanggal: "15 Desember 2023",
      metode: "Virtual Account",
      status: "sukses",
    },
    {
      id: "TRX-005",
      nama: "Biaya Kegiatan Mahasiswa",
      kategori: "Lainnya",
      jumlah: 250000,
      tanggal: "5 Oktober 2023",
      metode: "E-Wallet",
      status: "sukses",
    },
    {
      id: "TRX-006",
      nama: "Biaya Perpustakaan",
      kategori: "Lainnya",
      jumlah: 100000,
      tanggal: "8 November 2023",
      metode: "QRIS",
      status: "sukses",
    },
  ];

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
          <div>
            <CardTitle>Riwayat Pembayaran</CardTitle>
            <CardDescription>
              Transaksi pembayaran yang telah dilakukan
            </CardDescription>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <div className="relative w-full md:w-auto">
              <Search className="text-muted-foreground absolute top-2.5 left-2.5 h-4 w-4" />
              <Input
                type="search"
                placeholder="Cari transaksi..."
                className="w-full rounded-lg pl-8 md:w-[200px] lg:w-[300px]"
              />
            </div>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" size="sm" className="h-9 gap-1">
                  <Filter className="h-4 w-4" />
                  <span className="hidden sm:inline">Filter</span>
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-[200px] p-4">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="status">Status</Label>
                    <Select defaultValue="all">
                      <SelectTrigger id="status">
                        <SelectValue placeholder="Pilih status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Semua</SelectItem>
                        <SelectItem value="sukses">Sukses</SelectItem>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="gagal">Gagal</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="metode">Metode Pembayaran</Label>
                    <Select defaultValue="all">
                      <SelectTrigger id="metode">
                        <SelectValue placeholder="Pilih metode" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Semua</SelectItem>
                        <SelectItem value="transfer">Bank Transfer</SelectItem>
                        <SelectItem value="va">Virtual Account</SelectItem>
                        <SelectItem value="qris">QRIS</SelectItem>
                        <SelectItem value="ewallet">E-Wallet</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="date">Tanggal</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          id="date"
                          variant={"outline"}
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !date && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {date ? date.toLocaleDateString() : "Pilih tanggal"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={date}
                          onSelect={setDate}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                  <Button className="w-full">Terapkan Filter</Button>
                </div>
              </PopoverContent>
            </Popover>
            <Button variant="outline" size="sm" className="h-9 gap-1">
              <Download className="h-4 w-4" />
              <span className="hidden sm:inline">Ekspor</span>
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID Transaksi</TableHead>
              <TableHead>Nama Pembayaran</TableHead>
              <TableHead>Kategori</TableHead>
              <TableHead>Jumlah</TableHead>
              <TableHead>Tanggal</TableHead>
              <TableHead>Metode</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {riwayatPembayaran.map((pembayaran) => (
              <TableRow key={pembayaran.id}>
                <TableCell className="font-medium">{pembayaran.id}</TableCell>
                <TableCell>{pembayaran.nama}</TableCell>
                <TableCell>{pembayaran.kategori}</TableCell>
                <TableCell>
                  {new Intl.NumberFormat("id-ID", {
                    style: "currency",
                    currency: "IDR",
                  }).format(pembayaran.jumlah)}
                </TableCell>
                <TableCell>{pembayaran.tanggal}</TableCell>
                <TableCell>{pembayaran.metode}</TableCell>
                <TableCell>
                  <div
                    className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                      pembayaran.status === "sukses"
                        ? "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300"
                        : pembayaran.status === "pending"
                          ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300"
                          : "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300"
                    }`}
                  >
                    {pembayaran.status === "sukses"
                      ? "Berhasil"
                      : pembayaran.status === "pending"
                        ? "Pending"
                        : "Gagal"}
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <Button variant="outline" size="sm">
                    <Receipt className="mr-2 h-4 w-4" />
                    Kwitansi
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
