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

interface CreateCommunityFormProps {
  onSuccess?: () => void;
}

export function CreateCommunityForm({ onSuccess }: CreateCommunityFormProps) {

  async function handleSubmit(formData: FormData) {
    try {
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
        <form action={handleSubmit} className="space-y-4">
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
              className="border-primary rounded-md"
            />
          </div>
          <div className="flex justify-between gap-2">
            <DialogClose asChild>
              <Button className="w-full" variant="outline">
                Cancelar
              </Button>
            </DialogClose>
            <Button className="w-full" type="submit">
              Criar Comunidade
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
