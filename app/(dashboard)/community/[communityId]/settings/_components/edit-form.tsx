"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { updateCommunity } from "../_actions/update-community";
import { toast } from "sonner";
import { SubmitButton } from "@/components/submit-button";
import { deleteCommunity } from "../_actions/delete-community";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { AlertCircle, AlertTriangle } from "lucide-react";

export default function CommunitySettingsFormClient({
  community,
}: {
  community: any;
}) {
  const handleSubmit = async (formData: FormData) => {
    try {
      await updateCommunity(formData);
      toast.success("Comunidade atualizada com sucesso");
    } catch (error) {
      toast.error("Erro ao atualizar a comunidade");
    }
  };

  const handleDelete = async () => {
    try {
      const formData = new FormData();
      formData.append("communityId", community.id);

      const result = await deleteCommunity(formData);
      if (result.success) {
        toast.success("Comunidade excluída com sucesso");
        window.location.href = result.redirect;
      }
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Erro ao excluir a comunidade"
      );
    }
  };

  return (
    <form className="grid">
      <Card>
        <CardHeader>
          <CardTitle>Configurações da Comunidade {community.name}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="space-y-2 hidden">
              <Label>Comunidade id</Label>
              <Input
                type="hidden"
                id="communityId"
                name="communityId"
                defaultValue={community.id}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="name">Nome da Comunidade</Label>
              <Input id="name" name="name" defaultValue={community.name} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Descrição da Comunidade</Label>
              <Textarea
                id="description"
                name="description"
                defaultValue={community.description ?? ""}
                className="min-h-[100px]"
              />
            </div>

            <div className="flex justify-between pt-4">
              <div className="space-x-2">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="destructive">Excluir</Button>
                  </DialogTrigger>
                  <DialogContent className="w-full">
                    <DialogHeader>
                      <DialogTitle hidden className="py-4">
                        Excluir Comunidade
                      </DialogTitle>
                    </DialogHeader>
                    <DialogDescription className="text-red-500 text-center text-lg font-bold">
                      Tem certeza que deseja excluir a comunidade{" "}
                      {community.name}?
                      <br />
                      <br />
                      <span className="text-md text-center text-red-500 font-bold flex gap-2">
                        <AlertCircle className="text-red-500 w-6 h-6" />
                        Cuidado! Os dados dessa comunidade serão perdidos.
                      </span>
                    </DialogDescription>
                    <DialogFooter>
                      <DialogClose asChild>
                        <Button variant="outline">Cancelar</Button>
                      </DialogClose>
                      <form action={handleDelete}>
                        <input
                          type="hidden"
                          name="communityId"
                          value={community.id}
                        />
                        <Button type="submit" variant="destructive">
                          Excluir
                        </Button>
                      </form>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
              <div className="space-x-2">
                <SubmitButton
                  formAction={handleSubmit}
                  type="submit"
                  className="bg-primary hover:bg-primary/90"
                >
                  Atualizar
                </SubmitButton>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </form>
  );
}
