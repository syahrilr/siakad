"use client";

import type React from "react";
import { useState } from "react";

import { FileText, Upload, X } from "lucide-react";

import { Button } from "@/components/ui/button";

interface UploadEvidenceProps {
  onFileChange?: (file: File | null) => void;
  maxSize?: number; // in MB
  acceptedFormats?: string[];
}

export function UploadEvidence({
  onFileChange,
  maxSize = 10,
  acceptedFormats = [
    "application/pdf",
    "image/jpeg",
    "image/png",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    "application/vnd.openxmlformats-officedocument.presentationml.presentation",
  ],
}: UploadEvidenceProps) {
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] || null;
    validateAndSetFile(selectedFile);
  };

  const validateAndSetFile = (selectedFile: File | null) => {
    if (!selectedFile) {
      setFile(null);
      setError(null);
      onFileChange?.(null);
      return;
    }

    // Check file format
    const fileType = selectedFile.type;
    if (!acceptedFormats.includes(fileType)) {
      setError(
        "Format file tidak didukung. Gunakan PDF, JPG, PNG, DOCX, atau PPTX."
      );
      setFile(null);
      onFileChange?.(null);
      return;
    }

    // Check file size
    if (selectedFile.size > maxSize * 1024 * 1024) {
      setError(`Ukuran file terlalu besar. Maksimum ${maxSize}MB.`);
      setFile(null);
      onFileChange?.(null);
      return;
    }

    setFile(selectedFile);
    setError(null);
    onFileChange?.(selectedFile);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      validateAndSetFile(e.dataTransfer.files[0]);
    }
  };

  const getFileIcon = () => {
    if (!file) return null;

    if (file.type.includes("pdf")) {
      return <FileText className="h-5 w-5 text-red-500" />;
    } else if (file.type.includes("word")) {
      return <FileText className="h-5 w-5 text-blue-500" />;
    } else if (file.type.includes("presentation")) {
      return <FileText className="h-5 w-5 text-orange-500" />;
    } else if (file.type.includes("image")) {
      return <FileText className="h-5 w-5 text-green-500" />;
    }

    return <FileText className="h-5 w-5 text-gray-500" />;
  };

  return (
    <div className="space-y-2">
      <div
        className={`rounded-md border p-4 ${isDragging ? "border-teal-500 bg-teal-50" : ""}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        {file ? (
          <div className="flex items-center justify-between rounded bg-gray-50 p-2">
            <div className="flex items-center gap-2">
              {getFileIcon()}
              <span className="text-sm font-medium">{file.name}</span>
              <span className="text-xs text-gray-500">
                ({(file.size / (1024 * 1024)).toFixed(2)} MB)
              </span>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                setFile(null);
                onFileChange?.(null);
              }}
              className="h-8 w-8 p-0"
            >
              <X className="h-4 w-4" />
              <span className="sr-only">Hapus file</span>
            </Button>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center gap-2 py-6">
            <Upload className="h-10 w-10 text-teal-500" />
            <p className="text-center text-sm text-gray-600">
              Seret dan lepas file di sini atau klik untuk memilih file
            </p>
            <Button
              variant="outline"
              size="sm"
              className="mt-2"
              onClick={() => document.getElementById("file-upload")?.click()}
            >
              Pilih File
            </Button>
            <input
              id="file-upload"
              type="file"
              className="hidden"
              accept={acceptedFormats.join(",")}
              onChange={handleFileChange}
            />
          </div>
        )}
      </div>
      {error && <p className="text-xs text-red-500">{error}</p>}
      {!error && (
        <p className="text-muted-foreground text-xs">
          Format yang didukung: PDF, JPG, PNG, DOCX, PPTX. Ukuran maksimum:{" "}
          {maxSize}MB.
        </p>
      )}
    </div>
  );
}
