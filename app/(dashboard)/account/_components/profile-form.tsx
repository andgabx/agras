"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Camera, Pencil } from "lucide-react";
import { SubmitButton } from "@/components/submit-button";
import InputProfilePic from "./input-profile-pic";
import updateAccount from "../_actions/update-account";
import Image from "next/image";
import { createClient } from "@/utils/supabase/client"; 
import { usePathname } from "next/navigation";
interface ProfileFormProps {
  user: any;
}

export function ProfileForm({ user }: ProfileFormProps) {
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [imageExists, setImageExists] = useState(false);

  const pathname = usePathname();

  useEffect(() => {
    if (profileImage) {
      const preview = URL.createObjectURL(profileImage);
      setPreviewImage(preview);
      return () => URL.revokeObjectURL(preview);
    }
  }, [profileImage]);

  useEffect(() => {
    const checkImageExists = async () => {
      if (user?.user_metadata?.avatar_url) {
        try {
          const response = await fetch(user.user_metadata.avatar_url);
          const data = await response.json();

          // Se receber o JSON de erro, a imagem não existe mais
          if (data.error === "not_found") {
            setImageExists(false);
            // Limpar a URL inválida do metadata
            const supabase = createClient();
            await supabase.auth.updateUser({
              data: { avatar_url: null },
            });
          } else {
            setImageExists(true);
          }
        } catch (error) {
          // Se não conseguir parsear como JSON, provavelmente é uma imagem válida
          setImageExists(true);
        }
      }
    };
    checkImageExists();
  }, [user?.user_metadata?.avatar_url]);

  const handleImageSelect = (file: File) => {
    setProfileImage(file);
  };

  const handleSubmit = async (formData: FormData) => {
    if (profileImage) {
      formData.append("profileImage", profileImage);
    }
    return updateAccount(formData, pathname);
  };

  return (
    <Card className="mx-auto">
      {/* Banner and Avatar Section */}
      <div className="relative">
        <div className="h-48 overflow-hidden rounded-t-lg">
          <img
            src="https://s3-alpha-sig.figma.com/img/5726/6653/8f5e91def2ce12f0c428eb4842fbc29b?Expires=1740960000&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=U7pRQOs9kWN6lYOvL~AHVCIAU3WCO9wudiwDclD4HsvnBJXEn8rSSnOHJtSiVxw5VmWOgp0hsQ2-OEpsfnul7AOh1jq6dNVDdN-Sanx4OWhx4rabhkkBuNToasjhX7CZqPrNwvSI8Gv1y~6x~g17Iq4J5ha3hbZy1CS3jbCOXNla0-aS87OdBFVUWaGuA-L0uu5qVJDxrBXKgd1ANdJfEFqJC-W4c3G5whYijTfLkZMf51FcPk5Ro0Jr5iNiuClSpxU4pWA-B-c9UdhahZDPXA5zDd-~sGTh8FnlIhhL8FStpJpzuOLzzHt6I6ZvO~-GJByc4aKErgyCLvPdvMJhgg__"
            alt="Profile banner"
            className="w-full h-full object-cover"
            width={1000}
            height={1000}
          />
          <label htmlFor="banner-upload" className="absolute bottom-4 right-4">
            <Button
              size="icon"
              variant="secondary"
              className="bg-white"
              type="button"
            >
              <Camera className="h-4 w-4" />
            </Button>
          </label>
        </div>

        {/* Avatar */}
        <div className="absolute -bottom-12 left-8">
          <div className="relative group">
            {previewImage ? (
              <>
                <img
                  src={previewImage}
                  alt="Preview Avatar"
                  className="w-24 h-24 rounded-full object-cover"
                />
                <label
                  htmlFor="profile-upload"
                  className="absolute inset-0 bg-black/0 group-hover:bg-black/40 rounded-full flex items-center justify-center transition-colors cursor-pointer"
                >
                  <Camera className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                </label>
              </>
            ) : user?.user_metadata?.avatar_url && imageExists ? (
              <>
                <Image
                  src={user.user_metadata.avatar_url}
                  alt="Profile avatar"
                  width={100}
                  height={100}
                  className="w-24 h-24 rounded-full object-cover"
                />
                <label
                  htmlFor="profile-upload"
                  className="absolute inset-0 bg-black/0 group-hover:bg-black/40 rounded-full flex items-center justify-center transition-colors cursor-pointer"
                >
                  <Camera className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                </label>
              </>
            ) : (
              <InputProfilePic onImageSelect={handleImageSelect} />
            )}
            <input
              id="profile-upload"
              type="file"
              className="hidden"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) setProfileImage(file);
              }}
            />
          </div>
        </div>
      </div>

      <CardHeader className="pt-16 pb-4">
        <div className="flex items-center gap-2 text-lg font-semibold">
          <Pencil className="h-5 w-5" />
          Editar perfil
        </div>
        <p className="text-sm text-muted-foreground">
          Carregue sua foto e edite suas informações pessoais
        </p>
      </CardHeader>

      <CardContent>
        <form className="grid gap-6 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="fullName">Nome completo*</Label>
            <Input
              id="fullName"
              name="full_name"
              defaultValue={user?.user_metadata?.full_name}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="username">Nome de usuário*</Label>
            <Input
              id="username"
              name="username"
              defaultValue={user?.user_metadata?.username}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email*</Label>
            <Input
              id="email"
              name="email"
              type="email"
              defaultValue={user?.email}
              disabled
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Telefone</Label>
            <Input
              id="phone"
              name="phone"
              defaultValue={user?.user_metadata?.phone}
            />
          </div>

          <div className="md:col-span-2 flex justify-end gap-4 pt-4">
            <Button variant="outline">Cancelar</Button>
            <SubmitButton
              formAction={handleSubmit}
              className="bg-primary hover:bg-primary/90"
            >
              Salvar
            </SubmitButton>
            <Button variant="outline">
              <a href="/protected/reset-password">Mudar senha</a>
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
