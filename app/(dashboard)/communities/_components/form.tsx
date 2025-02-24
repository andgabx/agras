"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { createCommunity } from "../_actions/create-community/index";
import { useState } from "react";
import { toast } from "sonner";
import { DialogClose } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { SubmitButton } from "@/components/submit-button";
import FileUpload from "./file-input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const cities = [
  { key: "recife", value: "Recife" },
  { key: "carpina", value: "Carpina" },
];
const states = [
  { key: "AC", value: "Acre" },
  { key: "AL", value: "Alagoas" },
  { key: "AP", value: "Amapá" },
  { key: "AM", value: "Amazonas" },
  { key: "BA", value: "Bahia" },
  { key: "CE", value: "Ceará" },
  { key: "DF", value: "Distrito Federal" },
  { key: "ES", value: "Espírito Santo" },
  { key: "GO", value: "Goiás" },
  { key: "MA", value: "Maranhão" },
  { key: "MT", value: "Mato Grosso" },
  { key: "MS", value: "Mato Grosso do Sul" },
  { key: "MG", value: "Minas Gerais" },
  { key: "PA", value: "Pará" },
  { key: "PB", value: "Paraíba" },
  { key: "PR", value: "Paraná" },
  { key: "PE", value: "Pernambuco" },
  { key: "PI", value: "Piauí" },
  { key: "RJ", value: "Rio de Janeiro" },
  { key: "RN", value: "Rio Grande do Norte" },
  { key: "RS", value: "Rio Grande do Sul" },
  { key: "RO", value: "Rondônia" },
  { key: "RR", value: "Roraima" },
  { key: "SC", value: "Santa Catarina" },
  { key: "SP", value: "São Paulo" },
  { key: "SE", value: "Sergipe" },
  { key: "TO", value: "Tocantins" },
];

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
    <div className="space-y-6">
      <div className="text-center">
        <FileUpload onChange={handleUpload} />
        <p className="text-sm text-muted-foreground mt-2">
          Upload da capa da comunidade (Recomendado: 1200x400px)
        </p>
      </div>

      <form className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="name">Nome da Comunidade *</Label>
            <Input
              name="name"
              placeholder="Ex: Comunidade Rock de Recife"
              className="h-12"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Descrição</Label>
            <Textarea
              name="description"
              placeholder="Descreva o propósito da sua comunidade"
              className="h-32"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="city">Cidade *</Label>
            <Input
              name="city"
              placeholder="Ex: Recife"
              className="h-12"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="state">Estado *</Label>
            <Select name="state">
              <SelectTrigger className="h-12">
                <SelectValue placeholder="Selecione seu estado" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Estados</SelectLabel>
                  {states.map((state) => (
                    <SelectItem key={state.key} value={state.key}>
                      {state.value}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-4 pt-4">
          <DialogClose asChild>
            <Button
              variant="outline"
              className="w-full h-12 text-base"
              type="button"
            >
              Cancelar
            </Button>
          </DialogClose>
          <SubmitButton
            formAction={handleSubmit}
            className="w-full h-12 text-base"
          >
            Criar Comunidade
          </SubmitButton>
        </div>
      </form>
    </div>
  );
}