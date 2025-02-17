"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { createCommunity } from "../_actions/create-community/index";
import { useState } from "react";
import { toast } from "sonner";
import { DialogClose } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { SubmitButton } from "@/components/submit-button";
import FileUpload from "./file-input";

interface CreateCommunityFormProps {
  onSuccess?: () => void;
}

export function CreateCommunityForm({ onSuccess }: CreateCommunityFormProps) {
  const [coverFile, setCoverFile] = useState<File | null>(null);

  const handleUpload = (file: File | null, preview: string | null) => {
    if (file) {
      setCoverFile(file);
    }
  };

  async function handleSubmit(formData: FormData) {
    try {
      if (!coverFile) {
        toast.error("A imagem de capa é obrigatória");
        return;
      }

      formData.append("cover", coverFile);
      await createCommunity(formData);
      toast.success("Comunidade criada com sucesso");
      onSuccess?.();
    } catch (error) {
      console.error(error);
      toast.error("Erro ao criar comunidade");
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardDescription>
          Crie uma nova comunidade para compartilhar conhecimento musical
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form className="space-y-4">
          <div>
            <Label htmlFor="name">Nome*</Label>
            <Input
              type="text"
              name="name"
              placeholder="Nome da comunidade"
              required
            />

            <Label htmlFor="description">Descrição</Label>
            <Textarea
              name="description"
              placeholder="Descrição da comunidade"
              className="border-primary"
            />
          </div>
          <Label htmlFor="city">Cidade*</Label>
          <Input
            type="text"
            name="city"
            placeholder="Cidade da comunidade"
            required
          />
          <Label htmlFor="state">Estado*</Label>
          <Input
            type="text"
            name="state"
            placeholder="Estado da comunidade"
            required
          />
          <div className="flex justify-between gap-2">
            <DialogClose asChild>
              <Button className="w-full" variant="outline">
                Cancelar
              </Button>
            </DialogClose>
            <SubmitButton formAction={handleSubmit} className="w-full">
              Criar Comunidade
            </SubmitButton>
          </div>
          <FileUpload onChange={handleUpload} />
        </form>
      </CardContent>
    </Card>
  );
}
