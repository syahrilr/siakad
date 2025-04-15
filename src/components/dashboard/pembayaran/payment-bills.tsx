"use client";

import { useState } from "react";

import {
  CalendarIcon,
  CreditCard,
  Download,
  Filter,
  Plus,
  Search,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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

export function PaymentBills() {
  const [date, setDate] = useState<Date>();

  // Dummy data for tagihan
  const tagihanData = [
    {
      id: "INV-001",
      nama: "SPP Semester Genap 2023/2024",
      kategori: "SPP",
      jumlah: 5000000,
      status: "belum-bayar",
      jatuhTempo: "15 Mei 2024",
    },
    {
      id: "INV-002",
      nama: "Praktikum Semester Genap",
      kategori: "Praktikum",
      jumlah: 1500000,
      status: "belum-bayar",
      jatuhTempo: "20 Mei 2024",
    },
    {
      id: "INV-003",
      nama: "Biaya Ujian Tengah Semester",
      kategori: "UTS",
      jumlah: 500000,
      status: "belum-bayar",
      jatuhTempo: "10 Juni 2024",
    },
    {
      id: "INV-004",
      nama: "Biaya Ujian Akhir Semester",
      kategori: "UAS",
      jumlah: 500000,
      status: "belum-bayar",
      jatuhTempo: "15 Juli 2024",
    },
    {
      id: "INV-005",
      nama: "Biaya Kegiatan Mahasiswa",
      kategori: "Lainnya",
      jumlah: 250000,
      status: "belum-bayar",
      jatuhTempo: "30 Mei 2024",
    },
  ];

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
          <div>
            <CardTitle>Daftar Tagihan</CardTitle>
            <CardDescription>
              Tagihan yang perlu dibayar semester ini
            </CardDescription>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <div className="relative w-full md:w-auto">
              <Search className="text-muted-foreground absolute top-2.5 left-2.5 h-4 w-4" />
              <Input
                type="search"
                placeholder="Cari tagihan..."
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
                        <SelectItem value="belum-bayar">Belum Bayar</SelectItem>
                        <SelectItem value="lunas">Lunas</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="kategori">Kategori</Label>
                    <Select defaultValue="all">
                      <SelectTrigger id="kategori">
                        <SelectValue placeholder="Pilih kategori" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Semua</SelectItem>
                        <SelectItem value="spp">SPP</SelectItem>
                        <SelectItem value="praktikum">Praktikum</SelectItem>
                        <SelectItem value="uts">UTS</SelectItem>
                        <SelectItem value="uas">UAS</SelectItem>
                        <SelectItem value="lainnya">Lainnya</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="date">Jatuh Tempo</Label>
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
            <Dialog>
              <DialogTrigger asChild>
                <Button size="sm" className="h-9 gap-1">
                  <Plus className="h-4 w-4" />
                  <span className="hidden sm:inline">Bayar Tagihan</span>
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Bayar Tagihan</DialogTitle>
                  <DialogDescription>
                    Pilih tagihan yang ingin dibayar
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="tagihan">Tagihan</Label>
                    <Select>
                      <SelectTrigger id="tagihan">
                        <SelectValue placeholder="Pilih tagihan" />
                      </SelectTrigger>
                      <SelectContent>
                        {tagihanData.map((tagihan) => (
                          <SelectItem key={tagihan.id} value={tagihan.id}>
                            {tagihan.nama} -{" "}
                            {new Intl.NumberFormat("id-ID", {
                              style: "currency",
                              currency: "IDR",
                            }).format(tagihan.jumlah)}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="metode">Metode Pembayaran</Label>
                    <Select>
                      <SelectTrigger id="metode">
                        <SelectValue placeholder="Pilih metode pembayaran" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="va">Virtual Account</SelectItem>
                        <SelectItem value="transfer">Transfer Bank</SelectItem>
                        <SelectItem value="qris">QRIS</SelectItem>
                        <SelectItem value="ewallet">E-Wallet</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit">Lanjutkan Pembayaran</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Nama Tagihan</TableHead>
              <TableHead>Kategori</TableHead>
              <TableHead>Jumlah</TableHead>
              <TableHead>Jatuh Tempo</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tagihanData.map((tagihan) => (
              <TableRow key={tagihan.id}>
                <TableCell className="font-medium">{tagihan.id}</TableCell>
                <TableCell>{tagihan.nama}</TableCell>
                <TableCell>{tagihan.kategori}</TableCell>
                <TableCell>
                  {new Intl.NumberFormat("id-ID", {
                    style: "currency",
                    currency: "IDR",
                  }).format(tagihan.jumlah)}
                </TableCell>
                <TableCell>{tagihan.jatuhTempo}</TableCell>
                <TableCell>
                  <div
                    className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                      tagihan.status === "belum-bayar"
                        ? "bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-300"
                        : "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300"
                    }`}
                  >
                    {tagihan.status === "belum-bayar" ? "Belum Bayar" : "Lunas"}
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button variant="outline" size="sm">
                      <Download className="h-4 w-4" />
                      <span className="sr-only">Download</span>
                    </Button>
                    <Button size="sm">
                      <CreditCard className="mr-2 h-4 w-4" />
                      Bayar
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
