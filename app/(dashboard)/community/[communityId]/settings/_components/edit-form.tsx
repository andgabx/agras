"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { updateCommunity } from "../_actions/update-community";
import { toast } from "sonner";
import { SubmitButton } from "@/components/submit-button";
import { deleteCommunity } from "../_actions/delete-community";

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
                <SubmitButton
                  formAction={handleDelete}
                  type="submit"
                  variant="destructive"
                >
                  Excluir
                </SubmitButton>
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
