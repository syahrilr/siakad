import { ThreadForm } from "@/components/dashboard/forum/thread-form";

// Define categories for the form
const categories = [
  { value: "kardiovaskular", label: "Kardiovaskular" },
  { value: "neurologi", label: "Neurologi" },
  { value: "onkologi", label: "Onkologi" },
  { value: "penyakit-dalam", label: "Penyakit Dalam" },
  { value: "bedah", label: "Bedah" },
  { value: "pediatri", label: "Pediatri" },
  { value: "obstetri-ginekologi", label: "Obstetri & Ginekologi" },
  { value: "psikiatri", label: "Psikiatri" },
  { value: "lainnya", label: "Lainnya" },
];

// Define metadata for the page
export const metadata = {
  title: "Buat Thread | SIAKAD",
  description: "Buat Thread Diskusi",
};

export default function CreateThreadPage() {
  return (
    <div className="container mx-auto py-10">
      <div className="mx-auto max-w-3xl">
        <ThreadForm categories={categories} />
      </div>
    </div>
  );
}
