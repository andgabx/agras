"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { updateCommunity } from "../_actions/update-community";
import { toast } from "sonner";
import { SubmitButton } from "@/components/submit-button";
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

  return (
    <form className="grid gap-6 lg:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Configurações da Comunidade {community.name}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <input type="hidden" name="communityId" value={community.id} />
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
              <Button type="button" variant="destructive">
                Excluir
              </Button>
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
