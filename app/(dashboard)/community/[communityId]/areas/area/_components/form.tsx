"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { createArea } from "../_actions/create-area";
import { toast } from "sonner";
import { DialogClose } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { SubmitButton } from "@/components/submit-button";
import { usePathname } from "next/navigation";
import { form } from "@heroui/theme";
import FileUpload from "./file-input";
import { useState } from "react";

interface CreateAreaFormProps {
  onSuccess?: () => void;
}

export function CreateAreaForm({ onSuccess }: CreateAreaFormProps) {
    const [coverFile, setCoverFile] = useState<File | null>(null);
  
    const handleUpload = (file: File | null, preview: string | null) => {
      if (file) {
        setCoverFile(file);
      }
    };
    
  const pathname = usePathname();
  const communityId = pathname.split("/")[2];

  async function handleSubmit(formData: FormData) {
    try {
      formData.append("community_id", communityId);
      await createArea(formData);
      toast.success("Área criada com sucesso");
      onSuccess?.();
    } catch (error) {
      console.error(error);
      toast.error("Erro ao criar área");
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardDescription>
          Crie uma nova área para gerenciar seus canteiros
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="text-center">
          <FileUpload onChange={handleUpload} />
          <p className="text-sm text-muted-foreground mt-2 mb-2">
            Upload da capa da Área (Recomendado: 1200x400px)
          </p>
        </div>
        <form className="space-y-4">
          <div>
            <Label htmlFor="name">Nome*</Label>
            <Input
              type="text"
              name="name"
              placeholder="Nome da área"
              className="border-primary"
              required
            />
            <Label htmlFor="description">Descrição</Label>
            <Textarea
              name="description"
              placeholder="Descrição da área"
              className="border-primary"
            />
          </div>
          <div className="flex justify-between gap-2">
            <DialogClose asChild>
              <Button className="w-full" variant="outline">
                Cancelar
              </Button>
            </DialogClose>
            <SubmitButton formAction={handleSubmit} className="w-full">
              Criar Área
            </SubmitButton>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
