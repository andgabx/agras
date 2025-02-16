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
import { AlertCircle, AlertTriangle, Info, Loader2, Save, Settings } from "lucide-react";

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
    <form className="grid gap-6 w-full lg:max-w-2xl">
      <Card className="relative">
        <CardHeader className="pb-4 border-b">
          <CardTitle className="text-xl flex items-center gap-2">
            <Settings className="w-5 h-5" />
            Configurações da Comunidade
            <span className="text-primary font-bold">{community.name}</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
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
            
            <div className="space-y-4">
              <Label htmlFor="name" className="text-sm font-medium">
                Nome da Comunidade
              </Label>
              <Input 
                id="name" 
                name="name" 
                defaultValue={community.name}
                className="focus-visible:ring-primary"
              />
            </div>

            <div className="space-y-4">
              <Label htmlFor="description" className="text-sm font-medium">
                Descrição
              </Label>
              <Textarea
                id="description"
                name="description"
                defaultValue={community.description ?? ""}
                className="min-h-[120px] focus-visible:ring-primary"
                placeholder="Descreva os objetivos e propósito da comunidade..."
              />
            </div>

            <div className="flex flex-col-reverse sm:flex-row justify-between gap-4 pt-8 border-t">
              <Dialog>
                <DialogTrigger asChild>
                  <Button 
                    variant="destructive" 
                    className="gap-2 w-full sm:w-auto"
                  >
                    <AlertTriangle className="w-4 h-4" />
                    Excluir Comunidade
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-md">
                  <DialogHeader>
                    <DialogTitle className="text-destructive flex items-center gap-2">
                      <AlertTriangle className="w-5 h-5" />
                      Excluir Comunidade
                    </DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <p className="text-foreground">
                      Tem certeza que deseja excluir permanentemente a comunidade{" "}
                      <span className="font-semibold text-destructive">
                        {community.name}
                      </span>?
                    </p>
                    <div className="flex items-center gap-3 p-4 bg-destructive/10 text-destructive rounded-lg">
                      <AlertCircle className="w-5 h-5 flex-shrink-0" />
                      <p className="text-sm">
                        Todos os dados associados serão permanentemente removidos.
                        Esta ação não pode ser desfeita.
                      </p>
                    </div>
                  </div>
                  <DialogFooter className="gap-2 sm:gap-0">
                    <DialogClose asChild>
                      <Button variant="outline" className="w-full">
                        Cancelar
                      </Button>
                    </DialogClose>
                    <form action={handleDelete} className="w-full">
                      <input
                        type="hidden"
                        name="communityId"
                        value={community.id}
                      />
                      <Button 
                        type="submit" 
                        variant="destructive"
                        className="w-full gap-2"
                      >
                        <AlertTriangle className="w-4 h-4" />
                        Confirmar Exclusão
                      </Button>
                    </form>
                  </DialogFooter>
                </DialogContent>
              </Dialog>

              <SubmitButton
                formAction={handleSubmit}
                className="w-full sm:w-auto bg-primary hover:bg-primary/90 gap-2"
              >
                <Save className="w-4 h-4" />
                Salvar Alterações
              </SubmitButton>
            </div>
          </div>
        </CardContent>
      </Card>
    </form>
  );
}