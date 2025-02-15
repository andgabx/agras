"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

export async function updateCommunity(formData: FormData) {
  const name = formData.get("name") as string;
  const description = formData.get("description") as string;
  const communityId = formData.get("communityId") as string;

  if (!name) {
    throw new Error("Nome da comunidade é obrigatório");
  }

  const supabase = await createClient();

  // Pega o usuário atual
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("Usuário não autenticado");
  }

  // Verifica se o usuário é o criador da comunidade
  const { data: community } = await supabase
    .from("communities")
    .select("admin_id")
    .eq("id", communityId)
    .single();

  if (!community || community.admin_id !== user.id) {
    throw new Error("Você não tem permissão para editar esta comunidade");
  }

  // Procede com a atualização
  const { error } = await supabase
    .from("communities")
    .update({ name, description })
    .eq("id", communityId)
    .select()
    .single();

  if (error) {
    throw new Error("Falha ao atualizar a comunidade");
  }

  revalidatePath(`/community/${communityId}/settings`);
}
