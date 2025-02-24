"use client";

import type React from "react";

import { useState } from "react";
import { Upload } from "lucide-react";
import Image from "next/image";

export default function FileUpload({
  onChange,
}: {
  onChange: (file: File | null, preview: string | null) => void;
}) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        const previewUrl = reader.result as string;
        setPreview(previewUrl);
        onChange(file, previewUrl);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto p-4 space-y-4">
      <label
        htmlFor="file-upload"
        className="relative block w-full h-48 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-gray-400 transition-colors"
      >
        <input
          id="file-upload"
          type="file"
          className="sr-only"
          accept="image/*"
          onChange={handleFileChange}
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          {preview ? (
            <Image
              src={preview || "/placeholder.svg"}
              alt="Preview"
              fill
              className="object-cover rounded-lg"
            />
          ) : (
            <>
              <Upload className="w-12 h-12 text-primary mb-2" />
              <span className="text-gray-500">Upload da foto</span>
            </>
          )}
        </div>
      </label>
    </div>
  );
}
