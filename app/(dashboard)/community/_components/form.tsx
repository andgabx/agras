"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { createCommunity } from "../_actions/create-community/index";
import { useState } from "react";
import { useRouter } from "next/navigation";

export function CreateCommunityForm() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(formData: FormData) {
    try {
      setIsLoading(true);
      await createCommunity(formData);
      router.refresh();
    } catch (error) {
      console.error(error);
      alert("Erro ao criar comunidade");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Criar Comunidade</CardTitle>
        <CardDescription>
          Crie uma nova comunidade para compartilhar conhecimento musical
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form action={handleSubmit} className="space-y-4">
          <div>
            <Input
              type="text"
              name="name"
              placeholder="Nome da comunidade"
              required
              disabled={isLoading}
            />
          </div>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Criando..." : "Criar Comunidade"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
