"use client"

import { CreditCard, Plus, Trash2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function PaymentMethod() {
  // Dummy data for metode pembayaran
  const metodePembayaran = [
    {
      id: "card-1",
      type: "bank",
      name: "Bank BNI",
      number: "1234 5678 9012 3456",
      expiry: "12/25",
      isDefault: true,
    },
    {
      id: "card-2",
      type: "bank",
      name: "Bank BCA",
      number: "9876 5432 1098 7654",
      expiry: "10/24",
      isDefault: false,
    },
    {
      id: "card-3",
      type: "ewallet",
      name: "OVO",
      number: "081234567890",
      expiry: "",
      isDefault: false,
    },
  ]

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
            <div>
              <CardTitle>Metode Pembayaran</CardTitle>
              <CardDescription>Kelola metode pembayaran Anda</CardDescription>
            </div>
            <Dialog>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Tambah Metode Pembayaran
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Tambah Metode Pembayaran</DialogTitle>
                  <DialogDescription>Tambahkan metode pembayaran baru untuk transaksi Anda</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <RadioGroup defaultValue="bank" className="grid grid-cols-3 gap-4">
                    <div>
                      <RadioGroupItem value="bank" id="bank" className="peer sr-only" />
                      <Label
                        htmlFor="bank"
                        className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                      >
                        <CreditCard className="mb-3 h-6 w-6" />
                        Bank
                      </Label>
                    </div>
                    <div>
                      <RadioGroupItem value="ewallet" id="ewallet" className="peer sr-only" />
                      <Label
                        htmlFor="ewallet"
                        className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                      >
                        <CreditCard className="mb-3 h-6 w-6" />
                        E-Wallet
                      </Label>
                    </div>
                    <div>
                      <RadioGroupItem value="qris" id="qris" className="peer sr-only" />
                      <Label
                        htmlFor="qris"
                        className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                      >
                        <CreditCard className="mb-3 h-6 w-6" />
                        QRIS
                      </Label>
                    </div>
                  </RadioGroup>

                  <div className="space-y-2">
                    <Label htmlFor="name">Nama Bank</Label>
                    <Select>
                      <SelectTrigger id="name">
                        <SelectValue placeholder="Pilih bank" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="bni">Bank BNI</SelectItem>
                        <SelectItem value="bca">Bank BCA</SelectItem>
                        <SelectItem value="bri">Bank BRI</SelectItem>
                        <SelectItem value="mandiri">Bank Mandiri</SelectItem>
                        <SelectItem value="other">Lainnya</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="number">Nomor Rekening</Label>
                    <Input id="number" placeholder="Masukkan nomor rekening" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="name">Nama Pemilik</Label>
                    <Input id="name" placeholder="Masukkan nama pemilik rekening" />
                  </div>

                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="default" className="h-4 w-4 rounded border-gray-300" />
                    <Label htmlFor="default">Jadikan sebagai metode pembayaran utama</Label>
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit">Simpan</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {metodePembayaran.map((metode) => (
              <Card key={metode.id} className="overflow-hidden">
                <div
                  className={`h-1 w-full ${
                    metode.type === "bank"
                      ? "bg-blue-500"
                      : metode.type === "ewallet"
                        ? "bg-purple-500"
                        : "bg-green-500"
                  }`}
                />
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center justify-between text-base">
                    <span>{metode.name}</span>
                    {metode.isDefault && (
                      <span className="bg-primary/10 text-primary rounded-full px-2 py-0.5 text-xs font-medium">
                        Utama
                      </span>
                    )}
                  </CardTitle>
                  <CardDescription>
                    {metode.type === "bank" ? "Rekening Bank" : metode.type === "ewallet" ? "E-Wallet" : "QRIS"}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-muted-foreground text-sm">
                    {metode.type === "bank" ? (
                      <div className="space-y-1">
                        <p>
                          <span className="font-medium">Nomor Rekening:</span> {metode.number}
                        </p>
                        <p>
                          <span className="font-medium">Berlaku hingga:</span> {metode.expiry}
                        </p>
                      </div>
                    ) : (
                      <div className="space-y-1">
                        <p>
                          <span className="font-medium">Nomor:</span> {metode.number}
                        </p>
                      </div>
                    )}
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" size="sm">
                    Edit
                  </Button>
                  <Button variant="outline" size="sm" className="text-red-500">
                    <Trash2 className="mr-2 h-4 w-4" />
                    Hapus
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Panduan Pembayaran</CardTitle>
          <CardDescription>Cara melakukan pembayaran biaya kuliah</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="rounded-lg border p-4">
              <h3 className="mb-2 text-lg font-medium">Pembayaran melalui Virtual Account</h3>
              <ol className="text-muted-foreground ml-5 list-decimal space-y-2 text-sm">
                <li>Pilih tagihan yang ingin dibayar</li>
                <li>Pilih metode pembayaran Virtual Account</li>
                <li>Salin nomor Virtual Account yang muncul</li>
                <li>Buka aplikasi m-banking atau internet banking Anda</li>
                <li>Pilih menu transfer atau pembayaran Virtual Account</li>
                <li>Masukkan nomor Virtual Account dan jumlah pembayaran</li>
                <li>Konfirmasi dan selesaikan pembayaran</li>
                <li>Simpan bukti pembayaran</li>
              </ol>
            </div>

            <div className="rounded-lg border p-4">
              <h3 className="mb-2 text-lg font-medium">Pembayaran melalui QRIS</h3>
              <ol className="text-muted-foreground ml-5 list-decimal space-y-2 text-sm">
                <li>Pilih tagihan yang ingin dibayar</li>
                <li>Pilih metode pembayaran QRIS</li>
                <li>Scan kode QR yang muncul menggunakan aplikasi e-wallet atau m-banking</li>
                <li>Periksa detail pembayaran</li>
                <li>Konfirmasi dan selesaikan pembayaran</li>
                <li>Simpan bukti pembayaran</li>
              </ol>
            </div>

            <div className="rounded-lg border p-4">
              <h3 className="mb-2 text-lg font-medium">Pembayaran melalui E-Wallet</h3>
              <ol className="text-muted-foreground ml-5 list-decimal space-y-2 text-sm">
                <li>Pilih tagihan yang ingin dibayar</li>
                <li>Pilih metode pembayaran E-Wallet</li>
                <li>Pilih e-wallet yang ingin digunakan</li>
                <li>Anda akan diarahkan ke aplikasi e-wallet</li>
                <li>Konfirmasi dan selesaikan pembayaran</li>
                <li>Kembali ke halaman SIAKAD</li>
                <li>Simpan bukti pembayaran</li>
              </ol>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
