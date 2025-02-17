"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { createSeedbed } from "../_actions/create-seedbed";
import { toast } from "sonner";
import { DialogClose } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { SubmitButton } from "@/components/submit-button";
import { usePathname } from "next/navigation";
import { form } from "@heroui/theme";

interface CreateSeedbedFormProps {
  onSuccess?: () => void;
}

export function CreateSeedbedForm({ onSuccess }: CreateSeedbedFormProps) {
  const pathname = usePathname();
  const communityId = pathname.split("/")[2];
  const areaId = pathname.split("/")[5];

  async function handleSubmit(formData: FormData) {
    try {
      formData.append("area_id", areaId);
      formData.append("community_id", communityId);
      await createSeedbed(formData);
      toast.success("Canteiro criado com sucesso");
      onSuccess?.();
    } catch (error) {
      console.error(error);
      toast.error("Erro ao criar canteiro");
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardDescription>
          Crie um novo canteiro para gerenciar seus cultivos
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
          </div>
          <div className="flex justify-between gap-2">
            <DialogClose asChild>
              <Button className="w-full" variant="outline">
                Cancelar
              </Button>
            </DialogClose>
            <SubmitButton formAction={handleSubmit} className="w-full">
              Criar Canteiro
            </SubmitButton>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
