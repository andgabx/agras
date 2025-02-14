"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { CreateCommunitySchema } from "./schema";

export const createCommunity = async (formData: FormData): Promise<void> => {
  const supabase = await createClient();

  // Obter o usuário atual
  const { data: { user }, } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("Usuário não autenticado.");
  }

  // Garantir que os valores não sejam nulos
  const name = formData.get("name")?.toString().trim();
  const admin_id = user.id;
  const creator_name = user.user_metadata.full_name;
  const description = formData.get("description")?.toString().trim();
  const city = formData.get("city")?.toString().trim();
  const state = formData.get("state")?.toString().trim();
  const members = [{ id: admin_id, name: creator_name }];

  const { success } = CreateCommunitySchema.safeParse({
    name,
    admin_id,
    description,
    city,
    state,
    creator_name,
    members,
  });

  if (!success) {
    throw new Error("Dados inválidos.");
  }

  // Verificar se já existe uma comunidade com o mesmo nome (case insensitive)
  const { data: existingCommunity, error: searchError } = await supabase
    .from("communities")
    .select("name")
    .ilike("name", name || "")
    .maybeSingle();

  if (searchError) {
    throw new Error("Erro ao verificar o nome da comunidade.");
  }

  if (existingCommunity) {
    throw new Error(
      `Já existe uma comunidade chamada "${existingCommunity.name}". Por favor, escolha outro nome.`
    );
  }

  const { error: insertError } = await supabase.from("communities").insert({
    name,
    admin_id,
    description,
    city,
    state,
    creator_name,
    members
  });

  if (insertError) {
    throw new Error("Erro ao criar a comunidade: " + insertError.message);
  }

  revalidatePath("/community");
};
