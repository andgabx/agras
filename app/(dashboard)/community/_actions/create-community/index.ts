"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { CreateCommunitySchema } from "./schema";

export const createCommunity = async (formData: FormData): Promise<void> => {
  const supabase = await createClient();

  // Obter o usuário atual
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("Usuário não autenticado.");
  }

  // Garantir que os valores não sejam nulos
  const name = formData.get("name")?.toString().trim();
  const admin_id = user.id;

  const { success } = CreateCommunitySchema.safeParse({
    name,
    admin_id,
  });

  if (!success) {
    throw new Error("Dados inválidos.");
  }

  const { error } = await supabase.from("community").insert({
    name,
    admin_id,
    // members_count será 1 por padrão
    // created_at será preenchido automaticamente
  });

  revalidatePath("/community");
  if (error) {
    throw new Error(error.message);
  }
};
