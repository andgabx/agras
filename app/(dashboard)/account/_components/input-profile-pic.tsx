"use client";

import type React from "react";

import { useState, useEffect } from "react";
import { Camera } from "lucide-react";
import Image from "next/image";
import { createClient } from "@/utils/supabase/client";
import { toast } from "sonner";

interface ProfileUploadProps {
  onImageSelect: (file: File) => void;
}

export default function ProfileUpload({ onImageSelect }: ProfileUploadProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [user, setUser] = useState<any>(null);
  const supabase = createClient();

  useEffect(() => {
    const fetchUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUser(user);
    };
    fetchUser();
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      onImageSelect(file);

      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto p-4">
      <label
        htmlFor="profile-upload"
        className="relative block w-32 h-32 rounded-full cursor-pointer group"
      >
        <input
          id="profile-upload"
          type="file"
          className="sr-only"
          accept="image/*"
          onChange={handleFileChange}
        />
        <div className="absolute inset-0 rounded-full overflow-hidden">
          {preview ? (
            <Image
              src={preview || "/placeholder.svg"}
              alt="Profile preview"
              fill
              className="object-cover"
            />
          ) : (
            <div className="w-full h-full bg-primary flex items-center justify-center">
              <span className="text-2xl text-white font-bold">
                {user?.user_metadata?.full_name?.charAt(0)}
              </span>
            </div>
          )}
        </div>
        {/* Camera overlay */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 rounded-full flex items-center justify-center transition-colors">
          <Camera className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>
      </label>
    </div>
  );
}
